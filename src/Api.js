import axios from 'axios';

/**
 * Instância do axios configurada para integração com o backend PassPass.
 *
 * - baseURL: endereço do backend (ajustar conforme ambiente de deploy).
 * - Permite centralizar e padronizar as chamadas HTTP da aplicação.
 * - Facilita manutenção e troca de ambiente (ex: produção, homologação).
 *
 * Observação: Para ambientes diferentes, altere apenas o valor de baseURL.
 */
const api = axios.create({
    baseURL: 'http://localhost:8000'
});

export default api;