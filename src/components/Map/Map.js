import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    Paper,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    ListItem,
    withStyles,
    CssBaseline
} from "@material-ui/core";

import classNames from "classnames";


import {
    TwitterTimelineEmbed,
} from "react-twitter-embed";

import TerminalIcon from "../images/TerminalIcon";
import FerryIcon from "../images/FerryIcon";
import TwitterIcon from "../images/TwitterIcon";
import WeatherIcon from "../images/WeatherIcon";
import LinksIcon from "../images/LinksIcon";

import "./Map.css";
import views from "../../data/views";

import Header from "../Header/Header";
import Contact from "../Contact/Contact";
import Pin from "../Pin/Pin";
import Boat from "../Boat/Boat";
import CityWeather from '../CityWeather/CityWeather'
import TerminalTable from '../TerminalTable/TerminalTable'
import FerryTable from '../FerryTable/FerryTable'
import Tbl from '../Tbl/Tbl'

const drawerWidth = "auto";
const styles = theme => ({
    root: {
        display: "flex"
    },
    tabs: {
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20
    },
    hide: {
        display: "none"
    },
    noSmall: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block"
        }
    },
    onSmallTable: {
        padding: 5,
        [theme.breakpoints.up("sm")]: {
            padding: 10
        }
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: "0 8px",
        ...theme.mixins.toolbar,
        justifyContent: "flex-end"
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    },
    table: {
        minWidth: 370,
        maxWidth: 500
    },
    tableHeader: {
        backgroundColor: '#1a237e',
    },
    tableHeaderFont: {
        fontSize: '16px',
        color: '#fff'
    },
    tabContainer: {
        justifyContent: "center"
    },
    twitterIcon: {
        height: 24,
        width: 24
    }
});
class Map extends Component {
    state = {
        map: null,
        ferries: [],
        selectedView: [],
        VesselIDs: [],
        terminals: [],
        terminalLocation: null,
        terminalPushpin: null,
        anchor: null,
        infobox: null,
        terminalPinData: [],
        ncPinData: [],
        ferryLayer: null,
        terminalLayer: null,
        filteredTerminals: [],
        filteredFerries: [],
        filterString: "",
        search: "",
        views: [],
        newView: [],
        cities: [],
        layer: null,
        renderFinished: false,
        boatPins: [],
        terminalPins: [],
        timeStamp: null,
        weather: [],
        terminalDrawer: false,
        ferryDrawer: false,
        twitterDrawer: false,
        contactDrawer: false,
        weatherDrawer: false,
        tabValue: 0
    };

    /* init*/
    componentDidMount = async () => {
        this.setState(() => ({
            views: views,
            ferries: this.props.data.ncferries,
            terminals: this.props.data.terminals,
            filteredTerminals: this.props.data.terminals,
            timeStamp: this.props.data.timeStamp,
            filteredFerries: this.props.data.ncferries,
            weather: this.props.data.weather,
            cities: this.props.data.cityWeather
        }));

        this.renderMap();
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.ncferries !== this.state.ferries) {
            //this.state.map.entities.clear();
            //this.state.map.layers.clear();
            this.setState(() => ({
                ferries: this.props.data.ncferries,
                timeStamp: this.props.data.timeStamp
            }));
            //this.state.map.layers.insert(this.state.terminalLayer);
        }
        if (this.props.data.cityWeather !== this.state.cities) {
            this.setState(() => ({ cities: this.props.data.cityWeather }))
        }

