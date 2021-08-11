import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch, withRouter } from "react-router-dom";
import Dashboard from "./components/DashBoard";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgotPassword";
import PaidOrders from "./components/PaidOrders";
import UnpaidOrders from "./components/UnpaidOrders";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import { AuthContext, AuthProvider } from "./auth/AuthProvider";
import EachCustomer from "./components/EachCustomer";
import PageNotFound from "./components/PageNotFound";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Switch>
					<Route path="/login" component={Login}></Route>
					<Route path="/forgetpassword" component={ForgetPassword}></Route>
					<PrivateRoute path="/" exact abc={Dashboard} />
					<PrivateRoute path="/orders/paid" abc={PaidOrders} />
					<PrivateRoute path="/orders/unpaid" abc={UnpaidOrders} />
					<PrivateRoute path="/orders" exact abc={Orders} />
					<PrivateRoute path="/retailers" abc={Customers} />
					<PrivateRoute path="/retailer/:cid" abc={EachCustomer} />
                    <Route component={PageNotFound}></Route>
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

function PrivateRoute(parentProps) {
	let { currentUser } = useContext(AuthContext);
	const Component = parentProps.abc;
	return (
		<Route
			{...parentProps}
			render={(parentProps) => {
				return currentUser != null ? (
					<Component {...parentProps}></Component>
				) : (
					<Redirect to="/login"></Redirect>
				);
			}}
		></Route>
	);
}

export default App;
