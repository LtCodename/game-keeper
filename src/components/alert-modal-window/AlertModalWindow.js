import React from 'react';
import './AlertModalWindow.css';

const AlertModalWindow = ({title, message}) => {
  const buttonsWrapper = (
      <div>
        <button type="button" className="close-button" data-dismiss="modal">Close</button>
      </div>
  );

  const messageWrapper = (
      <div className="message-wrapper">
        <span className="alert-message">{message}</span>
      </div>
  );

  return (
    <div className="modal fade" id="versionAlert" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div className="title-row">
              <span className="title">{title}</span>
            </div>
          </div>
          {message.length ? messageWrapper : ''}
          <div className={"buttons-wrapper"}>
            {buttonsWrapper}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModalWindow;
