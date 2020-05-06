import React, {useState} from 'react';
import './AddGameTool.css';
import BlockModalWindow from "../block-modal-window/BlockModalWindow";
import AddButton from "../add-button/AddButton";

const AddGameTool = ({ sectionId }) => {
    const [showAddWindow, setShowAddWindow] = useState(false);

    const showGameBlockWindow = () => {
        setShowAddWindow(!showAddWindow);
    }

    const addGameWindow = (
        <BlockModalWindow
            modalId={"addGame"}
            gameData={{name:""}}
            fullMode={false}
            show={showAddWindow}
            hideWindow={showGameBlockWindow}
            sectionId={sectionId}
        />
    );

    return (
        <>
            <AddButton
                onClick={showGameBlockWindow}
                text={'Add'}
                additionalClass={'gk-add-button-game'}
            />
            {showAddWindow ? addGameWindow : ''}
        </>
    )
};

export default AddGameTool;
