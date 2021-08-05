import { combineReducers } from "redux";
import forgotReducer from "./forgotReducer";
import sidebarReducer from "./sidebarReducer";
import customerReducer from "./customerReducer";

const rootReducer = combineReducers({
	Forgot: forgotReducer,
	Sidebar: sidebarReducer,
    Customers:customerReducer
});


export default rootReducer;
