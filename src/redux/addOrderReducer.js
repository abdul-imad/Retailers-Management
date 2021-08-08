const initialState = {
	items: [],
	totalAmount: 0,
};

export default function addOrderReducer(state = initialState, action) {
	switch (action.type) {
		case "add_item":
			return {
				...state,
				items: [
					...state.items,
					{ itemName: "", quantity: 0, price: 0, amount: 0 },
				],
			};
		case "set_item_name":
			let temp = [...state.items];
			temp[action.payload[1]].itemName = action.payload[0];
			return {
				...state,
				items: [...temp],
			};
		case "set_price":
			let temp2 = [...state.items];
			let newTotalAmount = state.totalAmount;
			newTotalAmount -= temp2[action.payload[1]].amount;
			temp2[action.payload[1]].price = action.payload[0];
			temp2[action.payload[1]].amount =
				action.payload[0] * temp2[action.payload[1]].quantity;
			newTotalAmount += temp2[action.payload[1]].amount;
			return {
				...state,
				items: [...temp2],
				totalAmount: newTotalAmount,
			};
		case "set_quantity":
			let temp3 = [...state.items];
			let newTotalAmount1 = state.totalAmount;
			newTotalAmount1 -= temp3[action.payload[1]].amount;
			temp3[action.payload[1]].quantity = action.payload[0];
			temp3[action.payload[1]].amount =
				action.payload[0] * temp3[action.payload[1]].price;
			newTotalAmount1 += temp3[action.payload[1]].amount;
			return {
				...state,
				items: [...temp3],
				totalAmount: newTotalAmount1,
			};

		default:
			return state;
	}
}
