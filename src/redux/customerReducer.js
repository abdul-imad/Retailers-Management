const initialState={
    allCustomers:[],
    customers:[],
    cName:"",
    cPhone:"",
    searchValue:""
}

export default function customerReducer(state = initialState,action){
    switch(action.type){
        case "set_cName":
            return {
                ...state,
                cName:action.payload
            }
        case "set_cPhone":
            return {
                ...state,
                cPhone:action.payload
            }
        case "set_customers":
            return{
                ...state,
                customers:[...action.payload]
            }
            case "set_all_customers":
                return{
                    ...state,
                    allCustomers:[...action.payload]
                }
        case "set_search_value":
            return{
                ...state,
                searchValue:action.payload
            }
        default:
            return state
    }
}