import React from 'react';
import './AddListModalWindow.css';
import { connect } from 'react-redux'
import fire from "../../Firebase";
import { Modal } from 'react-bootstrap';

class AddListModalWindow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      warningMode: false,
      nameInputValue: ``
    };
  }

  nameInputValueChange = (event) => {
    this.setState({
      nameInputValue: event.target.value,
      warningMode: false
    });
  };

  closeModal = () => {
    this.props.hideWindow();
  }

  onProceed = () => {
    if (this.state.nameInputValue === ``) {
      this.setState({
        warningMode: true
      });
      return;
    }

    const newList = {
      id: `id${new Date().getTime()}`,
      name: this.state.nameInputValue
    };

    const copy = [...this.props.userLists, newList];

    fire.firestore().collection('users').doc(this.props.userData.uid).update({
      lists: copy
    }).then((data) => {
      this.props.hideWindow();
    }).catch(error => {
      console.log(error.message);
    });
  };

  render() {
    const listName = (
      <textarea placeholder="Enter List Name" className="addListTextarea" id="listName" rows="1" value={this.state.nameInputValue} onChange={this.nameInputValueChange}/>
    );

    const buttonsWrapper = (
      <div>
        <button type="button" className="addListButton" onClick={this.closeModal}>Cancel</button>
        <button type="button" className="addListButton" onClick={this.onProceed}>Proceed</button>
      </div>
    );

    const warning = (
      <div className="warningWrapper">
        <span className="warning">You have to enter new name to proceed!</span>
      </div>
    );

    return (
      <Modal show={this.props.show} onHide={this.closeModal} dialogClassName={'add-list-modal'}>
        <Modal.Header className="add-list-header">
          <div className={"name-wrapper"}>
            {listName}
          </div>
        </Modal.Header>
        <Modal.Body>
          {(this.state.warningMode) ? warning : ""}
          <div className={"buttons-wrapper"}>
            {buttonsWrapper}
          </div>
        </Modal.Body>
      </Modal>
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
