import React from 'react';
import styled from "styled-components";
import {NavLink} from "react-router-dom";

const LogoButton = styled.button`
    font-size: 41px;
    font-weight: 800;
    outline: none !important;
    font-family: var(--main-font);
    background-color: var(--third-color);
    color: var(--first-color);
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
`;

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
