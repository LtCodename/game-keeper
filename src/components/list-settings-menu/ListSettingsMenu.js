import React, { useEffect, useState } from "react";
import "./ListSettingsMenu.css";
import Textarea from "../textarea/Textarea";
import Button from "../button/Button";
import fire from "../../Firebase";
import { Redirect } from "react-router-dom";

const ListSettingsMenu = ({
  listName,
  userLists,
  listIndex,
  userData,
  userSections,
  userBlocks,
  changeListIndex,
}) => {
  const [listInputValue, setListInputValue] = useState(listName);
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteTitleText, setDeleteTitleText] = useState("Delete Collection");
  const [renameButtonDisabled, setRenameButtonDisabled] = useState(false);
  const [listIsDeleted, setListIsDeleted] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  const listValueChange = (event) => {
    setListInputValue(event.target.value);
  };

  useEffect(() => {
    if (deleteMode) {
      setDeleteTitleText("Are you sure?");
    } else {
      setDeleteTitleText("Delete Collection");
    }
  }, [deleteMode]);

  const changeDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const changeListName = () => {
    if (!listInputValue.length) return;

    setRenameButtonDisabled(true);

    const copy = [...userLists];

    copy[listIndex] = {
      ...copy[listIndex],
      name: listInputValue,
    };

    fire
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        lists: copy,
      })
      .then(() => {
        setRenameButtonDisabled(false);
      })
      .catch((error) => {
        setRenameButtonDisabled(false);
        console.log(error.message);
      });
  };

  const deleteList = () => {
    setDeleteButtonDisabled(true);

    const deletedSectionsIds = [];
    const copy = [...userLists];

    const sectionCopy = [...userSections].filter((elem) => {
      if (elem.listId !== copy[listIndex].id) {
        return true;
      } else {
        deletedSectionsIds.push(elem.id);
        return false;
      }
    });

    const blocksCopy = [...userBlocks].filter((elem) => {
      return deletedSectionsIds.indexOf(elem.sectionId) === -1;
    });

    copy.splice(listIndex, 1);

    fire
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        lists: copy,
        sections: sectionCopy,
        blocks: blocksCopy,
      })
      .then(() => {
        setDeleteButtonDisabled(false);
        setListIsDeleted(true);
      })
      .catch((error) => {
        setDeleteButtonDisabled(false);
        console.log(error.message);
      });
  };

  const listPositionChangeHandler = (event) => {
    const copy = [...userLists];

    if (listIndex === event.target.value) {
      return;
    }

    let spliced = copy.splice(listIndex, 1);

    copy.splice(event.target.value, 0, spliced[0]);

    changeListIndex(event.target.value, userLists.length);

    fire
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        lists: copy,
      })
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renameNode = (
    <div className="list-settings-segment lt-col">
      <span className="list-settings-segment-title">Rename Collection</span>
      <Textarea
        placeholder="Enter Collection Name"
        value={listInputValue}
        onChange={listValueChange}
      />
      <Button
        text={"Rename"}
        margin={"top"}
        buttonAction={changeListName}
        disabled={renameButtonDisabled}
      />
    </div>
  );

  const confirmDelete = (
    <div className="lt-row">
      <Button
        text={"Yes"}
        margin={"right"}
        buttonAction={deleteList}
        disabled={deleteButtonDisabled}
      />
      <Button text={"No"} buttonAction={changeDeleteMode} />
    </div>
  );

  const deleteNode = (
    <div className="list-settings-segment lt-col">
      <span className="list-settings-segment-title">{deleteTitleText}</span>
      {deleteMode ? (
        confirmDelete
      ) : (
        <Button text={"Delete"} buttonAction={changeDeleteMode} />
      )}
    </div>
  );

  const positionOptions = userLists.map((elem, index) => {
    return (
      <option key={index} value={index}>
        {index}
      </option>
    );
  });

  const positionNode = (
    <div className="list-settings-segment lt-col">
      <span className="list-settings-segment-title">Change Position</span>
      <select
        className="new-list-position-select"
        value={listIndex}
        onChange={listPositionChangeHandler}
      >
        {positionOptions}
      </select>
    </div>
  );

  if (listIsDeleted) {
    return <Redirect to="/" />;
  }

  return (
    <div className="list-settings-menu-container lt-col">
      {renameNode}
      {deleteNode}
      {positionNode}
    </div>
  );
};

export default ListSettingsMenu;
