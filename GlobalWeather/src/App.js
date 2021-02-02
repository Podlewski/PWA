import React from "react";
import "./App.css";
import firebase, { auth, signInWithGoogle } from './firebase';
import Navbar from "./app_component/navbar.component";
import Form from "./app_component/form.component";
import Weather from "./app_component/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import "bootstrap-css-only/css/bootstrap.min.css"; 
import "mdbreact/dist/css/mdb.css";
import "weather-icons/css/weather-icons.css";
import cloudicon from "./assets/cloudicon.png"
import SplashScreen from "./SplashScreen"

const Api_Key = "429736441cf3572838aa10530929f7cd";

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      city: undefined,
      country: undefined,
      favouriteCity: undefined,
      favouriteCountry: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      feels_like: null,
      temp_max: null,
      temp_min: null,
      description: "",
      renderSplashScreen: true,
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });

      if (user) {
        firebase.firestore().collection('favourites').doc(user.uid).get()
          .then( (item) => {
            this.setState({
              favouriteCity: item.get("city"),
              favouriteCountry: item.get("country")
            })
          })
      }
    })
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
    this.handleLoad.bind(this)
  }

  handleLoad() {
    wait(2000)
    this.setState({ renderSplashScreen: false });
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        break;
      default:
        this.setState({ icon: icons.Clouds });
    }
  }

  calCelsius(temp) {
    let cell = Math.round(temp - 273.15);
    return cell;
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
  
    this.loadWeather(city, country)
  }

  loadFavouriteWetaher = () => {
    this.loadWeather(this.state.favouriteCity, this.state.favouriteCountry)
  }

  loadWeather = async (city, country) => {
    if (country && city) {
      if (city.trim().toLowerCase() === 'łódź') {
        city = 'Lodz'
      }
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
      );

      const response = await api_call.json();

      this.setState({
        city: response.name,
        country: response.sys.country,
        main: response.weather[0].main,
        celsius: this.calCelsius(response.main.temp),
        feels_like: this.calCelsius(response.main.feels_like),
        temp_max: this.calCelsius(response.main.temp_max),
        temp_min: this.calCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false
      });

      this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);

      console.log(response);
    } else {
      this.setState({
        error: true
      });
    }
  };

  addCityToFavourite = () =>
  {  
    this.setState({
      favouriteCity: this.state.city,
      favouriteCountry: this.state.country,
    })

    firebase.firestore().collection('favourites').doc(this.state.currentUser.uid)
      .set({
        city: this.state.city,
        country: this.state.country
      })
  }

  render() {
    if(this.state.renderSplashScreen){
      return (<SplashScreen/>)
    }

    return (
      <div className="App">
        <Navbar 
          signin={signInWithGoogle}
          signout={() => auth.signOut()}
          currentUser={this.state.currentUser}
          favouriteCity={this.state.favouriteCity}
          favouriteCountry={this.state.favouriteCountry}
          onFavouriteClick={this.loadFavouriteWetaher}
        />
        <img src={cloudicon} className="backlogo" alt={cloudicon} />
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          cityname={this.state.city}
          countryName={this.state.country}
          currentUser={this.state.currentUser}
          onFavouriteClick={this.addCityToFavourite}
          favouriteCity={this.state.favouriteCity}
          weatherIcon={this.state.icon}
          temp_celsius={this.state.celsius}
          feels_like={this.state.feels_like}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;

