import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const JobDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #a8e063, #56ab2f);
  min-height: 100vh;
  color: white;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 10px;
`

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
`

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
`

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 150px;
`

const Button = styled.button`
  padding: 1rem 2rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ee5253;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`

const JobDetails = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    // For now, we'll just navigate to the payment page
    navigate('/payment', { 
      state: { name, email, phoneNumber, jobTitle, jobDescription } 
    })
  }

  return (
    <JobDetailsWrapper>
      <Form onSubmit={handleSubmit}>
        <Title>Prepare for Your Interview</Title>
        <Input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="tel"
          placeholder="Your Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
        <TextArea
          placeholder="Paste the job description here"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          required
        />
        <Button type="submit">Proceed to Payment</Button>
      </Form>
    </JobDetailsWrapper>
  )
}

export default JobDetails
