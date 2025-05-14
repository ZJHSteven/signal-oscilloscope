// components/SignalGenerator.tsx
import React, { useState } from 'react'
import { Button, Input, HStack, VStack, RadioGroup,  Box, Heading } from '@chakra-ui/react'

const SignalGenerator = () => {
  // 状态管理
  const [frequency, setFrequency] = useState(1000)  // 初始频率 1000Hz
  const [amplitude, setAmplitude] = useState(1)    // 初始幅度 1
  const [duty, setDuty] = useState(50)             // 初始占空比 50%
  const [waveType, setWaveType] = useState('sine') // 默认正弦波

  // 处理按钮点击
  const increaseFreq = () => setFrequency(frequency + 100)
  const decreaseFreq = () => setFrequency(frequency - 100)
  const increaseAmp = () => setAmplitude(amplitude + 0.1)
  const decreaseAmp = () => setAmplitude(amplitude - 0.1)
  const increaseDuty = () => setDuty(duty + 5)
  const decreaseDuty = () => setDuty(duty - 5)

  // 波形切换
  const handleWaveTypeChange = (value: string) => {
    setWaveType(value)
  }

  return (
    <VStack  align="center" w="100%" h="100vh" justify="center">
      <Heading as="h1" size="xl">信号发生器</Heading>

      {/* 频率调整 */}
      <HStack >
        <Button onClick={decreaseFreq}>频率减</Button>
        <Input 
          value={frequency} 
          onChange={(e) => setFrequency(Number(e.target.value))}
          w="120px" 
          textAlign="center" 
        />
        <Button onClick={increaseFreq}>频率增</Button>
      </HStack>

      {/* 幅度调整 */}
      <HStack >
        <Button onClick={decreaseAmp}>幅度减</Button>
        <Input 
          value={amplitude} 
          onChange={(e) => setAmplitude(Number(e.target.value))}
          w="120px" 
          textAlign="center" 
        />
        <Button onClick={increaseAmp}>幅度增</Button>
      </HStack>

      {/* 占空比调整 */}
      <HStack>
        <Button onClick={decreaseDuty}>占空比减</Button>
        <Input 
          value={duty} 
          onChange={(e) => setDuty(Number(e.target.value))}
          w="120px" 
          textAlign="center" 
        />
        <Button onClick={increaseDuty}>占空比增</Button>
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
