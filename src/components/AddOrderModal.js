import React, { useState } from "react";
import { Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Inputs from "./Inputs";
import { database, db } from "../firebase/firebaseConfig";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: "50rem",
		minHeight: "25rem",
		maxHeight: "80vh",
		backgroundColor: "white",
		top: "100px",
		left: "calc((100vw - 50rem) / 2)",
		// bottom: "100px",
		padding: "1rem",
		overflowY: "auto",
		border: "none",
		borderRadius: "5px",
	},
	button: {
		backgroundColor: "#082032",
		color: "#fff",
		borderRadius: "5px",
		height: "2.5rem",
        width:"150px",
		border: "none",
		background: "transparent",
		cursor: "pointer",
        fontSize:"18px",
        padding:"5px"
	},
	input1: {
		width: "150px",
		padding: "5px",
		margin: "5px 10px 5px 0",
		borderRadius: "5px",
		border: "none",
		borderBottom: "2px solid #082032",
		fontSize: "16px",
		"&:focus": {
			outline: "none",
			// borderBottom: "2px solid #082032",
		},
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
			<div style={{ textAlign: "center", paddingTop: "3rem" }}>
				<div>
					{items.map((item, idx) => {
						return <div key={idx}>{item}</div>;
					})}
				</div>
				<br />
				<Button
					variant="contained"
					style={{ backgroundColor: "#082032", color: "#fff" }}
					className={classes.addOrderBtn}
					onClick={() => handleAddItems()}
				>
					Add Item
				</Button>

				<br />
				<br />
				<br />
				<div style={{ display: "flex", flexDirection: "column" }}>
					<div>
						<TextField
							value={totalAmount}
							color="secondary"
							className="inputField"
							label="Total Amount"
						></TextField>
						<TextField
							value={paid}
							color="secondary"
							className="inputField"
							label="Paid Amount"
							onChange={(e) => props.setPaid(e.target.value)}
						></TextField>
						<TextField
							color="secondary"
							value={totalAmount - paid}
							className="inputField"
							label="Due Amount"
						></TextField>
					</div>
					<div
						style={{
							marginTop: "2rem",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Button
							variant="contained"
							disabled={loader}
							color="secondary"
							onClick={(e) => {
								makeAnOrder(e);
								setTimeout(() => {
									window.location.reload();
								}, 3000);
							}}
						>
							Complete Order
						</Button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div>
			<button className={classes.button} onClick={handleOpen}>
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
