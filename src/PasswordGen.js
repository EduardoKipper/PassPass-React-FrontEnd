import React, { Component } from 'react';
import api from './Api';
import './PasswordGen.css';
import PaperclipIcon from './assets/paperclip.svg'
import KeywordInput from './components/KeywordInput';
import GenericButton from './components/GenericButton';
import FilterButton from './components/FilterButton';
import FiltersPanel from './components/FiltersPanel';


class PasswordGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {},
            keyword: ["", "", ""],
            options: {},
            password: '',
            showModal: false,
            showPassword: [false, false, false],
            showGeneratedPassword: false,
            showFiltersPanel: false
        };


    }

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



    gerarSenha = async () => {
        // Monta o body conforme o schema Pydantic do backend, sempre enviando todas as opções
        const { keyword, options } = this.state;
        const reqBody = {
            auth: { user: "" },
            keyword: keyword.filter(k => k && k.trim() !== ''),
            options: {
                chars: Number(options.chars) || 16,
                use_numbers: options.use_numbers !== undefined ? options.use_numbers : true,
                use_special: options.use_special !== undefined ? options.use_special : true,
                only_upper_case: options.only_upper_case !== undefined ? options.only_upper_case : false,
                only_lower_case: options.only_lower_case !== undefined ? options.only_lower_case : false
            }
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

    copiarSenha = () => {
        const { password } = this.state;
        navigator.clipboard.writeText(password);
        this.setState({ showModal: true });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };


    render() {
        const { keyword, password, showModal, options } = this.state;

        return (
            <div className="PassPassGen" style={{ height: '80vh', maxHeight: '80vh', overflowY: (this.state.showFiltersPanel || password) ? 'auto' : 'unset' }}>
                <div className='container'>
                    <h2>Gerador de Senhas</h2>
                    <p>Crie senhas fortes e seguras com base em palavras-chave.</p>
                    <div className='Palavras'>
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
                        <FiltersPanel
                            options={options}
                            onOptionsChange={(opts) => this.setState({ options: opts })}
                        />
                    </div>
                    {password && (
                        <div>
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
