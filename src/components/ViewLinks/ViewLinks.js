import React from 'react';

const linkStyle = {
    color: "#1a237e",
    cursor: "pointer",
    fontSize: "1em",
    // borderBottom: "1px rgb(44,62,80) solid",
    padding: "10px 5px",
    margin: '5px',
    width: '100%',
    display: 'block'
}

class ViewLinks extends React.Component {

    state = { updatedView: [] }
    onHandleView(event, index) {
        this.props.onClickView(this.props);
        //console.log(this.props);
    }
    render() {
        return (
            <tr >
                <td>
                    <span style={linkStyle}
                        onClick={this.onHandleView.bind(this, this.state.updatedView)} >
                        {this.props.properties.title}
                    </span>
                </td>
            </tr>
        );
    }
}
export default ViewLinks;