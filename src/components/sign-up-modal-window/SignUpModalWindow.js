import React from 'react';
import './SignUpModalWindow.css';
import fire from "../../Firebase";
import { Modal } from "react-bootstrap";
import Button from "../button/Button";
import Input from "../textarea/Input";

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

      const firstListId = `id${new Date().getTime()}`;
      const secondListId = `id${new Date().getTime()}1`;
      const firstSectionId = `id${new Date().getTime()}2`;
      const secondSectionId = `id${new Date().getTime()}3`;

      return fire.firestore().collection('users').doc(credential.user.uid).set({
        lists: [{
          id: firstListId,
          name: "Games I Love"
        },{
          id: secondListId,
          name: "My Wishlist"
        }],
        sections: [{
          id: firstSectionId,
          name: "No Section",
          listId: firstListId,
          type: 'hidden'
        },{
          id: secondSectionId,
          name: "No Section",
          listId: secondListId,
          type: 'hidden'
        }],
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
              <Input
                  additionalClass="auth-input"
                  autoComplete="username email"
                  placeholder='Enter Email'
                  type="email"
                  value={this.state.emailInputValue}
                  onChange={this.emailValueChange}
              />
            </div>
            <div className="input-col">
              <Input
                  additionalClass="auth-input"
                  autoComplete="username email"
                  placeholder='Confirm Email'
                  type="email"
                  value={this.state.confirmEmailInputValue}
                  onChange={this.confirmEmailValueChange}
              />
            </div>
            <div className="input-col">
              <Input
                  additionalClass="auth-input"
                  autoComplete="current-password"
                  placeholder='Enter Password'
                  type="password"
                  value={this.state.passwordInputValue}
                  onChange={this.passwordValueChange}
              />
            </div>
            <div className="input-col">
              <Input
                  additionalClass="auth-input"
                  autoComplete="current-password"
                  placeholder='Confirm Password'
                  type="password"
                  value={this.state.confirmPasswordInputValue}
                  onChange={this.confirmPasswordValueChange}
              />
            </div>
            <div className="input-col">
              <Input
                  additionalClass="auth-input"
                  placeholder='Enter Display Name'
                  type="text"
                  value={this.state.nameInputValue}
                  onChange={this.nameValueChange}
              />
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
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
    )
  }
}

export default SignUpModalWindow;
