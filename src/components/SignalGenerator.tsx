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
  const [apiAddress, setApiAddress] = useState('http://localhost:5000') // 默认 API 地址

  // 发送数据到后端
  const sendDataToBackend = (key, value) => {
    const payload = {
      frequency,
      amplitude,
      duty,
      waveType,
      [key]: value,
    }

    axios
      .post(apiAddress, payload)
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
    const value = Number(e.target.value)
    setAmplitude(value)
    sendDataToBackend('amplitude', value)
  }

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

      {/* 波形类型选择按钮 */}
      <HStack spacing={4} mt={4}>
        <Button
          colorScheme={waveType === 'sine' ? 'blue' : 'gray'}
          onClick={() => handleWaveTypeChange('sine')}
          w="120px"
        >
          正弦波
        </Button>
        <Button
          colorScheme={waveType === 'pulse' ? 'blue' : 'gray'}
          onClick={() => handleWaveTypeChange('pulse')}
          w="120px"
        >
          脉冲波
        </Button>
      </HStack>

      {/* 频率调整 */}
      <HStack >
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
      <HStack >
        <Button onClick={() => setAmplitude((prev) => { const newValue = prev - 0.1; sendDataToBackend('amplitude', newValue); return newValue; })}>幅度减</Button>
        <Input 
          value={amplitude} 
          onChange={handleAmplitudeChange}
          w="120px" 
          textAlign="center" 
        />
        <Button onClick={() => setAmplitude((prev) => { const newValue = prev + 0.1; sendDataToBackend('amplitude', newValue); return newValue; })}>幅度增</Button>
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
