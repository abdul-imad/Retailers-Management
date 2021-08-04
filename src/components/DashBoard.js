import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar";

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	card: {
		width: "22%",
		margin: "10px",
	},
	dashboard: {
		marginTop: "10px",
		display: "flex",
	},
	title: {
		fontSize: 20,
	},
});

export default function DashBoard() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Grid container spacing={0}>
				<Grid item xs={2} sm={2}>
					<Sidebar />
				</Grid>

				<Grid item xs={10} sm={10}>
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
									3
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
				</Grid>
			</Grid>
		</div>
	);
}
