import React from 'react';
import './LogInModalWindow.css';
import fire from "../../Firebase";
import { Modal } from "react-bootstrap";

class LogInModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInputValue: "",
      passwordInputValue: "",
      errorText: ""
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
    if (!this.state.emailInputValue || !this.state.passwordInputValue) {
      return;
    }
    fire.auth().signInWithEmailAndPassword(this.state.emailInputValue, this.state.passwordInputValue).then(credential => {
      this.setState({
        emailInputValue: "",
        passwordInputValue: ""
      });
      this.closeModal();
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
    const errorNode = (
        <span className="errorText">{this.state.errorText}</span>
    )

    return (
      <Modal show={this.props.show} onHide={this.closeModal} dialogClassName={'login-modal'}>
        <Modal.Body>
          <div className="lt-col">
            <span className="login-title">Log In</span>
            <form className="loginForm" onSubmit={this.loginUser}>
              <div className="lt-col input-col">
                <input className="loginInput" autoComplete="username email" placeholder="Enter email" type="email" id="loginEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required/>
              </div>
              <div className="lt-col input-col">
                <input className="loginInput" autoComplete="current-password" placeholder="Enter password" type="password" id="loginPassword"  value={this.state.passwordInputValue} onChange={this.passwordValueChange} required/>
              </div>
              {this.state.errorText.length ? errorNode : ""}
              <div className="lt-row login-buttons-row">
                <button className="loginFormButton">Log In</button>
                <button className="loginFormButton" onClick={this.closeModal}>Cancel</button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default LogInModalWindow;