        if (this.props.data.timeStamp !== this.state.timeStamp && this.state.timeStamp !== null) {
            this.state.map.entities.clear();
            this.state.map.layers.clear();
            //console.log(this.state.timeStamp);
        }

    }

    /* render data */
    renderMap = () => {
        loadScript(
            "https://www.bing.com/api/maps/mapcontrol?key=AsYvNI-GHrtArcRybTU256h6zvO5I3G9zzdC0kFwiXkdoA81Ux9RRPSjxm_o_Aqi&callback=loadMapScenario"
        );
        window.loadMapScenario = this.loadMapScenario;
    };
    loadMapScenario = async () => {
        let lat = this.state.views[0].geometry.coordinates[0];
        let lng = this.state.views[0].geometry.coordinates[1];

        const map = new window.Microsoft.Maps.Map(document.getElementById("map"), {
            center: new window.Microsoft.Maps.Location(lat, lng),
            mapTypeId: window.Microsoft.Maps.MapTypeId.road,
            zoom: this.state.views[0].properties.zoom,
            mapTypeId: window.Microsoft.Maps.MapTypeId.canvasLight,
            customMapStyle: {
                elements: {
                    "mapElement": { labelColor: '#4b5963' },
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
            }
        });

        let terminalPushpin = new window.Microsoft.Maps.Pushpin(lat, lng);
        var layer = new window.Microsoft.Maps.Layer();
        let anchor = new window.Microsoft.Maps.Point(0, 0);
        let ferryLayer = new window.Microsoft.Maps.Layer();
        let terminalLayer = new window.Microsoft.Maps.Layer();
        terminalLayer.metadata = { id: "terminalLayer" };

        this.setState(() => ({
            map,
            terminalPushpin,
            anchor,
            layer,
            ferryLayer,
            terminalLayer
        }));
    };

    //Change map view
    onClickView = props => {
        let updatedView = props;
        //console.log(updatedView)
        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(
                updatedView[1],
                updatedView[0]
            ),
            zoom: updatedView[2]
        });
    };

    //change ferry view
    onClickFerryView = props => {
        let updatedView = props;
        console.log(props);
        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(
                updatedView[0],
                updatedView[1]
            ),
            zoom: updatedView.speed === "0 knots" ? 16 : 12
        });
    };

    //render terminal and ferry pins
    renderTerminalPin = (
        Latitude,
        Longitude,
        terminalName,
        terminalIcon,
        terminalPin,
        terminalLocation,
        terminalDescription
    ) => {
        this.state.terminalLayer.add(terminalPin);
        this.state.map.entities.push(terminalPin);

        let infoboxTemplate = `<div id="infoboxText" style="background-color:White; border-style:solid; border-width:medium; border-color:#1a237e; min-height:160px; width: 240px; border-radius:7px;line-height: 1.2;">
    <b id="infoboxTitle" style="position: absolute; top: 10px; left: 10px; width: 220px; ">{title}</b>
    <p id="infoboxDescription" style="position: absolute; top: 45px; left: 10px; width: 220px;color:#1a237e ">{description}</p></div>`;

        let infobox = new window.Microsoft.Maps.Infobox(terminalLocation, {
            htmlContent: infoboxTemplate
                .replace("{title}", terminalName)
                .replace("{description}", terminalDescription),

            showCloseButton: true,
            offset: new window.Microsoft.Maps.Point(-110, 30),
            visible: false
        });
        infobox.setMap(this.state.map);
        window.Microsoft.Maps.Events.addHandler(terminalPin, "click", function () {
            infobox.setOptions({ visible: true });
        });

        window.Microsoft.Maps.Events.addHandler(
            this.state.map,
            "click",
            function () {
                infobox.setOptions({ visible: false });
            }
        );
    };

    renderBoatPin = (
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
        this.setState({ boatPins: [...this.state.boatPins, boatPin] });
        this.state.ferryLayer.add(boatPin);
        this.state.map.entities.push(boatPin);

        let boatInfobox = new window.Microsoft.Maps.Infobox(boatLocation, {
            visible: false
        });

        boatInfobox.setMap(this.state.map);
        window.Microsoft.Maps.Events.addHandler(boatPin, "click", function () {
            boatInfobox.setOptions({
                visible: true,
                title: VesselName,
                description: summary,
                maxHeight: 250,
                maxWidth: 250
            });
        });
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open
        });
    };
    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    ListItemLink = props => {
        return <ListItem button component="a" {...props} />;
    };


    render() {
        const { classes } = this.props;
        const { open } = this.state;

        return (
            <div id="all-content">
                <Header position="fixed" className={classes.appBar} />
                <div id="map-content">
                    <CssBaseline />
                    <div id="mapHolder" className={classes.root}>
                        <div
                            id="map"
                            className={classNames(classes.content, {
                                [classes.contentShift]: open
                            })}
                        >
                            <div className={classes.drawerHeader} />
                            {this.state.terminals.map((terminal, index) => {
                                return (
                                    <Pin
                                        key={index}
                                        map={this.state.map}
                                        terminalName={terminal.properties.title}
                                        terminalAddress={terminal.properties.address}
                                        terminalPhone={terminal.properties.phone}
                                        Latitude={`${terminal.geometry.coordinates[1]}`}
                                        Longitude={`${terminal.geometry.coordinates[0]}`}
                                        renderTerminalPin={this.renderTerminalPin}
                                        siteLink={terminal.properties.Site}
                                    />
                                );
                            })}

                            {this.state.ferries.map(ferry => (
                                <Boat
                                    key={ferry.properties["Vessel Name"]}
                                    map={this.state.map}
                                    boatId={ferry.id}
                                    COG={ferry.properties.COG}
                                    Latitude={ferry.properties.Latitude}
                                    Longitude={ferry.properties.Longitude}
                                    VesselName={ferry.properties["Vessel Name"]}
                                    summary={ferry.properties.summary}
                                    SOG={ferry.properties.SOG}
                                    time={ferry.properties.Time}
                                    timeStamp={`${this.state.timeStamp}`}
                                    renderBoatPin={this.renderBoatPin}
                                />
                            ))}
                        </div>
                        <div id="drawers">
                            <Drawer
                                open={this.state.terminalDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer("terminalDrawer", false)}
                                onClick={this.toggleDrawer("terminalDrawer", false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer("terminalDrawer", false)}
                                    onKeyDown={this.toggleDrawer("terminalDrawer", false)}
                                />
                                <div className="viewDrawer">
                                    <TerminalTable
                                        views={this.state.views}
                                        onClickView={this.onClickView}
                                    />
                                </div>
                            </Drawer>
                            <Drawer
                                anchor="left"
                                open={this.state.ferryDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer("ferryDrawer", false)}
                                onClick={this.toggleDrawer("ferryDrawer", false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer("ferryDrawer", false)}
                                    onKeyDown={this.toggleDrawer("ferryDrawer", false)}
                                />
                                <div className="FerryTable">
                                    <FerryTable ferries={this.state.ferries} onClickFerryView={this.onClickFerryView} />
                                </div>
                            </Drawer>

                            <Drawer
                                anchor="left"
                                open={this.state.twitterDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer("twitterDrawer", false)}
                                onClick={this.toggleDrawer("twitterDrawerr", false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer("twitterDrawer", false)}
                                    onKeyDown={this.toggleDrawer("twitterDrawer", false)}
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
                                open={this.state.weatherDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer("weatherDrawer", false)}
                                onClick={this.toggleDrawer("weatherDrawerr", false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer("weatherDrawer", false)}
                                    onKeyDown={this.toggleDrawer("weatherDrawer", false)}
                                />
                                <div id="weather">
                                    {/* {cities} */}
                                    {this.state.cities.map((city, index) => {
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
                                open={this.state.contactDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer("contactDrawer", false)}
                                onClick={this.toggleDrawer("contactDrawer", false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer("contactDrawer", false)}
                                    onKeyDown={this.toggleDrawer("contactDrawer", false)}
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
                        <Paper
                            square
                            className={classNames(classes.root, classes.tabContainer)}
                        >
                            <Tabs
                                value={this.state.tabValue}
                                onChange={this.handleTabChange}
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="primary"
                            >
                                <Tab
                                    icon={<FerryIcon />}
                                    label="Ferries"
                                    onClick={this.toggleDrawer("ferryDrawer", true)}
                                />
                                <Tab
                                    icon={<TerminalIcon />}
                                    label="Terminals"
                                    onClick={this.toggleDrawer("terminalDrawer", true)}
                                />
                                <Tab
                                    //className={classes.noSmall}
                                    icon={<TwitterIcon />}
                                    label="Twitter"
                                    fontSize="small"
                                    onClick={this.toggleDrawer("twitterDrawer", true)}
                                />
                                <Tab
                                    className={classes.noSmall}
                                    icon={<WeatherIcon />}
                                    label="Weather"
                                    onClick={this.toggleDrawer("weatherDrawer", true)}
                                />
                                <Tab
                                    icon={<LinksIcon />}
                                    label="Links"
                                    onClick={this.toggleDrawer("contactDrawer", true)}
                                />
                            </Tabs>
                        </Paper>
                    </div>
                </div>
                {/* end of map-content */}
            </div>
        );
    }
}
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
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Map);
