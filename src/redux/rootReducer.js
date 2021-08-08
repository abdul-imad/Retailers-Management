import { combineReducers } from "redux";
import forgotReducer from "./forgotReducer";
import sidebarReducer from "./sidebarReducer";
import customerReducer from "./customerReducer";
import eachCustomerReducer from "./eachCustomerReducer";
import orderReducer from "./orderReducer";
import addOrderReducer from "./addOrderReducer";

const rootReducer = combineReducers({
	Forgot: forgotReducer,
	Sidebar: sidebarReducer,
	Customers: customerReducer,
	EachCustomer: eachCustomerReducer,
	Orders: orderReducer,
	AddOrders: addOrderReducer,
});

export default rootReducer;
