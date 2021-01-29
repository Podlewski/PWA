import React from "react";
import "./navbar.style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solStar } from '@fortawesome/free-solid-svg-icons/';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';

import GoogleButton from 'react-google-button'

const Navbar = props => { 
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
      <div className="container-fluid pl-2">
        <a className="navbar-brand mb-auto" href="./index.html">
          <img
            src="global-weather.png"
            height="60"
            alt="glob"
            loading="lazy"
            />         
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
        </button>
        <div className="justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item my-auto ml-auto px-2">
              {
                props.currentUser ?
                  <div>
                  {
                    props.favouriteCity ?
                      <button className="city-button" onClick={props.onFavouriteClick}>
                        <div>
                          <FontAwesomeIcon className="fa-color pr-1" icon={solStar} />
                          <div className="navbar-text">{props.favouriteCity}</div>
                        </div>
                      </button> : 
                      <div className="my-auto">
                        <FontAwesomeIcon className="fa-color pr-1" icon={regStar} />
                        <div className="navbar-text font-italic"> None </div>
                      </div>
                  }
                  </div> : ""
              }
            </li>
            <li className="nav-item my-auto ml-auto px-2">
              {
                props.currentUser ?
                <div>
                  <input
                    name="weatherNotifications"
                    type="checkbox"
                    // checked={this.state.notification}
                    // onChange={this.handleInputChange}
                    />
                  <div className="pl-2 navbar-text"> Weather change notification </div> 
                </div> : ""
              }
            </li>
            <li className="nav-item my-auto ml-auto px-2">
              {
                props.currentUser ?
                <div className="navbar-text font-weight-bold"> Hello {props.currentUser.displayName} </div> : <div/>
              }
            </li>
            <li className="nav-item ml-auto pl-4">
              {
                props.currentUser ?
                  <button className='btn btn-outline-white waves-effect waves-light'
                      onClick={props.signout}>Sign out</button> :
                  <GoogleButton type="dark" onClick={props.signin} />
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;