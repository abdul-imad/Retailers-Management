import {combineReducers} from "redux"
import forgotReducer from "./forgotReducer";
import loginReducer from "./loginReducer"

const rootReducer=combineReducers({
	Login:loginReducer,
	Forgot:forgotReducer
})

export default rootReducer;



