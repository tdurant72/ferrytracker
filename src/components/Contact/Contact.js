import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SimpleList(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItemLink href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/reservations.aspx">
                    <ListItemText primary="Online Reservations" />
                </ListItemLink>
                <ListItemLink href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/reservations.aspx">
                    <ListItemText primary="Ferry Schedule" />
                </ListItemLink>
                <ListItemLink href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/routes/Pages/default.aspx?from=0&to=0">
                    <ListItemText primary="Ticket Prices" />
                </ListItemLink>
                <ListItemLink href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/accommodations.aspx">
                    <ListItemText primary="Accommodations" />
                </ListItemLink>
                <ListItemLink href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/destinations.aspx">
                    <ListItemText primary="Destinations" />
                </ListItemLink>
                <ListItemLink href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/commuter-pass.aspx">
                    <ListItemText primary="Commuter Pass" />
                </ListItemLink>
                <ListItemLink href="https://www.ncdot.gov/travel-maps/ferry-tickets-services/Pages/priority-pass.aspx">
                    <ListItemText primary="Priority Passes" />
                </ListItemLink>
            </List>
        </div>
    );
}

SimpleList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);
