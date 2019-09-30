import React from 'react';
import './SignUpModalWindow.css';
declare var $;
declare var firebase;

class SignUpModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.emailValueChange = this.emailValueChange.bind(this);
    this.nameValueChange = this.nameValueChange.bind(this);
    this.passwordValueChange = this.passwordValueChange.bind(this);
    this.createUser = this.createUser.bind(this);

    this.state = {
      emailInputValue: "",
      passwordInputValue: "",
      nameInputValue: "",
      errorText: ""
    };
  }

  nameValueChange(event) {
    this.setState({
      nameInputValue: event.target.value
    });
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
      credential.user.updateProfile({
        displayName: this.state.nameInputValue
      });

      return firebase.firestore().collection('users').doc(credential.user.uid).set({
        lists: [{
          id: `id${new Date().getTime()}`,
          name: "New List"
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
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modalBody">
              <form id="signupForm" onSubmit={this.createUser}>
                <div className="inputField">
                  <input className="signupInput" autoComplete="username email" placeholder="Enter email" type="email" id="signupEmail" value={this.state.emailInputValue} onChange={this.emailValueChange} required></input>
                  <label htmlFor="signupEmail">Email address*</label>
                </div>
                <div className="inputField">
                  <input className="signupInput" autoComplete="current-password" placeholder="Enter password" type="password" id="signupPassword" value={this.state.passwordInputValue} onChange={this.passwordValueChange} required></input>
                  <label htmlFor="signupPassword">Choose password*</label>
                </div>
                <div className="inputField">
                  <input className="signupInput" placeholder="Enter name" type="text" id="signupDisplayName" value={this.state.nameInputValue} onChange={this.nameValueChange} required></input>
                  <label htmlFor="signupDisplayName">Display Name*</label>
                </div>
                <button className="btn signupButton btn-warning">Sign Up</button>
                <button type="button" className="btn cancelButton btn-danger" data-dismiss="modal">Cancel</button>
              </form>
              <p className="requiredText">Fields marked with * are required.</p>
              <p className="errorText">{this.state.errorText}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpModalWindow;
