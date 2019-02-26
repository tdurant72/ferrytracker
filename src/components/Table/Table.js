import React, { Component } from 'react';
import Moment from 'react-moment'
import './Table.css'


const styles = {
    links: {
        color: "#1a237e",
        cursor: "pointer",
        fontSize: "1em",
        textDecoration: "underline",
        padding: "10px 0px"
    },
    table: {
    }

}

class Table extends Component {
    state = { updatedView: [] }
    onHandleTableView = (event, index) => {
        this.props.onClickTableView(this.props);

    }
    render() {
        return (
            <tr >
                <td>
                    <span
                        style={styles.links}
                        onClick={this.onHandleTableView.bind(this.state.updatedView)}
                    >{this.props.title}
                    </span>
                </td>
                <td> {this.props.speed} </td>
                <td>{this.props.speed === "0 knots" ? "docked" : " underway"}</td>
                <td>
                    <Moment format=" h:mm a, MM/DD/YY">
                        {this.props.time}
                    </Moment>
                </td>
            </tr>
        );
    }

}


export default Table;