import React from 'react';
import './ListBlock.css';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'

class ListBlock extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
      <button className="listBlock" onClick={() => this.props.changeListIndex(this.props.listBlockIndex, this.props.userLists.length)}>{this.props.userLists[this.props.listBlockIndex].name}</button>

    )
  }
}


const listBlockDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index, listsLength) => {
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: index, listsLength: listsLength  });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    userLists: state.userLists
  }
};

const ListBlockConnected = connect(stateToProps, listBlockDispatchToProps)(ListBlock);

export default ListBlockConnected;
