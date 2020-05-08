import React, {useContext} from 'react';
import Button from "../button/Button";
import {NavLink, Redirect} from "react-router-dom";
import { GameKeeperContext } from "../../App";

const ResetPassword = ({ }) => {
    const { userLoaded } = useContext(GameKeeperContext);

    if (userLoaded) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className="auth-screen-wrapper lt-row">
            <div className="auth-content lt-col">
                <span className="auth-screen-title">Reset Password</span>
                <NavLink to={'/login'}>
                    <Button text={'Back'} margin={'top'}/>
                </NavLink>
            </div>
        </div>
    )
};

export default ResetPassword;
