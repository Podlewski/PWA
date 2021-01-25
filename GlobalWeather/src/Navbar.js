import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solStar } from '@fortawesome/free-solid-svg-icons/';
import { faStar as regStar } from '@fortawesome/free-regular-svg-icons';
import { auth, signInWithGoogle } from './firebase.utils';
import GoogleButton from 'react-google-button'

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      favouriteCity: null,
      notification: false,
    };

  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <nav class="navbar navbar-light bg-transparent navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="./index.html">
            <img
              src="global-weather.png"
              height="60"
              alt="glob"
              loading="lazy"
              />         
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item my-auto pr-4">
                {
                  this.state.currentUser ?
                    <div>
                    {
                      this.state.favouriteCity ?
                        <button className="city-button">
                          <div>
                            <FontAwesomeIcon className="fa-color pr-1" icon={solStar} />
                            <div className="navbar-text">City name</div>
                          </div>
                        </button> : 
                        <div class="my-auto">
                          <FontAwesomeIcon className="fa-color pr-1" icon={regStar} />
                          <div className="navbar-text font-italic"> None </div>
                        </div>
                    }
                    </div> : <div/>
                }
              </li>
              <li class="nav-item my-auto pr-4">
                {
                  this.state.currentUser ?
                  <div>
                    <input
                      name="weatherNotifications"
                      type="checkbox"
                      // checked={this.state.notification}
                      // onChange={this.handleInputChange}
                      />
                    <div className="pl-2 navbar-text"> Weather change notification </div> 
                  </div> : <div/>
                }
              </li>
              <li class="nav-item my-auto pr-4">
                {
                  this.state.currentUser ?
                  <div className="navbar-text font-weight-bold"> Hello {this.state.currentUser.displayName} </div> : <div/>
                }
              </li>
              <li class="nav-item pr-2">
                {
                  this.state.currentUser ?
                    <button className='btn btn-outline-white waves-effect waves-light'
                        onClick={() => auth.signOut()}>Sign out</button> :
                    <GoogleButton type="dark" onClick={signInWithGoogle} />
                }
              </li>






            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;