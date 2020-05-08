import React from 'react';
import './Button.css';

const Button = ({ text, buttonAction, disabled, margin, icon, additionalClass }) => {
    let buttonClassName = 'gk-button';
    if (icon) buttonClassName = 'gk-button-icon';
    if (!text) buttonClassName = 'gk-button-mobile';

    let marginClassName;
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

    const textNode = disabled ? 'Wait...' : text;

    return (
        <button disabled={disabled}
                type="button"
                className={`${buttonClassName} ${marginClassName} ${additionalClass}`}
                onClick={buttonAction}>
            {text ? textNode : ""}
            {icon ? <span className={`icon-holder-${buttonClassName}`}>{icon}</span> : ""}
        </button>
    )
};

export default Button;
