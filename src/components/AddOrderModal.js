import React, { useEffect, useState } from "react";
import { Button, Modal, StepConnector } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {connect} from "react-redux"
import Inputs from "./Inputs"

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

function AddOrderModal(props) {

	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: "50rem",
			minHeight: "20rem",
			backgroundColor: "white",
			border: "2px solid #000",
			top: "40rem",
			right: "30rem",
			padding: "1rem",
		},
		button: {
			backgroundColor: "#f44336",
			height: "2rem",
		},
	}));
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const { loader } = props;
	const [items, setItems] = useState([]);
	// const [totalAmount,setTotalAmount] = useState(0);
	const {totalAmount} = props
	const handleOpen = () => {
		setOpen(true);
	};
	console.log(props);

	const handleClose = () => {
		setOpen(false);
	};
	const handleAddItems = () => {
		props.addItems()
		setItems([...items, <Inputs
		id={items.length}
		></Inputs>]);
	};

	// useEffect(()=>{
	// 	let sum = 0;
	// 	console.log("start")
	// 	for(let i = 0; i < items.length; i++){
	// 		console.log(items[i])
	// 	}
	// 	console.log(sum);
	// 	setTotalAmount(sum)
	// },[items])

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div style={{ textAlign: "center", paddingTop: "3rem" }}>
				<div>
					{items.map((item, idx) => {
						return <div key={idx}>{item}</div>;
					})}
				</div>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => handleAddItems()}
				>
					Add Item
				</Button>
				<br></br>
				<Button
					variant="contained"
					disabled={loader}
					color="secondary"
					style={{ marginTop: "2rem" }}
					onClick={(e) => {
						console.log("Making an order");
					}}
				>
					Complete
				</Button>
				<input placeholder="Total amount" value={totalAmount}></input>
			</div>
		</div>
	);

	return (
		<div>
			<button className={classes.button} style={{}} onClick={handleOpen}>
				Make an Order
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
function mapStateToProps(store){
	return store.AddOrders
}

function mapDispatchToProps(dispatch){
	return {
		addItems:()=>{
			return dispatch({type:"add_item"})
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(AddOrderModal);
