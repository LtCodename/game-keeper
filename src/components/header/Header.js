import React from 'react';
import './Header.css';
import indexActions from '../../redux/reducers/selectedListIndexReducer';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom';
import fire from "../../Firebase";
import {LogOutIcon, LogOutIconMobile, ProfileIcon, ProfileIconMobile} from "../../IconsLibrary";

const Header = ({changeListIndex, history, userLists, userData}) => {
  const onLogOutClick = () => {
    fire.auth().signOut().then(() => {
    }).catch(error => {
      console.log(error.message);
    });
    changeListIndex(null, userLists.length);
    history.push('/');
  };

  const logo = (
      <div className="logoHolder">
        <NavLink
            className="logoLink"
            onClick={() => changeListIndex(null, userLists.length)}
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
            to="/profile">
          <button
              className="profileButton"
              onClick={() => changeListIndex(null, userLists.length)}>
            Profile
            {ProfileIcon}
          </button>
        </NavLink>
      </div>
  );

  const profileAltButton = (
      <div className="">
        <NavLink
            to="/profile">
          <button
              className="profileButtonAlt"
              onClick={() => changeListIndex(null, userLists.length)}>
            {ProfileIconMobile}
          </button>
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

const headerDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index, listsLength) => {
      dispatch({ type: indexActions.actions.SLI_CHANGE, index: index, listsLength: listsLength });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists,
    userData: state.userData
  }
};

const HeaderConnected = connect(stateToProps, headerDispatchToProps)(Header);

export default withRouter(HeaderConnected);
