import React, { Component } from "react";
import "./Pin.css";

class Pin extends Component {
    constructor(props) {
        super(props)
        this.renderPin = this.renderPin.bind(this)

    }
    componentDidMount() {
        if (this.props.map !== null) {
            //console.log(this.props)
            this.renderPin()
        } else {
            setTimeout(() => {
                this.componentDidMount()
            }, 100)
        }
    }


    renderPin(props) {
        // let { map, terminalName, terminalCoordinates, terminalPushpin, terminalLocation, renderPins } = this.props;

        var terminalIcon =
            '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 23"><defs><style>.cls-1,.cls-2,.cls-3,.cls-4{fill:none;stroke-miterlimit:10;}.cls-1,.cls-4{stroke:#000;}.cls-2,.cls-3{stroke:#0071bc;}.cls-2,.cls-4{stroke-width:2px;}.cls-3,.cls-4{stroke-linecap:round;}.cls-3{stroke-width:3px;}</style></defs><title>anchorai</title><path class="cls-1" d="M11.75,14.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,14.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,18.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,21.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,19.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M11.75,19.5" transform="translate(-3.75 -0.5)"/><path class="cls-1" d="M23.5,21.5" transform="translate(-3.75 -0.5)"/><circle class="cls-2" cx="8" cy="3.5" r="2.5"/><line class="cls-3" x1="8" y1="21" x2="8" y2="7"/><path class="cls-4" d="M11.75,18" transform="translate(-3.75 -0.5)"/><path class="cls-4" d="M11.75,21" transform="translate(-3.75 -0.5)"/><path class="cls-4" d="M11.75,18" transform="translate(-3.75 -0.5)"/><path class="cls-3" d="M18.25,16c0,2.21-3.14,6-6.73,6s-6.27-3.79-6.27-6" transform="translate(-3.75 -0.5)"/><line class="cls-2" x1="4.5" y1="9" x2="11.5" y2="9"/></svg>';



        let Latitude = parseFloat(this.props.Latitude);
        let Longitude = parseFloat(this.props.Longitude);
        let terminalName = this.props.terminalName
        let terminalDescription = this.props.terminalAddress + "<br>" + this.props.terminalPhone + "<br><a href=" + this.props.siteLink + ">Destination Site</a><br/><a href='https://ferry.ncdot.gov/#/'>Ferry Reservations</a>";

        let terminalLocation = new window.Microsoft.Maps.Location(Latitude, Longitude)
        this.terminalPin = new window.Microsoft.Maps.Pushpin(terminalLocation, {
            title: terminalName,
            id: terminalName,
            icon: terminalIcon,
            visible: true,
            typeName: 'ncterminal',
            anchor: new window.Microsoft.Maps.Point(9, 9)
        });
        this.terminalPin.metadata = {
            id: terminalName,
            title: terminalName,
            type: 'terminal'
        };

        const terminalPin = this.terminalPin;

        this.props.renderTerminalPin(Latitude, Longitude, terminalName, terminalIcon, terminalPin, terminalLocation, terminalDescription);

    }
    render() {
        return null
    }
}

export default Pin;
