import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme'
import GlobalStyle from './styles/GlobalStyle'
import Home from './pages/Home'
import JobDetails from './pages/JobDetails'
import Payment from './pages/Payment'
import Call from './pages/Call'
import Dashboard from './pages/Dashboard'
import Pricing from './pages/Pricing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-details" element={<JobDetails />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/call" element={<Call />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
