import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const LinkItem = styled(Link)`
  text-decoration: none;
`
export const NavHeader = styled.nav`
    background-color: ${props => props.$bgcolor};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
  
`
export const ThemeButton = styled.button`
  background: none;
  border: none;
  outline: none;
  margin-right: 10px;
`
export const AppLogo = styled.h4`
  margin-left: 80px;
  font-weight: bold;
  @media screen and (max-width: 768px) { 
    margin-left: 20px;
  }
`