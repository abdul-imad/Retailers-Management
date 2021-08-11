import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Inputs from "./Inputs";
import { database, db } from "../firebase/firebaseConfig";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: "50rem",
		minHeight: "20rem",
		backgroundColor: "white",
		top: "100px",
		left: "calc((100vw - 50rem) / 2)",
		bottom: "100px",
		padding: "1rem",
		overflowY: "auto",
        border:"none",
        borderRadius:"5px"
	},
	button: {
		backgroundColor: "#082032",
		color: "#fff",
		borderRadius: "5px",
		height: "2rem",
		border: "none",
		background: "transparent",
		cursor: "pointer",
	},
}));

function AddOrderModal(props) {
	console.log("PROPS", props);
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const { loader } = props;
	const [items, setItems] = useState([]);
	const { totalAmount, paid } = props;

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleAddItems = () => {
		props.addItems();
		setItems([...items, <Inputs id={items.length} />]);
	};

	const makeAnOrder = async (e) => {
		e.preventDefault();
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, "0");
		let mm = String(today.getMonth() + 1).padStart(2, "0");
		let yyyy = today.getFullYear();
		today = dd + "/" + mm + "/" + yyyy;

		let order = {
			items: props.items,
			totalAmount: props.totalAmount,
			orderedDate: today,
			paid: paid,
			unpaid: totalAmount - paid,
			cid: props.cid,
			cName: props.cName,
			createdAt: database.getTimeStamp(),
		};

		try {
			let order1 = await db.collection("orders").add(order);
			let oid = order1.id;
			let docRef = await db.collection("customers").doc(props.cid);
			let getData = await docRef.get();
			let oldOrders = await getData.data().orders;
			let oldPaid = await getData.data().Paid;
			let oldUnpaid = await getData.data().Unpaid;
			let oldAmount = await getData.data().TotalAmount;
			let newOrders = await docRef.update({
				orders: [...oldOrders, oid],
				Paid: oldPaid + paid,
				Unpaid: oldUnpaid + (totalAmount - paid),
				TotalAmount: oldAmount + totalAmount,
			});
			console.log(newOrders);
			handleClose();
			setItems([]);
			props.setDefault();
		} catch (err) {
			console.log(err);
		}
	};

	const body = (
		<div className={classes.paper}>
			<Button
				variant="contained"
				color="secondary"
				className={classes.addOrderBtn}
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
						makeAnOrder(e);
						setTimeout(() => {
							window.location.reload();
						}, 3000);
					}}
				>
					Complete Order
				</Button>
				<input placeholder="Total amount" value={totalAmount}></input>
				<input
					placeholder="Advance payment"
					value={paid}
					onChange={(e) => props.setPaid(e.target.value)}
				></input>
				<input placeholder="Balance" value={totalAmount - paid}></input>
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
function mapStateToProps(store) {
	return store.AddOrders;
}

function mapDispatchToProps(dispatch) {
	return {
		addItems: () => {
			return dispatch({ type: "add_item" });
		},
		setPaid: (val) => {
			return dispatch({ type: "set_paid", payload: val });
		},
		setDefault: () => {
			return dispatch({ type: "set_default" });
		},
	};
}

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AddOrderModal)
);
