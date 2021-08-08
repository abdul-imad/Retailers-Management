var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0");
var yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;

export const ordersData = [
	{
		orderID: 1,
		customerName: "gaffar",
		unpaid: 2000,
		paid: 1000,
		amount: 3000,
		date: today,
	},
	{
		orderID: 2,
		customerName: "yaqub",
		unpaid: 2500,
		paid: 1000,
		amount: 3500,
		date: today,
	},
	{
		orderID: 3,
		customerName: "mallesh",
		unpaid: 1000,
		paid: 500,
		amount: 1500,
		date: today,
	},
	{
		orderID: 4,
		customerName: "saleem",
		unpaid: 200,
		paid: 3000,
		amount: 3200,
		date: today,
	},
	{
		orderID: 5,
		customerName: "gafoor",
		unpaid: 600,
		paid: 2300,
		amount: 2900,
		date: today,
	},
];
