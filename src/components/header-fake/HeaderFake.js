import React from 'react';

const HeaderFake = () => {
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
  );
}

export default HeaderFake;
