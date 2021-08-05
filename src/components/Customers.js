import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import store from "../app/store";
import { db } from "../firebase/firebaseConfig";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BasicTable from "./Table";
import SimpleModal from "./SimpleModal";
import { Input } from '@material-ui/core';
const useStyles = makeStyles({
  backdrop: {
    zIndex: 100,
    color: "#fff",
  },
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
  const { cName, cPhone } = props;
  const [loader, setLoader] = useState(false);

  useEffect(async () => {
    let customers = await db.collection("customers").get();
    let customerArr = [];
    customers.forEach((doc) => {
      customerArr.push(doc.data());
    });

    props.setCustomers([...customerArr]);
    console.log("In useEffect");
  }, []);

  const addCustomers = async (e) => {
    e.preventDefault();
    try {
      props.setCPhone("");
      props.setCName("");
      setLoader(true);
      let obj = {
        cName,
        cPhone,
        TotalAmount: 0,
        Paid: 0,
        Unpaid: 0,
        orders: [],
      };

      db.collection("customers").doc().set(obj);
      setLoader(false);
      props.history.push("/orders");
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  console.log(props.customers.length);

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
            <div style={{marginTop:"6rem",marginLeft:"15rem"}}>
            <Input variant = "contained" color="secondary" placeholder="Search Customer" ></Input>
          <BasicTable></BasicTable>
            </div>
          <SimpleModal
          addCustomers={addCustomers}
          loader={loader}
          setCName={props.setCName}
            setCPhone={props.setCPhone}
          ></SimpleModal>
        </main>
      </div>

      {loader == true ? (
        <Backdrop className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}
    </div>
  );
}

const mapStateToProps = (store) => {
  return store.Customers;
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCName: (val) => {
      return dispatch({ type: "set_cName", payload: val });
    },
    setCPhone: (val) => {
      return dispatch({ type: "set_cPhone", payload: val });
    },
    setCustomers: (cust) => {
      return dispatch({ type: "set_customers", payload: [...cust] });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
