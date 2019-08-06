import React from 'react';
import './WarningModalWindow.css';
declare var  $;

class WarningModalWindow extends React.Component {

  constructor(props) {
    super(props);

    this.onProceed = this.onProceed.bind(this);
  }

  onProceed() {
    this.props.onProceed();
    $("#" + this.props.modalId).modal('hide');
  }

  render() {
    return (
      <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.message}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-dark" onClick={this.onProceed}>Proceed</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WarningModalWindow;
