import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import store from "../app/store";
import { db } from "../firebase/firebaseConfig";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import BasicTable from "./Table";
import SimpleModal from "./SimpleModal";
import { Input } from "@material-ui/core";
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
	searchInput: {
		display: "flex",
		margin: "0 auto 50px auto",
	},
});
function Customers(props) {
	const { open } = store.getState().Sidebar;
	const classes = useStyles();
	const { cName, cPhone, searchValue } = props;
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		(async () => {
			let customers = await db.collection("customers").get();
			let customerArr = [];
			customers.forEach((doc) => {
				customerArr.push(doc.data());
			});

			props.setAllCustomers([...customerArr]);
			if (searchValue === "") {
				props.setCustomers([...customerArr]);
			}
		})();
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

	const handleSearch = (val) => {
		props.setSearchValue(val);

		let searchedCustomers = props.allCustomers.filter((customer) => {
			return customer.cName.toLowerCase().includes(val.toLowerCase());
		});
		props.setCustomers(searchedCustomers);
	};

	// if(searchValue==""){
	// 	props.setCustomers([...props.allCustomers])
	// }else{
	// 	let searchedCustomers=props.allCustomers.map((customer)=>{
	// 		return customer.cName.contains(searchValue)
	// 	})
	// 	props.setCustomers(searchedCustomers)

	// }

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
					<div
						style={{
							marginTop: "6rem",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Input
							className={classes.searchInput}
							variant="contained"
							color="secondary"
							placeholder="Search Customer"
							value={searchValue}
							onChange={(e) => handleSearch(e.target.value)}
						></Input>
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

			{loader === true ? (
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
		setAllCustomers: (cust) => {
			return dispatch({ type: "set_all_customers", payload: [...cust] });
		},
		setSearchValue: (val) => {
			return dispatch({ type: "set_search_value", payload: val });
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
