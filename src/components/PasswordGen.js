import React, { Component } from 'react';
import api from '../Api';
import './PasswordGen.css';
import PaperclipIcon from '../assets/paperclip.svg';
import KeywordInput from './KeywordInput';
import GenericButton from './GenericButton';
import FilterButton from './FilterButton';
import FiltersPanel from './FiltersPanel';

/**
 * Componente principal responsável pela geração de senhas.
 * Gerencia o estado dos campos, opções de filtro, integração com backend e exibição dos resultados.
 * - Controla a exibição do painel de filtros e modal de confirmação.
 * - Realiza a chamada à API para geração da senha conforme as opções selecionadas.
 * - Mantém o layout centralizado e integra os componentes visuais auxiliares.
 */
class PasswordGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {}, // Dados de autenticação (pode ser expandido para multiusuário)
            keyword: ["", "", ""], // Palavras-chave informadas pelo usuário
            options: {}, // Opções de filtro para geração da senha
            password: '', // Senha gerada
            showModal: false, // Controle do modal de confirmação
            showPassword: [false, false, false], // Controle de exibição dos campos de senha
            showGeneratedPassword: false, // Exibe/oculta senha gerada
            showFiltersPanel: false // Exibe/oculta painel de filtros
        };
    }

    /**
     * Atualiza o estado dos campos de palavra-chave e demais opções.
     * Permite controle individual dos inputs.
     * - Se o campo for uma palavra-chave, atualiza o array correspondente.
     * - Para outros campos, atualiza diretamente o estado.
     */
    handleChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith('palavra')) {
            const index = Number(name.replace('palavra', '')) - 1;
            this.setState((prevState) => {
                const keyword = [...prevState.keyword];
                keyword[index] = value;
                return { keyword };
            });
        } else {
            this.setState({ [name]: value });
        }
    };

    /**
     * Monta o body da requisição e realiza chamada à API para gerar a senha.
     * Garante que apenas palavras-chave válidas sejam enviadas.
     * Atualiza o estado com a resposta do backend.
     * - Valida e normaliza as opções de filtro antes do envio.
     * - Exibe alertas em caso de erro de integração ou resposta inesperada.
     */
    gerarSenha = async () => {
        const { keyword } = this.state;
        let { options } = this.state;
        options = {
            chars: Number(options.chars || options.charCount) || 12,
            use_numbers: options.use_numbers !== undefined ? options.use_numbers : true,
            use_special: options.use_special !== undefined ? options.use_special : true,
            only_numbers: options.only_numbers || false,
            only_upper_case: options.only_upper_case || false,
            only_lower_case: options.only_lower_case || false
        };

        const reqBody = {
            auth: { user: "" },
            keyword: Array.isArray(keyword) ? keyword.filter(k => k && k.trim() !== '') : [],
            options: options
        };
        console.log('Body enviado:', reqBody);
        try {
            const response = await api.post('/api/password', reqBody);
            const data = response.data;
            console.log('Resposta da API:', data);
            if (data && data.status_code === 200 && data.password) {
                this.setState({ password: data.password });
            } else if (data && data.description) {
                alert('Erro ao gerar senha: ' + data.description);
                console.error('Resposta da API:', data);
            } else {
                alert('Erro desconhecido ao gerar senha.');
                console.error('Resposta inesperada da API:', data);
            }
        } catch (error) {
            alert('Erro de conexão ao gerar senha.');
            console.error('Erro ao gerar a senha:', error);
        }
    };

    /**
     * Copia a senha gerada para a área de transferência e exibe modal de confirmação.
     */
    copiarSenha = () => {
        const { password } = this.state;
        navigator.clipboard.writeText(password);
        this.setState({ showModal: true });
    };

    /**
     * Fecha o modal de confirmação de cópia.
     */
    closeModal = () => {
        this.setState({ showModal: false });
    };

    render() {
        const { keyword, password, showModal, options } = this.state;

        return (
            <div className="PassPassGen" style={{
                // Layout centralizado, altura fixa e scroll interno para responsividade
                height: '80vh',
                maxHeight: '80vh',
                minHeight: '80vh',
                width: '100%',
                maxWidth: 500,
                margin: '0 auto',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
            }}>
                <div className='container' style={{
                    height: '100%',
                    maxHeight: '100%',
                    overflowY: 'auto',
                    width: '100%',
                    boxSizing: 'border-box',
                }}>
                    <h2>Gerador de Senhas</h2>
                    <p>Crie senhas fortes e seguras com base em palavras-chave.</p>
                    <div className='Palavras'>
                        {/* Inputs de palavras-chave reutilizando componente KeywordInput */}
                        <KeywordInput
                            label="Palavra 1"
                            name="palavra1"
                            placeholder="  Digite aqui sua palavra chave"
                            value={keyword[0]}
                            onChange={this.handleChange}
                        />
                        <KeywordInput
                            label="Palavra 2"
                            name="palavra2"
                            placeholder="  Digite aqui sua palavra chave"
                            value={keyword[1]}
                            onChange={this.handleChange}
                        />
                        <KeywordInput
                            label="Palavra 3"
                            name="palavra3"
                            placeholder="  Digite aqui sua palavra chave"
                            value={keyword[2]}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 12 }}>
                        {/* Botão de geração e botão de filtro com estado visual */}
                        <GenericButton onClick={this.gerarSenha}>
                            Gerar Senha
                        </GenericButton>
                        <FilterButton
                            onToggle={() => this.setState({ showFiltersPanel: !this.state.showFiltersPanel })}
                            selected={this.state.showFiltersPanel}
                        />
                    </div>
                    <div
                        style={{ marginTop: 16, display: this.state.showFiltersPanel ? 'flex' : 'none', justifyContent: 'center', width: '100%' }}
                    >
                        {/* Painel de filtros customizável, exibe opções dinâmicas */}
                        <FiltersPanel
                            options={options}
                            onOptionsChange={(opts) => this.setState({ options: opts })}
                        />
                    </div>
                    {password && (
                        <div style={{ marginTop: 32 }}>
                            {/* Exibe senha gerada e botão de cópia */}
                            <input type="text" value={password} readOnly />
                            <button onClick={this.copiarSenha}>Copiar</button>
                        </div>
                    )}
                    <p>All Copyrights to PassPass team</p>
                </div>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={this.closeModal}>&times;</span>
                            <img src={PaperclipIcon} alt="Ícone de clipe de papel" className="icon-paperclip" />
                            <p>Sua senha foi copiada com sucesso!</p>
                            <button onClick={this.closeModal}>Continuar</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default PasswordGen;
