import React, { Component } from "react";
import Moment from "react-moment";
import "./Boat.css";
import FerryIcon from "../images/FerryIcon";
import ferryIcon from "../images/ferry-icon.png";
class Boat extends Component {
  constructor(props) {
    super(props);
    this.renderBoatPin = this.renderBoatPin.bind(this);
  }
  componentDidMount() {
    if (this.props.map !== null) {
      //console.log(this.props)
      this.renderBoatPin();
    } else {
      setTimeout(() => {
        this.componentDidMount();
      }, 100);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // const newProps = this.props;
    if (this.props.timeStamp !== prevProps.timeStamp) {
      this.renderBoatPin();
      //this.loadMapScenario();
    }
  }
  createPushPinLabel(textColor, fontSize) {
    textColor = textColor || "#002445";
    fontSize = fontSize || 16;
  }
  renderBoatPin(props) {
    let COG = this.props.COG;
    let bearing = parseInt(COG, 10);
    let VesselName = this.props.VesselName;
    //console.log(this.props);

    let color = new window.Microsoft.Maps.Color.fromHex("#002445");
    const movingIcon =
      // '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="ncferry" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" ><defs><style>.cls-1{fill:#eaeaea;}.cls-2{fill:#002445;}.cls-3{fill:#004544;stroke:#002445;stroke-miterlimit:10;}</style></defs><title>ferry</title><g transform ="rotate(' + bearing + '), scale(0.8)" width="19" height="19"><path class="cls-1"  d="M12.21,18.76,12,18.9l-.21-.14L7,21V6.69a2.69,2.69,0,0,1,1-2l4-3.48,4,3.48a2.69,2.69,0,0,1,1,2V21Z" transform="translate(-6 -0.05)"/><path class="cls-2" d="M12,2.51l3.39,2.92A1.68,1.68,0,0,1,16,6.69V19.4l-2.85-1.31-1-.48-.11.08-.11-.08-1,.48L8,19.4V6.69a1.68,1.68,0,0,1,.61-1.26L12,2.51M12,.05a.53.53,0,0,0-.36.13L7.31,3.92A3.63,3.63,0,0,0,6,6.69V22.05a.47.47,0,0,0,.21.38l5.48-2.53a.53.53,0,0,0,.62,0l5.48,2.53a.47.47,0,0,0,.21-.38V6.69a3.63,3.63,0,0,0-1.31-2.77L12.36.18A.53.53,0,0,0,12,.05Z" transform="translate(-6 -0.05)"/><path class="cls-3" d="M12,23.89" transform="translate(-6 -0.05)"/></g></svg>';
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" viewBox="0 0 30 30" ><defs><style>.cls-1{fill:none;}.cls-2{fill:#efe9e1;transform-origin:center}.cls-3{fill:#002445;}.cls-4{fill:#004544;stroke:#002445;stroke-miterlimit:10;}</style></defs><title>ferry-icon</title><g id="Layer_2" data-name="Layer 2"><rect class="cls-1" width="24" height="24"/></g><g x="12" y="12" transform="rotate(' +
      bearing +
      ' 12,12)" id="Layer_1" data-name="Layer 1" ><path class="cls-2" d="M13.39,18.09l-.1.07-.1-.07L9,19.19V7.47A2,2,0,0,1,9.78,6l3.51-2.82L16.8,6a2,2,0,0,1,.77,1.51V19.19Z"/><path class="cls-3" d="M13.29,4.42l2.88,2.32a1,1,0,0,1,.4.73V17.89l-2.5-.65-.61-.16-.1-.06-.07,0-.07,0-.1.06-.61.16L10,17.89V7.47a1,1,0,0,1,.4-.73l2.89-2.32m0-2.42a.52.52,0,0,0-.32.11L9.15,5.18A3,3,0,0,0,8,7.47V20.12a.38.38,0,0,0,.18.31L13,19.17a.46.46,0,0,0,.28.08.45.45,0,0,0,.27-.08l4.83,1.26a.36.36,0,0,0,.18-.31V7.47a2.93,2.93,0,0,0-1.15-2.29L13.6,2.11A.51.51,0,0,0,13.29,2Z"/><path class="cls-4" d="M12,23.89"/></g></svg>';
    const dockedIcon =
      '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="docked" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 50 50"><defs><style>.cls-1{fill:#EAEAEA;}.cls-2{fill:#002445;}.heavy { font: bold 14px sans-serif;color:#002445; }</style></defs><rect class="cls-1" x="7" y="7" width="11" height="11" transform="translate(-8.49 9.19) rotate(-45)"/><path class="cls-2" d="M12.5,6.14l6.36,6.36L12.5,18.86,6.14,12.5,12.5,6.14m0-2.83L3.31,12.5l9.19,9.19,9.19-9.19L12.5,3.31Z" transform="translate(-3.31 -3.31)"/><circle class="cls-1" cx="9.19" cy="9.19" r="0.5"/><path class="cls-2" d="M12.5,12a.5.5,0,1,0,.5.5.5.5,0,0,0-.5-.5Z" transform="translate(-3.31 -3.31)"/></svg>';

    //console.log("COG: ", COG, "Bearing: ", bearing, "Vessel: ", VesselName);
    let Latitude = parseFloat(this.props.Latitude);
    let Longitude = parseFloat(this.props.Longitude);
    let title = VesselName;
    let SOG = this.props.SOG;
    let boatId = this.props.boatId;
    let summary = this.props.summary;
    // let summary = "Vessel: " + VesselName + "<br>" + "Is traveling at " + SOG + "<br>" + "at bearing " + COG;
    let time = this.props.time;
    let boatIcon = null;
    if (SOG === "0 knots") {
      boatIcon = dockedIcon;
    } else {
      boatIcon = movingIcon;
      //boatIcon = ferryIcon;
      //console.log(movingIcon)
    }

    var offset = new window.Microsoft.Maps.Point(-5, 15);

    let boatLocation = new window.Microsoft.Maps.Location(Latitude, Longitude);
    this.boatPin = new window.Microsoft.Maps.Pushpin(boatLocation, {
      title: title,
      //textOffset: offset,
      //text: VesselName,
      id: boatId,
      icon: boatIcon,
      visible: true,
      typeName: "ncferry",
      anchor: new window.Microsoft.Maps.Point(0, 0),
      color: color,
    });

    this.boatPin.metadata = {
      id: boatId,
      title: VesselName,
      description: summary,
      type: "boat",
      time: time,
      speed: SOG,
      Latitude: Latitude,
      Longitude: Longitude,
    };
    // this.boatPin.style = {
    //     styleStatic: {
    //         fontGlow: true,
    //         glowColor: "rgb(0,36,69)",

    //     }
    // };

    // console.log(this.boatPin)
    //this.boatPin.style.styleDynamic.fontColor = "rgb(0,36,69)";
    const boatPin = this.boatPin;
    this.props.renderBoatPin(
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
    );
  }
  render() {
    return null;
  }
}

export default Boat;
