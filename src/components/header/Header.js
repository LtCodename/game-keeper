import React, {useState} from 'react';
import './Header.css';
import {connect} from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom';
import fire from "../../Firebase";
import { LogOutIcon, LogOutIconMobile, ProfileIcon, ProfileIconMobile } from "../../IconsLibrary";
import SearchPanelConnected from "../search-panel/SearchPanel";
import ButtonIcon from "../button-icon/ButtonIcon";
import AuthPanel from "../../auth-panel/AuthPanel";

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

    const logo = (
        <div className="logoHolder">
            <NavLink
                className="logoLink"
                to="/">
                Game Keeper
            </NavLink>
        </div>
    );

    const logOutButton = (
        <div className="authButtonWrapper">
            <ButtonIcon
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
                <ButtonIcon text={'Profile'} icon={ProfileIcon}/>
            </NavLink>
        </div>
    );

    const profileAltButton = (
        <div className="">
            <NavLink
                className="profileButtonAlt"
                to="/profile">
                {ProfileIconMobile}
            </NavLink>
        </div>
    );

    const logOutAltButton = (
        <div className="">
            <button
                className="profileButtonAlt"
                onClick={onLogOutClick}>
                {LogOutIconMobile}
            </button>
        </div>
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
            </div>
            <div className="altButtonsWrapper">
                <div className="alt-buttons-inner-wrapper">
                    {userData ? logOutAltButton : ""}
                    {userData ? profileAltButton : ""}
                    {!userData ? <AuthPanel/> : ""}
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
