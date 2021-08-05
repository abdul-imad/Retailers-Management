import { combineReducers } from "redux";
import forgotReducer from "./forgotReducer";
import loginReducer from "./loginReducer";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
	Login: loginReducer,
	Forgot: forgotReducer,
	Sidebar: sidebarReducer,
});

export default rootReducer;
