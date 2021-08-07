import React from "react";
import addOrderMiddleWare from "../redux/middleWare/addOrderMiddleWare";
import { connect } from "react-redux";
import AddOrderModal from "./AddOrderModal";

function EachCustomer(props) {
	return (
		<div>
			<AddOrderModal></AddOrderModal>
		</div>
	);
}
const mapStateToProps = (store) => {
	return store.EachCustomer;
};

const mapDispatchToProps = (dispatch) => {
	return {
		makeOrder: () => {
			return dispatch(addOrderMiddleWare);
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EachCustomer);
