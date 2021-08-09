import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

function Inputs(props) {
	const { id } = props;
	const { itemName, quantity, price } = props.items;
	const [amount, setAmount] = useState(0);
	const [temp, setTemp] = useState(0);

	useEffect(() => {
		if (props.items.length > 0) setAmount(props.items[id].amount);
	}, [temp]);
    
	return (
		<div>
			<input
				placeholder="item"
				value={itemName}
				onChange={(e) => props.setItemName(e.target.value, id)}
			></input>
			<input
				placeholder="quantity"
				value={quantity}
				onChange={(e) => {
					props.setQuantity(e.target.value, id);
					setTemp(temp + 1);
				}}
			></input>
			<input
				placeholder="price"
				value={price}
				onChange={(e) => {
					props.setPrice(e.target.value, id);
					setTemp(temp - 1);
				}}
			></input>
			<input value={amount}></input>
		</div>
	);
}

function mapStateToProps(store) {
	return store.AddOrders;
}

function mapDispatchToProps(dispatch) {
	return {
		setPrice: (val, id) => {
			return dispatch({ type: "set_price", payload: [val, id] });
		},
		setQuantity: (val, id) => {
			return dispatch({ type: "set_quantity", payload: [val, id] });
		},
		setItemName: (val, id) => {
			return dispatch({ type: "set_item_name", payload: [val, id] });
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Inputs);
