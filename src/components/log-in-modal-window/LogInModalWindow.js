import React from 'react';
import './LogInModalWindow.css';
declare var $;

class LogInModalWindow extends React.Component {
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
              <form id="loginForm">
                <div className="inputField">
                  <input className="loginInput" autoComplete="username email" placeholder="Enter email" type="email" id="loginEmail" required></input>
                  <label htmlFor="loginEmail">Email address</label>
                </div>
                <div className="inputField">
                  <input className="loginInput" autoComplete="current-password" placeholder="Enter password" type="password" id="loginPassword" required></input>
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
