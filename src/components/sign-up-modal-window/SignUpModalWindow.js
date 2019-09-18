import React from 'react';
import './SignUpModalWindow.css';
declare var $;
declare var firebase;

class SignUpModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.emailValueChange = this.emailValueChange.bind(this);
    this.passwordValueChange = this.passwordValueChange.bind(this);
    this.createUser = this.createUser.bind(this);

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

  createUser(event) {
    event.preventDefault();
    if (!this.state.emailInputValue || !this.state.passwordInputValue) {
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(this.state.emailInputValue, this.state.passwordInputValue).then(credential => {
      console.log(credential.user);
      this.setState({
        emailInputValue: "",
        passwordInputValue: ""
      });
      this.props.close();
    })
  }

  render() {
    return (
      <div className="modal fade" id="signUpWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modalBody">
              <form id="signupForm" onSubmit={this.createUser}>
                <div className="inputField">
                  <input className="signupInput" autoComplete="username email" placeholder="Enter email" type="email" id="signupEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required></input>
                  <label htmlFor="signupEmail">Email address</label>
                </div>
                <div className="inputField">
                  <input className="signupInput" autoComplete="current-password" placeholder="Enter password" type="password" id="signupPassword" value={this.state.passwordInputValue} onChange={this.passwordValueChange} required></input>
                  <label htmlFor="signupPassword">Choose password</label>
                </div>
                <button className="btn signupButton">Sign Up</button>
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

export default SignUpModalWindow;
