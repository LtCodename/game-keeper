import React from 'react';
import './Textarea.css';

const Input = ({ placeholder, value, onChange, additionalClass, type, autoComplete }) => {
    return (
        <input className={`textarea-gk ${additionalClass}`}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               autoComplete={autoComplete}
               type={type}
        />
    )
};

export default Input;
