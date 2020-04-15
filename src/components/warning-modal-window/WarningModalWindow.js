import React from 'react';
import './WarningModalWindow.css';
import { Modal } from "react-bootstrap";

const WarningModalWindow = ({message, onProceed, show, hideWindow}) => {

  const doOnProceed = () => {
    onProceed();
    hideWindow();
  };

  return (
    <Modal show={show} onHide={hideWindow} dialogClassName={'warning-modal'}>
      <Modal.Body>
        <div className="lt-col">
          <div className="title-row">
            <span className="title">Warning!</span>
          </div>
          <div className="message-wrapper">
            <span className="alert-message">{message}</span>
          </div>
          <div className="warning-buttons-wrapper">
            <button type="button" className="warning-button" onClick={hideWindow}>Cancel</button>
            <button type="button" className="warning-button" onClick={doOnProceed}>Proceed</button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarningModalWindow;
