import React, { useContext, useState } from 'react';
import { BsMoon, BsBrightnessHigh } from 'react-icons/bs';
import Button from "react-bootstrap/Button";
import SignInModal from '../SignInModal'
import SignUpModal from '../SignUpModal';
import ThemeContext from '../../context/ThemeContext';
import { 
  NavHeader, LinkItem, 
  ActionsContainer, ThemeButton, AppLogo
} from './styledComponents';

const NavBar = () => {
  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  const onChangeTheme = () => {
    toggleTheme();
  };
  
  return (
    <NavHeader $bgcolor={isDarkTheme ? '#0f0f0f' : '#fefffc'}>
      <LinkItem to="/">
        <AppLogo>Sync Map</AppLogo>
      </LinkItem>
      <ActionsContainer>
        <ThemeButton type="button" onClick={onChangeTheme}>
          {isDarkTheme ? <BsBrightnessHigh color="#ffffff" size={25} /> : <BsMoon size={25} />}
        </ThemeButton>
        <Button
              variant="primary"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
              onClick={() => setModalSignIn(true)}
            >
              Sign In
            </Button>
            <SignInModal
              show={modalSignIn}
              onHide={() => setModalSignIn(false)}
            />
            <Button
              variant="primary"
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "10px",
              }}
              onClick={() => setModalSignUp(true)}
            >
              Register
            </Button>
            <SignUpModal
              show={modalSignUp}
              onHide={() => setModalSignUp(false)}
            />
      </ActionsContainer>
    </NavHeader>
  );
};

export default NavBar;
