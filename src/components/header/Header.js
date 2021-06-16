import React, { useContext, useState } from "react";
import "./Header.css";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import fire from "../../Firebase";
import { LogOutIcon, ProfileIcon } from "../../IconsLibrary";
import SearchPanelConnected from "../search-panel/SearchPanel";
import Button from "../button/Button";
import { GameKeeperContext } from "../../App";

const Header = ({ history, userData }) => {
  const [logOutButtonDisabled, setLogOutButtonDisabled] = useState(false);
  const { logOutUser } = useContext(GameKeeperContext);

  const onLogOutClick = () => {
    setLogOutButtonDisabled(true);

    fire
      .auth()
      .signOut()
      .then(() => {
        setLogOutButtonDisabled(false);
        logOutUser();
        history.push("/login");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const siteName = <span className="site-name">Game Keeper</span>;

  const siteNameShort = <span className="site-name-short">GK</span>;

  const logo = (
    <div className="logoHolder">
      <NavLink className="logoLink" to="/">
        {siteName}
        {siteNameShort}
      </NavLink>
    </div>
  );

  const logOutButton = (
    <Button
      icon={LogOutIcon}
      buttonAction={onLogOutClick}
      disabled={logOutButtonDisabled}
      margin={"right"}
      additionalClass={"auth-header-button shake-little"}
    />
  );

  const profileButton = (
    <NavLink className="header-link" to="/profile">
      <Button
        icon={ProfileIcon}
        additionalClass={"auth-header-button shake-little"}
      />
    </NavLink>
  );

  return (
    <div className="ultimateHeaderWrapper">
      <div className="headerWrapper">
        {logo}
        {userData ? <SearchPanelConnected /> : ""}
        <div className="signPanelWrapper">
          {userData ? logOutButton : ""}
          {userData ? profileButton : ""}
        </div>
      </div>
    </div>
  );
};

const stateToProps = (state = {}) => {
  return {
    userData: state.userData,
  };
};

const HeaderConnected = connect(stateToProps, null)(Header);

export default withRouter(HeaderConnected);
