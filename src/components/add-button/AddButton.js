import React from 'react';
import './AddButton.css';

const AddButton = ({ onClick, text, additionalClass }) => {
    return (
        <button type="button"
                className={`gk-add-button ${additionalClass}`}
                onClick={onClick}>
            {text}
        </button>
    )
};

export default AddButton;
