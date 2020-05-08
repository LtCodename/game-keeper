import React, {useContext, useState} from 'react';
import './AuthScreensStyles.css';
import Button from "../button/Button";
import Input from "../textarea/Input";
import fire from "../../Firebase";
import { NavLink, Redirect } from "react-router-dom";
import { DemoPassword, DemoUser, GameKeeperContext } from "../../App";

const Login = ({ }) => {
    const [emailInputValue, setEmailInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [errorText, setErrorText] = useState('');
    const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);

    const { userLoaded } = useContext(GameKeeperContext);

    const passwordValueChange = (event) => {
        setPasswordInputValue(event.target.value);
    };

    const emailValueChange = (event) => {
        setEmailInputValue(event.target.value);
    };

    const loginUser = (event) => {
        event.preventDefault();

        setLoginButtonDisabled(true);

        if (!emailInputValue) {
            setLoginButtonDisabled(false);
            setErrorText("Please enter your Email!");
            return;
        }

        if (!passwordInputValue) {
            setLoginButtonDisabled(false);
            setErrorText("Please enter your password!");
            return;
        }

        fire.auth().signInWithEmailAndPassword(emailInputValue, passwordInputValue).then(() => {
            setEmailInputValue('');
            setPasswordInputValue('');
            setLoginButtonDisabled(false);
            window.location.reload(false);
        }).catch(error => {
            console.log(error.message);
            setErrorText(error.message);
            setLoginButtonDisabled(false);
        });
    }

    const onDemo = () => {
        fire.auth().signInWithEmailAndPassword(DemoUser, DemoPassword).then(credential => {
            console.log(credential);
        }).catch(error => {
            console.log(error.message);
        });
    }

    const emailNode = (
        <div className="lt-col">
            <span className={'auth-input-label'}>Email</span>
            <Input
                autoComplete="username email"
                placeholder='Enter Email'
                type="email"
                value={emailInputValue}
                onChange={emailValueChange}
                additionalClass={'auth-screen-input auth-screen-input-margin'}
            />
        </div>
    );

    const passwordNode = (
        <div className="lt-col">
            <span className={'auth-input-label'}>Password</span>
            <Input
                autoComplete="current-password"
                placeholder='Enter Password'
                type="password"
                value={passwordInputValue}
                onChange={passwordValueChange}
                additionalClass={'auth-screen-input'}
            />
        </div>
    );

    const errorNode = (
        <span className={'auth-margin-top auth-text-piece'}>{errorText}</span>
    );

    if (userLoaded) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <div className="auth-screen-wrapper lt-row">
            <div className="auth-content lt-col">
                <span className="auth-screen-title">Login</span>
                {emailNode}
                {passwordNode}
                {errorText ? errorNode : ""}
                <div className="lt-row auth-buttons-area">
                    <Button
                        text={'Login'}
                        buttonAction={loginUser}
                        disabled={loginButtonDisabled}
                    />
                    <NavLink className='auth-bold-text-piece' to={'/reset'}>Forgot Password?</NavLink>
                </div>
                <span className={'auth-margin-top'}>
                    <span className={'auth-text-piece'}>You can </span>
                    <NavLink
                        className='auth-text-piece auth-margin-top auth-bold-text-piece'
                        to={'/register'}>Create Account</NavLink>
                    <span className={'auth-text-piece'}> or take a look at the </span>
                    <span className='auth-bold-text-piece auth-demo-button' onClick={onDemo}>Demo Version</span>
                    <span className={'auth-text-piece'}>.</span>
                </span>
            </div>
        </div>
    )
};

export default Login;
