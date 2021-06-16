import React, { useEffect, useState } from "react";
import "./SectionSettingsMenu.css";
import Textarea from "../textarea/Textarea";
import Button from "../button/Button";
import fire from "../../Firebase";
import Colors from "../colors/Colors";

const SectionSettingsMenu = ({
  sectionName,
  userSections,
  sectionId,
  userData,
  userBlocks,
  color,
  sectionIndex,
  sectionsArray,
  hidden,
}) => {
  const [sectionInputValue, setSectionInputValue] = useState(sectionName);
  const [renameButtonDisabled, setRenameButtonDisabled] = useState(false);
  const [deleteTitleText, setDeleteTitleText] = useState("Delete Section");
  const [deleteMode, setDeleteMode] = useState(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(false);

  useEffect(() => {
    if (deleteMode) {
      setDeleteTitleText("Are you sure?");
    } else {
      setDeleteTitleText("Delete Section");
    }
  }, [deleteMode]);

  const sectionValueChange = (event) => {
    setSectionInputValue(event.target.value);
  };

  const changeSectionName = () => {
    setRenameButtonDisabled(true);

    const copy = [...userSections];

    let targetSection = copy.find((elem) => {
      return elem.id === sectionId;
    });

    if (targetSection) {
      targetSection.name = sectionInputValue;
    }

    fire
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        sections: copy,
      })
      .then(() => {
        setRenameButtonDisabled(false);
      })
      .catch((error) => {
        setRenameButtonDisabled(false);
        console.log(error.message);
      });
  };

  const changeDeleteMode = () => {
    setDeleteMode(!deleteMode);
  };

  const deleteSection = () => {
    setDeleteButtonDisabled(true);

    const copy = [...userSections];
    const blockCopy = [...userBlocks].filter((elem) => {
      return elem.sectionId !== sectionId;
    });

    const targetSectionIndex = copy.findIndex((elem) => {
      return elem.id === sectionId;
    });

    if (targetSectionIndex > -1) {
      copy.splice(targetSectionIndex, 1);
    }

    fire
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        sections: copy,
        blocks: blockCopy,
      })
      .then(() => {
        setDeleteButtonDisabled(false);
      })
      .catch((error) => {
        setDeleteButtonDisabled(false);
        console.log(error.message);
      });
  };

  const sectionPositionChangeHandler = (event) => {
    if (sectionIndex === event.target.value) {
      return;
    }

    const copy = [...userSections];

    const oldSectionPosition = copy.findIndex((elem) => {
      return elem.id === sectionsArray[sectionIndex].id;
    });

    const newSectionPosition = copy.findIndex((elem) => {
      return elem.id === sectionsArray[event.target.value].id;
    });

    let spliced = copy.splice(oldSectionPosition, 1);
    copy.splice(newSectionPosition, 0, spliced[0]);

    fire
      .firestore()
      .collection("users")
      .doc(userData.uid)
      .update({
        sections: copy,
      })
      .then(() => {})
      .catch((error) => {
        console.log(error.message);
      });
  };

  const renameNode = (
    <div className="section-settings-segment lt-col">
      <span className="section-settings-segment-title">Rename Section</span>
      <Textarea
        placeholder="Enter Section Name"
        value={sectionInputValue}
        onChange={sectionValueChange}
      />
      <Button
        text={"Rename"}
        margin={"top"}
        buttonAction={changeSectionName}
        disabled={renameButtonDisabled}
      />
    </div>
  );

  const confirmDelete = (
    <div className="lt-row">
      <Button
        text={"Yes"}
        margin={"right"}
        buttonAction={deleteSection}
        disabled={deleteButtonDisabled}
      />
      <Button text={"No"} buttonAction={changeDeleteMode} />
    </div>
  );

  const deleteNode = (
    <div className="section-settings-segment lt-col">
      <span className="section-settings-segment-title">{deleteTitleText}</span>
      {deleteMode ? (
        confirmDelete
      ) : (
        <Button text={"Delete"} buttonAction={changeDeleteMode} />
      )}
    </div>
  );

  const positionOptions = sectionsArray.map((elem, index) => {
    return (
      <option key={index} value={index}>
        {index}
      </option>
    );
  });

  const positionNode = (
    <div className="section-settings-segment lt-col">
      <span className="list-settings-segment-title">Change Position</span>
      <select
        className="new-list-position-select"
        value={sectionIndex}
        onChange={sectionPositionChangeHandler}
      >
        {positionOptions}
      </select>
    </div>
  );

  const colorsNode = (
    <div className="section-settings-segment lt-col">
      <span className="section-settings-segment-title">Pick Color</span>
      <Colors sectionId={sectionId} color={color} />
    </div>
  );

  return (
    <div className="section-settings-menu-container lt-col">
      {!hidden ? renameNode : ""}
      {!hidden ? deleteNode : ""}
      {!hidden ? positionNode : ""}
      {colorsNode}
    </div>
  );
};

export default SectionSettingsMenu;
