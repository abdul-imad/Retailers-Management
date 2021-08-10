import React, { useEffect, useState } from "react";
import store from "../app/store";
import { Button, Modal, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
	const top = 50;
	const left = 50;

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
			border: "none",
			borderRadius: "5px",
			top: "40rem",
			right: "30rem",
			padding: "1rem",
		},
		button: {
			border: "none",
			background: "transparent",
			backgroundColor: "#082032",
			height: "2.5rem",
			width: "8rem",
			color: "#fff",
			cursor: "pointer",
			borderRadius: "5px",
			fontSize: "20px",
			"&:hover": {
				boxShadow: "3px 1px 5px -2px rgba(0,0,0,0.75)",
			},
		},
	}));

	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const { setCName, setCPhone } = props;
	const [loader, setLoader] = useState(true);
	const { open, setOpen } = props;

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
					label="Retailer Name"
					placeholder="Name"
					required={true}
					onChange={(e) => {
						if (e.target.value.length > 0 && cPhone.length >= 10) {
							setLoader(false);
						}
						setCName(e.target.value);
					}}
				></TextField>
			</div>
			<div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
				<TextField
					fullWidth={true}
					value={cPhone}
					label="Phone Number"
					type="tel"
					required={true}
					pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
					placeholder="must contain atleast 10 digits"
					onChange={(e) => {
						if (e.target.value.length >= 10 && cName.length > 0) {
							setLoader(false);
						}
						setCPhone(e.target.value);
					}}
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
				Add Retailer
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
