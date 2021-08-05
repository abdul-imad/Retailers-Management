import { createStore,applyMiddleware } from "redux";
import loginReducer from "./redux/loginReducer";
import thunk from "redux-thunk";
import rootReducer from "./redux/rootReducer";
import forgotReducer from "./redux/forgotReducer";

const store = createStore(forgotReducer,applyMiddleware(thunk));

export default store;