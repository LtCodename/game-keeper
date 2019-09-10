import React from 'react';
import './Header.css';
import reducers from '../../redux/reducers';
import { connect } from 'react-redux'

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const logo = (
      <div className="logoWrapper">
        <button className="btn" onClick={() => this.props.changeListIndex(null, this.props.allLists.length)}>Game Keeper</button>
      </div>
    );

    return (
      <div className="headerWrappper">
        {logo}
      </div>
    )
  }
}

const headerDispatchToProps = (dispatch) => {
  return {
    changeListIndex: (index, listsLength) => {
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: index, listsLength: listsLength });
    }
  }
};

const stateToProps = (state = {}) => {
  return {
    allLists: state.lists
  }
};

const HeaderConnected = connect(stateToProps, headerDispatchToProps)(Header);

export default HeaderConnected;
