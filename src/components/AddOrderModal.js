import React, { useState } from "react";
import store from "../app/store";
import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
	const { cPhone, cName } = store.getState().Customers;

	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: "50rem",
			height: "20rem",
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
	const { loader, setCName, setCPhone } = props;
	const [items, setItems] = useState([]);
	const [totalAmount] = useState("");
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleAddItems = () => {
		setItems([...items, <Input></Input>]);
	};

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

export default AddOrderModal;

function Input(props) {
	const [item, setItem] = useState("");
	const [quantity, setQuantity] = useState(0);
	const [price, setPrice] = useState(0);
	const [amount, setAmount] = useState(quantity * price);
	console.log(quantity, price, amount);
	return (
		<div>
			<input
				placeholder="item"
				value={item}
				onChange={(e) => setItem(e.target.value)}
			></input>
			<input
				placeholder="quantity"
				value={quantity}
				onChange={(e) => {
					setQuantity(e.target.value);
					let temp = e.target.value * price;
					setAmount(temp);
				}}
			></input>
			<input
				placeholder="price"
				value={price}
				onChange={(e) => {
					setPrice(e.target.value);
					let temp = quantity * e.target.value;
					setAmount(temp);
				}}
			></input>
			<input placeholder="amount" value={amount} disabled={true}></input>
		</div>
	);
}
