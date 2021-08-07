import React from "react";
import store from "../app/store";
import { Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";

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

function SimpleModal(props) {
	const { cPhone, cName } = store.getState().Customers;

	const useStyles = makeStyles((theme) => ({
		paper: {
			position: "absolute",
			width: "20rem",
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
			position: "absolute",
			left: "73rem",
			bottom: "20rem",
		},
	}));
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	const { loader, setCName, setCPhone } = props;
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (document.querySelector(".inputField") !== null) {
			document.querySelector(".inputField").click();
            console.log("object");
		}
        console.log("object");

	}, [open]);

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<div>
				<TextField
					value={cName}
					className="inputField"
					fullWidth={true}
					label="Customer Name"
					placeholder="Name"
					onChange={(e) => setCName(e.target.value)}
				></TextField>
			</div>
			<div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
				<TextField
					fullWidth={true}
					value={cPhone}
					label="Phone Number"
					placeholder="must contain atleast 10 digits"
					onChange={(e) => setCPhone(e.target.value)}
				></TextField>
			</div>
			<div style={{ textAlign: "center", paddingTop: "3rem" }}>
				<Button
					variant="contained"
					disabled={loader}
					color="secondary"
					onClick={(e) => {
						props.addCustomers(e);
					}}
				>
					Add
				</Button>
			</div>
		</div>
	);

	return (
		<div>
			<button className={classes.button} style={{}} onClick={handleOpen}>
				Add Customers
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

export default SimpleModal;
