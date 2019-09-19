import React from 'react';
import './ProfileModalWindow.css';
import { connect } from 'react-redux'
declare var $;

class ProfileModalWindow extends React.Component {
  render() {
    return (
      <div className="modal fade" id="profileWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Profile</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="accountDetails">
              <p className="accountDetails-p">My Email is  {this.props.userData.email}</p>
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

const stateToProps = (state = {}) => {
  return {
    userData: state.userData
  }
};

const ProfileModalWindowConnected = connect(stateToProps, null)(ProfileModalWindow);

export default ProfileModalWindowConnected;
