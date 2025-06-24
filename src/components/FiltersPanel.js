import React from 'react';
import './FiltersPanel.css';

const FiltersPanel = ({ options, onOptionsChange }) => {
  const handleCharCountChange = (e) => {
    onOptionsChange({ ...options, charCount: Number(e.target.value) });
  };

  const handleUseNumbersChange = (e) => {
    onOptionsChange({ ...options, use_numbers: e.target.checked });
  };

  const handleUseSpecialChange = (e) => {
    onOptionsChange({ ...options, use_special: e.target.checked });
  };

const handleOnlyUpperCaseChange = (e) => {
    if (e.target.checked) {
      onOptionsChange({ ...options, only_upper_case: true, only_lower_case: false });
    } else {
      onOptionsChange({ ...options, only_upper_case: false });
    }
  };

  const handleOnlyLowerCaseChange = (e) => {
    if (e.target.checked) {
      onOptionsChange({ ...options, only_lower_case: true, only_upper_case: false });
    } else {
      onOptionsChange({ ...options, only_lower_case: false });
    }
  };
  return (
    <div className="filters-panel">
      <label className="char-count-label">
        Quantidade de caracteres:
        <input
          type="number"
          min="4"
          max="12"
          value={options.charCount || 12}
          onChange={handleCharCountChange}
        />
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={options.use_numbers === undefined ? true : options.use_numbers}
          onChange={handleUseNumbersChange}
        />
        Usar números
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={options.use_special === undefined ? true : options.use_special}
          onChange={handleUseSpecialChange}
        />
        Usar caracteres especiais
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={!!options.only_upper_case}
          onChange={handleOnlyUpperCaseChange}
        />
        Apenas letras maiúsculas
      </label>
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={!!options.only_lower_case}
          onChange={handleOnlyLowerCaseChange}
        />
        Apenas letras minúsculas
      </label>
    </div>
  );
};

export default FiltersPanel;
