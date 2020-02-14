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
            <h5 className="modal-title">Warning!</h5>
          </div>
          <div className="messageWrapper">
            <p className="message">{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-success" onClick={doOnProceed}>Proceed</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WarningModalWindow;
