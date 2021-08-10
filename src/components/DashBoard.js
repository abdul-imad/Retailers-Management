import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import auth, { db } from "../firebase/firebaseConfig";
import { useLayoutEffect } from "react";

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
		textDecoration: "none",
		"&:hover": {
			color: "#fff",
		},
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
	const [clength, setClength] = useState(0);
	const [totalOrdersLength, setTotalOrdersLength] = useState(0);
	const [paidOrdersLength, setPaidOrdersLength] = useState(0);
	const [unpaidOrdersLength, setUnpaidOrdersLength] = useState(0);
	const history = useHistory();
	useEffect(() => {
		(async () => {
			try {
				let docRef = db.collection("customers");
				let getData = await docRef.get();
				let customerLength = 0;
				getData.forEach(() => {
					customerLength++;
				});
				let orderslength = 0;
				let pol = 0;
				let uol = 0;
				let totalOrders = await db.collection("orders").get();
				totalOrders.forEach((doc) => {
					orderslength++;
					if (doc.data.unpaid == 0) {
						pol++;
					} else {
						uol++;
					}
				});

				setTotalOrdersLength(orderslength);
				setPaidOrdersLength(pol);
				setUnpaidOrdersLength(uol);
				setClength(customerLength);
				setTotalOrdersLength(orderslength);
				return docRef;
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

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
									{totalOrdersLength}
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
									{paidOrdersLength}
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
									{unpaidOrdersLength}
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
									{clength}
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
