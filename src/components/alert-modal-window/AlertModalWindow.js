import React from 'react';
import './AlertModalWindow.css';

const AlertModalWindow = ({title, message}) => {
  return (
    <div className="modal fade" id="versionAlert" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modalBody">
            <p className="modalMessage">{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlertModalWindow;
