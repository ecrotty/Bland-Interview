import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../utils/supabaseClient'

const InterviewWrapper = styled.div`
  padding: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
`

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid ${props => props.theme.colors.text};
  border-radius: 4px;
`

const Button = styled.button`
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`

const Interview = () => {
  const [jobDescription, setJobDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Extract key information from job description
      const keyInfo = await extractKeyInfo(jobDescription)

      // Start interview simulation with bland.ai
      const interviewResult = await startInterviewSimulation(keyInfo)

      // Save interview result to Supabase
      await saveInterviewResult(interviewResult)

      setResult(interviewResult)
    } catch (error) {
      console.error('Error during interview process:', error)
    } finally {
      setLoading(false)
    }
  }

  const extractKeyInfo = async (description) => {
    // Implement job description analysis logic here
    // This is a placeholder implementation
    return {
      jobTitle: 'Software Developer',
      keySkills: ['JavaScript', 'React', 'Node.js'],
      experience: '3-5 years'
    }
  }

  const startInterviewSimulation = async (keyInfo) => {
    const blandAiApiKey = import.meta.env.VITE_BLAND_AI_API_KEY
    const response = await axios.post('https://api.bland.ai/v1/calls', {
      api_key: blandAiApiKey,
      phone_number: '+11234567890', // Replace with actual phone number
      task: 'Conduct a job interview',
      duration: 600, // 10 minutes
      context: `Job Title: ${keyInfo.jobTitle}, Key Skills: ${keyInfo.keySkills.join(', ')}, Experience: ${keyInfo.experience}`,
    })

    // Process and return the interview result
    return {
      callId: response.data.call_id,
      duration: response.data.duration,
      transcript: response.data.transcript,
    }
  }

  const saveInterviewResult = async (interviewResult) => {
    const { data, error } = await supabase
      .from('interviews')
      .insert({
        user_id: user.id,
        job_title: interviewResult.jobTitle,
        duration: interviewResult.duration,
        transcript: interviewResult.transcript,
        score: calculateScore(interviewResult),
      })

    if (error) {
      console.error('Error saving interview result:', error)
    }
  }

  const calculateScore = (interviewResult) => {
    // Implement scoring logic based on the interview result
    // This is a placeholder implementation
    return Math.floor(Math.random() * 100)
  }

  return (
    <InterviewWrapper>
      <h2>Start Interview Simulation</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Paste job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Start Interview'}
        </Button>
      </Form>
      {result && (
        <div>
          <h3>Interview Result</h3>
          <p>Duration: {result.duration} seconds</p>
          <p>Score: {result.score}</p>
          <h4>Transcript:</h4>
          <pre>{result.transcript}</pre>
        </div>
      )}
    </InterviewWrapper>
  )
}

export default Interview
