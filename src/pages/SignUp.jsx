import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
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

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  margin-bottom: 1rem;
`

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { error } = await signUp({ email, password })
      if (error) throw error
      navigate('/dashboard')
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <SignUpWrapper>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
      </Form>
    </SignUpWrapper>
  )
}

export default SignUp
