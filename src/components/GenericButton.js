import React from 'react';
import './GenericButton.css';

/**
 * Componente de botão genérico reutilizável.
 * Permite padronizar ações e estilos de botões em toda a aplicação.
 *
 * Props:
 *   - onClick: função executada ao clicar no botão
 *   - children: conteúdo do botão (texto, ícone, etc.)
 *   - type: tipo do botão (button, submit, etc.)
 *   - className: classes CSS adicionais para customização
 */
const GenericButton = ({ onClick, children, type = 'button', className = '' }) => (
  <button type={type} onClick={onClick} className={`generic-button ${className}`}>
    {children}
  </button>
);

export default GenericButton;
