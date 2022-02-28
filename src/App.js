import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader/Loader";
import Map from "./components/Map/Map";
import ports from "./data/ports";
import axios from "axios";

import { useGlobalContext } from "./context";
const App = () => {
  const {
    isLoading,
    fetchingMessage,
    failMessage,
    ncferries,
  } = useGlobalContext();
  // const [code, setCode] = useState(null);
  // const [farries, setFerries] = useState([]);
  // const [ncferries, setncFerries] = useState([]);
  // const [pins, setPins] = useState([]);
  // const [ncPins, setncPins] = useState([]);
  // const [terminals, setTeminals] = useState([]);
  // const [filterPin, setFilerPin] = useState(null);
  // const [ferryData, setFerryData] = useState(null);
  // const [filteredFerries, setfilteredFerries] = useState([]);
  // const [map, setMaps] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [timeStamp, setTimeStamp] = useState(null);
  // const [weather, setWeather] = useState([]);
  // const [search, setSearch] = useState("");
  // const [cityOne, setCityOne] = useState([]);
  // const [cityTwo, setCityTwo] = useState([]);
  // const [cityThree, setCityThree] = useState([]);
  // const [cityWeather, setCityWeather] = useState([]);
  // const [fetchingMessage, setFetchingMessage] = useState("Data Loading");
  // const [failMessage, setFailMessage] = useState(
  //   "Data failed to load, try again later."
  // );
  // const [isError, setIsError] = useState(false);

  // //get ferry data
  // const FERRY_ENDPOINT =
  //   "https://gisd14.dot.nc.net/Ncdotferryfeed/ferrygeojson.ashx";

  // const getNCFerries = async () => {
  //   try {
  //     axios
  //       .get(FERRY_ENDPOINT)
  //       .then((response) => {
  //         setncFerries(response.data.features);
  //         setTeminals(ports);
  //         setTimeStamp(Date.now());
  //         setfilteredFerries(response.data.features);
  //         setCode(response.data.crs.properties.code);
  //       })
  //       .then(() => {
  //         setIsLoading(false);
  //       });
  //   } catch (error) {
  //     console.log("error", error);
  //     setFetchingMessage(
  //       "Data failed to load, the service may be temporarily unavailable. Please try again later."
  //     );
  //   }
  // };
  // const startCount = () => {
  //   setTimeout(() => {
  //     setFetchingMessage(
  //       "Data failed to load, the service may be temporarily unavailable. Please try again later."
  //     );
  //   }, 4000);
  // };

  // retrieve weather data

  // const CITY1 = axios.get(
  //   "https://api.weather.gov/gridpoints/AKQ/95,27/forecast"
  // );
  // const CITY2 = axios.get(
  //   "https://api.weather.gov/gridpoints/MHX/44,41/forecast"
  // );
  // const CITY3 = axios.get(
  //   "https://api.weather.gov/gridpoints/ILM/88,67/forecast"
  // );

  // const getWeather = async () => {
  //   try {
  //     axios.all([CITY1, CITY2, CITY3]).then(
  //       axios.spread((res1, res2, res3) => {
  //         let cityOne = res1.data.properties.periods[0];
  //         let cityTwo = res2.data.properties.periods[0];
  //         let cityThree = res3.data.properties.periods[0];
  //         Object.assign(cityOne, { cityName: "Elizabeth City" });
  //         Object.assign(cityTwo, { cityName: "New Bern" });
  //         Object.assign(cityThree, { cityName: "Wilmington" });
  //         setCityWeather({ cityWeather: [...cityWeather, cityOne] });
  //         setCityWeather({ cityWeather: [...cityWeather, cityTwo] });
  //         setCityWeather({ cityWeather: [...cityWeather, cityThree] });
  //       })
  //     );
  //   } catch (error) {
  //     setFetchingMessage(
  //       "Weather data failed to load, the service may be temporarily unavailable. Please try again later."
  //     );
  //   }
  // };

  // useEffect(() => {
  //   getNCFerries();
  // }, 6000);
  // setInterval(getNCFerries, 6000);

  // useEffect(() => {
  //   getWeather();
  // }, [getWeather]);
  // setInterval(getWeather, 23200000);

  return (
    <div className="App">
      {/* <Header /> */}
      <div id="content-wrapper">
        {isLoading === true || ncferries.length === 0 ? (
          <Loader
            isLoading={isLoading}
            failMessage={failMessage}
            fetchingMessage={fetchingMessage}
            arrayCheck={ncferries}
          />
        ) : (
          <Map
          //ncferries={filteredFerries}
          // data={{ farries, ncferries, pins, ncPins, ferryData, timeStamp }}
          />
        )}

        <div id="legend">
          <h4>Legend</h4>
          <div id="legend-body">
            <p>Terminal / Dock</p>
            <img
              src={require("./components/images/terminal.png")}
              alt="terminal icon"
            />
            <p>Ferry Underway</p>
            <img
              src={require("./components/images/ferry-icon.png")}
              alt="ferry icon"
            />
            <p>Ferry Docked</p>
            <img
              src={require("./components/images/docked.png")}
              alt="dock icon"
            />
          </div>
        </div>
      </div>
      {/* <Tabs /> */}
    </div>
  );
};
export default App;
// class App extends Component {
//   state = {
//     code: null,
//     ferries: [],
//     ncferries: [],
//     pins: [],
//     ncPins: [],
//     // pin: this.filteredFerries,
//     ncPinData: [],
//     terminals: [],
//     filterPin: this.props.pins,
//     ferryData: null,
//     filteredFerries: [],
//     map: null,
//     search: "",
//     isLoading: true,
//     timeStamp: null,
//     weather: [],
//     cityOne: [],
//     cityTwo: [],
//     cityThree: [],
//     cityWeather: [],
//     fetchingMessage: "Data Loading",
//     failMessage: "Data failed to load, try again later.",
//   };
//   getNCFerries = async () => {
//     axios
//       .get("https://gisd14.dot.nc.net/Ncdotferryfeed/ferrygeojson.ashx")
//       .then((response) => {
//         let timeStamp = Date.now();
//         //console.log(response.data.features);
//         this.setState(() => ({
//           ncferries: response.data.features,
//           ncPinData: [],
//           terminals: ports,
//           terminalPins: ports,
//           timeStamp,
//           filteredFerries: response.data.features,
//           code: response.data.crs.properties.code,
//         }));

