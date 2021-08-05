import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/DashBoard";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgotPassword";
import {Provider} from "react-redux"
function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login" component={Login}></Route>
				<Route path="/forgetpassword" component={ForgetPassword}></Route>
				<Route exact path="/dashboard" component={Dashboard}></Route>
				<Redirect from="/" to="/dashboard"></Redirect>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
