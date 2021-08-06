import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/DashBoard";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgotPassword";
import PaidOrders from "./components/PaidOrders";
import UnpaidOrders from "./components/UnpaidOrders";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Brands from "./components/Brands";
import { Provider } from "react-redux";
import store from "./app/store";
function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/forgetpassword" component={ForgetPassword}></Route>
					<Route path="/orders/paid" component={PaidOrders} />
					<Route path="/orders/unpaid" component={UnpaidOrders} />
					<Route path="/orders" exact component={Orders} />
					<Route path="/customers" component={Customers} />
					<Route path="/brands" component={Brands} />
					<Route exact path="/dashboard" component={Dashboard}></Route>
					<Redirect from="/" to="/dashboard"></Redirect>
				</Switch>
			</BrowserRouter>
		</Provider>
	);
}

export default App;
