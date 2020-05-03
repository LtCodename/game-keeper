import React from 'react';
import './Button.css';

const Button = ({ text, buttonAction, disabled }) => {

    return (
        <button disabled={disabled}
                className="gk-button"
                onClick={buttonAction}>
            {disabled ? 'Wait...' : text}
        </button>
    )
};

export default Button;
