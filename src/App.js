import './App.css';
import PasswordGen from './PasswordGen';
import IconPassPass from './assets/IconPassPass.svg';
import MatrixRain from './components/MatrixRain';


function App() {
  return (
    <div className="App split-layout">
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
      <div className="right-pane gradient-pane wider-pane">
        <PasswordGen />
      </div>
    </div>
  );
}

export default App;