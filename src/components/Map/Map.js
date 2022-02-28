import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  Paper,
  Tabs,
  Tab,
  ListItem,
  withStyles,
  CssBaseline,
} from "@material-ui/core";

import { TwitterTimelineEmbed } from "react-twitter-embed";

import TerminalIcon from "../images/TerminalIcon";
import FerryIcon from "../images/FerryIcon";
import TwitterIcon from "../images/TwitterIcon";
import WeatherIcon from "../images/WeatherIcon";
import LinksIcon from "../images/LinksIcon";

import "./Map.css";
import views from "../../data/views";
import ports from "../../data/ports";

import Header from "../Header/Header";
import Contact from "../Contact/Contact";
import Pin from "../Pin/Pin";
import Boat from "../Boat/Boat";
import CityWeather from "../CityWeather/CityWeather";
import TerminalTable from "../TerminalTable/TerminalTable";
import FerryTable from "../FerryTable/FerryTable";
import Tbl from "../Tbl/Tbl";
import { useGlobalContext } from "../../context";
const drawerWidth = "auto";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  tabs: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  noSmall: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  onSmallTable: {
    padding: 5,
    [theme.breakpoints.up("sm")]: {
      padding: 10,
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  table: {
    minWidth: 370,
    maxWidth: 500,
  },
  tableHeader: {
    backgroundColor: "#1a237e",
  },
  tableHeaderFont: {
    fontSize: "16px",
    color: "#fff",
  },
  tabContainer: {
    justifyContent: "center",
  },
  twitterIcon: {
    height: 24,
    width: 24,
  },
});
const Map = () => {
  const {
    ncferries,
    pins,
    ncPins,
    ferryData,
    timeStamp,
    cityWeather,
    views,
  } = useGlobalContext();
  // const [map, setMap] = useState(null);
  // const [selectedView, setSelectedView] = useState([]);
  // const [ferries, setFerries] = useState([]);
  // const [VesselIDs, setVesselIDs] = useState([]);
  // const [terminalLocation, setTerminalLocation] = useState(null);
  // const [terminalPushpin, setTerminalPushpin] = useState(null);
  // const [anchor, setAnchor] = useState(null);
  // const [infoBox, setInfobox] = useState(null);
  // const [terminalPinData, setTerminalPinData] = useState([]);
  // const [ncPinData, setNcPinData] = useState([]);
  // const [ferryLayer, setFerryLayer] = useState(null);
  // const [terminalLayer, setTerminalLayer] = useState(null);
  // const [filteredTerminals, setFilteredTerminals] = useState([]);
  // const [newView, setNewView] = useState([]);
  // const [layer, setLayer] = useState(null);
  // const [rerender, setRerender] = useState(false);
  // const [boatPins, setBoatPins] = useState([]);
  // const [terminalPin, setTerminalPin] = useState([]);
  // const [ferryDrawer, setFerryDrawer] = useState(false);
  // const [twitterDrawer, setTwitterDrawer] = useState(false);
  // const [contactDrawer, setContactDrawer] = useState(false);
  // const [toggleDrawer, setToggleDrawer] = useState(false);
  // const [weatherDrawer, setWeatherDrawer] = useState(false);
  // const [tabValue, setTabValue] = useState(0);
  // const [cities, setCities] = useState(cityWeather);
  // const [compTimeStamp, setTimpStamp] = useState(null);

  const [state, setState] = useState({
    mapState: null,
    ferryDrawer: false,
    twitterDrawer: false,
    contactDrawer: false,
    ferryDrawer: false,
    weatherDrawer: false,
    map: null,
    selectedView: [],
    ferries: [],
    VesselIDs: [],
    terminalLayer: null,
    terminalPin: null,
    anchor: null,
    infoBox: null,
    terminalPinData: [],
    newView: [],
    layer: null,
    boatPins: [],
    terminalPin: [],
    tabValue: 0,
    cities: cityWeather,
    compTimeStamp: null,
    ferryLayer: null,
  });
  useEffect(() => {
    renderMap();
  }, []);
  useEffect(() => {
    if (ncferries !== state.ferries) {
      // setFerries(ncferries);
      setState({
        ...state,
        ferries: ncferries,
      });
      // setTimeStamp(timeStamp);
    }
  }, [ncferries]);
  // useEffect(()=>{
  //   if(cityWeather !== cities){
  //     setCities(cityWeather);
  //     map.entities.clear();
  //     map.layers.clear();
  //   }
  // },[cityWeather]);

  /* render data */
  const renderMap = () => {
    loadScript(
      "https://www.bing.com/api/maps/mapcontrol?key=AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi&callback=loadMapScenario"
    );
    window.loadMapScenario = loadMapScenario;
  };
  const loadMapScenario = async () => {
    let lat = views[0].geometry.coordinates[0];
    let lng = views[0].geometry.coordinates[1];

    setState({
      ...state,
      mapState: new window.Microsoft.Maps.Map(document.getElementById("map"), {
        center: new window.Microsoft.Maps.Location(lat, lng),
        mapTypeId: window.Microsoft.Maps.MapTypeId.road,
        zoom: views[0].properties.zoom,
        mapTypeId: window.Microsoft.Maps.MapTypeId.canvasLight,
        customMapStyle: {
          elements: {
            mapElement: { labelColor: "#4b5963" },
            // water: { fillColor: '#C0E4FF' },
            // tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
            // arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
            // road: { fillColor: '#687d8c', strokeColor: '#687d8c' },
            // street: { fillColor: '#ffffff', strokeColor: '#ffffff' },
            // transit: { fillColor: '#000000' }
          },
          // settings: {
          //     landColor: '#f9f8e8'
          // }
        },
      }),
    });

    // const bingMap = new window.Microsoft.Maps.Map(
    //   document.getElementById("map"),
    //   {
    //     center: new window.Microsoft.Maps.Location(lat, lng),
    //     mapTypeId: window.Microsoft.Maps.MapTypeId.road,
    //     zoom: views[0].properties.zoom,
    //     mapTypeId: window.Microsoft.Maps.MapTypeId.canvasLight,
    //     customMapStyle: {
    //       elements: {
    //         mapElement: { labelColor: "#4b5963" },
    //         // water: { fillColor: '#C0E4FF' },
    //         // tollRoad: { fillColor: '#a964f4', strokeColor: '#a964f4' },
    //         // arterialRoad: { fillColor: '#ffffff', strokeColor: '#d7dae7' },
    //         // road: { fillColor: '#687d8c', strokeColor: '#687d8c' },
    //         // street: { fillColor: '#ffffff', strokeColor: '#ffffff' },
    //         // transit: { fillColor: '#000000' }
    //       },
    //       // settings: {
    //       //     landColor: '#f9f8e8'
    //       // }
    //     },
    //   }
    // );

    // setState({
    //   ...state,
    //   terminalLayer: new window.Microsoft.Maps.Layer(),
    //   ferryLayer: new window.Microsoft.Maps.Layer(),
    //   anchor: new window.Microsoft.Maps.Point(0, 0),
    //   terminalPushpin: new window.Microsoft.Maps.Pushpin(lat, lng),
    // });
    let terminalPushpin = new window.Microsoft.Maps.Pushpin(lat, lng);
    var layer = new window.Microsoft.Maps.Layer();
    let anchor = new window.Microsoft.Maps.Point(0, 0);
    let ferryLayer = new window.Microsoft.Maps.Layer();
    let terminalLayer = new window.Microsoft.Maps.Layer();
    terminalLayer.metadata = { id: "terminalLayer" };

    setState(() => ({
      // map,
      terminalPushpin,
      anchor,
      layer,
      ferryLayer,
      terminalLayer,
    }));
  };

  //Change map view
  const onClickView = (props) => {
    let updatedView = props;
    //console.log(updatedView)
    // bingMap.setView({
    //   center: new window.Microsoft.Maps.Location(
    //     updatedView[1],
    //     updatedView[0]
    //   ),
    //   zoom: updatedView[2],
    // });
    setState({
      ...state,
      mapState: mapState.setView({
        center: new window.Microsoft.Maps.Location(
          updatedView[1],
          updatedView[0]
        ),
        zoom: updatedView[2],
      }),
    });
    //mapState.setView({
    //   center: new window.Microsoft.Maps.Location(
    //     updatedView[1],
    //     updatedView[0]
    //   ),
    //   zoom: updatedView[2],
    // });
  };
  //Change terminal view
  const onClickTeminalView = (props) => {
    let updatedView = props;
    //console.log(updatedView)
    // bingMap.setView({
    //   center: new window.Microsoft.Maps.Location(
    //     updatedView[0],
    //     updatedView[1]
    //   ),
    //   zoom: updatedView[2],
    // });
    setState({
      ...state,
      mapState: mapState.setView({
        center: new window.Microsoft.Maps.Location(
          updatedView[0],
          updatedView[1]
        ),
        zoom: updatedView[2],
      }),
    });
    // bingMap.setView({
    //   center: new window.Microsoft.Maps.Location(
    //     updatedView[0],
    //     updatedView[1]
    //   ),
    //   zoom: updatedView[2],
    // });
  };

  //change ferry view
  const onClickFerryView = (props) => {
    let updatedView = props;
    //console.log(props);
    // bingMap.setView({
    //   center: new window.Microsoft.Maps.Location(
    //     updatedView[0],
    //     updatedView[1]
    //   ),
    //   zoom: updatedView.speed === "0 knots" ? 16 : 12,
    // });
    setState({
      ...state,
      mapState: mapState.setView({
        center: new window.Microsoft.Maps.Location(
          updatedView[0],
          updatedView[1]
        ),
        zoom: updatedView.speed === "0 knots" ? 16 : 12,
      }),
    });
    // bingMap.setView({
    //   center: new window.Microsoft.Maps.Location(
    //     updatedView[0],
    //     updatedView[1]
    //   ),
    //   zoom: updatedView.speed === "0 knots" ? 16 : 12,
    // });
  };

  //render terminal and ferry pins
  const renderTerminalPin = (
    Latitude,
    Longitude,
    terminalName,
    terminalIcon,
    terminalPin,
    terminalLocation,
    terminalDescription
  ) => {
    setState({
      ...state,
      terminalLayer: terminalLayer.add(terminalPin),
      mapState: mapState.entities.push(terminalPin),
    });
    // terminalLayer.add(terminalPin);
    // bingMap.entities.push(terminalPin);

    let infoboxTemplate = `<div id="infoboxText" style="background-color:White; border-style:solid; border-width:medium; border-color:#1a237e; min-height:160px; width: 240px; border-radius:7px;line-height: 1.2;">
    <b id="infoboxTitle" style="position: absolute; top: 10px; left: 10px; width: 220px; ">{title}</b>
    <p id="infoboxDescription" style="position: absolute; top: 45px; left: 10px; width: 220px;color:#1a237e ">{description}</p></div>`;

    let infobox = new window.Microsoft.Maps.Infobox(terminalLocation, {
      htmlContent: infoboxTemplate
        .replace("{title}", terminalName)
        .replace("{description}", terminalDescription),

      showCloseButton: true,
      offset: new window.Microsoft.Maps.Point(-110, 30),
      visible: false,
    });
    infobox.setMap(bingMap);
    window.Microsoft.Maps.Events.addHandler(terminalPin, "click", function () {
      infobox.setOptions({ visible: true });
    });

    window.Microsoft.Maps.Events.addHandler(map, "click", function () {
      infobox.setOptions({ visible: false });
    });
  };

  const renderBoatPin = (
    boatId,
    COG,
    Latitude,
    Longitude,
    VesselName,
    SOG,
    boatIcon,
    boatPin,
    boatLocation,
    summary,
    time
  ) => {
    setstate({ ...state, boatPins: [...boatPins, boatPin] });
    ferryLayer.add(boatPin);
    bingMap.entities.push(boatPin);

    let boatInfobox = new window.Microsoft.Maps.Infobox(boatLocation, {
      visible: false,
    });

    boatInfobox.setMap(bingMap);
    window.Microsoft.Maps.Events.addHandler(boatPin, "click", function () {
      boatInfobox.setOptions({
        visible: true,
        title: VesselName,
        description: summary,
        maxHeight: 250,
        maxWidth: 250,
      });
    });
  };
  const toggleDrawer = (side, open) => () => {
    setToggleDrawer({
      ...state,
      [side]: open,
    });
  };
  const handleTabChange = (event, value) => {
    setTabValue({ tabValue: value });
  };

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };

  const { classes } = props;
  const { open } = state;

  return (
    <div id="all-content">
      <Header position="fixed" className={classes.appBar} />
      <div id="map-content">
        <CssBaseline />
        <div id="mapHolder" className={classes.root}>
          <div
            id="map"
            className={
              (classes.content,
              {
                [classes.contentShift]: open,
              })
            }
          >
            <div className={classes.drawerHeader} />
            {terminals.map((terminal, index) => {
              return (
                <Pin
                  key={index}
                  bingMap={bingMap}
                  terminalName={terminal.properties.title}
                  terminalAddress={terminal.properties.address}
                  terminalPhone={terminal.properties.phone}
                  Latitude={`${terminal.geometry.coordinates[1]}`}
                  Longitude={`${terminal.geometry.coordinates[0]}`}
                  renderTerminalPin={renderTerminalPin}
                  siteLink={terminal.properties.Site}
                />
              );
            })}

            {state.ferries.map((ferry) => (
              <Boat
                key={ferry.properties["Vessel Name"]}
                bingMap={bingMap}
                boatId={ferry.id}
                COG={ferry.properties.COG}
                Latitude={ferry.properties.Latitude}
                Longitude={ferry.properties.Longitude}
                VesselName={ferry.properties["Vessel Name"]}
                summary={ferry.properties.summary}
                SOG={ferry.properties.SOG}
                time={ferry.properties.Time}
                timeStamp={`${timeStamp}`}
                renderBoatPin={renderBoatPin}
              />
            ))}
          </div>
          <div id="drawers">
            <Drawer
              open={state.terminalDrawer}
              //variant="persistent"
              onClose={toggleDrawer("terminalDrawer", false)}
              onClick={toggleDrawer("terminalDrawer", false)}
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("terminalDrawer", false)}
                onKeyDown={toggleDrawer("terminalDrawer", false)}
              />
              <div className="viewDrawer">
                <TerminalTable views={views} onClickView={onClickView} />
              </div>
            </Drawer>
            <Drawer
              anchor="left"
              open={ferryDrawer}
              //variant="persistent"
              onClose={toggleDrawer("ferryDrawer", false)}
              onClick={toggleDrawer("ferryDrawer", false)}
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("ferryDrawer", false)}
                onKeyDown={toggleDrawer("ferryDrawer", false)}
              />
              <div className="FerryTable">
                <FerryTable
                  terminals={terminals}
                  ferries={ferries}
                  onClickFerryView={onClickFerryView}
                  onClickTeminalView={onClickTeminalView}
                />
              </div>
            </Drawer>

            <Drawer
              anchor="left"
              open={twitterDrawer}
              //variant="persistent"
              onClose={toggleDrawer("twitterDrawer", false)}
              onClick={toggleDrawer("twitterDrawerr", false)}
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("twitterDrawer", false)}
                onKeyDown={toggleDrawer("twitterDrawer", false)}
              />
              <div id="twitter">
                <TwitterTimelineEmbed
                  sourceType="profile"
                  screenName="NCDOT_Ferry"
                  options={{ height: 500 }}
                />
              </div>
            </Drawer>
            <Drawer
              anchor="left"
              open={state.weatherDrawer}
              //variant="persistent"
              onClose={toggleDrawer("weatherDrawer", false)}
              onClick={toggleDrawer("weatherDrawer", false)}
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("weatherDrawer", false)}
                onKeyDown={toggleDrawer("weatherDrawer", false)}
              />
              <div id="weather">
                {/* {cities} */}
                {state.cities.map((city, index) => {
                  return (
                    <CityWeather
                      key={index}
                      detailedForecast={city.detailedForecast}
                      icon={city.icon}
                      timeFrame={city.name}
                      shortForecast={city.shortForecast}
                      temperature={city.temperature}
                      temperatureUnit={city.temperatureUnit}
                      cityName={city.cityName}
                    />
                  );
                })}
              </div>
            </Drawer>
            <Drawer
              anchor="left"
              open={state.contactDrawer}
              //variant="persistent"
              onClose={toggleDrawer("contactDrawer", false)}
              onClick={toggleDrawer("contactDrawer", false)}
              className={classes.drawer}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={toggleDrawer("contactDrawer", false)}
                onKeyDown={toggleDrawer("contactDrawer", false)}
              />
              <div id="contact">
                <Contact />
              </div>
            </Drawer>
          </div>
          {/* end of drawers */}
        </div>
        {/* end of mapholder */}

        <div id="tabHolder">
          <Paper square className={(classes.root, classes.tabContainer)}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="primary"
            >
              <Tab
                icon={<FerryIcon />}
                label="Ferries"
                onClick={toggleDrawer("ferryDrawer", true)}
              />
              <Tab
                icon={<TerminalIcon />}
                label="Terminals"
                onClick={toggleDrawer("terminalDrawer", true)}
              />
              <Tab
                //className={classes.noSmall}
                icon={<TwitterIcon />}
                label="Twitter"
                fontSize="small"
                onClick={toggleDrawer("twitterDrawer", true)}
              />
              <Tab
                className={classes.noSmall}
                icon={<WeatherIcon />}
                label="Weather"
                onClick={toggleDrawer("weatherDrawer", true)}
              />
              <Tab
                icon={<LinksIcon />}
                label="Links"
                onClick={toggleDrawer("contactDrawer", true)}
              />
            </Tabs>
          </Paper>
        </div>
      </div>
      {/* end of map-content */}
    </div>
  );
};
//this function has to be outside of component
function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");

  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}
Map.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Map);
