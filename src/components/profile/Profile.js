import React from 'react';
import './Profile.css';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
declare var firebase;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.emailValueChange = this.emailValueChange.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);

    if (props.userData === null) {
      props.history.push('/');
    }

    this.state = {
      emailInputValue: ""
    };
  }

  emailValueChange(event) {
    this.setState({
      emailInputValue: event.target.value
    });
  }

  makeAdmin(event) {
    event.preventDefault();
    console.log(`I'm about to make ${this.state.emailInputValue} an admin`);
    const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
    addAdminRole({ email: this.state.emailInputValue }).then(result => {
      console.log(result);
    })
  }

  render() {
    let validEmail = "";
    if (this.props.userData !== null) {
      validEmail = this.props.userData.email;
    }

    const adminPanel = (
      <form className="adminPanel" onSubmit={this.makeAdmin}>
        <div className="inputField">
          <input className="emailInput" autoComplete="username email" placeholder="Enter email" type="email" id="adminEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required></input>
          <label className="emailInputLabel" htmlFor="adminEmail">Email address</label>
        </div>
        <button className="btn addAdminButton">Make Admin</button>
      </form>
    );

    const developersButton = (
      <NavLink to="/developers"><button className="btn developersButton">Manage Developers</button></NavLink>
    );

    const suggestedDevelopersButton = (
      <NavLink to="/suggested"><button className="btn developersButton">Suggested Developers</button></NavLink>
    );

    let adminSign = (<p></p>);
    if (this.props.userData !== null) {
      adminSign = (
        <p>Permissions: {this.props.userData.admin ? "Admin" : "User"}</p>
      );
    }

    return (
      <div className="profileWrapper">
        <p>Logged as {validEmail}</p>
        {adminSign}
        {this.props.userData.admin ? developersButton : ""}
        {this.props.userData.admin ? suggestedDevelopersButton : ""}
        {this.props.userData.admin ? adminPanel : ""}
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userData: state.userData
  }
};

const ProfileConnected = connect(stateToProps, null)(Profile);

export default ProfileConnected;
