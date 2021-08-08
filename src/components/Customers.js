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
		if(searchValue==""){
			props.setCustomers([...customerArr])
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

	const handleSearch=(val)=>{
		props.setSearchValue(val);
		
		let searchedCustomers = props.allCustomers.filter(customer=>{
			return customer.cName.toLowerCase().includes(val.toLowerCase());
		})
		props.setCustomers(searchedCustomers)
	}

	const handleSortBy=(e)=>{
		props.setSortBy(e.target.value);

		console.log(e.target.value);

		if(e.target.value !== ""){
			let customersTobeSorted = [...props.customers]
			let sortedCustomers = customersTobeSorted.sort((customer1,customer2)=>{
				if(e.target.value==1){
					return customer1.Unpaid - customer2.Unpaid
				}else{
					return customer2.Unpaid - customer1.Unpaid
				}
			});
			props.setCustomers(sortedCustomers)
			console.log("sorting ",sortedCustomers)
		}else{
			handleSearch(props.searchValue)
		}

	}

	
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
					<div style={{ marginTop: "6rem", marginLeft: "15rem" }}>
						<h1>Styling dekhle ek baar Imad boi....sorting kardiya dekh</h1>

						<Input
							variant="contained"
							color="secondary"
							placeholder="Search Customer"
							value={searchValue}
							onChange={(e)=>handleSearch(e.target.value)}
							></Input>

						<SimpleSelect
							handleSortBy = {handleSortBy}
						></SimpleSelect>
						
						
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
		setSearchValue:(val)=>{
			return dispatch({type:"set_search_value",payload:val})
		},
		setSortBy:(val)=>{
			return dispatch({type:"set_sortBy",payload:val})
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Customers);
