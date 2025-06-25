import './App.css';
import PasswordGen from './components/PasswordGen';
import IconPassPass from './assets/IconPassPass.svg';
import MatrixRain from './components/MatrixRain';

/**
 * Componente raiz da aplicação PassPass.
 * Implementa layout dividido (split-layout) com painel visual à esquerda e painel funcional à direita.
 *
 * - O painel esquerdo exibe o efeito MatrixRain e o logo centralizado.
 * - O painel direito contém o gerador de senhas (PasswordGen).
 * - O layout é responsivo e utiliza classes CSS para estilização.
 *
 * Observações:
 * - O logo é sobreposto ao efeito MatrixRain usando posicionamento absoluto e z-index.
 * - O MatrixRain pode ser customizado via props para diferentes efeitos visuais.
 * - O PasswordGen é desacoplado e pode ser reutilizado em outros contextos.
 */
function App() {
  return (
    <div className="App split-layout">
      {/* Painel visual com efeito Matrix e logo sobreposto */}
      <div className="left-pane image-pane" style={{ position: 'relative', width: '100%', height: '100%' }}>
        <MatrixRain className="side-image logo-image" />
        <img
          src={IconPassPass}
          alt="Logo PassPass"
          className="side-image logo-image"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            width: '40%',
            height: 'auto',
            pointerEvents: 'none',
            opacity: 0.95
          }}
        />
      </div>
      {/* Painel funcional com o gerador de senhas */}
      <div className="right-pane gradient-pane wider-pane">
        <PasswordGen />
      </div>
    </div>
  );
}

export default App;