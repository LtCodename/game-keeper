import React from 'react';
import './AddListModalWindow.css';
import { connect } from 'react-redux'
declare var $;
declare var firebase;

class AddListModalWindow extends React.Component {

  constructor(props) {
    super(props);

    this.onProceed = this.onProceed.bind(this);
    this.nameInputValueChange = this.nameInputValueChange.bind(this);

    this.state = {
      warningMode: false,
      nameInputValue: ``
    };
  }

  nameInputValueChange(event) {
    this.setState({
      nameInputValue: event.target.value,
      warningMode: false
    });
  }

  onProceed() {
    if (this.state.nameInputValue === ``) {
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
      <textarea placeholder="Enter List Name" className="form-control" id="listName" rows="1" value={this.state.nameInputValue} onChange={this.nameInputValueChange}></textarea>
    );

    const buttonsWrapper = (
      <div className="buttonsWrapper">
        <button type="button" className="editListModalWindowButton btn btn-warning" data-dismiss="modal">Cancel</button>
        <button type="button" className="editListModalWindowButton btn btn-success" onClick={this.onProceed}>Proceed</button>
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
              {listName}
            </div>
            {(this.state.warningMode) ? warning : ""}
            <div className="modal-footer">
              {buttonsWrapper}
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
