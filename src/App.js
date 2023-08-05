import { BiCurrentLocation } from "react-icons/bi";

import "./App.css";

export default function App() {
  return (
    <div className="wrapper">
      <div className=""></div>
      <button className="nav-location-btn">
        <span className="nav-location-icon">
          <BiCurrentLocation size={27}/>
        </span>
      </button>
    </div>
  );
}
