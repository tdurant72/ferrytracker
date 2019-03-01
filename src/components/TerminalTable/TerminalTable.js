import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

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
    links: {
        color: "#1a237e",
        cursor: "pointer",
        fontSize: "1em",
        textDecoration: "underline",

    }
});


class TerminalTable extends Component {
    state = { updatedView: [] }
    onHandleView(event, index) {
        this.props.onClickView(this.props);
        //console.log(this.props);
    }
    render() {
        const { classes } = this.props;
        return (
            < TableRow >
                <TableCell component="th" scope="row">
                    <span
                        className={classes.links}
                        onClick={this.onHandleView.bind(this, this.state.updatedView)}
                    >{this.props.properties.title}
                    </span>

                </TableCell>
            </TableRow >
        )
    }

}

TerminalTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TerminalTable);