//         console.log(this.state);
//       })
//       .then((resonse) => {
//         this.setState(() => ({ isLoading: false }));
//         // console.log(this.state.code)
//       })

//       .catch((error) => {
//         console.log(error);
//         this.setState(() => ({
//           fetchingMessage:
//             "Data failed to load, the service may be temporarily unavailable. Please try again later.",
//         }));
//       });
//   };
//   getCityThree = async () => {
//     axios
//       .get("https://api.weather.gov/gridpoints/ILM/88,67/forecast ")
//       .then((response) => {
//         let cityThree = response.data.properties.periods[0];
//         Object.assign(cityThree, { cityName: "Wilmington" });
//         this.setState({ cityWeather: [...this.state.cityWeather, cityThree] });
//       })

//       .catch((error) => {
//         console.log(error);
//         this.setState(() => ({
//           fetchingMessage:
//             "Data failed to load, the service may be temporarily unavailable. Please try again later.",
//         }));
//       });
//   };
//   getCityTwo = async () => {
//     axios
//       .get("https://api.weather.gov/gridpoints/MHX/44,41/forecast ")
//       .then((response) => {
//         let cityTwo = response.data.properties.periods[0];
//         Object.assign(cityTwo, { cityName: "New Bern" });
//         this.setState({ cityWeather: [...this.state.cityWeather, cityTwo] });
//       })

//       .catch((error) => {
//         console.log(error);
//         this.setState(() => ({
//           fetchingMessage:
//             "Data failed to load, the service may be temporarily unavailable. Please try again later.",
//         }));
//       });
//   };
//   getCityOne = async () => {
//     axios
//       .get("https://api.weather.gov/gridpoints/AKQ/95,27/forecast ")
//       .then((response) => {
//         let cityOne = response.data.properties.periods[0];
//         Object.assign(cityOne, { cityName: "Elizabeth City" });
//         this.setState({ cityWeather: [...this.state.cityWeather, cityOne] });
//       })

//       .catch((error) => {
//         console.log(error);
//         this.setState(() => ({
//           fetchingMessage:
//             "Data failed to load, the service may be temporarily unavailable. Please try again later.",
//         }));
//       });
//   };

//   startCount() {
//     setTimeout(() => {
//       this.setState(() => ({
//         fetchingMessage:
//           "Data failed to load, the service may be temporarily unavailable. Please try again later.",
//       }));
//     }, 4000);
//   }

//   componentDidMount = async () => {
//     //this.startCount();
//     this.getNCFerries();
//     this.getCityOne();
//     this.getCityTwo();
//     this.getCityThree();

//     setInterval(this.getNCFerries, 60000);
//     // setInterval(this.getWeather, 23200000);
//   };

//   componentWillUnmount() {
//     clearTimeout(this.startCount());
//   }
//   render() {
//     return (
//       <div className="App">
//         {/* <Header /> */}
//         <div id="content-wrapper">
//           {this.state.isLoading === true ||
//           this.state.ncferries.length === 0 ? (
//             <Loader
//               isLoading={this.state.isLoading}
//               failMessage={this.state.failMessage}
//               fetchingMessage={this.state.fetchingMessage}
//               arrayCheck={this.state.ncferries}
//             />
//           ) : (
//             <Map
//               //ncferries={filteredFerries}
//               data={this.state}
//             />
//           )}

//           <div id="legend">
//             <h4>Legend</h4>
//             <div id="legend-body">
//               <p>Terminal / Dock</p>
//               <img
//                 src={require("./components/images/terminal.png")}
//                 alt="terminal icon"
//               />
//               <p>Ferry Underway</p>
//               <img
//                 src={require("./components/images/ferry-icon.png")}
//                 alt="ferry icon"
//               />
//               <p>Ferry Docked</p>
//               <img
//                 src={require("./components/images/docked.png")}
//                 alt="dock icon"
//               />
//             </div>
//           </div>
//         </div>
//         {/* <Tabs /> */}
//       </div>
//     );
//   }
// }

// export default App;
