import React from 'react';
import './SignUpModalWindow.css';
import { NavLink } from 'react-router-dom';
import fire from "../../Firebase";
import { Modal } from "react-bootstrap";

class SignUpModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInputValue: "",
      confirmEmailInputValue: "",
      confirmEmailError: false,
      confirmPasswordError: false,
      confirmErrorMessage: "",
      passwordInputValue: "",
      confirmPasswordInputValue: "",
      nameInputValue: "",
      errorText: ""
    };
  }

  nameValueChange = (event) => {
    this.setState({
      nameInputValue: event.target.value
    });
  };

  onPolicy = () => {
      this.closeModal();
  };

  passwordValueChange = (event) => {
    this.setState({
      passwordInputValue: event.target.value
    });
  };

  confirmPasswordValueChange = (event) => {
    this.setState({
      confirmPasswordInputValue: event.target.value
    });
  };

  emailValueChange = (event) => {
    this.setState({
      emailInputValue: event.target.value
    });
  };

  confirmEmailValueChange = (event) => {
    this.setState({
      confirmEmailInputValue: event.target.value
    });
  };

  createUser = (event) => {
    event.preventDefault();

    this.setState({
      confirmPasswordError: false,
      confirmEmailError: false,
      confirmErrorMessage: ""
    });

    if (this.state.emailInputValue !== this.state.confirmEmailInputValue) {
      this.setState({
        confirmEmailError: true,
        confirmErrorMessage: "Please enter equal email addresses."
      });
      return;
    }

    if (this.state.passwordInputValue !== this.state.confirmPasswordInputValue) {
      this.setState({
        confirmPasswordError: true,
        confirmErrorMessage: "Please enter equal passwords."
      });
      return;
    }

    if (!this.state.emailInputValue || !this.state.passwordInputValue) {
      return;
    }

    fire.auth().createUserWithEmailAndPassword(this.state.emailInputValue, this.state.passwordInputValue).then(credential => {
      credential.user.updateProfile({
        displayName: this.state.nameInputValue
      });

      return fire.firestore().collection('users').doc(credential.user.uid).set({
        lists: [{
          id: `id${new Date().getTime()}`,
          name: "My List"
        }],
        sections: [],
        blocks: []
      });
    }).then(() => {
        this.setState({
          emailInputValue: "",
          confirmEmailInputValue: "",
          passwordInputValue: "",
          confirmPasswordInputValue: "",
          nameInputValue: ""
        });
        this.props.hideWindow();
    }).catch(error => {
      console.log(error.message);
      this.setState({
        errorText: error.message
      });
    });
  };

  closeModal = () => {
    this.props.hideWindow();
  }

  render() {
    const confirmErrorDisplay = (
      <p className="signupErrorText">{this.state.confirmErrorMessage}</p>
    );

    const errorNode = (
        <span className="errorText">{this.state.errorText}</span>
    )

    return (
    <Modal show={this.props.show} onHide={this.closeModal} dialogClassName={'login-modal'}>
      <Modal.Body>
        <div className="lt-col">
          <span className="login-title">Sign Up</span>
          <form id="signupForm" onSubmit={this.createUser}>
            <div className="input-col">
              <input className="loginInput" autoComplete="username email" placeholder="Enter email" type="email" id="signupEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required/>
            </div>
            <div className="input-col">
              <input
                className="loginInput"
                autoComplete="username email"
                placeholder="Confirm email"
                type="email"
                id="confirmEmail"
                value={this.state.confirmEmailInputValue}
                onChange={this.confirmEmailValueChange} required/>
            </div>
            <div className="input-col">
              <input className="loginInput" autoComplete="current-password" placeholder="Enter password" type="password" id="signupPassword" value={this.state.passwordInputValue} onChange={this.passwordValueChange} required/>
            </div>
            <div className="input-col">
              <input className="loginInput" autoComplete="current-password" placeholder="Confirm password" type="password" id="confirmPassword" value={this.state.confirmPasswordInputValue} onChange={this.confirmPasswordValueChange} required/>
            </div>
            <div className="input-col">
              <input className="loginInput" placeholder="Enter display name" type="text" id="signupDisplayName" value={this.state.nameInputValue} onChange={this.nameValueChange} required/>
            </div>
            {this.state.errorText.length ? errorNode : ""}
            <div className="lt-row login-buttons-row">
              <button className="loginFormButton">Sign Up</button>
              <button className="loginFormButton" onClick={this.closeModal}>Cancel</button>
              <NavLink className="loginFormButton policyButton" to="/privacy" onClick={this.onPolicy}>
                Privacy Policy
              </NavLink>
            </div>
          </form>
        </div>
        {(this.state.confirmEmailError || this.state.confirmPasswordError) ? confirmErrorDisplay : ""}
      </Modal.Body>
    </Modal>
    )
  }
}

export default SignUpModalWindow;
