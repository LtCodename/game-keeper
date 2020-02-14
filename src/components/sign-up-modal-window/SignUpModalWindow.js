import React from 'react';
import './SignUpModalWindow.css';
import { NavLink } from 'react-router-dom';
import fire from "../../Firebase";
declare var $;

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

  onPolicy = () => {
      $("#signUpWindow").modal('hide');
  };

  componentWillUnmount() {
    $("#signUpWindow").unbind('hidden.bs.modal');
  }

  resetState = () => {
    this.setState({
      showSignUpWindow: false,
      showLogInWindow: false
    })
  };

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
        this.props.close();
    }).catch(error => {
      console.log(error.message);
      this.setState({
        errorText: error.message + "."
      });
    });
  };

  render() {
    const confirmErrorDisplay = (
      <p className="signupErrorText">{this.state.confirmErrorMessage}</p>
    );

    return (
      <div className="modal fade" id="signUpWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Sign Up</h5>
            </div>
            <div className="modalBody">
              <form id="signupForm" onSubmit={this.createUser}>
                {/* ENTER EMAIL */}
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="signupEmail">Email address*</label>
                  <input className="form-control signupInput" autoComplete="username email" placeholder="Enter email" type="email" id="signupEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required/>
                </div>
                {/* CONFIRM EMAIL */}
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="confirmEmail">Confirm Email*</label>
                  <input className="form-control signupInput" autoComplete="username email" placeholder="Confirm email" type="email" id="confirmEmail" value={this.state.confirmEmailInputValue} onChange={this.confirmEmailValueChange} required/>
                </div>
                {/* ENTER PASSWORD */}
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="signupPassword">Choose password*</label>
                  <input className="form-control signupInput" autoComplete="current-password" placeholder="Enter password" type="password" id="signupPassword" value={this.state.passwordInputValue} onChange={this.passwordValueChange} required/>
                </div>
                {/* CONFIRM PASSWORD */}
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="confirmPassword">Confirm password*</label>
                  <input className="form-control signupInput" autoComplete="current-password" placeholder="Confirm password" type="password" id="confirmPassword" value={this.state.confirmPasswordInputValue} onChange={this.confirmPasswordValueChange} required/>
                </div>
                {/* ENTER DISPLAY NAME */}
                <div className="inputField">
                  <label className="signUpLabel" htmlFor="signupDisplayName">Display Name*</label>
                  <input className="form-control signupInput" placeholder="Enter name" type="text" id="signupDisplayName" value={this.state.nameInputValue} onChange={this.nameValueChange} required/>
                </div>
                <button className="btn signupFormButton btn-warning">Sign Up</button>
                <button className="btn signupFormButton btn-danger" data-dismiss="modal">Cancel</button>
              </form>
              <p className="requiredText">Fields marked with * are required.</p>
              <NavLink to="/privacy"><button className="btn policyButton" onClick={this.onPolicy}>Privacy Policy</button></NavLink>
              <p className="signupErrorText">{this.state.errorText}</p>
              {(this.state.confirmEmailError || this.state.confirmPasswordError) ? confirmErrorDisplay : ""}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpModalWindow;
