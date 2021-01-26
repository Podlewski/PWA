import React from "react";
import "./weather.style.css";
import "./navbar.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solStar } from '@fortawesome/free-solid-svg-icons/';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

const Weather = props => {
  return (
    <div className="container text-light">
      <div className="Card">
        <div className="row justify-content-center py-3">
          {
            props.cityname ? 
              <div className="pr-3">
              <button className="city-button p-1" onClick={props.onFavouriteClick}><h2 className="m-0">
              {
                props.favouriteCity === props.cityname ?
                  <FontAwesomeIcon className="fa-color" icon={solStar} /> :
                  <FontAwesomeIcon className="fa-color" icon={regStar} />
              }
              </h2></button></div> : ""
          }
          <h1 className="text-white">{props.cityname}</h1>
        </div>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`} />
        </h5>

        
        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;</h1>
        ) : null}
        
        {maxminTemp(props.feels_like,props.temp_min, props.temp_max)}

        
        <h4 className="py-3">
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};

export default Weather;

function maxminTemp(feels_like,min, max) {
  if (max && min) {
    return (
      <h3>
        <span className="smallText">min</span>
        <span className="px-4">{min}&deg;</span>
        <span className="smallText">odczuwalna</span>
        <span className="px-4">{feels_like}&deg;</span>
        <span className="smallText">max</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}
