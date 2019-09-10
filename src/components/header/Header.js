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
        <button className="btn" onClick={() => this.props.changeListIndex(null)}>Game Keeper</button>
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
    changeListIndex: (index) => {
      dispatch({ type: reducers.actions.selectedListIndexActions.SLI_CHANGE, index: index });
    }
  }
};

const HeaderConnected = connect(null, headerDispatchToProps)(Header);

export default HeaderConnected;
