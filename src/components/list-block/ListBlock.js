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
        <button className="listBlock" onClick={() => this.props.changeListIndex(this.props.listBlockIndex)}>{this.props.name}</button>
      </div>
    )
  }
}


const listBlockDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index) => {
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: index });
    }
  }
};

const ListBlockConnected = connect(null, listBlockDispatchToProps)(ListBlock);

export default ListBlockConnected;
