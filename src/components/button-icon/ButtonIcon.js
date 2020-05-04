import React from 'react';
import './ButtonIcon.css';

const ButtonIcon = ({ text, buttonAction, disabled, margin, icon }) => {
    let marginClassName = '';
    switch(margin) {
        case 'top':
            marginClassName = 'margin-top';
            break;
        case 'bottom':
            marginClassName = 'margin-bottom';
            break;
        case 'left':
            marginClassName = 'margin-left';
            break;
        case 'right':
            marginClassName = 'margin-right';
            break;
        case 'left-right':
            marginClassName = 'left-right';
            break;
        case 'top-bottom':
            marginClassName = 'left-right';
            break;
        default:
            marginClassName = 'none';
    }

    return (
        <button disabled={disabled}
                type="button"
                className={`gk-button-icon ${marginClassName}`}
                onClick={buttonAction}>
            {disabled ? 'Wait...' : text}
            <span className="icon-holder">{icon}</span>
        </button>
    )
};

export default ButtonIcon;
