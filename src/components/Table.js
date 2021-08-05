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
});

export default function BasicTable() {
  const classes = useStyles();
  const customersToShow = store.getState().Customers.customers;
  console.log(customersToShow);
  return (
    <TableContainer
      style={{ marginTop:"3rem",width: "800px" }}
      component={Paper}
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.header}>Customer Name</TableCell>
            <TableCell className={[classes.header, classes.paid]} align="right">
              Paid
            </TableCell>
            <TableCell
              className={[classes.header, classes.unpaid]}
              align="right"
            >
              Unpaid
            </TableCell>
            
            <TableCell className={classes.header} align="right">
              Total Amount
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customersToShow.map((customer) => (
            <TableRow key={customer.cName}>
              <TableCell component="th" scope="row">
                {customer.cName}
              </TableCell>
              <TableCell align="right">{customer.Paid}</TableCell>
              <TableCell align="right">{customer.Unpaid}</TableCell>
              <TableCell align="right">{customer.TotalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
