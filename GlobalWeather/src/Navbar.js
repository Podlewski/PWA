import React from "react";
import "./Navbar.css";
import { auth, signInWithGoogle } from './firebase.utils';
import GoogleButton from 'react-google-button'

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
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
              <li class="nav-item my-auto">
                {
                  this.state.currentUser ?
                  <div className="navbar-text"> Hello {this.state.currentUser.displayName} </div> : <div/>
                }
              </li>
              <li class="nav-item pl-4 pr-2">
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