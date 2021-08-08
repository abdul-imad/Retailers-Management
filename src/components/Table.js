import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import store from "../app/store";
import { useHistory } from "react-router-dom";

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

export default function BasicTable() {
	const classes = useStyles();
	const customersToShow = store.getState().Customers.customers;
	const history = useHistory();
	const showCustomers = (e) => {
		history.push("/eachcustomer");
	};

	return (
		<TableContainer component={Paper} className={classes.tableContainer}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.header}>Customer Name</TableCell>
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
						<TableCell className={classes.header} align="right">
							Phone
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{customersToShow.map((customer, idx) => (
						<TableRow
							key={idx}
							className={classes.row}
							onClick={(e) => showCustomers(e)}
						>
							<TableCell component="th" scope="row">
								{customer.cName}
							</TableCell>
							<TableCell className={classes.paid} align="right">
								{customer.Paid}
							</TableCell>
							<TableCell className={classes.unpaid} align="right">
								{customer.Unpaid}
							</TableCell>
							<TableCell align="right">{customer.TotalAmount}</TableCell>
							<TableCell align="right">{customer.cPhone}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
