import React from 'react';
import './Suggested.css';
import { connect } from 'react-redux'
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
declare var firebase;
declare var $;

class Suggested extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.openModalDeleteWindow = this.openModalDeleteWindow.bind(this);
    this.openModalAddWindow = this.openModalAddWindow.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      idToDelete: "",
      nameToAdd: "",
      showDeleteModalWindow: false,
      showAddModalWindow: false
    };
  }

  onDeleteItem(id) {
    this.setState({
      idToDelete: id
    },() => {
        console.log(this.state.idToDelete);
        this.openModalDeleteWindow();
      }
    );
  }

  deleteItem() {
    firebase.firestore().collection('suggestedDevelopers').doc(this.state.idToDelete).delete().then(() => {
      this.setState({
        idToDelete: ""
      });
    });
  }

  openModalDeleteWindow() {
    this.setState({
      showDeleteModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  }

  componentWillUnmount() {
    $("#modalWarning").unbind('hidden.bs.modal');
  }

  resetState() {
    this.setState({
      showDeleteModalWindow: false,
      showAddModalWindow: false
    });
  }

  onAddItem(name, id) {
    this.setState({
      idToDelete: id,
      nameToAdd: name
    },() => {
        this.openModalAddWindow();
      }
    );
  }

  openModalAddWindow() {
    this.setState({
      showAddModalWindow: true
    }, () => {
      $("#modalWarning").modal('show');
      $("#modalWarning").on('hidden.bs.modal', this.resetState);
    });
  }

  addItem() {
    firebase.firestore().collection('developers').add({
      name: this.state.nameToAdd
    }).then(() => {
      firebase.firestore().collection('developers').get().then(snapshot => {
        firebase.firestore().collection('suggestedDevelopers').doc(this.state.idToDelete).delete().then(() => {
          this.setState({
            idToDelete: "",
            nameToAdd: ""
          });
        });
      }).catch(error => {
        console.log(error.message);
      });
    });
  }

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

    return (
      <div className="suggestedWrapper">
        <p>Press add or delete button to add or remove developer from Firestore. Items are sorted alphabetically.</p>
        <div className="blocksWrapper">
          {developersToRender}
        </div>
        {this.state.showDeleteModalWindow ? modalDeleteWindow : ""}
        {this.state.showAddModalWindow ? modalAddWindow : ""}
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
