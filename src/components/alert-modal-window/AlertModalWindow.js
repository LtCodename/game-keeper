import React from 'react';
import './AlertModalWindow.css';
import { Modal } from "react-bootstrap";

const AlertModalWindow = ({title, message, show, hideWindow}) => {
  const buttonsWrapper = (
      <div>
        <button type="button" className="close-button" onClick={hideWindow}>Close</button>
      </div>
  );

  const messageWrapper = (
      <div className="message-wrapper">
        <span className="alert-message">{message}</span>
      </div>
  );

  return (
      <Modal show={show} onHide={hideWindow} dialogClassName={'alert-modal'}>
          <Modal.Body>
              <div className="lt-col">
                  <div className="title-row">
                      <span className="title">{title}</span>
                  </div>
                  {message.length ? messageWrapper : ''}
                  <div className="alert-buttons-wrapper">
                      {buttonsWrapper}
                  </div>
              </div>
          </Modal.Body>
      </Modal>
  );
};

export default AlertModalWindow;
