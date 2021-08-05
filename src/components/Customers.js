import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import store from "../app/store";
const useStyles = makeStyles({
	innerRoot: {
		flexGrow: 1,
	},
	card: {
		width: "22%",
		margin: "10px",
	},
	dashboard: {
		marginTop: "80px",
		display: "flex",
	},
	title: {
		fontSize: 20,
	},
	root: {
		display: "flex",
	},
});
function Customers(props) {
	const { open } = store.getState().Sidebar;
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
					<div>
						{props.customers.map((customer) => {
							return (
								<div>
									<ul>
										<li style={{ listStyle: "none" }}>
											<div>{customer.customerName}</div>
										</li>
									</ul>
								</div>
							);
						})}
					</div>
				</main>
			</div>
		</div>
	);
}

const mapStateToProps = (store) => {
	return store.Customers;
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
