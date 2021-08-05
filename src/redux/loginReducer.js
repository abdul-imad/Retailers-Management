const initialState = {
	email: "",
	password: "",
};

function loginReducer(state = initialState, action) {
	switch (action.type) {
		case "set_email":
			return {
				...state,
				email: action.payload,
			};
		case "set_password":
			return {
				...state,
				password: action.payload,
			};
		default:
			return state;
	}
}

export default loginReducer;
