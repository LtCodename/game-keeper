import React from 'react';
import './AlertModalWindow.css';
declare var $;

class AlertModalWindow extends React.Component {
  render() {
    return (
      <div className="modal fade" id="versionAlert" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.title}</h5>
            </div>
            <div className="modalBody">
              <p className="modalMessage">{this.props.message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AlertModalWindow;
