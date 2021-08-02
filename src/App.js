import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "./components/DashBoard";
function App() {
	return (
		<BrowserRouter>
			<Switch>
                
				<Route exact path="/dashboard" component={Dashboard}></Route>
				<Redirect from="/" to="/dashboard"></Redirect>

				<Route></Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
