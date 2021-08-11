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
		let unpaidAmount = doc.data().unpaid
			if(unpaidAmount == 0){
				pol++
			}else{
				uol++
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
            <Card className={classes.card}>
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
                  {paidOrdersLength}
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
                  {unpaidOrdersLength}
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
                  {clength}{" "}
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
export default connect(mapStateToProps)(DashBoard);
