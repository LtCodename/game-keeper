import React from 'react';
import './Developers.css';
import { connect } from 'react-redux'
import WarningModalWindow from '../warning-modal-window/WarningModalWindow.js';
declare var firebase;
declare var $;

class Developers extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.openModalWarningWindow = this.openModalWarningWindow.bind(this);
    this.resetState = this.resetState.bind(this);

    this.state = {
      idToDelete: "",
      showModalWindow: false
    };
  }

  deleteItem() {
    firebase.firestore().collection('developers').doc(this.state.idToDelete).delete();
    this.setState({
      idToDelete: ""
    });
  }

  onDeleteItem(id) {
    this.setState({
      idToDelete: id
    },() => {
        this.openModalWarningWindow();
      }
    );
  }

  openModalWarningWindow() {
    this.setState({
      showModalWindow: true
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
      showModalWindow: false,
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
            <img className="deleteIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-edit-developer.svg'}></img>
          </button>
        </div>
      );
    });

    const modalWarningWindow = (
      <WarningModalWindow
        onProceed={this.deleteItem}
        message={`Are you sure you want to delete this item?`} />
    );

    return (
      <div className="developersWrapper">
        <p>Edit or delete developers from database. Items are sorted alphabetically.</p>
        <div className="blocksWrapper">
          {developersToRender}
        </div>

        {this.state.showModalWindow ? modalWarningWindow : ""}
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
