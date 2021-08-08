import { combineReducers } from "redux";
import forgotReducer from "./forgotReducer";
import sidebarReducer from "./sidebarReducer";
import customerReducer from "./customerReducer";
import eachCustomerReducer from "./eachCustomerReducer";

const rootReducer = combineReducers({
	Forgot: forgotReducer,
	Sidebar: sidebarReducer,
    Customers:customerReducer,
	EachCustomer:eachCustomerReducer
});


export default rootReducer;
