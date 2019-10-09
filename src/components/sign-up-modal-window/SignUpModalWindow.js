import React from 'react';
import './SignUpModalWindow.css';
import { NavLink } from 'react-router-dom';
declare var $;
declare var firebase;

class SignUpModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInputValue: "",
      passwordInputValue: "",
      nameInputValue: "",
      errorText: ""
    };
  }

  onPolicy = () => {
      $("#signUpWindow").modal('hide');
  }

  componentWillUnmount() {
    $("#signUpWindow").unbind('hidden.bs.modal');
  }

  resetState = () => {
    this.setState({
      showSignUpWindow: false,
      showLogInWindow: false
    })
  }

  nameValueChange = (event) => {
    this.setState({
      nameInputValue: event.target.value
    });
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

  createUser = (event) => {
    event.preventDefault();
    if (!this.state.emailInputValue || !this.state.passwordInputValue) {
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.emailInputValue, this.state.passwordInputValue).then(credential => {
      credential.user.updateProfile({
        displayName: this.state.nameInputValue
      });

      return firebase.firestore().collection('users').doc(credential.user.uid).set({
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
          passwordInputValue: "",
          nameInputValue: ""
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
    return (
      <div className="modal fade" id="signUpWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
            </div>
            <div className="modalBody">
              <form id="signupForm" onSubmit={this.createUser}>
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="signupEmail">Email address*</label>
                  <input className="form-control signupInput" autoComplete="username email" placeholder="Enter email" type="email" id="signupEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required></input>
                </div>
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="signupPassword">Choose password*</label>
                  <input className="form-control signupInput" autoComplete="current-password" placeholder="Enter password" type="password" id="signupPassword" value={this.state.passwordInputValue} onChange={this.passwordValueChange} required></input>
                </div>
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="signupDisplayName">Display Name*</label>
                  <input className="form-control signupInput" placeholder="Enter name" type="text" id="signupDisplayName" value={this.state.nameInputValue} onChange={this.nameValueChange} required></input>
                </div>
                <button className="btn signupFormButton btn-warning">Sign Up</button>
                <button className="btn signupFormButton btn-danger" data-dismiss="modal">Cancel</button>
              </form>
              <p className="requiredText">Fields marked with * are required.</p>
              <NavLink to="/privacy"><button className="btn policyButton" onClick={this.onPolicy}>Privacy Policy</button></NavLink>
              <p className="errorText">{this.state.errorText}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpModalWindow;
