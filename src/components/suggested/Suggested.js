import React from 'react';
import './Suggested.css';
import { connect } from 'react-redux'
declare var firebase;

class Suggested extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);

    this.state = {
    };
  }

  deleteItem(id) {
    firebase.firestore().collection('suggestedDevelopers').doc(id).delete();
  }

  addItem(name, id) {
    firebase.firestore().collection('developers').add({
      name: name
    }).then(() => {
      firebase.firestore().collection('developers').get().then(snapshot => {
        firebase.firestore().collection('suggestedDevelopers').doc(id).delete();
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
          <button className="btn actionButton" onClick={() => this.deleteItem(elem.id)}>
            <img className="actionIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-delete-developer.svg'}></img>
          </button>
          <button className="btn actionButton" onClick={() => this.addItem(elem.name, elem.id)}>
            <img className="actionIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-add-developer.svg'}></img>
          </button>
        </div>
      );
    });

    return (
      <div className="suggestedWrapper">
        <p>Press add or delete button to add or remove developer from Firestore. Items are sorted alphabetically.</p>
        <div className="blocksWrapper">
          {developersToRender}
        </div>
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
