import {customers} from "./middleWare/customerData" 
const initialState={
    customers:customers
}

export default function customerReducer(state = initialState,action){
    switch(action.type){
        default:
            return state
    }
}