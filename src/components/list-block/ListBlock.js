import React from 'react';
import './ListBlock.css';
import indexActions from '../../redux/reducers/selectedListIndexReducer';
import { connect } from 'react-redux'

const ListBlock = ({changeListIndex, listBlockIndex, userLists}) => {

  return (
    <button className="listBlock" onClick={() => changeListIndex(listBlockIndex, userLists.length)}>{userLists[listBlockIndex].name}</button>
  )
};

const listBlockDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index, listsLength) => {
      dispatch({ type: indexActions.actions.SLI_CHANGE, index: index, listsLength: listsLength  });
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
