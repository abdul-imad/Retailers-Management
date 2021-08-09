import React, { useEffect } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import auth from "../firebase/firebaseConfig";

const useStyles = makeStyles({
	innerRoot: {
		flexGrow: 1,
	},
	card: {
		width: "22%",
		margin: "10px",
	},
	dashboard: {
		marginTop: "6rem",
		display: "flex",
	},
	title: {
		fontSize: 20,
	},
	root: {
		display: "flex",
	},
});

function DashBoard(props) {
	const { open } = props;
	const history = useHistory();
	useEffect(() => {
		// console.log("use Effect");
		let resp = auth.onAuthStateChanged((user) => {
			if (user) {
				history.push("/");
			}
		});
		return function () {
			resp();
		};
	}, []);
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
					<div className={classes.dashboard}>
						<Card className={classes.card}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									5
								</Typography>
								<Typography variant="h5" component="h2">
									Total Orders
								</Typography>
							</CardContent>
							<CardActions>
								<Link to="/orders">More Info</Link>
							</CardActions>
						</Card>
						<Card className={classes.card}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									2
								</Typography>
								<Typography variant="h5" component="h2">
									Paid Orders
								</Typography>
							</CardContent>
							<CardActions>
								<Link to="/orders/paid">More Info</Link>
							</CardActions>
						</Card>
						<Card className={classes.card}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									3
								</Typography>
								<Typography variant="h5" component="h2">
									Unpaid Orders
								</Typography>
							</CardContent>
							<CardActions>
								<Link to="/orders/unpaid">More Info</Link>
							</CardActions>
						</Card>
						<Card className={classes.card}>
							<CardContent>
								<Typography
									className={classes.title}
									color="textSecondary"
									gutterBottom
								>
									7
								</Typography>
								<Typography variant="h5" component="h2">
									Total Customers
								</Typography>
							</CardContent>
							<CardActions>
								<Link to="/customers">More Info</Link>
							</CardActions>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}
const mapStateToProps = (state) => {
	return state.Sidebar;
};
export default withRouter(connect(mapStateToProps)(DashBoard));
