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
      <div className="listBlockWrapper">
        <button className="listBlock" onClick={() => this.props.changeListIndex(this.props.listBlockIndex, this.props.allLists.length)}>{this.props.allLists[this.props.listBlockIndex].name}</button>
      </div>
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
    allLists: state.lists
  }
};

const ListBlockConnected = connect(stateToProps, listBlockDispatchToProps)(ListBlock);

export default ListBlockConnected;
