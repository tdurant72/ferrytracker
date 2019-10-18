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

const styles = theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    noSmall: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "inherit"
        }
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


class TerminalTable extends Component {
    state = { updatedView: [] }
    onHandleView(latitude, longitude, zoom, event, index) {
        let updatedView = [latitude, longitude, zoom]
        this.props.onClickView(updatedView);
        //console.log(this.props);
    }
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.tableHeader} >
                            <TableCell className={classes.tableHeaderFont}>Terminals</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.views.map(view => (
                            < TableRow key={view.properties.id}>
                                <TableCell component="th" scope="row">
                                    <span
                                        className={classes.links}
                                        latitude={view.geometry.coordinates[1]}
                                        longitude={view.geometry.coordinates[0]}
                                        zoom={view.properties.zoom}
                                        onClick={this.onHandleView.bind(this, view.geometry.coordinates[1], view.geometry.coordinates[0], view.properties.zoom)}
                                    >{view.properties.title}
                                    </span>
                                </TableCell>
                            </TableRow >
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }

}

TerminalTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TerminalTable);
