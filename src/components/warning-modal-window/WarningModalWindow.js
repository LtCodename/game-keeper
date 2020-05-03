import React, {useState} from 'react';
import './WarningModalWindow.css';
import { Modal } from "react-bootstrap";
import Button from "../button/Button";

const WarningModalWindow = ({message, onProceed, show, hideWindow}) => {

  const [proceedButtonDisabled, setProceedButtonDisabled] = useState(false);

  const doOnProceed = () => {
    setProceedButtonDisabled(true);
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
            <Button
                buttonAction={hideWindow}
                text={'Cancel'}
                margin={'right'}
            />
            <Button
                disabled={proceedButtonDisabled}
                buttonAction={doOnProceed}
                text={'Proceed'}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WarningModalWindow;
