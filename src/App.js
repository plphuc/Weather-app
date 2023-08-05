import { BiCurrentLocation } from 'react-icons/bi';

import './App.css';

function App() {
  return (
    <div className="wrapper">
      <button className="nav-location-btn">
        <span className="nav-location-icon">
          <BiCurrentLocation size={27} />
        </span>
      </button>
    </div>
  );
}

export default App;
