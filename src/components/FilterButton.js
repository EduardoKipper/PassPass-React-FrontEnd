import React from 'react';
import './FilterButton.css';
import FilterIcon from '../assets/filter.svg';

const FilterButton = ({ onToggle, selected }) => {
  return (
    <div style={{ display: 'inline-block' }}>
      <button className={`filter-btn${selected ? ' selected' : ''}`} onClick={onToggle} type="button">
        <img src={FilterIcon} alt="Filtro" className="filter-icon" />
        Filtros
      </button>
    </div>
  );
};

export default FilterButton;
