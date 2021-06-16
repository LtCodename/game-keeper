import React, { useContext, useState } from "react";
import Button from "../button/Button";
import { NavLink, Redirect } from "react-router-dom";
import Input from "../textarea/Input";
import fire from "../../Firebase";
import { GameKeeperContext } from "../../App";

const Register = ({}) => {
  const [emailInputValue, setEmailInputValue] = useState("");
  const [confirmEmailInputValue, setConfirmEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] =
    useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [registered, setRegistered] = useState(false);

  const { userLoaded } = useContext(GameKeeperContext);

  const emailValueChange = (event) => {
    setEmailInputValue(event.target.value);
  };

  const confirmEmailValueChange = (event) => {
    setConfirmEmailInputValue(event.target.value);
  };

  const passwordValueChange = (event) => {
    setPasswordInputValue(event.target.value);
  };

  const confirmPasswordValueChange = (event) => {
    setConfirmPasswordInputValue(event.target.value);
  };

  const nameValueChange = (event) => {
    setNameInputValue(event.target.value);
  };

  const abortRegistration = (errorText) => {
    setErrorText(errorText);
    setRegisterButtonDisabled(false);
  };

  const createUser = (event) => {
    event.preventDefault();

    setRegisterButtonDisabled(true);
    setErrorText("");

    if (emailInputValue !== confirmEmailInputValue) {
      abortRegistration("Email addresses are not identical!");
      return;
    }

    if (passwordInputValue !== confirmPasswordInputValue) {
      abortRegistration("Passwords are not identical!");
      return;
    }

    if (!emailInputValue) {
      abortRegistration("Please enter valid Email address!");
      return;
    }

    if (!passwordInputValue) {
      abortRegistration("Please enter valid password!");
      return;
    }

    if (!nameInputValue) {
      abortRegistration("Please enter your display name!");
      return;
    }

    fire
      .auth()
      .createUserWithEmailAndPassword(emailInputValue, passwordInputValue)
      .then((credential) => {
        credential.user
          .updateProfile({
            displayName: nameInputValue,
          })
          .then(() => {});

        const firstListId = `id${new Date().getTime()}`;
        const secondListId = `id${new Date().getTime()}1`;
        const firstSectionId = `id${new Date().getTime()}2`;
        const secondSectionId = `id${new Date().getTime()}3`;

        return fire
          .firestore()
          .collection("users")
          .doc(credential.user.uid)
          .set({
            lists: [
              {
                id: firstListId,
                name: "Games I Love",
              },
              {
                id: secondListId,
                name: "My Wishlist",
              },
            ],
            sections: [
              {
                id: firstSectionId,
                name: "No Section",
                listId: firstListId,
                type: "hidden",
              },
              {
                id: secondSectionId,
                name: "No Section",
                listId: secondListId,
                type: "hidden",
              },
            ],
            blocks: [],
          });
      })
      .then(() => {
        setEmailInputValue("");
        setConfirmEmailInputValue("");
        setPasswordInputValue("");
        setConfirmPasswordInputValue("");
        setNameInputValue("");
        setRegisterButtonDisabled(false);
        setErrorText("");
        setRegistered(true);
      })
      .catch((error) => {
        setErrorText(error.message);
        setRegisterButtonDisabled(false);
      });
  };

  const emailNode = (
    <div className="lt-col">
      <span className={"auth-input-label"}>Enter Email</span>
      <Input
        autoComplete="username email"
        placeholder="Enter Email"
        type="email"
        value={emailInputValue}
        onChange={emailValueChange}
        additionalClass={"auth-screen-input auth-screen-input-margin"}
      />
      <span className={"auth-input-label"}>Confirm Email</span>
      <Input
        additionalClass={"auth-screen-input auth-screen-input-margin"}
        autoComplete="username email"
        placeholder="Confirm Email"
        type="email"
        value={confirmEmailInputValue}
        onChange={confirmEmailValueChange}
      />
    </div>
  );

  const passwordNode = (
    <div className="lt-col">
      <span className={"auth-input-label"}>Enter Password</span>
      <Input
        additionalClass={"auth-screen-input auth-screen-input-margin"}
        autoComplete="current-password"
        placeholder="Enter Password"
        type="password"
        value={passwordInputValue}
        onChange={passwordValueChange}
      />
      <span className={"auth-input-label"}>Confirm Password</span>
      <Input
        additionalClass={"auth-screen-input auth-screen-input-margin"}
        autoComplete="current-password"
        placeholder="Confirm Password"
        type="password"
        value={confirmPasswordInputValue}
        onChange={confirmPasswordValueChange}
      />
    </div>
  );

  const displayNameNode = (
    <div className="lt-col">
      <span className={"auth-input-label"}>Enter Display Name</span>
      <Input
        additionalClass={"auth-screen-input auth-screen-input-margin"}
        placeholder="Enter Display Name"
        type="text"
        value={nameInputValue}
        onChange={nameValueChange}
      />
    </div>
  );

  const errorNode = (
    <span className={"auth-margin-bottom auth-text-piece"}>{errorText}</span>
  );

  if (registered) {
    return <Redirect to="/" />;
  }

  if (userLoaded) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="auth-screen-wrapper lt-row">
      <div className="auth-content lt-col">
        <span className="auth-screen-title">Create Account</span>
        {emailNode}
        {passwordNode}
        {displayNameNode}
        {errorText ? errorNode : ""}
        <Button
          text={"Register"}
          disabled={registerButtonDisabled}
          buttonAction={createUser}
        />
        <span className={"auth-margin-top"}>
          <span className={"auth-text-piece"}>Already have an account? </span>
          <NavLink className="auth-bold-text-piece" to={"/login"}>
            Login Here
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default Register;
