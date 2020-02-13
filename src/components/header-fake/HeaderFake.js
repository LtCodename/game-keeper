import React from 'react';
import styled from "styled-components";

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
    <div className="logoWrapper">
      <LogoButton className="btn">Game Keeper</LogoButton>
    </div>
  );

  return (
    <div className="ultimateHeaderWrappper">
      <div className="headerWrappper">
        {logo}
      </div>
    </div>
  );
};

export default HeaderFake;
