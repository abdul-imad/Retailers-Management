import React from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import store from "../app/store";

const useStyles = makeStyles({
	innerRoot: {
		flexGrow: 1,
	},
	root: {
		display: "flex",
	},
});
function Brands() {
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
					<div style={{ marginTop: "6rem" }}>
						<h1>Brands</h1>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Brands;
