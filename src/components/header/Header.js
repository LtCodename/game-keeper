import React from 'react';
import './Header.css';

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const logo = (
      <div className="logoWrapper">
        <button className="btn" onClick={() => this.props.goToDashboard(null)}>Game Keeper</button>
      </div>
    );

    return (
      <div className="headerWrappper">
        {logo}
      </div>
    )
  }
}

export default Header;
