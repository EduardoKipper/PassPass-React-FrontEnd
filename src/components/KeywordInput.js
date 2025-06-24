import React from 'react';
import './KeywordInput.css';

const KeywordInput = ({ label, name, placeholder, value, onChange }) => (
    <div className='keyword-input'>
        <label htmlFor={name}>{label}</label>
        <input
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default KeywordInput;