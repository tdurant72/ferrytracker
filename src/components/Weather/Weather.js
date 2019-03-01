import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const styles = {
    card: {
        minWidth: 275
    },

    title: {
        fontSize: 14
    },
    pos: {
        marginBottom: 12
    }
};

function Weather(props) {
    const { classes } = props;
    let truc = Math.trunc(props.temp);
    return (
        <div className="cards">
            <Card className={classes.card}>
                <CardContent>
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        Current weather in {props.name}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {props.description}
                        <br />
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        current temp {props.temp} degrees
          </Typography>
                </CardContent>
            </Card>
            <Divider />
        </div>
    );
}

Weather.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Weather);
