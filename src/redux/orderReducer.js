const initialState = {
	allOrders: [],
	orders: [],
	searchValue: "",
};

function orderReducer(state = initialState, action) {
	switch (action.type) {
		case "set_orders":
			return {
				...state,
				orders: [...action.payload],
			};
		case "set_all_orders":
			return {
				...state,
				allOrders: [...action.payload],
			};
		case "set_search_value":
			return {
				...state,
				searchValue: action.payload,
			};
		default:
			return state;
	}
}

export default orderReducer;
