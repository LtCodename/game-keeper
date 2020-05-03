import React from 'react';
import './LogInModalWindow.css';
import fire from "../../Firebase";
import { Modal } from "react-bootstrap";
import Button from "../button/Button";

class LogInModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInputValue: "",
      passwordInputValue: "",
      errorText: "",
      loginButtonDisabled: false
    };
  }

  passwordValueChange = (event) => {
    this.setState({
      passwordInputValue: event.target.value
    });
  };

  emailValueChange = (event) => {
    this.setState({
      emailInputValue: event.target.value
    });
  };

  loginUser = (event) => {
    event.preventDefault();

    this.setState({
      loginButtonDisabled: true
    });

    if (!this.state.emailInputValue) {
      this.setState({
        loginButtonDisabled: false,
        errorText: "Please enter your Email!"
      });
      return;
    }

    if (!this.state.passwordInputValue) {
      this.setState({
        loginButtonDisabled: false,
        errorText: "Please enter your password!"
      });
      return;
    }

    fire.auth().signInWithEmailAndPassword(this.state.emailInputValue, this.state.passwordInputValue).then(() => {
      this.setState({
        emailInputValue: "",
        passwordInputValue: "",
        loginButtonDisabled: false
      });
      this.closeModal();
    }).catch(error => {
      console.log(error.message);
      this.setState({
        errorText: error.message,
        loginButtonDisabled: false
      });
    });
  };

  closeModal = () => {
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
            <span className="login-title">Log In</span>
            <form className="loginForm">
              <div className="lt-col input-col">
                <input className="loginInput" autoComplete="username email" placeholder="Enter email" type="email" id="loginEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required/>
              </div>
              <div className="lt-col input-col">
                <input className="loginInput" autoComplete="current-password" placeholder="Enter password" type="password" id="loginPassword"  value={this.state.passwordInputValue} onChange={this.passwordValueChange} required/>
              </div>
              {this.state.errorText.length ? errorNode : ""}
              <div className="lt-row login-buttons-row">
                <Button
                    disabled={this.state.loginButtonDisabled}
                    buttonAction={this.loginUser}
                    text={'Login'}
                    margin={'right'}
                />
                <Button
                    buttonAction={this.closeModal}
                    text={'Cancel'}
                />
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default LogInModalWindow;
