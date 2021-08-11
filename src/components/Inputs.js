import { makeStyles, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(() => ({
	input: {
		width: "150px",
		padding: "5px",
		margin: "5px 10px 5px 0",
		fontSize: "16px",
	},
	amount: {
		fontWeight: "bold",
		color: "#000",
	},
}));

function Inputs(props) {
	const { id } = props;
	console.log(id);
	const { itemName, quantity, price } = props.items;
	const [amount, setAmount] = useState(0);
	const [temp, setTemp] = useState(0);

	useEffect(() => {
		if (props.items.length > 0) setAmount(props.items[id].amount);
	}, [temp]);

	const classes = useStyles();
	return (
		<div>
			<p
				style={{display:"inline-block", fontSize: "16px", fontWeight: "bold", margin: "40px 10px 0 0 " }}
			>
				{id + 1}.
			</p>
			<TextField
				value={itemName}
				label="Item Name"
				className={classes.input}
				onChange={(e) => props.setItemName(e.target.value, id)}
			></TextField>
			<TextField
				value={quantity}
				label="Quantity"
				className={classes.input}
				onChange={(e) => {
					props.setQuantity(e.target.value, id);
					setTemp(temp + 1);
				}}
			></TextField>
			<TextField
				value={price}
				label="Price"
				className={classes.input}
				onChange={(e) => {
					props.setPrice(e.target.value, id);
					setTemp(temp - 1);
				}}
			></TextField>
			<TextField
				value={amount}
                color="secondary"
				className={classes.input}
				label="Amount"
				onChange={(e) => props.setItemName(e.target.value, id)}
			></TextField>
			{/* <input
				placeholder="item"
				value={amount}
				className={classes.input}
				onChange={(e) => props.setItemName(e.target.value, id)}
			/>
			<input
				placeholder="quantity"
				value={quantity}
				className={classes.input}
				onChange={(e) => {
					props.setQuantity(e.target.value, id);
					setTemp(temp + 1);
				}}
			/>
			<input
				placeholder="price"
				value={price}
				className={classes.input}
				onChange={(e) => {
					props.setPrice(e.target.value, id);
					setTemp(temp - 1);
				}}
			/>
			<input
				className={`${classes.input} ${classes.amount}`}
				value={amount}
				disabled={true}
			/> */}
			{/* <hr style={{ borderTop: "1px dashed #555", width: "80%" }} /> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Inputs));
