import React from 'react';
import './Profile.css';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
declare var firebase;

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.emailValueChange = this.emailValueChange.bind(this);
    this.nameValueChange = this.nameValueChange.bind(this);
    this.makeAdmin = this.makeAdmin.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);
    this.doOnSubmitName = this.doOnSubmitName.bind(this);

    if (props.userData === null) {
      props.history.push('/');
    }

    this.state = {
      emailInputValue: "",
      nameInputValue: "",
      nameEditMode: false
    };
  }

  emailValueChange(event) {
    this.setState({
      emailInputValue: event.target.value
    });
  }

  nameValueChange(event) {
    this.setState({
      nameInputValue: event.target.value
    });
  }

  onChangeName() {
    this.setState({
      nameEditMode: true
    });
  }

  doOnSubmitName() {
    firebase.auth().currentUser.updateProfile({
        displayName: this.state.nameInputValue
    }).then(() => {
      this.setState({
        nameEditMode: false,
        nameInputValue: ""
      });
    }, function (error) {
        console.log(error.message);
    });
  }

  doOnCancel() {
    this.setState({
      nameEditMode: false,
      nameInputValue: ""
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
    let userEmail = "";
    if (this.props.userData !== null) {
      userEmail = this.props.userData.email;
    }

    let userName = "";
    if (this.props.userData !== null) {
      userName = this.props.userData.displayName;
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
      <NavLink to="/developers"><button className="btn profileButtons">Manage Developers</button></NavLink>
    );

    const suggestedDevelopersButton = (
      <NavLink to="/suggested"><button className="btn profileButtons">Suggested Developers</button></NavLink>
    );

    const changeNameButton = (
      <button className="btn profileButtons" onClick={this.onChangeName}>Change Name</button>
    );

    const changeNameForm = (
      <div className="editNameWrapper">
        <input className="form-control editNameInput" type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnSubmitName}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    let adminSign = (<p></p>);
    if (this.props.userData !== null) {
      adminSign = (
        <p>Permissions: {this.props.userData.admin ? "Admin" : "User"}</p>
      );
    }

    return (
      <div className="profileWrapper">
        <p>Logged as {userEmail}</p>
        <p>Display name: {userName}</p>
        {this.state.nameEditMode ? changeNameForm : changeNameButton}
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
