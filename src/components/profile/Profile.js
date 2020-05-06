import React from 'react';
import './Profile.css';
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import fire from "../../Firebase";
import Button from "../button/Button";
import { TrelloIcon, TwitterIcon } from "../../IconsLibrary";
import Textarea from "../textarea/Textarea";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    let userName = "";
    if (this.props.userData !== null) {
      userName = this.props.userData.displayName;
    }

    this.state = {
      emailInputValue: "",
      nameInputValue: userName,
      changeButtonDisabled: false,
      verifyButtonDisabled: false,
      adminButtonDisabled: false,
      verificationMessageSent: false
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
    let that = this;

    this.setState({
      changeButtonDisabled: true
    })

    fire.auth().currentUser.updateProfile({
      displayName: this.state.nameInputValue
    }).then(() => {
      that.setState({
        changeButtonDisabled: false
      })
    }, function (error) {
      console.log(error.message);
    });
  };

  onVerify = () => {
    let actionCodeSettings = {
      url: 'https://gamekeeper.ltcodename.com'
    };

    this.setState({
      verifyButtonDisabled: true
    })

    fire.auth().currentUser.sendEmailVerification(actionCodeSettings).then(() => {
      this.setState({
        verifyButtonDisabled: false,
        verificationMessageSent: true
      })
    });
  };

  makeAdmin = (event) => {
    event.preventDefault();

    this.setState({
      adminButtonDisabled: true
    })

    console.log(`I'm about to make ${this.state.emailInputValue} an admin`);
    const addAdminRole = fire.functions().httpsCallable('addAdminRole');
    addAdminRole({ email: this.state.emailInputValue }).then(result => {
      console.log(result);
      this.setState({
        adminButtonDisabled: false
      })
    })
  };

  render() {
    if (this.props.userData === null) {
      return <Redirect to='/' />;
    }

    let userEmail = "";
    let userVerified = "";

    if (this.props.userData) {
      userEmail = this.props.userData.email;
      userVerified = this.props.userData.emailVerified;
    }

    let verifiedText;
    if (userVerified) {
      verifiedText = "";
    }else {
      verifiedText = "Not verified";
    }

    const makeAdmin = (
        <>
          <Textarea
              placeholder='Enter Email'
              value={this.state.emailInputValue}
              onChange={this.emailValueChange}
              additionalClass="profile-input"
          />
          <Button
            disabled={this.state.adminButtonDisabled}
            buttonAction={this.makeAdmin}
            text={'Submit'}
            margin={'left'}
          />
        </>
    );

    const changeNameButton = (
        <Button
            disabled={this.state.changeButtonDisabled}
            buttonAction={this.onChangeName}
            text={'Change'}
            margin={'left'}
        />
    );

    const verifyButton = (
        <Button
            disabled={this.state.verifyButtonDisabled}
            buttonAction={this.onVerify}
            text={'Verify'}
            margin={'left'}
        />
    );

    const privacyButton = (
        <NavLink to="/privacy">
          <Button text={'Read'} margin={'left'}/>
        </NavLink>
    );

    let adminSign = (<span className="property-value"/>);
    if (this.props.userData) {
      adminSign = (
          <span className="property-value">{this.props.userData.admin ? "Admin" : "User"}</span>
      );
    }

    const adminMaker = (
        <div className="profile-property lt-row">
          <span className="property-name">Make Admin</span>
          <div className="lt-row">
            {makeAdmin}
          </div>
        </div>
    );

    const changeNameForm = (
        <Textarea
            placeholder='Enter New Name'
            value={this.state.nameInputValue}
            onChange={this.nameValueChange}
            additionalClass="profile-input"
        />
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

    if (!avatarInitials.length) {
      avatarInitials = "GK";
    }

    /*const uploadAvatar = (
        <div className="uploadAvatarWrapper">
            <input className="form-control" type="file" name="avatar" accept="image/png, image/jpeg" onChange={this.avatarValueChange}/>
        </div>
    );*/

    const verificationMessage = (
        <span className="verification-message">Please check your Email</span>
    );

    const props = (
      <div className="profile-wrapper lt-col">
        <div className="avatar">
          <div className="avatarText">{avatarInitials}</div>
        </div>
        <div className="lt-col">
          <div className="profile-property lt-row">
            <span className="property-name">Display name</span>
            <div className="lt-row">
              {changeNameForm}
              {changeNameButton}
            </div>
          </div>
          <div className="lt-col">
            <div className="lt-row profile-property">
              <span className="property-name">Email</span>
              <div className="lt-row">
                <span className="property-value">{userEmail}</span>
                {userVerified ? verifiedText : verifyButton}
              </div>
            </div>
            {this.state.verificationMessageSent ? verificationMessage : ''}
          </div>
          <div className="profile-property lt-row">
            <span className="property-name">Permissions</span>
            <div className="lt-row">
              {adminSign}
            </div>
          </div>
          <div className="profile-property lt-row">
            <span className="property-name">Privacy Policy</span>
            <div className="lt-row">
              {privacyButton}
            </div>
          </div>
          {this.props.userData.admin ? adminMaker : null}
          <div className="profile-property lt-row">
            <span className="property-name">Trello Board</span>
            <a
                href="https://trello.com/b/GT6AY0oi/game-keeper-roadmap"
                target="blank">
              {TrelloIcon}
            </a>
          </div>
          <div className="profile-property lt-row">
            <span className="property-name">Contact Creator</span>
            <a
                href="https://twitter.com/LtCodename"
                target="blank">
              {TwitterIcon}
            </a>
          </div>
          <div className="profile-property lt-row">
            <span className="property-name">Games API</span>
            <a
                href="https://rawg.io/apidocs"
                target="blank">
              <span className="property-value">RAWG</span>
            </a>
          </div>
          <div className="profile-property lt-row">
            <span className="property-name">Version</span>
            <span className="property-value">0.892, 5.5.2020</span>
          </div>
        </div>
      </div>
    );

    return (
        <div className="profile-general-wrapper lt-row">
          {props}
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
