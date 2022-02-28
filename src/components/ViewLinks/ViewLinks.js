import React, { useState } from "react";

const linkStyle = {
  color: "#1a237e",
  cursor: "pointer",
  fontSize: "1em",
  // borderBottom: "1px rgb(44,62,80) solid",
  padding: "10px 5px",
  margin: "5px",
  width: "100%",
  display: "block",
};

const ViewLinks = () => {
  const [updatedView, setUpdatedView = useState([])];
  // state = { updatedView: [] }
  const onHandleView = () => {
    this.props.onClickView(this.props);
    //console.log(this.props);
  };

  return (
    <tr>
      <td>
        <span
          style={linkStyle}
          onClick={onHandleView.bind(this, this.state.updatedView)}
        >
          {this.props.properties.title}
        </span>
      </td>
    </tr>
  );
};
export default ViewLinks;
