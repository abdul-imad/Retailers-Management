import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
		height: "180px",
		margin: "10px",
		position: "relative",
	},
	dashboard: {
		marginTop: "6rem",
		display: "flex",
	},
	title: {
		fontSize: 40,
		color: "#000",
	},
	root: {
		display: "flex",
	},
	seeMoreBtn: {
		width: "120px",
		fontSize: "17px",
		position: "absolute",
		bottom: "0",
		left: "calc((100% - 120px) / 2)",
	},
	link: {
		color: "#eee",
        textDecoration:"none",
        "&:hover":{
            color:"#fff",
        }
	},
	orders: {
		background:
			"linear-gradient(90deg, rgba(0,255,170,0.65) 0%, rgba(64,209,176,1) 39%, rgba(0,89,69,1) 100%)",
	},
	paid: {
		background:
			"linear-gradient(90deg, rgba(85,255,93,0.65) 0%, rgba(50,182,60,1) 39%, rgba(8,89,0,1) 100%)",
	},
	unpaid: {
		background:
			"linear-gradient(90deg, rgba(255,85,85,0.65) 0%, rgba(200,58,58,1) 39%, rgba(89,0,0,1) 100%)",
	},
	customers: {
		background:
			"linear-gradient(90deg, rgba(249,255,85,0.65) 0%, rgba(200,193,58,1) 39%, rgba(89,83,0,1) 100%)",
	},
});

function DashBoard(props) {
	const { open } = props;

	const history = useHistory();

	useEffect(() => {
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
						<Card className={[classes.card, classes.orders]}>
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
							<CardActions className={classes.seeMoreBtn}>
								<Link className={classes.link} to="/orders">
									More Info &#8594;
								</Link>
							</CardActions>
						</Card>
						<Card className={[classes.card, classes.paid]}>
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
							<CardActions className={classes.seeMoreBtn}>
								<Link className={classes.link} to="/orders/paid">
									More Info &#8594;
								</Link>
							</CardActions>
						</Card>
						<Card className={[classes.card, classes.unpaid]}>
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
							<CardActions className={classes.seeMoreBtn}>
								<Link className={classes.link} to="/orders/unpaid">
									More Info &#8594;
								</Link>
							</CardActions>
						</Card>
						<Card className={[classes.card, classes.customers]}>
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
							<CardActions className={classes.seeMoreBtn}>
								<Link className={classes.link} to="/customers">
									More Info &#8594;
								</Link>
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
export default connect(mapStateToProps)(DashBoard);
