import React from "react";
import { connect } from "react-redux";

function Counter(props) {
	return <div>{props.count}</div>;
}

const mapStateToProps = (state) => {
	return state;
};

export default connect(mapStateToProps)(Counter);
