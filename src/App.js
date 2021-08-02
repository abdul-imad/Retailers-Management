import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/DashBoard";
function App() {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/dashboard" component={Dashboard}></Route>
				<Redirect from="/" to="/dashboard"></Redirect>
				<Route path="/login" component={Login}></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
