import React from 'react';
import './KeywordInput.css';

/**
 * Componente de input reutilizável para entrada de palavras-chave.
 * Props:
 *   - label: texto do label
 *   - name: nome do campo (para controle de múltiplos inputs)
 *   - placeholder: texto de dica
 *   - value: valor atual do input
 *   - onChange: handler de alteração
 *
 * Utilizado no PasswordGen para entrada das palavras-chave.
 */
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