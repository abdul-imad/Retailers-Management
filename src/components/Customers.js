import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
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
	const { open } = props;
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
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
				</main>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return state.Sidebar;
};
export default connect(mapStateToProps)(Customers);
