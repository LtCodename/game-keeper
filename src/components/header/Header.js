import React from 'react';
import './Header.css';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom';
import fire from "../../Firebase";
import {LogOutIcon, LogOutIconMobile, ProfileIcon, ProfileIconMobile} from "../../IconsLibrary";

const Header = ({ history, userData}) => {
  const onLogOutClick = () => {
    fire.auth().signOut().then(() => {
    }).catch(error => {
      console.log(error.message);
    });
    history.push('/');
  };

  const logo = (
      <div className="logoHolder">
        <NavLink
            className="logoLink"
            to="/">
          Game Keeper
        </NavLink>
      </div>
  );

  const logOutButton = (
      <div className="authButtonWrapper">
        <button
            className="profileButton"
            onClick={onLogOutClick}>
          Log Out
            {LogOutIcon}
        </button>
      </div>
  );

  const profileButton = (
      <div className="authButtonWrapper">
        <NavLink
            className="profileButton"
            to="/profile">
            Profile
            {ProfileIcon}
        </NavLink>
      </div>
  );

  const profileAltButton = (
      <div className="">
        <NavLink
            className="profileButtonAlt"
            to="/profile">
            {ProfileIconMobile}
        </NavLink>
      </div>
  );

  const logOutAltButton = (
      <div className="">
        <button
            className="profileButtonAlt"
            onClick={onLogOutClick}>
            {LogOutIconMobile}
        </button>
      </div>
  );

  return (
      <div className="ultimateHeaderWrapper">
        <div className="headerWrapper">
          {logo}
          <div className="signPanelWrapper">
            {userData ? logOutButton : ""}
            {userData ? profileButton : ""}
          </div>
        </div>
        <div className="altButtonsWrapper">
          {userData ? logOutAltButton : ""}
          {userData ? profileAltButton : ""}
        </div>
      </div>
  )
};

const stateToProps = (state = {}) => {
  return {
    userData: state.userData
  }
};

const HeaderConnected = connect(stateToProps, null)(Header);

export default withRouter(HeaderConnected);
