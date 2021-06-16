import React, { useState } from "react";
import "./AddListTool.css";
import Textarea from "../textarea/Textarea";
import Button from "../button/Button";
import fire from "../../Firebase";

const AddListTool = ({ changeMode, userLists, userData, userSections }) => {
  const [listInputValue, setListInputValue] = useState("");
  const [addButtonDisabled, setAddButtonDisabled] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sectionValueChange = (event) => {
    setListInputValue(event.target.value);
  };

  const addList = () => {
    setAddButtonDisabled(true);

    if (!listInputValue) {
      setAddButtonDisabled(false);
      setShowError(true);
      setErrorMessage("Collection needs a name!");
      return;
    }

    const newListId = `id${new Date().getTime()}`;
    const newSectionId = `id${new Date().getTime()}1`;

    const newList = {
      id: newListId,
      name: listInputValue,
    };

    const newSection = {
      id: newSectionId,
      name: "No Section",
      listId: newListId,
      type: "hidden",
    };

    const listsCopy = [...userLists, newList];
    const sectionsCopy = [...userSections, newSection];

    fire
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        lists: listsCopy,
        sections: sectionsCopy,
      })
      .then(() => {
        setAddButtonDisabled(false);
        setListInputValue("");
      })
      .catch((error) => {
        setAddButtonDisabled(false);
        setListInputValue("");
        console.log(error);
      });
  };

  const errorNode = (
    <span className="add-list-error-message">{errorMessage}</span>
  );

  return (
    <div className="add-list-section-wrapper lt-col">
      {showError ? errorNode : ""}
      <div className="add-list-section">
        <Textarea
          placeholder="Collection Name"
          value={listInputValue}
          onChange={sectionValueChange}
          additionalClass="add-list-input"
        />
      </div>
      <div className="lt-row">
        <Button text={"Cancel"} buttonAction={changeMode} margin={"right"} />
        <Button
          text={"Add"}
          buttonAction={addList}
          disabled={addButtonDisabled}
        />
      </div>
    </div>
  );
};

export default AddListTool;
