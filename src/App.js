import './App.css';
import PasswordGen from './PasswordGen';
import IconPassPass from './assets/IconPassPass.svg';

function App() {
  return (
    <div className="App split-layout">
      <div className="left-pane image-pane">
        <img
          src={IconPassPass}
          alt="Logo PassPass"
          className="side-image logo-image"
        />
      </div>
      <div className="right-pane gradient-pane wider-pane">
        <PasswordGen />
      </div>
    </div>
  );
}

export default App;