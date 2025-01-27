import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from '../contexts/AuthContext'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Logo = styled(Link)`
  font-size: ${props => props.theme.fontSizes.large};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`

const Header = () => {
  const { user, signOut } = useAuth()

  return (
    <HeaderWrapper>
      <Logo to="/">InterviewSim</Logo>
      <Nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink as="button" onClick={() => signOut()}>Sign Out</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/signin">Sign In</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </Nav>
    </HeaderWrapper>
  )
}

export default Header
