import React from 'react';
import './FiltersPanel.css';
import UseNumbersIcon from '../assets/UseNumbers.svg';
import UseSpecialIcon from '../assets/UseSpecial.svg';
import OnlyNumbersIcon from '../assets/OnlyNumbers.svg';
import OnlyUpperCaseIcon from '../assets/OnlyUperCase.svg';
import OnlyLowerCaseIcon from '../assets/OnlyLowerCase.svg';

/**
 * Painel de filtros customizáveis para geração de senha.
 * Exibe opções dinâmicas, ícones SVG e controla regras de negócio (exclusividade de opções).
 * Props:
 *   - options: objeto com as opções atuais de filtro
 *   - onOptionsChange: handler para atualizar opções
 *
 * Implementa lógica para esconder/mostrar campos conforme seleção do usuário.
 * Garante consistência das opções enviadas ao backend.
 */
const FiltersPanel = ({ options, onOptionsChange }) => {
  // Atualiza a quantidade de caracteres da senha
  const handleCharCountChange = (e) => {
    onOptionsChange({ ...options, charCount: Number(e.target.value) });
  };

  // Alterna a permissão de números na senha (checkbox lógica inversa)
  const handleUseNumbersChange = (e) => {
    onOptionsChange({ ...options, use_numbers: !e.target.checked });
  };

  // Alterna a permissão de caracteres especiais (checkbox lógica inversa)
  const handleUseSpecialChange = (e) => {
    onOptionsChange({ ...options, use_special: !e.target.checked });
  };

  // Ativa "Somente números" e desativa opções incompatíveis
  const handleOnlyNumbersChange = (e) => {
    if (e.target.checked) {
      onOptionsChange({
        ...options,
        only_numbers: true, // Ativa modo numérico
        use_numbers: true, // Garante números permitidos
        only_upper_case: false, // Desativa maiúsculas
        only_lower_case: false, // Desativa minúsculas
        use_special: false // Desativa especiais
      });
    } else {
      onOptionsChange({ ...options, only_numbers: false });
    }
  };

  // Ativa "Apenas letras maiúsculas" e desativa minúsculas
  const handleOnlyUpperCaseChange = (e) => {
    if (e.target.checked) {
      onOptionsChange({ ...options, only_upper_case: true, only_lower_case: false });
    } else {
      onOptionsChange({ ...options, only_upper_case: false });
    }
  };

  // Ativa "Apenas letras minúsculas" e desativa maiúsculas
  const handleOnlyLowerCaseChange = (e) => {
    if (e.target.checked) {
      onOptionsChange({ ...options, only_lower_case: true, only_upper_case: false });
    } else {
      onOptionsChange({ ...options, only_lower_case: false });
    }
  };

  // Renderização condicional dos campos conforme regras de negócio
  return (
    <div className="filters-panel">
      {/* Campo para definir o tamanho da senha */}
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
      {/* Checkbox para ativar modo somente numérico */}
      <label className="checkbox-label">
        <img src={OnlyNumbersIcon} alt="Somente Numérica" style={{ width: 22, marginRight: 8 }} />
        <input
          type="checkbox"
          checked={options.only_numbers === undefined ? false : options.only_numbers}
          onChange={handleOnlyNumbersChange}
        />
        Somente Numérica
      </label>
      {/* Exibe demais filtros apenas se não estiver em modo somente numérico */}
      {!options.only_numbers && (
        <>
          {/* Checkbox para proibir números */}
          <label className="checkbox-label">
            <img src={UseNumbersIcon} alt="Proibir Números" style={{ width: 22, marginRight: 8 }} />
            <input
              type="checkbox"
              checked={options.use_numbers === undefined ? true : !options.use_numbers}
              onChange={handleUseNumbersChange}
            />
            Proibir Números
          </label>
          {/* Checkbox para proibir caracteres especiais */}
          <label className="checkbox-label">
            <img src={UseSpecialIcon} alt="Proibir Caracteres Especiais" style={{ width: 22, marginRight: 8 }} />
            <input
              type="checkbox"
              checked={options.use_special === undefined ? true : !options.use_special}
              onChange={handleUseSpecialChange}
            />
            Proibir Caracteres Especiais
          </label>
          {/* Checkbox para apenas letras maiúsculas */}
          <label className="checkbox-label">
            <img src={OnlyUpperCaseIcon} alt="Apenas Letras Maiúsculas" style={{ width: 22, marginRight: 8 }} />
            <input
              type="checkbox"
              checked={!!options.only_upper_case}
              onChange={handleOnlyUpperCaseChange}
            />
            Apenas Letras Maiúsculas
          </label>
          {/* Checkbox para apenas letras minúsculas */}
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
