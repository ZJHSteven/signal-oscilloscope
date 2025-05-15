// components/SignalGenerator.tsx
import React, { useState } from 'react'
import { Button, Input, HStack, VStack, Box, Heading } from '@chakra-ui/react'
import axios from 'axios'

const SignalGenerator = () => {
  // 状态管理
  const [frequency, setFrequency] = useState(1000)  // 初始频率 1000Hz
  const [amplitude, setAmplitude] = useState(1)    // 初始幅度 1
  const [duty, setDuty] = useState(50)             // 初始占空比 50%
  const [waveType, setWaveType] = useState('sine') // 默认正弦波
  const [apiAddress, setApiAddress] = useState('192.168.182.46') // 默认 API 地址

  // 发送数据到后端
  const sendDataToBackend = (key, value) => {
    // 确保 API 地址是完整的 URL
    let fullApiAddress = apiAddress;
    if (!apiAddress.startsWith("http://") && !apiAddress.startsWith("https://")) {
      fullApiAddress = `http://${apiAddress}/control`;
    } else {
      fullApiAddress = `${apiAddress}/control`;
    }

    const payload = {
      frequency,
      amplitude,
      duty,
      waveType,
      [key]: value,
    };

    console.log("发送请求到:", fullApiAddress);
    console.log("请求数据:", payload);

    axios
      .post(fullApiAddress, payload)
      .then((response) => {
        console.log('数据已发送:', response.data)
      })
      .catch((error) => {
        console.error('发送数据时出错:', error)
      })
  }

  // 处理输入框更改
  const handleFrequencyChange = (e) => {
    const value = Number(e.target.value)
    setFrequency(value)
    sendDataToBackend('frequency', value)
  }

  const handleAmplitudeChange = (e) => {
    const value = parseFloat(Number(e.target.value).toFixed(1)); // 限制为1位小数
    setAmplitude(value);
    sendDataToBackend('amplitude', value);
  }

  const adjustAmplitude = (delta) => {
    setAmplitude((prev) => {
      const newValue = parseFloat((prev + delta).toFixed(1)); // 限制为1位小数
      sendDataToBackend('amplitude', newValue);
      return newValue;
    });
  };

  const handleDutyChange = (e) => {
    const value = Number(e.target.value)
    setDuty(value)
    sendDataToBackend('duty', value)
  }

  const handleWaveTypeChange = (type) => {
    setWaveType(type)
    sendDataToBackend('waveType', type)
  }

  return (
    <VStack  align="center" w="100%" h="100vh" justify="center">
      <Heading as="h1" size="xl">信号发生器</Heading>

      {/* API 地址输入框 */}
      <HStack>
        <Input
          value={apiAddress}
          onChange={(e) => setApiAddress(e.target.value)}
          placeholder="输入 API 地址"
          w="300px"
        />
      </HStack>

      {/* 波形类型选择滑块 */}
      <HStack spacing={4} mt={4} style={{ backgroundColor: '#f0f0f0', padding: '8px', borderRadius: '8px' }}>
        <Button
          onClick={() => handleWaveTypeChange('sine')}
          w="120px"
          style={{
            backgroundColor: waveType === 'sine' ? '#000' : '#e2e8f0',
            color: waveType === 'sine' ? 'white' : 'black',
          }}
        >
          正弦波
        </Button>
        <Button
          onClick={() => handleWaveTypeChange('pulse')}
          w="120px"
          style={{
            backgroundColor: waveType === 'pulse' ? '#000' : '#e2e8f0',
            color: waveType === 'pulse' ? 'white' : 'black',
          }}
        >
          脉冲波
        </Button>
      </HStack>

      {/* 频率调整 */}
      <HStack>
        <Button onClick={() => setFrequency((prev) => { const newValue = prev - 100; sendDataToBackend('frequency', newValue); return newValue; })}>频率减</Button>
        <Input
          value={frequency}
          onChange={handleFrequencyChange}
          w="120px"
          textAlign="center"
        />
        <Button onClick={() => setFrequency((prev) => { const newValue = prev + 100; sendDataToBackend('frequency', newValue); return newValue; })}>频率增</Button>
      </HStack>

      {/* 幅度调整 */}
      <HStack>
        <Button onClick={() => adjustAmplitude(-0.1)}>幅度减</Button>
        <Input
          value={amplitude}
          onChange={handleAmplitudeChange}
          w="120px"
          textAlign="center"
        />
        <Button onClick={() => adjustAmplitude(0.1)}>幅度增</Button>
      </HStack>

      {/* 占空比调整 */}
      <HStack>
        <Button onClick={() => setDuty((prev) => { const newValue = prev - 5; sendDataToBackend('duty', newValue); return newValue; })}>占空比减</Button>
        <Input
          value={duty}
          onChange={handleDutyChange}
          w="120px"
          textAlign="center"
        />
        <Button onClick={() => setDuty((prev) => { const newValue = prev + 5; sendDataToBackend('duty', newValue); return newValue; })}>占空比增</Button>
      </HStack>

      {/* 动画波形展示 (占位区) */}
      <Box
        w="100%"
        h="200px"
        bg="gray.200"
        border="1px solid #ccc"
        mt={4}
        textAlign="center"
      >
        {/* 未来动画波形可以在这里填充 */}
        <Heading size="md" mt="80px">波形展示区</Heading>
      </Box>
    </VStack>
  )
}

export default SignalGenerator
