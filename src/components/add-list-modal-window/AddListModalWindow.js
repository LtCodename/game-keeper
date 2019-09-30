import React from 'react';
import './AddListModalWindow.css';
import { connect } from 'react-redux'
declare var $;
declare var firebase;

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
      warningMode: false,
      nameInputValue: `Click here`
    };
  }

  doOnCancel() {
    this.setState({
      nameEditMode: false,
      nameInputValue: `Click here`
    });
  }

  doOnNameChange() {
    this.setState({
      nameEditMode: false
    });
  }

  nameInputValueChange(event) {
    this.setState({
      nameInputValue: event.target.value,
      warningMode: false
    });
  }

  changeListName() {
    this.setState({
      nameEditMode: true
    });
  }

  onProceed() {
    if (this.state.nameInputValue === `Click here`) {
      this.setState({
        warningMode: true
      });
      return;
    }

    const newList = {
      id: `id${new Date().getTime()}`,
      name: this.state.nameInputValue
    }

    const copy = [...this.props.userLists, newList];

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: copy
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });

    $("#addListWindow").modal('hide');
  }

  render() {

    const listName = (
      <h5 className="modal-title" onClick={this.changeListName}>{(this.state.nameInputValue) ? this.state.nameInputValue : `Click here`}</h5>
    );

    const listNameEdit = (
      <div className="listNameEditWrapper">
        <input className="form-control enterNewName" type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameInputValueChange}></input>
        <div className="editButtonsWrapper">
          <button className="btn btn-warning" onClick={this.doOnCancel}>Cancel</button>
          <button className="btn btn-success" onClick={this.doOnNameChange}>Accept</button>
        </div>
      </div>
    );

    const buttonsWrapper = (
      <div className="buttonsWrapper">
        <button type="button" className="btn btn-warning" data-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-success" onClick={this.onProceed}>Proceed</button>
      </div>
    );

    const warning = (
      <div className="warningWrapper">
        <p className="warning">You have to enter new name to proceed!</p>
      </div>
    );

    return (
      <div className="modal fade" id="addListWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {/*list title*/}
              {(this.state.nameEditMode) ? listNameEdit : listName}
            </div>
            {(this.state.warningMode) ? warning : ""}
            <div className="modal-footer">
              {(!this.state.nameEditMode) ? buttonsWrapper : ""}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists,
    userData: state.userData
  }
};

const AddListModalWindowConnected = connect(stateToProps, null)(AddListModalWindow);

export default AddListModalWindowConnected;
