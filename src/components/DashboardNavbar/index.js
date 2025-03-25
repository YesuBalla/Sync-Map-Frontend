import React, { useContext, useState } from 'react';
import { BsMoon, BsBrightnessHigh } from 'react-icons/bs';
import Button from "react-bootstrap/Button";
import SignOutModal from '../SignOutModal';
import ThemeContext from '../../context/ThemeContext';
import { 
  NavHeader, LinkItem, 
  ActionsContainer, ThemeButton, ProfileImage, AppLogo
} from './styledComponents';

const NavBar = () => {
  const [modalSignOut, setModalSignOut] = useState(false);
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
        <LinkItem to="/">
            <ProfileImage
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
            />
        </LinkItem>
        <Button
          variant="primary"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => setModalSignOut(true)}
        >
          Sign Out
        </Button>
        <SignOutModal
          show={modalSignOut}
          onHide={() => setModalSignOut(false)}
        />
      </ActionsContainer>
    </NavHeader>
  );
};

export default NavBar;
