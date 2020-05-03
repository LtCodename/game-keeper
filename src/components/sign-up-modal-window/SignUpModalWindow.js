import React from 'react';
import './SignUpModalWindow.css';
import { NavLink } from 'react-router-dom';
import fire from "../../Firebase";
import { Modal } from "react-bootstrap";
import Button from "../button/Button";

class SignUpModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInputValue: "",
      confirmEmailInputValue: "",
      passwordInputValue: "",
      confirmPasswordInputValue: "",
      nameInputValue: "",
      errorText: "",
      showErrorNode: false,
      signButtonDisabled: false
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
      signButtonDisabled: true,
      showErrorNode: false,
      errorText: ""
    });

    if (this.state.emailInputValue !== this.state.confirmEmailInputValue) {
      this.setState({
        showErrorNode: true,
        errorText: 'Email addresses are not identical!',
        signButtonDisabled: false
      });
      return;
    }

    if (this.state.passwordInputValue !== this.state.confirmPasswordInputValue) {
      this.setState({
        showErrorNode: true,
        errorText: 'Passwords are not identical!',
        signButtonDisabled: false
      });
      return;
    }

    if (!this.state.emailInputValue) {
      this.setState({
        signButtonDisabled: false,
        showErrorNode: true,
        errorText: 'Please enter valid Email address!',
      });
      return;
    }

    if (!this.state.passwordInputValue) {
      this.setState({
        signButtonDisabled: false,
        showErrorNode: true,
        errorText: 'Please enter valid password!',
      });
      return;
    }

    if (!this.state.nameInputValue) {
      this.setState({
        showErrorNode: true,
        errorText: 'Please enter your display name!',
        signButtonDisabled: false
      });
      return;
    }

    fire.auth().createUserWithEmailAndPassword(this.state.emailInputValue, this.state.passwordInputValue).then(credential => {
      credential.user.updateProfile({
        displayName: this.state.nameInputValue
      });

      return fire.firestore().collection('users').doc(credential.user.uid).set({
        lists: [{
          id: `id${new Date().getTime()}`,
          name: "Games I Love"
        },{
          id: `id${new Date().getTime()}1`,
          name: "My Wishlist"
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
          nameInputValue: "",
          signButtonDisabled: false,
          showErrorNode: false,
          errorText: ''
        });
        this.props.hideWindow();
    }).catch(error => {
      this.setState({
        errorText: error.message,
        showErrorNode: true,
        signButtonDisabled: false
      });
    });
  };

  closeModal = () => {
    this.setState({
      showErrorNode: false,
      errorText: ""
    });
    this.props.hideWindow();
  }

  render() {
    const errorNode = (
        <span className="error-text">{this.state.errorText}</span>
    )

    return (
    <Modal show={this.props.show} onHide={this.closeModal} dialogClassName={'login-modal'}>
      <Modal.Body>
        <div className="lt-col">
          <span className="login-title">Sign Up</span>
          <form>
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
            {this.state.showErrorNode ? errorNode : ""}
            <div className="lt-row signUp-buttons-row">
              <Button
                  disabled={this.state.signButtonDisabled}
                  buttonAction={this.createUser}
                  text={'Sign Up'}
                  margin={'right'}
              />
              <Button
                  buttonAction={this.closeModal}
                  text={'Cancel'}
                  margin={'right'}
              />
              <NavLink to="/privacy" className="policy-button">
                <Button text={'Privacy Policy'} onClick={this.onPolicy}/>
              </NavLink>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
    )
  }
}

export default SignUpModalWindow;
