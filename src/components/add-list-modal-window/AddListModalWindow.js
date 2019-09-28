import React from 'react';
import './AddListModalWindow.css';
import reducers from '../../redux/reducers';
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
      nameInputValue: `Click here to pass a new list name`
    };
  }

  doOnCancel() {
    this.setState({
      nameEditMode: false,
      nameInputValue: `Click here to pass a new list name`
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
    if (this.state.nameInputValue === `Click here to pass a new list name`) {
      return;
    }

    const newList = {
      id: `id${new Date().getTime()}`,
      name: this.state.nameInputValue
    }

    const allLists = [...this.props.userLists, newList];

    firebase.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: allLists
    }).then((data) => {
    }).catch(error => {
      console.log(error.message);
    });

    $("#addListWindow").modal('hide');
  }

  render() {

    const listName = (
      <h5 className="modal-title" onClick={this.changeListName}>{(this.state.nameInputValue) ? this.state.nameInputValue : `Click here to pass a new list name`}</h5>
    );

    const listNameEdit = (
      <div>
        <input className="form-control enterNewName" type="text" placeholder="Enter new name" value={this.state.nameInputValue} onChange={this.nameInputValueChange}></input>
        <button className="btn btn-dark" onClick={this.doOnNameChange}>OK</button>
        <button className="btn" onClick={this.doOnCancel}>Cancel</button>
      </div>
    );

    return (
      <div className="modal fade" id="addListWindow" tabIndex="-1" role="dialog">
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

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists,
    userData: state.userData
  }
};

const AddListModalWindowConnected = connect(stateToProps, null)(AddListModalWindow);

export default AddListModalWindowConnected;
