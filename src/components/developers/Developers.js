import React from 'react';
import './Developers.css';
import { connect } from 'react-redux'
declare var firebase;

class Developers extends React.Component {
  constructor(props) {
    super(props);

    this.deleteItem = this.deleteItem.bind(this);

    this.state = {
    };
  }

  deleteItem(id) {
    firebase.firestore().collection('developers').doc(id).delete();
  }

  render() {
    const developersToRender = this.props.developers.map((elem, index) => {
      return (
        <div className="developersBlock" key={elem.id} value={elem.id}>
          {elem.name}
          <button className="btn deleteButton" onClick={() => this.deleteItem(elem.id)}><img className="deleteIcon" alt="" src={process.env.PUBLIC_URL + '/icons/action-delete-developer.svg'}></img></button>
        </div>
      );
    });

    return (
      <div className="developersWrapper">
        <p>Press delete button to remove developer from Firestore. Items are sorted alphabetically.</p>
        <div className="blocksWrapper">
          {developersToRender}
        </div>
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
