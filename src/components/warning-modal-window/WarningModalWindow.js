import React from 'react';
import './WarningModalWindow.css';
declare var $;

const WarningModalWindow = ({message, onProceed}) => {

  const doOnProceed = () => {
    onProceed();
    $("#modalWarning").modal('hide');
  };

  return (
    <div className="modal fade" id="modalWarning" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content mainContent">
          <div className="modal-header">
            <div className="title-row">
              <span className="title">Warning!</span>
            </div>
          </div>
          <div className="message-wrapper">
            <span className="alert-message">{message}</span>
          </div>
          <div className="buttons-wrapper">
            <button type="button" className="warning-button" data-dismiss="modal">Cancel</button>
            <button type="button" className="warning-button" onClick={doOnProceed}>Proceed</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModalWindow;
