import React from 'react';
import './AddListModalWindow.css';
import { connect } from 'react-redux'
import fire from "../../Firebase";
declare var $;

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
    }).catch(error => {
      console.log(error.message);
    });

    $("#addListWindow").modal('hide');
  };

  render() {

    const listName = (
      <textarea placeholder="Enter List Name" className="addListTextarea" id="listName" rows="1" value={this.state.nameInputValue} onChange={this.nameInputValueChange}/>
    );

    const buttonsWrapper = (
      <div className="buttonsWrapper">
        <button type="button" className="addListButton" data-dismiss="modal">Cancel</button>
        <button type="button" className="addListButton" onClick={this.onProceed}>Proceed</button>
      </div>
    );

    const warning = (
      <div className="warningWrapper">
        <span className="warning">You have to enter new name to proceed!</span>
      </div>
    );

    return (
      <div className="modal fade" id="addListWindow" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div className={"name-wrapper"}>
                {/*list title*/}
                {listName}
              </div>
            </div>
            {(this.state.warningMode) ? warning : ""}
            <div className={"buttons-wrapper"}>
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
