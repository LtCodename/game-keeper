import React from 'react';
import './Suggested.css';
import { connect } from 'react-redux'
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
import EditNameModalWindow from '../edit-name-modal-window/EditNameModalWindow.js';
import fire from "../../Firebase";
declare var $;

class Suggested extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      idToDelete: "",
      nameToAdd: "",
      idToEdit: "",
      oldName: "",
      showDeleteModalWindow: false,
      showAddModalWindow: false,
      showEditWindow: false
    };
  }

  openEditWindow = () => {
    this.setState({
      showEditWindow: true
    }, () => {
      $("#editNameWindow").modal('show');
      $("#editNameWindow").on('hidden.bs.modal', this.resetState);
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
  };

  editItem = (newName, id) => {
    fire.firestore().collection('suggestedDevelopers').doc(id).update({
      name: newName
    }).then(() => {
      this.resetState();
    }).catch(error => {
      console.log(error.message);
    });
  };

  openModalDeleteWindow = () => {
    this.setState({
      showDeleteModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  };

  onDeleteItem = (id) => {
    this.setState({
      idToDelete: id
    },() => {
        this.openModalDeleteWindow();
      }
    );
  };

  deleteItem = () => {
    fire.firestore().collection('suggestedDevelopers').doc(this.state.idToDelete).delete().then(() => {
      this.setState({
        idToDelete: ""
      });
    });
  };

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
    $("#editNameWindow").unbind('hidden.bs.modal');
  }

  resetState = () => {
    this.setState({
      showDeleteModalWindow: false,
      showAddModalWindow: false,
      showEditWindow: false,
      idToEdit: "",
      oldName: ""
    });
  }

  openModalAddWindow = () => {
    this.setState({
      showAddModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
    }

  onAddItem = (name, id) => {
    this.setState({
      idToDelete: id,
      nameToAdd: name
    },() => {
        this.openModalAddWindow();
      }
    );
  };

  addItem = () => {
    fire.firestore().collection('developers').add({
      name: this.state.nameToAdd
    }).then(() => {
      fire.firestore().collection('developers').get().then(snapshot => {
        fire.firestore().collection('suggestedDevelopers').doc(this.state.idToDelete).delete().then(() => {
          this.setState({
            idToDelete: "",
            nameToAdd: ""
          });
        });
      }).catch(error => {
        console.log(error.message);
      });
    });
  };

  render() {
    const developersToRender = this.props.suggestedDevelopers.map((elem, index) => {
      return (
        <div className="developersBlock" key={elem.id} value={elem.id}>
          {elem.name}
          <button className="btn actionButton" onClick={() => this.onDeleteItem(elem.id)}>
            <img className="actionIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-delete-developer.svg'}></img>
          </button>
          <button className="btn actionButton" onClick={() => this.onAddItem(elem.name, elem.id)}>
            <img className="actionIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-add-developer.svg'}></img>
          </button>
          <button className="btn actionButton">
            <img className="deleteIcon" onClick={() => this.onEditItem(elem.id, elem.name)} alt="" src={process.env.PUBLIC_URL + '/icons/action-edit-developer.svg'}></img>
          </button>
        </div>
      );
    });

    const modalDeleteWindow = (
      <WarningModalWindow
        onProceed={this.deleteItem}
        message={`Are you sure you want to delete this item?`} />
    );

    const modalAddWindow = (
      <WarningModalWindow
        onProceed={this.addItem}
        message={`Are you sure you want to add this item?`} />
    );

    const modalEditWindow = (
      <EditNameModalWindow
        onProceed={(newName) => this.editItem(newName, this.state.idToEdit)} oldName={this.state.oldName} />
    );

    return (
      <div className="suggestedWrapper">
        <p className="suggestedWrapperParagraph">Press add or delete button to add or remove developer from Firestore. Items are sorted alphabetically.</p>
        <div className="blocksWrapper">
          {developersToRender}
        </div>
        {this.state.showDeleteModalWindow ? modalDeleteWindow : ""}
        {this.state.showAddModalWindow ? modalAddWindow : ""}
        {this.state.showEditWindow ? modalEditWindow : ""}
      </div>
    )
  }
}

const stateToProps = (state = {}) => {
  return {
    suggestedDevelopers: state.suggestedDevelopers
  }
};

const SuggestedConnected = connect(stateToProps, null)(Suggested);

export default SuggestedConnected;
