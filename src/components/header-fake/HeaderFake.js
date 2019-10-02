import React from 'react';

class HeaderFake extends React.Component {
  render() {
    const logo = (
      <div className="logoWrapper">
        <button className="btn">Game Keeper</button>
      </div>
    );

    return (
      <div className="ultimateHeaderWrappper">
        <div className="headerWrappper">
          {logo}
        </div>
      </div>
    )
  }
}

export default HeaderFake;
