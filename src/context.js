import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

import ports from "./data/ports";
import viewArea from "./data/views";
export const FERRY_ENDPOINT =
  "https://gisd14.dot.nc.net/Ncdotferryfeed/ferrygeojson.ashx";

export const CITY1_WEATHER_ENDPOINT = axios.get(
  "https://api.weather.gov/gridpoints/AKQ/95,27/forecast"
);
export const CITY2_WEATHER_ENDPOINT = axios.get(
  "https://api.weather.gov/gridpoints/MHX/44,41/forecast"
);
export const CITY3_WEATHER_ENDPOINT = axios.get(
  "https://api.weather.gov/gridpoints/ILM/88,67/forecast"
);

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // const [code, setCode] = useState(null);
  // const [farries, setFerries] = useState([]);
  // const [ncfarries, setncFerries] = useState([]);
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
  // const [views, setViews] = useState([]);
  const [state, setState] = useState({
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
    weather: [],
    cityOne: [],
    cityTwo: [],
    cityThree: [],
    cityWeather: [],
    fetchingMessage: "Data Loading",
    failMessage: "Data failed to load, try again later.",
  });

  const getNCFerries = async () => {
    try {
      axios.get(FERRY_ENDPOINT).then((response) => {
        // let time = Date.now();
        setState({
          ncferries: response.data.features,
          terminals: ports,
          timeStamp: Date.now(),
          filteredFerries: response.data.features,
          code: response.data.crs.properties.code,
          isLoading: false,
          views: viewArea,
        });
        // setncFerries(response.data.features);
        // setTeminals(ports);
        // setTimeStamp(Date.now());
        // setfilteredFerries(response.data.features);
        // setCode(response.data.crs.properties.code);
      });
    } catch (error) {
      console.log("error", error);
      state.fetchingMessage(
        "Data failed to load, the service may be temporarily unavailable. Please try again later."
      );
    }
  };
  const getWeather = async () => {
    try {
      axios
        .all([
          CITY1_WEATHER_ENDPOINT,
          CITY2_WEATHER_ENDPOINT,
          CITY3_WEATHER_ENDPOINT,
        ])
        .then(
          axios.spread((res1, res2, res3) => {
            let cityOne = res1.data.properties.periods[0];
            let cityTwo = res2.data.properties.periods[0];
            let cityThree = res3.data.properties.periods[0];
            Object.assign(cityOne, { cityName: "Elizabeth City" });
            Object.assign(cityTwo, { cityName: "New Bern" });
            Object.assign(cityThree, { cityName: "Wilmington" });
            setState({
              cityWeather: [cityOne],
              cityWeather: [cityTwo],
              cityWeather: [cityThree],
            });
            // setCityWeather({ cityWeather: [...cityWeather, cityOne] });
            // setCityWeather({ cityWeather: [...cityWeather, cityTwo] });
            // setCityWeather({ cityWeather: [...cityWeather, cityThree] });
          })
        );
    } catch (error) {
      setState({
        fetchingMessage:
          "Weather data failed to load, the service may be temporarily unavailable. Please try again later.",
      });
      // setFetchingMessage(
      //   "Weather data failed to load, the service may be temporarily unavailable. Please try again later."
      // );
    }
  };

  useEffect(() => {
    getNCFerries();
  }, 6000);
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
