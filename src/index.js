import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * Ponto de entrada da aplicação React.
 * - Renderiza o componente raiz <App /> dentro do elemento 'root' do HTML.
 * - Utiliza React.StrictMode para auxiliar na identificação de problemas em desenvolvimento.
 * - Chama reportWebVitals para monitoramento de performance (opcional).
 *
 * Observação: Este arquivo raramente precisa de manutenção, exceto para troca do componente raiz ou ajustes globais.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
