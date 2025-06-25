import React from 'react';
import './FiltersPanel.css';
import UseNumbersIcon from '../assets/UseNumbers.svg';
import UseSpecialIcon from '../assets/UseSpecial.svg';
import OnlyNumbersIcon from '../assets/OnlyNumbers.svg';
import OnlyUpperCaseIcon from '../assets/OnlyUperCase.svg';
import OnlyLowerCaseIcon from '../assets/OnlyLowerCase.svg';

const FiltersPanel = ({ options, onOptionsChange }) => {
  const handleCharCountChange = (e) => {
    onOptionsChange({ ...options, charCount: Number(e.target.value) });
  };

  const handleUseNumbersChange = (e) => {
    onOptionsChange({ ...options, use_numbers: !e.target.checked });
  };

  const handleUseSpecialChange = (e) => {
    onOptionsChange({ ...options, use_special: !e.target.checked });
  };

  const handleOnlyNumbersChange = (e) => {
    if (e.target.checked) {
      onOptionsChange({
        ...options,
        only_numbers: true,
        use_numbers: true,
        only_upper_case: false,
        only_lower_case: false,
        use_special: false
      });
    } else {
      onOptionsChange({ ...options, only_numbers: false });
    }
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
        <img src={OnlyNumbersIcon} alt="Somente Numérica" style={{ width: 22, marginRight: 8 }} />
        <input
          type="checkbox"
          checked={options.only_numbers === undefined ? false : options.only_numbers}
          onChange={handleOnlyNumbersChange}
        />
        Somente Numérica
      </label>
      {!options.only_numbers && (
        <>
          <label className="checkbox-label">
            <img src={UseNumbersIcon} alt="Proibir Números" style={{ width: 22, marginRight: 8 }} />
            <input
              type="checkbox"
              checked={options.use_numbers === undefined ? true : !options.use_numbers}
              onChange={handleUseNumbersChange}
            />
            Proibir Números
          </label>
          <label className="checkbox-label">
            <img src={UseSpecialIcon} alt="Proibir Caracteres Especiais" style={{ width: 22, marginRight: 8 }} />
            <input
              type="checkbox"
              checked={options.use_special === undefined ? true : !options.use_special}
              onChange={handleUseSpecialChange}
            />
            Proibir Caracteres Especiais
          </label>
          <label className="checkbox-label">
            <img src={OnlyUpperCaseIcon} alt="Apenas Letras Maiúsculas" style={{ width: 22, marginRight: 8 }} />
            <input
              type="checkbox"
              checked={!!options.only_upper_case}
              onChange={handleOnlyUpperCaseChange}
            />
            Apenas Letras Maiúsculas
          </label>
          <label className="checkbox-label">
            <img src={OnlyLowerCaseIcon} alt="Apenas Letras Minúsculas" style={{ width: 22, marginRight: 8 }} />
            <input
              type="checkbox"
              checked={!!options.only_lower_case}
              onChange={handleOnlyLowerCaseChange}
            />
            Apenas Letras Minúsculas
          </label>
        </>
      )}
    </div>
  );
};

export default FiltersPanel;
