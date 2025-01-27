import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const CallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #43cea2, #185a9d);
  min-height: 100vh;
  color: white;
`

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
`

const CallStatus = styled.div`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`

const PhoneIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite;
`

const Instructions = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  text-align: center;
  margin-bottom: 2rem;
`

const Timer = styled.div`
  font-size: 2rem;
  font-weight: bold;
`

const Call = () => {
  const [callStatus, setCallStatus] = useState('Initiating call...')
  const [timer, setTimer] = useState(600) // 10 minutes in seconds
  const location = useLocation()

  useEffect(() => {
    // Simulate call initiation
    setTimeout(() => {
      setCallStatus('Call in progress')
    }, 3000)

    // Start the timer
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          setCallStatus('Call ended')
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  return (
    <CallWrapper>
      <CallStatus>{callStatus}</CallStatus>
      <PhoneIcon>📞</PhoneIcon>
      <Instructions>
        {callStatus === 'Initiating call...'
          ? 'Please wait while we connect you to your AI interviewer.'
          : callStatus === 'Call in progress'
          ? 'Your interview is now in progress. Speak clearly and confidently!'
          : 'Your interview has ended. You will receive your feedback shortly.'}
      </Instructions>
      {callStatus === 'Call in progress' && <Timer>{formatTime(timer)}</Timer>}
    </CallWrapper>
  )
}

export default Call
