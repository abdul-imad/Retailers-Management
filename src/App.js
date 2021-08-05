import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/DashBoard";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgotPassword";
import {Provider} from "react-redux"
import store from "./store";
import Customers from "./components/Customers";
function App() {
	return (
		<Provider store={store} >
			<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login}></Route>
				<Route path="/forgetpassword" component={ForgetPassword}></Route>
				<Route exact path="/dashboard" component={Dashboard}></Route>
				<Route path = "/customers" component={Customers}></Route>
				<Redirect from="/" to="/dashboard"></Redirect>
			</Switch>
		</BrowserRouter>
		</Provider>
	);
}

export default App;
