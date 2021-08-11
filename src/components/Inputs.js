import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(() => ({
	input: {
		padding: "5px",
        marginRight:"10px",
        borderRadius:"5px",
        border:"2px solid #082032"
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
            <span style={{fontSize:"16px", marginRight:"5px"}}>{id + 1}</span>
			<input
				placeholder="item"
				value={itemName}
				className={classes.input}
				onChange={(e) => props.setItemName(e.target.value, id)}
			></input>
			<input
				placeholder="quantity"
				value={quantity}
				className={classes.input}
				onChange={(e) => {
					props.setQuantity(e.target.value, id);
					setTemp(temp + 1);
				}}
			></input>
			<input
				placeholder="price"
				value={price}
				className={classes.input}
				onChange={(e) => {
					props.setPrice(e.target.value, id);
					setTemp(temp - 1);
				}}
			></input>
			<input className={classes.input} value={amount}></input>
            <hr style={{borderTop:"1px dashed #555"}} />
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
