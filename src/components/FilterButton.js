import React from 'react';
import './FilterButton.css';
import FilterIcon from '../assets/filter.svg';

/**
 * Componente responsável por exibir o botão de filtro no painel principal.
 * Recebe props para controlar o estado de seleção e a ação de toggle.
 */
const FilterButton = ({ onToggle, selected }) => {
  return (
    // Wrapper para manter o botão alinhado inline com outros elementos.
    <div style={{ display: 'inline-block' }}>
      {/*
        Botão de filtro:
        - Aplica classe 'selected' quando o filtro está ativo.
        - Dispara a função onToggle ao ser clicado.
        - Exibe ícone SVG ilustrativo antes do texto.
      */}
      <button className={`filter-btn${selected ? ' selected' : ''}`} onClick={onToggle} type="button">
        <img src={FilterIcon} alt="Filtro" className="filter-icon" />
        Filtros
      </button>
    </div>
  );
};

// Exporta o componente para uso em outros módulos.
export default FilterButton;
