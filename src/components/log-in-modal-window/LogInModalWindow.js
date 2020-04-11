import React from 'react';
import './LogInModalWindow.css';
import fire from "../../Firebase";

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
      this.props.close();
    }).catch(error => {
      console.log(error.message);
      this.setState({
        errorText: error.message
      });
    });
  };

  render() {
    const errorNode = (
        <span className="errorText">{this.state.errorText}</span>
    )

    return (
      <div className="modal fade" id="logInWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modalBody">
              <div className="lt-col">
                <span className="login-title">Log In</span>
                <form className="loginForm" onSubmit={this.loginUser}>
                  <div className="lt-col input-col">
                    {/*<label className="loginLabel" htmlFor="loginEmail">Your Email address</label>*/}
                    <input className="loginInput" autoComplete="username email" placeholder="Enter email" type="email" id="loginEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required/>
                  </div>
                  <div className="lt-col input-col">
                    {/*<label className="loginLabel" htmlFor="loginPassword">Your password</label>*/}
                    <input className="loginInput" autoComplete="current-password" placeholder="Enter password" type="password" id="loginPassword"  value={this.state.passwordInputValue} onChange={this.passwordValueChange} required/>
                  </div>
                  {this.state.errorText.length ? errorNode : ""}
                  <div className="lt-row login-buttons-row">
                    <button className="loginFormButton">Log In</button>
                    <button className="loginFormButton" data-dismiss="modal">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LogInModalWindow;
