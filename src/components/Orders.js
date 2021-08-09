import React, { useEffect } from "react";
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
import { ordersData } from "../redux/middleWare/ordersData";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
	searchInput: {
		display: "flex",
		margin: "0 auto 50px auto",
	},
});
function Orders(props) {
	const { open } = store.getState().Sidebar;
	const { orders } = props;
	const { searchValue } = props;

	useEffect(() => {
		// (async () => {
		// let customers = await db.collection("customers").get();
		// let customerArr = [];
		// customers.forEach((doc) => {
		// 	customerArr.push(doc.data());
		// });
		let ordersArr = [];
		ordersData.forEach((order) => {
			ordersArr.push(order);
		});
		props.setAllOrders([...ordersArr]);
		if (searchValue === "") {
			props.setOrders([...ordersArr]);
		}
		// })();
	}, []);

	const handleSearch = (val) => {
		props.setSearchValue(val);
		let searchedCustomers = props.allOrders.filter((order) => {
			return order.customerName.toLowerCase().includes(val.toLowerCase());
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
						<Input
							className={classes.searchInput}
							variant="contained"
							color="secondary"
							placeholder="Search Customer"
							value={searchValue}
							onChange={(e) => handleSearch(e.target.value)}
						></Input>
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
								<TableBody>
									{orders.map((eachOrder) => (
										<TableRow key={eachOrder.orderID} className={classes.row}>
											<TableCell component="th" scope="row">
												{eachOrder.customerName}
											</TableCell>
											<TableCell align="right">{eachOrder.date}</TableCell>
											<TableCell align="right" className={classes.unpaid}>
												{eachOrder.unpaid}
											</TableCell>
											<TableCell align="right" className={classes.paid}>
												{eachOrder.paid}
											</TableCell>
											<TableCell align="right">{eachOrder.amount}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders));
