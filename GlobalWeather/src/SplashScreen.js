import React from "react";
import globalweather from "./assets/global-weather.png";
import "./SplashScreen.css";

class SplashScreen extends React.Component {
    render() {
      return (
        <div className="center">
          <img src={globalweather} alt={globalweather}/>
        </div>
      );
    }
}

export default SplashScreen;