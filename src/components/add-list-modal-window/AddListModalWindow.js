import React from 'react';
import './AddListModalWindow.css';
declare var $;

class AddListModalWindow extends React.Component {

  constructor(props) {
    super(props);

    this.onProceed = this.onProceed.bind(this);
    this.changeListName = this.changeListName.bind(this);
    this.nameInputValueChange = this.nameInputValueChange.bind(this);
    this.doOnNameChange = this.doOnNameChange.bind(this);
    this.doOnCancel = this.doOnCancel.bind(this);

    this.state = {
      nameEditMode: false,
      nameInputValue: this.props.message
    };
  }

  doOnCancel() {
    this.setState({
      nameEditMode: false,
      nameInputValue: this.props.message
    });
  }

  doOnNameChange() {
    this.setState({
      nameEditMode: false
    });
  }

  nameInputValueChange(event) {
    this.setState({
      nameInputValue: event.target.value
    });
  }

  changeListName() {
    this.setState({
      nameEditMode: true
    });
  }

  onProceed() {
    if (this.state.nameInputValue === this.props.message) {
      return;
    }

    this.props.onProceed(this.state.nameInputValue);
    $("#" + this.props.modalId).modal('hide');
  }

  render() {

    const listName = (
      <h5 className="modal-title" onClick={this.changeListName}>{(this.state.nameInputValue) ? this.state.nameInputValue : this.props.message}</h5>
    );

    const listNameEdit = (
      <div>
        <input className="form-control enterNewName" type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnNameChange}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    return (
      <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {/*list title*/}
              {(this.state.nameEditMode) ? listNameEdit : listName}
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

export default AddListModalWindow;
