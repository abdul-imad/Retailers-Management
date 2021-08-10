import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import store from "../app/store";
import { database, db } from "../firebase/firebaseConfig";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "./Table";
import SimpleModal from "./SimpleModal";
import { Input } from "@material-ui/core";
import SimpleSelect from "./SortCustomer";
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
	filter: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-evenly",
		marginBottom: "50px",
	},
});

function Customers(props) {
	const { open } = store.getState().Sidebar;
	const classes = useStyles();
	const { cName, cPhone, searchValue } = props;
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		(async () => {
			let customerArr = [];
			let unsub = await db
				.collection("customers")
				.orderBy("createdAt", "desc")
				.onSnapshot(async (snapshot) => {
					customerArr = snapshot.docs.map((doc) => {
						let eachCustData = { data: doc.data(), cid: doc.id };
						return eachCustData;
					});

					props.setAllCustomers([...customerArr]);
					if (searchValue === "") {
						props.setCustomers([...customerArr]);
					}
				});
			return unsub;
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
				createdAt: database.getTimeStamp(),
			};

			db.collection("customers").doc().set(obj);
			setLoader(false);
			props.setOpen(false);
		} catch (err) {
			console.log(err);
			setLoader(false);
		}
	};

	const handleSearch = (val) => {
		props.setSearchValue(val);

		let searchedCustomers = props.allCustomers.filter((customer) => {
			return customer.data.cName.toLowerCase().includes(val.toLowerCase());
		});
		props.setCustomers(searchedCustomers);
	};

	const handleSortBy = (e) => {
		props.setSortBy(e.target.value);

		console.log(e.target.value);

		if (e.target.value !== "") {
			let customersTobeSorted = [...props.customers];
			let sortedCustomers = customersTobeSorted.sort((customer1, customer2) => {
				if (e.target.value === 1) {
					return customer1.data.Unpaid - customer2.data.Unpaid;
				} else {
					return customer2.data.Unpaid - customer1.data.Unpaid;
				}
			});
			props.setCustomers(sortedCustomers);
			console.log("sorting ", sortedCustomers);
		} else {
			handleSearch(props.searchValue);
		}
	};
	console.log(props.allCustomers)

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
						<div className={classes.filter}>
							<Input
								variant="contained"
								color="secondary"
								placeholder="Search Customer"
								value={searchValue}
								onChange={(e) => handleSearch(e.target.value)}
							></Input>

							<SimpleSelect handleSortBy={handleSortBy} />
						</div>

						<Table />
					</div>
					<SimpleModal
						addCustomers={addCustomers}
						loader={loader}
						setCName={props.setCName}
						setCPhone={props.setCPhone}
						open={props.open}
						setOpen={props.setOpen}
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
		setSortBy: (val) => {
			return dispatch({ type: "set_sortBy", payload: val });
		},
		setOpen: (flag) => {
			return dispatch({ type: "set_open", payload: flag });
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Customers)
