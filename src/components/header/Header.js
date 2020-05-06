import React, {useState} from 'react';
import './Header.css';
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom';
import fire from "../../Firebase";
import { LogOutIcon, LogOutIconMobile, ProfileIcon, ProfileIconMobile } from "../../IconsLibrary";
import SearchPanelConnected from "../search-panel/SearchPanel";
import Button from "../button/Button";
import AuthPanel from "../auth-panel/AuthPanel";

const Header = ({history, userData}) => {
    const [logOutButtonDisabled, setLogOutButtonDisabled] = useState(false);

    const onLogOutClick = () => {
        setLogOutButtonDisabled(true);

        fire.auth().signOut().then(() => {
            setLogOutButtonDisabled(false);
            history.push('/');
        }).catch(error => {
            console.log(error.message);
        });
    };

    const siteName = (
        <span className="site-name">Game Keeper</span>
    )

    const siteNameShort = (
        <span className="site-name-short">GK</span>
    )

    const logo = (
        <div className="logoHolder">
            <NavLink
                className="logoLink"
                to="/">
                {siteName}
                {siteNameShort}
            </NavLink>
        </div>
    );

    const logOutButton = (
        <div className="authButtonWrapper">
            <Button
                text={'Log Out'}
                icon={LogOutIcon}
                buttonAction={onLogOutClick}
                disabled={logOutButtonDisabled}
            />
        </div>
    );

    const profileButton = (
        <div className="authButtonWrapper">
            <NavLink
                className="header-link"
                to="/profile">
                <Button text={'Profile'} icon={ProfileIcon}/>
            </NavLink>
        </div>
    );

    const profileAltButton = (
        <NavLink
            to="/profile"
            className="lt-row">
            <Button
                icon={ProfileIconMobile}
            />
        </NavLink>
    );

    const logOutAltButton = (
        <Button
            buttonAction={onLogOutClick}
            icon={LogOutIconMobile}
            margin={'right'}
        />
    );

    return (
        <div className="ultimateHeaderWrapper">
            <div className="headerWrapper">
                {logo}
                {userData ? <SearchPanelConnected/> : ""}
                <div className="signPanelWrapper">
                    {userData ? logOutButton : ""}
                    {userData ? profileButton : ""}
                    {!userData ? <AuthPanel/> : ""}
                </div>
                <div className="altButtonsWrapper">
                    <div className="alt-buttons-inner-wrapper">
                        {userData ? logOutAltButton : ""}
                        {userData ? profileAltButton : ""}
                        {!userData ? <AuthPanel/> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
};

const stateToProps = (state = {}) => {
    return {
        userData: state.userData
    }
};

const HeaderConnected = connect(stateToProps, null)(Header);

export default withRouter(HeaderConnected);
