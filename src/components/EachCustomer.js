import React from "react";
import addOrderMiddleWare from "../redux/middleWare/addOrderMiddleWare";
import { connect } from "react-redux";
import AddOrderModal from "./AddOrderModal";

function EachCustomer(props) {
	let cid = 
	useEffect(()=>{
		(async () => {
			let orderArr = [];
			let unsub = await db
				.collection("orders")
				.orderBy("createdAt", "desc")
				.onSnapshot(async (snapshot) => {
					customerArr = snapshot.docs.map((doc) => doc.data());
					console.log(customerArr);

					props.setAllCustomers([...customerArr]);
					if (searchValue === "") {
						props.setCustomers([...customerArr]);
					}
				});
			return unsub;
		})();
	},[])

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
