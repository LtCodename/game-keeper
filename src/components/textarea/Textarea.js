import React from 'react';
import './Textarea.css';

const Textarea = ({ placeholder, value, onChange, additionalClass, onBlur, autoComplete }) => {
    return (
        <textarea rows={1}
                  className={`textarea-gk ${additionalClass}`}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  autoComplete={autoComplete}
        />
    )
};

export default Textarea;
