import React from 'react';
import './LogInModalWindow.css';
declare var firebase;

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
  }

  emailValueChange = (event) => {
    this.setState({
      emailInputValue: event.target.value
    });
  }

  loginUser = (event) => {
    event.preventDefault();
    if (!this.state.emailInputValue || !this.state.passwordInputValue) {
      return;
    }
    firebase.auth().signInWithEmailAndPassword(this.state.emailInputValue, this.state.passwordInputValue).then(credential => {
      this.setState({
        emailInputValue: "",
        passwordInputValue: ""
      });
      this.props.close();
    }).catch(error => {
      console.log(error.message);
      this.setState({
        errorText: error.message
      });
    });
  }

  render() {
    return (
      <div className="modal fade" id="logInWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log In</h5>
            </div>
            <div className="modalBody">
              <form id="loginForm" onSubmit={this.loginUser}>
                <div className="inputField">
                  <label className="loginLabel" htmlFor="loginEmail">Your Email address</label>
                  <input className="form-control loginInput" autoComplete="username email" placeholder="Enter email" type="email" id="loginEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required></input>
                </div>
                <div className="inputField">
                  <label className="loginLabel" htmlFor="loginPassword">Your password</label>
                  <input className="form-control loginInput" autoComplete="current-password" placeholder="Enter password" type="password" id="loginPassword"  value={this.state.passwordInputValue} onChange={this.passwordValueChange} required></input>
                </div>
                <button className="btn loginFormButton btn-warning">Log In</button>
                <button className="btn loginFormButton btn-danger" data-dismiss="modal">Cancel</button>
              </form>
              <p className="errorText">{this.state.errorText}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogInModalWindow;
