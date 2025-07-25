import logo from './logo.svg';
import './App.css';
import Map from './Map';

function App() {
  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // full viewport height
        backgroundColor: '#f0f0f0',
      }}
    >
      <Map />
    </div>
  );
}

export default App;
