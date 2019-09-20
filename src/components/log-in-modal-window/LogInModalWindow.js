import React from 'react';
import './LogInModalWindow.css';
declare var $;
declare var firebase;

class LogInModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.emailValueChange = this.emailValueChange.bind(this);
    this.passwordValueChange = this.passwordValueChange.bind(this);
    this.loginUser = this.loginUser.bind(this);

    this.state = {
      emailInputValue: "",
      passwordInputValue: ""
    };
  }

  passwordValueChange(event) {
    this.setState({
      passwordInputValue: event.target.value
    });
  }

  emailValueChange(event) {
    this.setState({
      emailInputValue: event.target.value
    });
  }

  loginUser(event) {
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
    });
  }

  render() {
    return (
      <div className="modal fade" id="logInWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Log In</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modalBody">
              <form id="loginForm" onSubmit={this.loginUser}>
                <div className="inputField">
                  <input className="loginInput" autoComplete="username email" placeholder="Enter email" type="email" id="loginEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required></input>
                  <label htmlFor="loginEmail">Email address</label>
                </div>
                <div className="inputField">
                  <input className="loginInput" autoComplete="current-password" placeholder="Enter password" type="password" id="loginPassword"  value={this.state.passwordInputValue} onChange={this.passwordValueChange} required></input>
                  <label htmlFor="loginPassword">Your password</label>
                </div>
                <button className="btn loginButton">Log In</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-dismiss="modal">OK</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogInModalWindow;