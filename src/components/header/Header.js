import React from 'react';
import './Header.css';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom';
declare var $;
declare var firebase;

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.onLogOutClick = this.onLogOutClick.bind(this);

    this.state = {
    };
  }

  onLogOutClick() {
    firebase.auth().signOut().then(() => {
    }).catch(error => {
      console.log(error.message);
    });
    this.props.changeListIndex(null, this.props.userLists.length);
    this.props.history.push('/');
  }

  render() {
    const logo = (
      <div className="logoWrapper">
        <NavLink to="/"><button className="btn" onClick={() => this.props.changeListIndex(null, this.props.userLists.length)}>Game Keeper</button></NavLink>
      </div>
    );

    const logOutButton = (
      <div className="authButtonWrapper">
        <button className="btn profileButton" onClick={this.onLogOutClick}>Log Out<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-logout.svg'}></img></button>
      </div>
    );

    const profileButton = (
      <div className="authButtonWrapper">
        <NavLink to="/profile"><button className="btn profileButton" onClick={() => this.props.changeListIndex(null, this.props.userLists.length)}>Profile<img className="authIcon" alt="" src={process.env.PUBLIC_URL + '/icons/auth-profile.svg'}></img></button></NavLink>
      </div>
    );

    const profileAltButton = (
      <div className="authButtonWrapper">
        <NavLink to="/profile"><button className="btn profileButtonAlt" onClick={() => this.props.changeListIndex(null, this.props.userLists.length)}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-profile.svg'}></img></button></NavLink>
      </div>
    );

    const logOutAltButton = (
      <div className="authButtonWrapper">
        <button className="btn profileButtonAlt" onClick={this.onLogOutClick}><img className="authIconAlt" alt="" src={process.env.PUBLIC_URL + '/icons/auth-logout.svg'}></img></button>
      </div>
    );

    return (
      <div>
        <div className="ultimateHeaderWrappper">
          <div className="headerWrappper">
            {logo}
            <div className="signWrapper">
              {this.props.userData ? logOutButton : ""}
              {this.props.userData ? profileButton : ""}
            </div>
          </div>
          <div className="altButtonsWrapper">
            {this.props.userData ? logOutAltButton : ""}
            {this.props.userData ? profileAltButton : ""}
          </div>
        </div>
      </div>
    )
  }
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
