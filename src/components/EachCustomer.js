import React, { useEffect } from "react";
import addOrderMiddleWare from "../redux/middleWare/addOrderMiddleWare";
import { connect } from "react-redux";
import AddOrderModal from "./AddOrderModal";
import store from "../app/store";
import { withRouter } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";

function EachCustomer(props) {
	const {
		match: {
			params: { cid },
		},
	} = props;
	// console.log(cid);
	// console.log(location);
	console.log(cid);
	useEffect(()=>{
		(async () => {
			let orderArr = [];
			let unsub = await db
				.collection("customers")
				.doc(cid).get()
			let customerOrders = await unsub.data().orders
			
		})();
	},[])

	return (
		<div>
			<AddOrderModal cid={cid} />
		</div>
	);
}
const mapStateToProps = (store) => {
	return store.Customers;
};

const mapDispatchToProps = (dispatch) => {
	return {
		makeOrder: () => {
			return dispatch(addOrderMiddleWare);
		},
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EachCustomer));
