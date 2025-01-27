import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../utils/supabaseClient'

const DashboardWrapper = styled.div`
  padding: 2rem;
`

const Title = styled.h2`
  margin-bottom: 1rem;
`

const InterviewList = styled.ul`
  list-style-type: none;
  padding: 0;
`

const InterviewItem = styled.li`
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
`

const Dashboard = () => {
  const { user } = useAuth()
  const [interviews, setInterviews] = useState([])

  useEffect(() => {
    const fetchInterviews = async () => {
      const { data, error } = await supabase
        .from('interviews')
        .select('*')
        .eq('user_id', user.id)
      
      if (error) {
        console.error('Error fetching interviews:', error)
      } else {
        setInterviews(data)
      }
    }

    if (user) {
      fetchInterviews()
    }
  }, [user])

  return (
    <DashboardWrapper>
      <Title>Your Dashboard</Title>
      <InterviewList>
        {interviews.map((interview) => (
          <InterviewItem key={interview.id}>
            <h3>{interview.job_title}</h3>
            <p>Date: {new Date(interview.created_at).toLocaleDateString()}</p>
            <p>Score: {interview.score}</p>
          </InterviewItem>
        ))}
      </InterviewList>
    </DashboardWrapper>
  )
}

export default Dashboard
