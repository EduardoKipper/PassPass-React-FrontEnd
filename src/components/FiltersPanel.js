import React from 'react';
import './FiltersPanel.css';

const FiltersPanel = ({ options, onOptionsChange }) => {
  const handleCharCountChange = (e) => {
    onOptionsChange({ ...options, charCount: Number(e.target.value) });
  };

  const handleUseNumbersChange = (e) => {
    onOptionsChange({ ...options, onlyNumbers: e.target.checked });
  };

  const handleUseSpecialChange = (e) => {
    onOptionsChange({ ...options, noSpecial: !e.target.checked });
  };

  const handleOnlyUpperCaseChange = (e) => {
    onOptionsChange({ ...options, onlyUpperCase: e.target.checked });
  };

  const handleOnlyLowerCaseChange = (e) => {
    onOptionsChange({ ...options, onlyLowerCase: e.target.checked });
  };

  return (
    <div className="filters-panel">
      <label className="char-count-label">
        Quantidade de caracteres:
        <input
          type="number"
          min="4"
          max="32"
          value={options.charCount || 16}
          onChange={handleCharCountChange}
        />
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={!!options.onlyNumbers}
          onChange={handleUseNumbersChange}
        />
        Usar números
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={options.noSpecial === undefined ? true : !options.noSpecial}
          onChange={handleUseSpecialChange}
        />
        Usar caracteres especiais
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={!!options.onlyUpperCase}
          onChange={handleOnlyUpperCaseChange}
        />
        Apenas letras maiúsculas
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={!!options.onlyLowerCase}
          onChange={handleOnlyLowerCaseChange}
        />
        Apenas letras minúsculas
      </label>
    </div>
  );
};

export default FiltersPanel;
