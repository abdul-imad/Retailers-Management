import React, { useEffect, useState } from "react";
import { Button, Modal, StepConnector } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {connect} from "react-redux"
import Inputs from "./Inputs"

function AddOrderModal(props) {
	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: "50rem",
			minHeight: "20rem",
			backgroundColor: "white",
			border: "2px solid #000",
			top: "100px",
			left: "calc((100vw - 50rem) / 2)",
			bottom: "100px",
			padding: "1rem",
			overflowY: "auto",
		},
		button: {
			backgroundColor: "#f44336",
			height: "2rem",
		},
	}));
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
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
		<div className={classes.paper}>
			<Button
				variant="contained"
				color="secondary"
				onClick={() => handleAddItems()}
			>
				Add Item
			</Button>
			<div style={{ textAlign: "center", paddingTop: "3rem" }}>
				<div>
					{items.map((item, idx) => {
						return <div key={idx}>{item}</div>;
					})}
				</div>

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
