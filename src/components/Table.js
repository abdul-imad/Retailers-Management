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

const useStyles = makeStyles({
	table: {
		minWidth: 500,
		maxWidth: 800,
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
	row:{
		"&:hover":{

			backgroundColor:"rgb(250,250,250)",
			cursor:"pointer"
		}
	}
});

export default function BasicTable() {
	const classes = useStyles();
	const customersToShow = store.getState().Customers.customers;
	return (
		<TableContainer
			style={{ marginTop: "3rem", width: "800px" }}
			component={Paper}
		>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell className={classes.header}>Customer Name</TableCell>
						<TableCell className={`${classes.header} ${classes.paid}`} align="right">
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
					{customersToShow.map((customer,idx) => (
						<TableRow key={idx} className = {classes.row} onClick={(e)=>console.log(e.target.parentNode.children[0].innerText)} >
							<TableCell component="th" scope="row">
								{customer.cName}
							</TableCell>
							<TableCell className = {classes.paid} align="right">{customer.Paid}</TableCell>
							<TableCell className = {classes.unpaid} align="right">{customer.Unpaid}</TableCell>
							<TableCell align="right">{customer.TotalAmount}</TableCell>
							<TableCell align="right">{customer.cPhone}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
