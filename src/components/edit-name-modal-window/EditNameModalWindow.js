import React from 'react';
import './EditNameModalWindow.css';
declare var $;

class EditNameModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nameEditMode: false,
      nameInputValue: this.props.oldName
    };
  }

  doOnCancel = () => {
    this.setState({
      nameEditMode: false,
      nameInputValue: this.props.oldName
    });
  }

  doOnNameChange = () => {
    this.setState({
      nameEditMode: false
    });
  }

  nameInputValueChange = (event) => {
    this.setState({
      nameInputValue: event.target.value
    });
  }

  changeDeveloperName = () => {
    this.setState({
      nameEditMode: true
    });
  }

  onProceed = () => {
    if (this.state.nameInputValue === this.props.oldName) {
      return;
    }

    this.props.onProceed(this.state.nameInputValue);
    $("#editNameWindow").modal('hide');
  }

  render() {

    const developerName = (
      <h5 className="modal-title" onClick={this.changeDeveloperName}>{(this.state.nameInputValue) ? this.state.nameInputValue : this.props.oldName}</h5>
    );

    const listNameEdit = (
      <div>
        <input className="form-control enterNewName" type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameInputValueChange}></input>
        <button className="btn btn-success" onClick={this.doOnNameChange}>OK</button>
        <button className="btn btn-warning" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    return (
      <div className="modal fade" id="editNameWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {/*list title*/}
              {(this.state.nameEditMode) ? listNameEdit : developerName}
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

export default EditNameModalWindow;
