import React from "react";
import addOrderMiddleWare from "../redux/middleWare/addOrderMiddleWare";
import { connect } from "react-redux";
import AddOrderModal from "./AddOrderModal";
import store from "../app/store";
import { withRouter } from "react-router-dom";

function EachCustomer(props) {
	
	// useEffect(()=>{
	// 	(async () => {
	// 		let orderArr = [];
	// 		let unsub = await db
	// 			.collection("orders")
	// 			.orderBy("createdAt", "desc")
	// 			.onSnapshot(async (snapshot) => {
	// 				customerArr = snapshot.docs.map((doc) => doc.data());
	// 				console.log(customerArr);

	// 				props.setAllCustomers([...customerArr]);
	// 				if (searchValue === "") {
	// 					props.setCustomers([...customerArr]);
	// 				}
	// 			});
	// 		return unsub;
	// 	})();
	// },[])

	return (
		<div>
			<AddOrderModal></AddOrderModal>
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
