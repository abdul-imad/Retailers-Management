const initialState = {
	oids: [],
	currentOrder: [],
};

const eachCustomerReducer = (state = initialState, action) => {
	switch (action.type) {
		case "set_oids":
			console.log(action.payload);
			return {
				oids: [...state.oids, action.payload],
			};

		case "reset_oids":
			return {
				oids: [],
			};
		case "set_current_order":
			console.log(state.oids[0]);
			return {
				...state,
				currentOrder: state.oids[action.payload],
			};
		default:
			return state;
	}
};
export default eachCustomerReducer;
