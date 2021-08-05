import {combineReducers} from "redux"
import forgotReducer from "./forgotReducer";
import loginReducer from "./loginReducer"
import customerReducer from "./middleWare/customerReducer";

const rootReducer=combineReducers({
	Login:loginReducer,
	Forgot:forgotReducer,
	Customers:customerReducer
})

export default rootReducer;



