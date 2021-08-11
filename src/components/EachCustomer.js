import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { db } from "../firebase/firebaseConfig";
import AddOrderModal from "./AddOrderModal";
import store from "../app/store";
import { withRouter } from "react-router-dom";
import Sidebar from "./Sidebar";
import PhoneForwardedIcon from "@material-ui/icons/PhoneForwarded";

const useStyles = makeStyles({
	innerRoot: {
		flexGrow: 1,
	},
	root: {
		display: "flex",
	},
	tableContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: 750,
		margin: "2rem",
	},
	table: {
		minWidth: 500,
		maxWidth: 750,
	},
	header: {
		color: "black",
		fontSize: "18px",
		fontWeight: 800,
		fontFamily: "'Titillium Web', sans-serif",
	},
	cName: { fontFamily: "'Titillium Web', sans-serif" },
	date: { fontFamily: "'Titillium Web', sans-serif" },
	paid: {
		color: "green",
		fontFamily: "'Titillium Web', sans-serif",
	},
	unpaid: {
		color: "red",
		fontFamily: "'Titillium Web', sans-serif",
	},
	totalAmount: { fontFamily: "'Titillium Web', sans-serif" },
	row: {
		"&:hover": {
			backgroundColor: "rgb(200,200,200)",
			cursor: "pointer",
		},
	},
	orderDetails: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
	},
	orderDetailInfo: {
		fontSize: "20px",
		fontWeight: "bold",
	},
});

function EachCustomer(props) {
	console.log(props);
	const { open } = store.getState().Sidebar;
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
					props.setCurrentOrder(0);
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
			<div className={classes.root}>
				<div className={classes.innerRoot}>
					<Sidebar />
					<main
						className={clsx(classes.content, {
							[classes.contentShift]: open,
						})}
					>
						<div
							style={{
								marginTop: "5rem",
								display: "flex",
								flexDirection: "column",
							}}
						/>
						{!loader ? (
							<div className="mainDiv">
								<div style={{ display: "flex", justifyContent: "center" }}>
									<div style={{ display: "flex", flexDirection: "column" }}>
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												flexDirection: "column",
											}}
										>
											<h1 style={{ color: "#082032", margin: 0 }}>
												{length > 0 ? props.oids[0].cName : ""}
											</h1>

											<h2>
												<PhoneForwardedIcon></PhoneForwardedIcon> 8074810303
											</h2>
										</div>
										<div
											style={{
												display: "flex",
												justifyContent: "space-around",
												alignItems: "center",
											}}
										>
											<AddOrderModal cid={cid} cName={cName} />
											<h2>Balance: &#8377;40,000</h2>
										</div>
										<div
											style={{
												maxHeight: "90vh",
												overflowY: "auto",
												margin: 0,
												padding: 0,
											}}
										>
											<TableContainer
												component={Paper}
												className={classes.tableContainer}
											>
												<Table
													className={classes.table}
													aria-label="simple table"
												>
													<TableHead>
														<TableRow>
															<TableCell className={classes.header}>
																Order Date
															</TableCell>
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

															<TableCell
																className={classes.header}
																align="right"
															>
																Total Amount
															</TableCell>
														</TableRow>
													</TableHead>
													{length === 0 ? (
														<h3 style={{ textAlign: "center", color: "red" }}>
															No Orders Till Now
														</h3>
													) : (
														<TableBody>
															{oids.map((oid, idx) => (
																<TableRow
																	key={idx}
																	id={idx}
																	className={classes.row}
																	onClick={(e) => {
																		let index = e.target.parentNode.id;
																		props.setCurrentOrder(index);
																		console.log(index);
																	}}
																>
																	<>
																		<TableCell
																			component="th"
																			scope="row"
																			className={classes.date}
																		>
																			{oid.orderedDate}
																		</TableCell>
																		<TableCell
																			className={classes.paid}
																			align="right"
																		>
																			{oid.paid}
																		</TableCell>
																		<TableCell
																			className={classes.unpaid}
																			align="right"
																		>
																			{oid.unpaid}
																		</TableCell>
																		<TableCell
																			className={classes.totalAmount}
																			align="right"
																		>
																			{oid.totalAmount}
																		</TableCell>
																	</>
																</TableRow>
															))}
														</TableBody>
													)}
												</Table>
											</TableContainer>
										</div>
									</div>
									<div>
										{props.currentOrder === undefined ? null : (
											<div className={classes.orderDetails}>
												<div className={classes.orderDetailInfo}>
													Date : {props.currentOrder.orderedDate}
												</div>
												<div className={classes.orderDetailInfo}>
													Total : {props.currentOrder.totalAmount}
												</div>
											</div>
										)}
										{props.currentOrder === undefined ? (
											<p>Loading</p>
										) : (
											<div
												style={{
													minWidth: 500,
													maxHeight: "80vh",
													overflowY: "auto",
													paddingTop: "2rem",
												}}
											>
												<TableContainer
													component={Paper}
													style={{ minWidth: 300 }}
												>
													<Table
														className={classes.table}
														aria-label="simple table"
													>
														<TableHead>
															<TableRow>
																<TableCell className={classes.header}>
																	Item Name
																</TableCell>
																<TableCell
																	className={classes.header}
																	align="right"
																	style={{ color: "blue" }}
																>
																	Quantity
																</TableCell>
																<TableCell
																	className={classes.header}
																	align="right"
																	style={{ color: "green" }}
																>
																	Price
																</TableCell>

																<TableCell
																	className={classes.header}
																	align="right"
																	style={{ color: "red" }}
																>
																	Amount
																</TableCell>
															</TableRow>
														</TableHead>
														{props.currentOrder === undefined ? (
															<h3 style={{ textAlign: "center", color: "red" }}>
																Nothing to show{" "}
															</h3>
														) : (
															<TableBody>
																{props.currentOrder.items.map((item, idx) => (
																	<TableRow key={idx}>
																		<>
																			<TableCell component="th" scope="row">
																				{item.itemName}
																			</TableCell>
																			<TableCell
																				align="right"
																				style={{ color: "blue" }}
																			>
																				{item.quantity}
																			</TableCell>
																			<TableCell
																				align="right"
																				style={{ color: "green" }}
																			>
																				{item.price}
																			</TableCell>
																			<TableCell
																				style={{ color: "red" }}
																				align="right"
																			>
																				{item.amount}
																			</TableCell>
																		</>
																	</TableRow>
																))}
															</TableBody>
														)}
													</Table>
												</TableContainer>
											</div>
										)}
									</div>
								</div>
							</div>
						) : (
							<p>...Loading</p>
						)}
					</main>
				</div>
			</div>
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
		setCurrentOrder: (idx) => {
			return dispatch({ type: "set_current_order", payload: idx });
		},
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EachCustomer)
);
