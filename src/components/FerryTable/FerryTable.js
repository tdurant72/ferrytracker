import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'react-moment'
import classNames from "classnames";

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

    links: {
        color: "#1a237e",
        cursor: "pointer",
        fontSize: "1em",
        textDecoration: "underline",

    }
});


class FerryTable extends Component {
    state = { updatedView: [] }
    onHandleTableView = (event, index) => {
        this.props.onClickTableView(this.props);
    }
    render() {
        const { classes } = this.props;
        return (
            < TableRow >
                <TableCell component="th" scope="row" className={classes.onSmallTable}>
                    <span
                        className={classes.links}
                        onClick={this.onHandleTableView.bind(this.state.updatedView)}
                    >{this.props.title}
                    </span>

                </TableCell>
                <TableCell className={classNames(classes.onSmallTable)}>{this.props.speed}</TableCell>
                <TableCell className={classes.onSmallTable}>{this.props.speed === "0 knots" ? "docked" : " underway"}</TableCell>
                <TableCell className={classes.onSmallTable}>
                    <Moment format=" h:mm a, MM/DD/YY">
                        {this.props.time}
                    </Moment>
                </TableCell>
            </TableRow >
        )
    }

}

FerryTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FerryTable);
