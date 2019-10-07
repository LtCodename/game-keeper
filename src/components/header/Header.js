import React from 'react';
import './Header.css';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom';
declare var firebase;

const Header = ({changeListIndex, history, userLists, userData}) => {
  const onLogOutClick = () => {
    firebase.auth().signOut().then(() => {
    }).catch(error => {
      console.log(error.message);
    });
    changeListIndex(null, userLists.length);
    history.push('/');
  }

  const logo = (
    <div className="logoWrapper">
      <NavLink to="/"><button className="btn" onClick={() => changeListIndex(null, userLists.length)}>Game Keeper</button></NavLink>
    </div>
  );

  const logOutButton = (
    <div className="authButtonWrapper">
      <button className="btn profileButton" onClick={onLogOutClick}>Log Out<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-logout.svg'}></img></button>
    </div>
  );

  const profileButton = (
    <div className="authButtonWrapper">
      <NavLink to="/profile"><button className="btn profileButton" onClick={() => changeListIndex(null, userLists.length)}>Profile<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-profile.svg'}></img></button></NavLink>
    </div>
  );

  const profileAltButton = (
    <div className="authButtonWrapper">
      <NavLink to="/profile"><button className="btn profileButtonAlt" onClick={() => changeListIndex(null, userLists.length)}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-profile.svg'}></img></button></NavLink>
    </div>
  );

  const logOutAltButton = (
    <div className="authButtonWrapper">
      <button className="btn profileButtonAlt" onClick={onLogOutClick}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-logout.svg'}></img></button>
    </div>
  );

  return (
    <div>
      <div className="ultimateHeaderWrappper">
        <div className="headerWrappper">
          {logo}
          <div className="signWrapper">
            {userData ? logOutButton : ""}
            {userData ? profileButton : ""}
          </div>
        </div>
        <div className="altButtonsWrapper">
          {userData ? logOutAltButton : ""}
          {userData ? profileAltButton : ""}
        </div>
      </div>
    </div>
  )
}

const headerDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index, listsLength) => {
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: index, listsLength: listsLength });
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
