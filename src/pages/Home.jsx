import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  min-height: 100vh;
  color: white;
`

const Hero = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
`

const CTAButton = styled(Link)`
  padding: 1rem 2rem;
  background-color: #ff6b6b;
  color: white;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #ee5253;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`

const Features = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
  margin-top: 4rem;
`

const FeatureCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2rem;
  width: 30%;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

const FeatureDescription = styled.p`
  font-size: 1rem;
`

const Home = () => {
  return (
    <HomeWrapper>
      <Hero>
        <Title>Master Your Interview Skills</Title>
        <Subtitle>
          Practice with AI-powered interview simulations and get real-time feedback to land your dream job.
        </Subtitle>
        <CTAButton to="/job-details">Start Your Interview Prep</CTAButton>
      </Hero>
      <Features>
        <FeatureCard>
          <FeatureIcon>🤖</FeatureIcon>
          <FeatureTitle>AI-Powered Simulations</FeatureTitle>
          <FeatureDescription>
            Experience realistic interview scenarios with our advanced AI technology.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>📊</FeatureIcon>
          <FeatureTitle>Detailed Feedback</FeatureTitle>
          <FeatureDescription>
            Receive comprehensive analysis and actionable insights to improve your performance.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon>📈</FeatureIcon>
          <FeatureTitle>Track Your Progress</FeatureTitle>
          <FeatureDescription>
            Monitor your improvement over time with personalized analytics and reports.
          </FeatureDescription>
        </FeatureCard>
      </Features>
    </HomeWrapper>
  )
}

export default Home
