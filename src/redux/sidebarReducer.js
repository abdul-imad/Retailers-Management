const initialState = {
	open: false,
};

function sidebarReducer(state = initialState, action) {
	switch (action.type) {
		case "open_sidebar": {
			return {
				...state,
				open: true,
			};
		}
		case "close_sidebar": {
			return {
				...state,
				open: false,
			};
		}
		default: {
			return state;
		}
	}
}

export default sidebarReducer;
