import React, { useContext } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/DashBoard";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgotPassword";
import PaidOrders from "./components/PaidOrders";
import UnpaidOrders from "./components/UnpaidOrders";
import Orders from "./components/Orders";
import Customers from "./components/Customers";
import Brands from "./components/Brands";
import { AuthContext, AuthProvider } from "./auth/AuthProvider";

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
					<PrivateRoute path="/customers" abc={Customers} />
					<PrivateRoute path="/brands" abc={Brands} />
				</Switch>
			</AuthProvider>
		</BrowserRouter>
	);
}

function PrivateRoute(parentProps) {
	let { currentUser } = useContext(AuthContext);
	console.log(currentUser);
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
