import React, {useState} from 'react';
import './AddGameTool.css';
import BlockModalWindow from "../block-modal-window/BlockModalWindow";

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
            <button className="add-game-button" onClick={showGameBlockWindow}>
                <span>Add</span>
            </button>
            {showAddWindow ? addGameWindow : ''}
        </>
    )
};

export default AddGameTool;
