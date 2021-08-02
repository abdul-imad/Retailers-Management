import {combineReducers} from "redux"
import loginReducer from "./loginReducer"

const rootReducer=combineReducers({
	Login:loginReducer
})

export default rootReducer;



