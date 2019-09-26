import React from 'react';
import './HeaderFake.css';

class HeaderFake extends React.Component {
  render() {
    const logo = (
      <div className="logoWrapper">
        <button className="btn">Game Keeper</button>
      </div>
    );

    return (
      <div className="headerWrappper">
        {logo}
      </div>
    )
  }
}

export default HeaderFake;
