import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Loader from './components/Loader/Loader'
import Header from './components/Header/Header'
import Tabs from './components/Tabs/Tabs'
import Map from './components/Map/Map'
import ports from './data/ports'
import axios from 'axios'
const weatherKey = "1a2823f2308b266a4b4ec2d35fe6889f";

class App extends Component {

  state = {
    code: null,
    ferries: [],
    ncferries: [],
    pins: [],
    ncPins: [],
    // pin: this.filteredFerries,
    ncPinData: [],
    terminals: [],
    filterPin: this.props.pins,
    ferryData: null,
    filteredFerries: [],
    map: null,
    search: "",
    isLoading: true,
    timeStamp: null,
    fetchingMessage: 'Data Loading',
    failMessage: 'Data failed to load, try again later.'
  };
  getNCFerries = async () => {
    axios
      .get(

        "https://gisd14.dot.nc.net/GeoRss/FerryGeoJson.ashx"
      )
      .then(response => {

        let timeStamp = Date.now();
        this.setState(() => ({ ncferries: response.data.features, ncPinData: [], terminals: ports, terminalPins: ports, timeStamp, filteredFerries: response.data.features, code: response.data.crs.properties.code }))

        // console.log(response.data)
      }).then((resonse) => {
        this.setState(() => ({ isLoading: false, }));
        console.log(this.state.code)
      })

      .catch(error => {
        console.log(error);
        this.setState(() => ({ fetchingMessage: 'Data failed to load, the service may be temporarily unavailable. Please try again later.' }))
      });
  };
  getWeather = async () => {
    const weatherCall = await fetch(`https://openweathermap.org/data/2.5/group?id=524901,703448,2643743&units=metric&appid=1a2823f2308b266a4b4ec2d35fe6889f`);
    const weatherData = await weatherCall.json();
    console.log(weatherData)
  }
  startCount() {
    setTimeout(() => {
      this.setState(() => ({ fetchingMessage: 'Data failed to load, the service may be temporarily unavailable. Please try again later.' }))
    }, 3000)
  }

  componentDidMount = async () => {
    this.startCount()
    this.getNCFerries()
    this.getWeather()
    setInterval(this.getNCFerries, 60000)

  };

  componentWillUnmount() {
    clearTimeout(this.startCount())
  }
  render() {
    return (
      <div className="App">
        {/* <Header /> */}
        <div id="content-wrapper">
          {
            this.state.isLoading === true || this.state.ncferries.length === 0 ?
              <Loader
                isLoading={this.state.isLoading}
                failMessage={this.state.failMessage}
                fetchingMessage={this.state.fetchingMessage}
                arrayCheck={this.state.ncferries}

              /> :
              <Map
                //ncferries={filteredFerries}
                data={this.state}
              />
          }

          {/* <FerryTable ncferries={this.state.ncferries} /> */}
        </div>
        {/* <Tabs /> */}
      </div>
    );
  }
}

export default App;
