import React from 'react'
import styled from 'styled-components'

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSizes.small};
`

const Footer = () => {
  return (
    <FooterWrapper>
      © {new Date().getFullYear()} InterviewSim. All rights reserved.
    </FooterWrapper>
  )
}

export default Footer
