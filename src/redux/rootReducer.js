import { combineReducers } from "redux";
import forgotReducer from "./forgotReducer";
import loginReducer from "./loginReducer";
import sidebarReducer from "./sidebarReducer";
import customerReducer from "./customerReducer";

const rootReducer = combineReducers({
	Login: loginReducer,
	Forgot: forgotReducer,
	Sidebar: sidebarReducer,
    Customers:customerReducer
});


export default rootReducer;
