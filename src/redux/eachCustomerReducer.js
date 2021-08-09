const initialState = {
	oids: [],
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
		default:
			return state;
	}
};
export default eachCustomerReducer;
