import React from 'react';
import { NavLink } from "react-router-dom";

const HeaderFake = () => {
  const logo = (
      <div className="logoHolder logoHolderFake">
          <NavLink
              className="logoLink"
              to="/">
              Game Keeper
          </NavLink>
      </div>
  );

  return (
    <div className="ultimateHeaderWrapper">
      <div className="headerWrapper">
        {logo}
      </div>
    </div>
  );
};

export default HeaderFake;
