import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Input } from "@material-ui/core";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import store from "../app/store";
import { db } from "../firebase/firebaseConfig";

const useStyles = makeStyles({
	innerRoot: {
		flexGrow: 1,
	},
	root: {
		display: "flex",
	},
	tableDiv: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	tableContainer: {
		minWidth: 500,
		maxWidth: 900,
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
			backgroundColor: "rgb(250,250,250)",
			cursor: "pointer",
		},
	},
	searchInput: {
		display: "flex",
		margin: "0 auto 50px auto",
	},
});
function UnPaidOrders(props) {
	const { open } = store.getState().Sidebar;
	const { orders } = props;
	const { searchValue } = props;

	useEffect(() => {
		(async () => {
			let ordersArr = [];
			let unsub = await db
				.collection("orders")
				.orderBy("createdAt", "desc")
				.onSnapshot((snapshot) => {
					ordersArr = snapshot.docs.map((doc) => {
						let eachOrderData = doc.data();
						return eachOrderData;
					});
					let filteredOrders = ordersArr.filter((order) => {
						return order.unpaid > 0;
					});

					props.setAllOrders([...filteredOrders]);
					if (searchValue === "") {
						props.setOrders([...filteredOrders]);
					}
				});
			return unsub;
		})();
	}, []);

	const handleSearch = (val) => {
		props.setSearchValue(val);
		let searchedCustomers = props.allOrders.filter((order) => {
			return order.cName.toLowerCase().includes(val.toLowerCase());
		});
		props.setOrders(searchedCustomers);
	};

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.innerRoot}>
				<Sidebar />
				<main
					className={clsx(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					<div
						style={{
							marginTop: "6rem",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<h1 style={{ textAlign: "center" }}>Total Unpaid Orders History</h1>

						<Input
							className={classes.searchInput}
							variant="contained"
							color="secondary"
							placeholder="Search Customer"
							value={searchValue}
							onChange={(e) => handleSearch(e.target.value)}
						></Input>
						<div className={classes.tableDiv}>
							<TableContainer
								component={Paper}
								className={classes.tableContainer}
							>
								<Table className={classes.table} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell className={classes.header}>Name</TableCell>
											<TableCell align="right" className={classes.header}>
												Order Date
											</TableCell>
											<TableCell
												align="right"
												className={`${classes.header} ${classes.unpaid}`}
											>
												Unpaid
											</TableCell>
											<TableCell
												align="right"
												className={`${classes.header} ${classes.paid}`}
											>
												Paid
											</TableCell>
											<TableCell align="right" className={classes.header}>
												Total Amount
											</TableCell>
										</TableRow>
									</TableHead>
									{orders.length === 0 ? (
										<h2 style={{ color: "red" }}>No Unpaid Orders</h2>
									) : (
										<TableBody>
											{orders.map((eachOrder, idx) => (
												<TableRow key={idx} className={classes.row}>
													<TableCell
														component="th"
														scope="row"
														className={classes.cName}
													>
														{eachOrder.cName}
													</TableCell>
													<TableCell align="right" className={classes.date}>
														{eachOrder.orderedDate}
													</TableCell>
													<TableCell align="right" className={classes.unpaid}>
														{eachOrder.unpaid}
													</TableCell>
													<TableCell align="right" className={classes.paid}>
														{eachOrder.paid}
													</TableCell>
													<TableCell
														align="right"
														className={classes.totalAmount}
													>
														{eachOrder.totalAmount}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									)}
								</Table>
							</TableContainer>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

const mapStateToProps = (store) => {
	return store.Orders;
};

const mapDispatchToProps = (dispatch) => {
	return {
		setOrders: (orders) => {
			return dispatch({ type: "set_orders", payload: [...orders] });
		},
		setAllOrders: (orders) => {
			return dispatch({ type: "set_all_orders", payload: [...orders] });
		},
		setSearchValue: (val) => {
			return dispatch({ type: "set_search_value", payload: val });
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UnPaidOrders);
