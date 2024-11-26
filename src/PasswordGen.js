import React, { Component } from 'react';
import api from './Api';
import './PasswordGen.css';
import PaperclipIcon from './assets/paperclip.svg'

class PasswordGen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {},
            keyword: ["", "", ""],
            options: {},
            password: '',
            showModal: false,
            showPassword: [false, false, false], // Adicionado para mostrar/ocultar palavras
            showGeneratedPassword: false // Adicionado para mostrar/ocultar senha gerada
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
        const { auth, keyword, options } = this.state;
        const reqBody = { auth, keyword, options };
        console.log(reqBody);
        try {
            const response = await api.post('/api/password', reqBody);
            console.log('Resposta da API:', response.data);
            if (response.data && response.data.password) {
                this.setState({ password: response.data.password });
            } else {
                console.error('Resposta da API não contém senha');
            }
        } catch (error) {
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
        const { keyword, password, showModal } = this.state;
    
        return (
            <div className="PassPassGen">
                <h1>PassPass</h1>
                <div className='container'>
                    <div className='Palavras'>
                        <div className='palavras'>
                            <label htmlFor="palavra1">Palavra 1</label>
                            <input
                                type="text"
                                name="palavra1"
                                placeholder="  Digite aqui sua palavra chave"
                                value={keyword[0]}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='palavras'>
                            <label htmlFor="palavra2">Palavra 2</label>
                            <input
                                type="text"
                                name="palavra2"
                                placeholder="  Digite aqui sua palavra chave"
                                value={keyword[1]}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className='palavras'>
                            <label htmlFor="palavra3">Palavra 3</label>
                            <input
                                type="text"
                                name="palavra3"
                                placeholder="  Digite aqui sua palavra chave"
                                value={keyword[2]}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <button onClick={this.gerarSenha}>Gerar Senha</button>
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
