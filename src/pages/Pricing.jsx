import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const PricingWrapper = styled.div`
  padding: 2rem;
  text-align: center;
`

const PricingPlans = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`

const PlanCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const PlanTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.primary};
`

const PlanPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const PlanFeatures = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 1rem;
`

const PlanFeature = styled.li`
  margin-bottom: 0.5rem;
`

const PlanButton = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`

const Pricing = () => {
  return (
    <PricingWrapper>
      <h2>Choose Your Plan</h2>
      <PricingPlans>
        <PlanCard>
          <PlanTitle>Pay-per-call</PlanTitle>
          <PlanPrice>$5 / call</PlanPrice>
          <PlanFeatures>
            <PlanFeature>One interview simulation</PlanFeature>
            <PlanFeature>Detailed feedback report</PlanFeature>
            <PlanFeature>Performance evaluation</PlanFeature>
          </PlanFeatures>
          <PlanButton to="/signup">Get Started</PlanButton>
        </PlanCard>
        <PlanCard>
          <PlanTitle>Monthly Unlimited</PlanTitle>
          <PlanPrice>$49 / month</PlanPrice>
          <PlanFeatures>
            <PlanFeature>Unlimited interview simulations</PlanFeature>
            <PlanFeature>Detailed feedback reports</PlanFeature>
            <PlanFeature>Performance evaluations</PlanFeature>
            <PlanFeature>Priority support</PlanFeature>
          </PlanFeatures>
          <PlanButton to="/signup">Subscribe Now</PlanButton>
        </PlanCard>
        <PlanCard>
          <PlanTitle>Credit Package</PlanTitle>
          <PlanPrice>$30 for 10 credits</PlanPrice>
          <PlanFeatures>
            <PlanFeature>10 interview simulations</PlanFeature>
            <PlanFeature>Detailed feedback reports</PlanFeature>
            <PlanFeature>Performance evaluations</PlanFeature>
            <PlanFeature>Credits never expire</PlanFeature>
          </PlanFeatures>
          <PlanButton to="/signup">Buy Credits</PlanButton>
        </PlanCard>
      </PricingPlans>
    </PricingWrapper>
  )
}

export default Pricing
