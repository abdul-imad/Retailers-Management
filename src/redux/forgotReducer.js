const initialState = {
	forgotemail: "",
	isEmailCorrect: true,
	emailSent: false,
};

function forgotReducer(state = initialState, action) {
	switch (action.type) {
		case "set_forgot_email":
			return {
				...state,
				forgotemail: action.payload,
			};

		case "set_correct":
			return {
				...state,
				isEmailCorrect: action.payload,
			};

		case "email_sent":
			return {
				...state,
				emailSent: true,
			};

		default:
			return state;
	}
}

export default forgotReducer;
