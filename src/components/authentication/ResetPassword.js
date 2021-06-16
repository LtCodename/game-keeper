import React, { useContext, useState } from "react";
import Button from "../button/Button";
import { NavLink, Redirect } from "react-router-dom";
import { GameKeeperContext } from "../../App";
import Input from "../textarea/Input";
import fire from "../../Firebase";

const ResetPassword = ({}) => {
  const { userLoaded } = useContext(GameKeeperContext);

  const [emailInputValue, setEmailInputValue] = useState("");
  const [errorText, setErrorText] = useState("");
  const [resetButtonDisabled, setResetButtonDisabled] = useState(false);

  const emailValueChange = (event) => {
    setEmailInputValue(event.target.value);
  };

  if (userLoaded) {
    return <Redirect to="/dashboard" />;
  }

  const emailNode = (
    <div className="lt-col">
      <span className={"auth-input-label"}>Your Email For Reset</span>
      <Input
        autoComplete="username email"
        placeholder="Enter Email"
        type="email"
        value={emailInputValue}
        onChange={emailValueChange}
        additionalClass={"auth-screen-input auth-screen-input-margin"}
      />
    </div>
  );

  const errorNode = (
    <span className={"auth-margin-bottom auth-text-piece"}>{errorText}</span>
  );

  const abortResetting = (errorText) => {
    setErrorText(errorText);
    setResetButtonDisabled(false);
  };

  const onReset = (event) => {
    event.preventDefault();

    setResetButtonDisabled(true);
    setErrorText("");

    if (!emailInputValue) {
      abortResetting("Please enter valid Email address!");
      return;
    }

    let actionCodeSettings = {
      url: "https://gamekeeper.ltcodename.com",
    };

    fire
      .auth()
      .sendPasswordResetEmail(emailInputValue, actionCodeSettings)
      .then(() => {
        setEmailInputValue("");
        setResetButtonDisabled(false);
        setErrorText("Email sent! Check your inbox.");
      })
      .catch((error) => {
        setErrorText(error.message);
        setResetButtonDisabled(false);
      });
  };

  return (
    <div className="auth-screen-wrapper lt-row">
      <div className="auth-content lt-col">
        <span className="auth-screen-title">Reset Password</span>
        {emailNode}
        {errorText ? errorNode : ""}
        <div className="lt-row">
          <NavLink to={"/login"}>
            <Button text={"Back"} margin={"right"} />
          </NavLink>
          <Button
            text={"Reset"}
            buttonAction={onReset}
            disabled={resetButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
