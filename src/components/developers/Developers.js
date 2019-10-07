import React from 'react';
import './Developers.css';
import { connect } from 'react-redux'
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import EditNameModalWindow from '../edit-name-modal-window/EditNameModalWindow.js';
declare var firebase;
declare var $;

class Developers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idToDelete: "",
      idToEdit: "",
      oldName: "",
      showWarningWindow: false,
      showEditWindow: false
    };
  }

  deleteItem = () => {
    firebase.firestore().collection('developers').doc(this.state.idToDelete).delete();
    this.setState({
      idToDelete: ""
    });
  }

  onDeleteItem = (id) => {
    this.setState({
      idToDelete: id
    },() => {
        this.openModalWarningWindow();
      }
    );
  }

  editItem = (newName, id) => {
    firebase.firestore().collection('developers').doc(id).update({
      name: newName
    }).then(() => {
      this.resetState();
    }).catch(error => {
      console.log(error.message);
    });
  }

  onEditItem = (id, oldName) => {
    this.setState({
      idToEdit: id,
      oldName: oldName
    },() => {
        this.openEditWindow();
      }
    );
  }

  openEditWindow() {
    this.setState({
      showEditWindow: true
    }, () => {
      $("#editNameWindow").modal('show');
      $("#editNameWindow").on('hidden.bs.modal', this.resetState);
    });
  }

  openModalWarningWindow = () => {
    this.setState({
      showWarningWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  }

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
    $("#editNameWindow").unbind('hidden.bs.modal');
  }

  resetState = () => {
    this.setState({
      showWarningWindow: false,
      showEditWindow: false,
      idToEdit: "",
      oldName: "",
      idToDelete: ""
    });
  }

  render() {
    const developersToRender = this.props.developers.map((elem, index) => {
      return (
        <div className="developersBlock" key={elem.id} value={elem.id}>
          {elem.name}
          <button className="btn actionButton" onClick={() => this.onDeleteItem(elem.id)}>
            <img className="deleteIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-delete-developer.svg'}></img>
          </button>
          <button className="btn actionButton">
            <img className="deleteIcon" onClick={() => this.onEditItem(elem.id, elem.name)} alt="" src={process.env.PUBLIC_URL + '/icons/action-edit-developer.svg'}></img>
          </button>
        </div>
      );
    });

    const modalWarningWindow = (
      <WarningModalWindow
        onProceed={this.deleteItem}
        message={`Are you sure you want to delete this item?`} />
    );

    const modalEditWindow = (
      <EditNameModalWindow
        onProceed={(newName) => this.editItem(newName, this.state.idToEdit)} oldName={this.state.oldName} />
    );

    return (
      <div className="developersWrapper">
        <p className="developersWrapperP">Edit or delete developers from database. Items are sorted alphabetically.</p>
        <div className="blocksWrapper">
          {developersToRender}
        </div>

        {this.state.showWarningWindow ? modalWarningWindow : ""}
        {this.state.showEditWindow ? modalEditWindow : ""}
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    developers: state.developers
  }
};

const DevelopersConnected = connect(stateToProps, null)(Developers);

export default DevelopersConnected;
