import React from 'react';
import './AuthPanel.css';
import Button from "../components/button/Button";
import { DemoIcon, DemoIconMobile, LogInIcon, LogInIconMobile, SignUpIcon, SignUpIconMobile } from "../IconsLibrary";
import SignUpModalWindow from "../components/sign-up-modal-window/SignUpModalWindow";
import LogInModalWindow from "../components/log-in-modal-window/LogInModalWindow";
import fire from "../Firebase";

class AuthPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showSignUpWindow: false,
            showLogInWindow: false,
            demoButtonDisabled: false
        };
    }

    onLogInClick = () => {
        this.setState({
            showLogInWindow: true
        })
    };

    onSignUpClick = () => {
        this.setState({
            showSignUpWindow: true
        });
    };

    onDemoClick = (event) => {
        event.preventDefault();

        this.setState({
            demoButtonDisabled: true
        })

        fire.auth().signInWithEmailAndPassword('fake@email.com', '123456780').then(credential => {
            console.log(credential);
            this.setState({
                demoButtonDisabled: false
            })
        }).catch(error => {
            console.log(error.message);
            this.setState({
                demoButtonDisabled: false
            })
        });
    };

    closeSignUpModal = () => {
        this.setState({
            showSignUpWindow: false
        });
    };

    closeLogInModal = () => {
        this.setState({
            showLogInWindow: false
        });
    };

    render() {
        const authPanel = (
            <div className="auth-panel lt-row">
                <Button
                    text={'Sign Up'}
                    icon={SignUpIcon}
                    margin={'right'}
                    buttonAction={this.onSignUpClick}
                />
                <Button
                    text={'Log In'}
                    icon={LogInIcon}
                    margin={'right'}
                    buttonAction={this.onLogInClick}
                />
                <Button
                    text={'Demo'}
                    icon={DemoIcon}
                    buttonAction={this.onDemoClick}
                    disabled={this.state.demoButtonDisabled}
                />
            </div>
        );

        const authPanelAlt = (
            <div className="auth-panel-alt lt-row">
                <Button
                    buttonAction={this.onSignUpClick}
                    icon={SignUpIconMobile}
                    margin={'right'}
                />
                <Button
                    buttonAction={this.onLogInClick}
                    icon={LogInIconMobile}
                    margin={'right'}
                />
                <Button
                    buttonAction={this.onDemoClick}
                    icon={DemoIconMobile}
                />
            </div>
        );

        const signUpWindow = (
            <SignUpModalWindow show={this.state.showSignUpWindow} hideWindow={this.closeSignUpModal.bind(this)}/>
        );

        const logInWindow = (
            <LogInModalWindow show={this.state.showLogInWindow} hideWindow={this.closeLogInModal.bind(this)}/>
        );

        return (
            <div className="lt-row">
                {authPanel}
                {authPanelAlt}
                {this.state.showLogInWindow ? logInWindow : ""}
                {this.state.showSignUpWindow ? signUpWindow : ""}
            </div>
        )
    }
}

export default AuthPanel;
