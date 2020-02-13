import React from 'react';
import './Profile.css';
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import fire from "../../Firebase";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    // if (props.userData === null) {
    //   props.history.push('/');
    // }

    let userName = "";
    if (this.props.userData !== null) {
      userName = this.props.userData.displayName;
    }

    this.state = {
      emailInputValue: "",
      nameInputValue: userName,
      verifyButtonText: "Verify Email"
    };
  }

  emailValueChange = (event) => {
    this.setState({
      emailInputValue: event.target.value
    });
  };

  nameValueChange = (event) => {
    this.setState({
      nameInputValue: event.target.value
    });
  };

  /*avatarValueChange = (event) => {
    console.log(event.target.files);
  };*/

  onChangeName = () => {
    fire.auth().currentUser.updateProfile({
        displayName: this.state.nameInputValue
    }).then(() => {
    }, function (error) {
        console.log(error.message);
    });
  };

  onVerify = () => {
    let actionCodeSettings = {
      url: 'https://gamekeeper.ltcodename.com'
    };

    fire.auth().currentUser.sendEmailVerification(actionCodeSettings).then(() => {
      this.setState({
        verifyButtonText:"Email Sent"
      });
    });
  };

  makeAdmin = (event) => {
    event.preventDefault();
    console.log(`I'm about to make ${this.state.emailInputValue} an admin`);
    const addAdminRole = fire.functions().httpsCallable('addAdminRole');
    addAdminRole({ email: this.state.emailInputValue }).then(result => {
      console.log(result);
    })
  };

  render() {
    if (this.props.userData === null) {
      return <Redirect to='/' />;
    }

    let userEmail = "";
    let userVerified = "";

    if (this.props.userData !== null) {
      userEmail = this.props.userData.email;
      userVerified = this.props.userData.emailVerified;
    }

    let verifiedText = "";
    if (userVerified) {
      verifiedText = "";
    }else {
      verifiedText = "Not verified";
    }

    const makeAdmin = (
      <form onSubmit={this.makeAdmin} className="adminForm">
        <div className="inputField">
          <input className="form-control emailInput" autoComplete="username email" placeholder="Enter email" type="email" id="adminEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required/>
          <label className="emailInputLabel sr-only" htmlFor="adminEmail">Email address</label>
        </div>
        <button className="btn profileButtons">OK</button>
      </form>
    );

    const developersButton = (
      <NavLink to="/developers"><button className="btn profileButtons">Manage</button></NavLink>
    );

    const suggestedDevelopersButton = (
      <NavLink to="/suggested"><button className="btn profileButtons">Manage</button></NavLink>
    );

    const changeNameButton = (
      <button className="btn profileButtons buttonWithMarginLeft" onClick={this.onChangeName}>Change</button>
    );

    const verifyButton = (
      <button className="btn profileButtons buttonWithMarginLeft" onClick={this.onVerify}>{this.state.verifyButtonText}</button>
    );

    const privacyButton = (
      <NavLink to="/privacy"><button className="btn profileButtons">Read</button></NavLink>
    );

    let adminSign = (<p className="profileParagraph"/>);
    if (this.props.userData !== null) {
      adminSign = (
        <p className="profileParagraph">{this.props.userData.admin ? "Admin" : "User"}</p>
      );
    }

    const manageDevelopers = (
      <tr>
        <th scope="row">Developers</th>
        <td>{developersButton}</td>
      </tr>
    );

    const manageSuggested = (
      <tr>
        <th scope="row">Suggested developers</th>
        <td>{suggestedDevelopersButton}</td>
      </tr>
    );

    const adminMaker = (
      <tr>
        <th scope="row">Make admin</th>
        <td>{makeAdmin}</td>
      </tr>
    );

    const changeNameForm = (
      <div className="editNameWrapper">
        <input className="form-control editNameInput" type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameValueChange}/>
      </div>
    );

    let avatarInitials;

    if (this.state.nameInputValue.includes(" ")) {
      let words = this.state.nameInputValue.split(" ");
      avatarInitials = words[0][0] + words[1][0];
    }else {
      avatarInitials = this.state.nameInputValue.slice(0, 2);
    }

    if (avatarInitials) {
      avatarInitials.toUpperCase();
    }

    if (avatarInitials.length > 2) {
        avatarInitials = avatarInitials.slice(0, 2);
    }

      if (avatarInitials.length === 0) {
          avatarInitials = "GK";
      }

      /*const uploadAvatar = (
          <div className="uploadAvatarWrapper">
              <input className="form-control" type="file" name="avatar" accept="image/png, image/jpeg" onChange={this.avatarValueChange}/>
          </div>
      );*/

    const table = (
      <div className="tableWrapper">
        <div className="profileTopWrapper">
          <h1 className="profileHeader">Account Details</h1>
          <div>
              <div className="avatar">
                  <div className="avatarText">{avatarInitials}</div>
              </div>

          </div>
        </div>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Display name</th>
              <td className="makeItFlex">{changeNameForm}{changeNameButton}</td>
            </tr>
            {/*<tr>
                <th scope="row">Avatar</th>
                <td className="makeItFlex">{uploadAvatar}</td>
            </tr>*/}
            <tr>
              <th scope="row">Email</th>
              <td className="makeItFlex">{userEmail} {userVerified ? verifiedText : verifyButton}</td>
            </tr>
            <tr>
              <th scope="row">Permissions</th>
              <td>{adminSign}</td>
            </tr>
            <tr>
              <th scope="row">Privacy Policy</th>
              <td>{privacyButton}</td>
            </tr>
            {this.props.userData.admin ? manageDevelopers : null}
            {this.props.userData.admin ? manageSuggested : null}
            {this.props.userData.admin ? adminMaker : null}
            <tr>
              <th scope="row"></th>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    );

    return (
      <div className="profileWrapper">
        {table}
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
