import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { db } from "../firebase/firebaseConfig";
import AddOrderModal from "./AddOrderModal";

const useStyles = makeStyles({
	tableContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	table: {
		minWidth: 500,
		maxWidth: 900,
	},
	header: {
		color: "black",
		fontSize: "large",
	},
	paid: {
		color: "green",
	},
	unpaid: {
		color: "red",
	},
	row: {
		"&:hover": {
			backgroundColor: "rgb(250,250,250)",
			cursor: "pointer",
		},
	},
});

function EachCustomer(props) {
	const [loader, setLoader] = useState(true);
	const [cName, setcName] = useState("");
	const {
		match: {
			params: { cid },
		},
		oids,
	} = props;

	useEffect(() => {
		(async () => {
			try {
				props.resetOids();
				let docRef = db.collection("customers").doc(cid);
				let getData = await docRef.get();
				let custName = await getData.data().cName;
				setcName(custName);
				let oldOrders = await getData.data().orders;
				let latestOrdersFormat = oldOrders.reverse();
				latestOrdersFormat.map(async (oid) => {
					let eachOrderRef = await db.collection("orders").doc(oid).get();
					let orderData = eachOrderRef.data();
					props.setOids(orderData);
				});
				setLoader(false);
				return docRef;
			} catch (err) {
				console.log(err);
				setLoader(false);
			}
		})();
	}, []);

	let length = oids.length;

	const classes = useStyles();

	return (
		<>
			{!loader ? (
				<>
					<div>
						<AddOrderModal cid={cid} cName={cName} />
					</div>

					<div>
						<TableContainer
							component={Paper}
							className={classes.tableContainer}
						>
							<Table className={classes.table} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell className={classes.header}>Order Date</TableCell>
										<TableCell
											className={`${classes.header} ${classes.paid}`}
											align="right"
										>
											Paid
										</TableCell>
										<TableCell
											className={`${classes.header} ${classes.unpaid}`}
											align="right"
										>
											Unpaid
										</TableCell>

										<TableCell className={classes.header} align="right">
											Total Amount
										</TableCell>
									</TableRow>
								</TableHead>
								{length === 0 ? (
									<h3 style={{ textAlign: "center", color: "red" }}>
										No Orders Till Now{" "}
									</h3>
								) : (
									<TableBody>
										{oids.map((oid, idx) => (
											<TableRow key={idx}>
												<>
													<TableCell component="th" scope="row">
														<Link
															to={`/customer/${oid.cid}`}
															className={classes.row}
														>
															{oid.orderedDate}
														</Link>
													</TableCell>
													<TableCell className={classes.paid} align="right">
														{oid.paid}
													</TableCell>
													<TableCell className={classes.unpaid} align="right">
														{oid.unpaid}
													</TableCell>
													<TableCell align="right">{oid.totalAmount}</TableCell>
												</>
											</TableRow>
										))}
									</TableBody>
								)}
							</Table>
						</TableContainer>
					</div>
				</>
			) : (
				<p>...Loading</p>
			)}
		</>
	);
}

const mapStateToProps = (store) => {
	return store.EachCustomer;
};

const mapDispatchToProps = (dispatch) => {
	return {
		setOids: (val) => {
			return dispatch({ type: "set_oids", payload: val });
		},
		resetOids: () => {
			return dispatch({ type: "reset_oids" });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(EachCustomer);
