import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LaunchIcon from "@material-ui/icons/Launch";
import store from "../app/store";

const useStyles = makeStyles({
	tableDiv: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	tableContainer: {
		minWidth: 600,
		maxWidth: 1000,
	},
	header: {
		color: "black",
		fontSize: "18px",
		fontWeight: 800,
		fontFamily: "'Titillium Web', sans-serif",
	},
	paid: {
		color: "green",
		fontFamily: "'Titillium Web', sans-serif",
	},
	unpaid: {
		color: "red",
		fontFamily: "'Titillium Web', sans-serif",
	},
	cName: {
		fontSize: "16px",
		textDecoration: "none",
		color: "#000",
		fontFamily: "'Titillium Web', sans-serif",

		"&:hover": {
			backgroundColor: "rgb(250,250,250)",
			color: "#00f",
			cursor: "pointer",
		},
	},
	gotoIcon: {
		fontFamily: "'Titillium Web', sans-serif",
		marginBottom: "-5px",
	},
});

export default function BasicTable() {
	const classes = useStyles();
	const customersToShow = store.getState().Customers.customers;
	let length = customersToShow.length;

	return (
		<div className={classes.tableDiv}>
			<TableContainer component={Paper} className={classes.tableContainer}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell className={classes.header}>Retailer</TableCell>
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
					{length === 0 ? (
						<h3 style={{ textAlign: "center", color: "red" }}>
							No Customers Found
						</h3>
					) : (
						<TableBody>
							{customersToShow.map((customer, idx) => (
								<TableRow key={idx}>
									<>
										<TableCell component="th" scope="row">
											<Link
												to={`/retailer/${customer.cid}`}
												className={classes.cName}
											>
												{customer.data.cName}
												<LaunchIcon className={classes.gotoIcon} />
											</Link>
										</TableCell>
										<TableCell className={classes.paid} align="right">
											{customer.data.Paid}
										</TableCell>
										<TableCell className={classes.unpaid} align="right">
											{customer.data.Unpaid}
										</TableCell>
										<TableCell align="right">
											{customer.data.TotalAmount}
										</TableCell>
										<TableCell align="right">{customer.data.cPhone}</TableCell>
									</>
								</TableRow>
							))}
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</div>
	);
}
