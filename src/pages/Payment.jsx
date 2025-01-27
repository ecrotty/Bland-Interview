import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  color: white;
`

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
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

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
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

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('creditCard')
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For now, we'll just navigate to the call page
    navigate('/call', { 
      state: { ...location.state, paymentMethod } 
    })
  }

  return (
    <PaymentWrapper>
      <PaymentForm onSubmit={handleSubmit}>
        <Title>Payment Details</Title>
        <Select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
        </Select>
        {paymentMethod === 'creditCard' && (
          <>
            <Input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="MM/YY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </>
        )}
        <Button type="submit">Pay Now</Button>
      </PaymentForm>
    </PaymentWrapper>
  )
}

export default Payment
