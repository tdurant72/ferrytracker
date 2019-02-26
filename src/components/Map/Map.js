import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Drawer, Typography, Button, Paper, Tabs, Tab, List, ListItem, ListItemText } from '@material-ui/core';

import PersonPinIcon from '@material-ui/icons/PersonPin';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

import TerminalIcon from '../images/TerminalIcon'
import FerryIcon from '../images/FerryIcon'
import TwitterIcon from '../images/TwitterIcon'
import WeatherIcon from '../images/WeatherIcon'
import LinksIcon from '../images/LinksIcon'

import './Map.css'
import views from '../../data/views'
import Header from '../Header/Header'
import Contact from '../Contact/Contact'
import ViewLinks from '../ViewLinks/ViewLinks'
import Pin from '../Pin/Pin'
import Boat from '../Boat/Boat';
import Table from '../Table/Table'
const API_KEY = "80e61cf4-541b-4651-8228-6376d80567f7";
const drawerWidth = 'auto';
const styles = theme => ({
    root: {
        display: 'flex',

    },
    tabs: {
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    tabContainer: {
        justifyContent: 'center'
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
        filterString: '',
        search: "",
        views: [],
        newView: [],
        layer: null,
        renderFinished: false,
        boatPins: [],
        terminalPins: [],
        timeStamp: null,
        terminalDrawer: false,
        ferryDrawer: false,
        twitterDrawer: false,
        contactDrawer: false,
        tabValue: 0
    }


    /* init*/
    componentDidMount = async () => {
        this.setState(() => ({ views: views, ferries: this.props.data.ncferries, terminals: this.props.data.terminals, filteredTerminals: this.props.data.terminals, timeStamp: this.props.data.timeStamp, filteredFerries: this.props.data.ncferries }))

        this.renderMap()
    };
    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.ncferries !== this.state.ferries) {
            this.state.map.entities.clear()
            this.state.map.layers.clear()
            this.setState(() => ({
                ferries: this.props.data.ncferries,
                timeStamp: this.props.data.timeStamp
            }))
            this.state.map.layers.insert(this.state.terminalLayer)
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


        const map = new window.Microsoft.Maps.Map
            (document.getElementById("map"), {
                center: new window.Microsoft.Maps.Location(lat, lng),
                mapTypeId: window.Microsoft.Maps.MapTypeId.road,
                zoom: this.state.views[0].properties.zoom
            });

        let terminalPushpin = new window.Microsoft.Maps.Pushpin(lat, lng)
        var layer = new window.Microsoft.Maps.Layer();
        let anchor = new window.Microsoft.Maps.Point(0, 0);
        let ferryLayer = new window.Microsoft.Maps.Layer();
        let terminalLayer = new window.Microsoft.Maps.Layer();
        terminalLayer.metadata = { id: "terminalLayer" }

        this.setState(() => ({ map, terminalPushpin, anchor, layer, ferryLayer, terminalLayer }));

    };

    //Change map view
    onClickView = (props) => {
        let updatedView = props;
        //console.log(center)
        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(updatedView.geometry.coordinates[0], updatedView.geometry.coordinates[1]),
            zoom: updatedView.properties.zoom
        })
    }

    //Change map view based on table link
    onClickTableView = (props) => {
        let updatedView = props;

        this.state.map.setView({
            center: new window.Microsoft.Maps.Location(updatedView.Latitude, updatedView.Longitude),
            zoom: updatedView.speed === "0 knots" ? 16 : 12
        })
    }

    //render terminal and ferry pins
    renderTerminalPin = (Latitude, Longitude, terminalName, terminalIcon, terminalPin, terminalLocation, terminalDescription) => {

        this.state.terminalLayer.add(terminalPin)
        this.state.map.entities.push(terminalPin);

        let infoboxTemplate = `<div id="infoboxText" style="background-color:White; border-style:solid; border-width:medium; border-color:#1a237e; min-height:145px; width: 240px; border-radius:7px;line-height: 1.2;">
    <b id="infoboxTitle" style="position: absolute; top: 10px; left: 10px; width: 220px; ">{title}</b>
    <p id="infoboxDescription" style="position: absolute; top: 45px; left: 10px; width: 220px;color:#1a237e ">{description}</p></div>`;

        let infobox = new window.Microsoft.Maps.Infobox(terminalLocation, {
            htmlContent: infoboxTemplate.replace('{title}', terminalName).replace('{description}', terminalDescription),

            showCloseButton: true,
            offset: new window.Microsoft.Maps.Point(-110, 30),
            visible: false,
        });
        infobox.setMap(this.state.map);
        window.Microsoft.Maps.Events.addHandler(terminalPin, "click", function () {
            infobox.setOptions({ visible: true });
        });

        window.Microsoft.Maps.Events.addHandler(this.state.map, "click", function () {
            infobox.setOptions({ visible: false });
        });

    }

    renderBoatPin = (boatId, COG, Latitude, Longitude, VesselName, SOG, boatIcon, boatPin, boatLocation, summary, time) => {
        this.setState({ boatPins: [...this.state.boatPins, boatPin] })
        this.state.ferryLayer.add(boatPin)
        this.state.map.entities.push(boatPin);
        //console.log("renderBoatPin called")
        let boatInfobox = new window.Microsoft.Maps.Infobox(boatLocation, {
            visible: false
        })

        boatInfobox.setMap(this.state.map)
        window.Microsoft.Maps.Events.addHandler(boatPin, "click", function () {
            boatInfobox.setOptions({
                visible: true,
                title: VesselName,
                description: summary
            })
        })
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    handleTabChange = (event, value) => {
        this.setState({ tabValue: value });
    };

    ListItemLink = (props) => {
        return <ListItem button component="a" {...props} />;
    }
    render() {
        const { classes, theme } = this.props;
        const { open } = this.state;
        return (
            <div id="all-content">
                <Header position="fixed" className={classes.appBar} />
                <div id="map-content">
                    <CssBaseline />
                    <div id="mapHolder" className={classes.root}>

                        <div id="map" className={classNames(classes.content, {
                            [classes.contentShift]: open,
                        })}>
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
                                )
                            })}

                            {this.state.ferries.map((ferry) => (
                                <Boat
                                    key={ferry.properties['Vessel Name']}
                                    map={this.state.map}
                                    boatId={ferry.id}
                                    COG={ferry.properties.COG}
                                    Latitude={ferry.properties.Latitude}
                                    Longitude={ferry.properties.Longitude}
                                    VesselName={ferry.properties['Vessel Name']}
                                    summary={ferry.properties.summary}
                                    SOG={ferry.properties.SOG}
                                    time={ferry.properties.Time}
                                    timeStamp={`${this.state.timeStamp}`}
                                    renderBoatPin={this.renderBoatPin}
                                />
                            )
                            )}
                        </div>
                        <div id="drawers">


                            <Drawer
                                open={this.state.terminalDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer('terminalDrawer', false)}
                                onClick={this.toggleDrawer('terminalDrawer', false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer('terminalDrawer', false)}
                                    onKeyDown={this.toggleDrawer('terminalDrawer', false)}
                                >

                                </div>
                                <div className="viewDrawer">
                                    <table className="display" width="100%" id="t01" >
                                        <thead>
                                            <tr>
                                                <th>Terminals</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.views.map((view, index) => {
                                                return (
                                                    <ViewLinks
                                                        key={view.properties.id}
                                                        index={view.properties.id}
                                                        {...view}
                                                        onClickView={this.onClickView.bind(this, view)}
                                                    />
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </Drawer>
                            <Drawer
                                anchor="left"
                                open={this.state.ferryDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer('ferryDrawer', false)}
                                onClick={this.toggleDrawer('ferryDrawer', false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer('ferryDrawer', false)}
                                    onKeyDown={this.toggleDrawer('ferryDrawer', false)}
                                >

                                </div>
                                <div className="FerryTable">
                                    <table className="display" width="100%" id="t01" >
                                        <thead>
                                            <tr>
                                                <th>Ferry Name</th>
                                                <th>Speed</th>
                                                <th>Status</th>
                                                <th>As of:</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.ferries.map((boat) => (
                                                <Table
                                                    key={boat.id}
                                                    title={boat.properties["Vessel Name"]}
                                                    Latitude={`${boat.properties.Latitude}`}
                                                    Longitude={`${boat.properties.Longitude}`}
                                                    speed={boat.properties.SOG}
                                                    time={boat.properties.Time}
                                                    onClickTableView={this.onClickTableView}
                                                />
                                            )
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </Drawer>

                            <Drawer
                                anchor="left"
                                open={this.state.twitterDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer('twitterDrawer', false)}
                                onClick={this.toggleDrawer('twitterDrawerr', false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer('twitterDrawer', false)}
                                    onKeyDown={this.toggleDrawer('twitterDrawer', false)}
                                >

                                </div>
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
                                onClose={this.toggleDrawer('weatherDrawer', false)}
                                onClick={this.toggleDrawer('weatherDrawerr', false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer('weatherDrawer', false)}
                                    onKeyDown={this.toggleDrawer('weatherDrawer', false)}
                                >

                                </div>
                                <div id="weather">
                                    <Contact />
                                </div>
                            </Drawer>
                            <Drawer
                                anchor="left"
                                open={this.state.contactDrawer}
                                //variant="persistent"
                                onClose={this.toggleDrawer('contactDrawer', false)}
                                onClick={this.toggleDrawer('contactDrawerr', false)}
                                className={classes.drawer}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                <div
                                    tabIndex={0}
                                    role="button"
                                    onClick={this.toggleDrawer('contactDrawer', false)}
                                    onKeyDown={this.toggleDrawer('contactDrawer', false)}
                                >

                                </div>
                                <div id="contact">
                                    <Contact />
                                </div>
                            </Drawer>
                        </div>
                        {/* end of drawers */}

                    </div>
                    {/* end of mapholder */}

                    <div id="tabHolder">
                        <Paper square className={classNames(classes.root, classes.tabContainer)}>
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
                                    onClick={this.toggleDrawer('ferryDrawer', true)}
                                />
                                <Tab
                                    icon={<TerminalIcon />}
                                    label="Terminals"
                                    onClick={this.toggleDrawer('terminalDrawer', true)}
                                />
                                <Tab
                                    icon={<TwitterIcon />}
                                    label="Twitter"
                                    fontSize="small"
                                    onClick={this.toggleDrawer('twitterDrawer', true)}
                                />
                                {/* <Tab icon={<WeatherIcon />} label="Weather" /> */}
                                <Tab
                                    icon={<LinksIcon />}
                                    label="Links"
                                    onClick={this.toggleDrawer('contactDrawer', true)}
                                />
                            </Tabs>
                        </Paper>
                    </div>
                </div>
                {/* end of map-content */}
            </div>
        )
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
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Map);