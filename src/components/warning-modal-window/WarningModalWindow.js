import React from 'react';
import './WarningModalWindow.css';
declare var $;

class WarningModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.onProceed = this.onProceed.bind(this);
  }

  onProceed() {
    this.props.onProceed();
    $("#modalWarning").modal('hide');
  }

  render() {
    return (
      <div className="modal fade" id="modalWarning" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content mainContent">
            <div className="modal-header">
              <h5 className="modal-title">Warning!</h5>
            </div>
            <div className="messageWrapper">
              <p className="message">{this.props.message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-success" onClick={this.onProceed}>Proceed</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WarningModalWindow;
