import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";
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
import Moment from 'react-moment'
const styles = theme => ({
    root: {

    },
    noSmall: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "inherit"
        }
    },
    onSmallTable: {
        padding: 5,
        [theme.breakpoints.up("sm")]: {
            padding: 10
        }
    },
    table: {
        minWidth: 350,
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
    links: {
        color: "#1a237e",
        cursor: "pointer",
        fontSize: "1em",
        textDecoration: "underline",

    }
});


class FerryTable extends Component {

    onHandleTableView = (latitude, longitude, event, index) => {
        event.preventDefault();
        // console.log(latitude, longitude)
        let updatedView = [latitude, longitude]
        this.props.onClickFerryView(updatedView)

    }
    onHandleTerminalTableView = (latitude, longitude, event, index) => {
        event.preventDefault();
        // console.log(latitude, longitude)
        let updatedView = [latitude, longitude]
        this.props.onClickTeminalView(updatedView)

    }
    componentDidMount() {

    }
    componentWillUnmount() { }

    render() {
        const { classes } = this.props;
        let { latitude, longitude } = this.props.ferries;
        let { tlatitude, tlongitude } = this.props.terminals;
        return <div>
            <Paper style={styles.root}>
                <Table style={styles.table}>
                    <TableHead>
                        <TableRow className={classes.tableHeader}>
                            <TableCell className={classNames(classes.tableHeaderFont, classes.onSmallTable)}>Ferry Terminal</TableCell>
                            <TableCell className={classNames(classes.tableHeaderFont, classes.onSmallTable)}>Ferry Name</TableCell>

                            <TableCell className={classNames(classes.tableHeaderFont, classes.onSmallTable)}>ETA</TableCell>
                            <TableCell className={classNames(classes.tableHeaderFont, classes.onSmallTable)}>Speed</TableCell>
                            <TableCell className={classNames(classes.tableHeaderFont, classes.onSmallTable)}>Status</TableCell>
                            <TableCell className={classNames(classes.tableHeaderFont, classes.onSmallTable)}>As of</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.ferries.map(boat => (
                            < TableRow
                                key={boat.id}
                                boat={boat}
                                title={boat.properties["Vessel Name"]}
                            >
                                <TableCell className={classNames(classes.onSmallTable)}>
                                    <span
                                        className={classes.links}
                                        tlatitude={boat.geometry.coordinates[1]}
                                        tlongitude={boat.geometry.coordinates[0]}
                                        onClick={this.onHandleTerminalTableView.bind(this, boat.geometry.coordinates[1], boat.geometry.coordinates[0])}
                                    >{boat.properties.Destination}</span>

                                </TableCell>
                                <TableCell component="th" scope="row" className={classes.onSmallTable}>
                                    <span
                                        className={classes.links}
                                        latitude={boat.geometry.coordinates[1]}
                                        longitude={boat.geometry.coordinates[0]}
                                        onClick={this.onHandleTableView.bind(this, boat.geometry.coordinates[1], boat.geometry.coordinates[0])}
                                    >{boat.properties["Vessel Name"]}
                                    </span>

                                </TableCell>

                                <TableCell className={classNames(classes.onSmallTable)}>{boat.properties.ETA}</TableCell>
                                <TableCell className={classNames(classes.onSmallTable)}>{boat.properties.SOG}</TableCell>
                                <TableCell className={classes.onSmallTable}>{boat.properties.SOG === "0 knots" ? "docked" : " underway"}</TableCell>
                                <TableCell className={classes.onSmallTable}>
                                    <Moment format=" h:mm a, MM/DD/YY">
                                        {boat.properties.Time}
                                    </Moment>
                                </TableCell>
                            </TableRow >
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    }
}

FerryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FerryTable);
