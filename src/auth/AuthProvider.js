import React, { useEffect, useState } from "react";
import auth from "../firebase/firebaseConfig";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
	const [currentUser, setUser] = useState();
	const [loader, setLoader] = useState(true);

	async function login(email, password) {
		return await auth.signInWithEmailAndPassword(email, password);
	}

	async function signOut() {
		return await auth.signOut();
	}

	useEffect(() => {
		let resp = auth.onAuthStateChanged((user) => {
			setUser(user);
			setLoader(false);
		});
		return function () {
			resp();
		};
	}, []);

	const value = {
		login,
		signOut,
		currentUser,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loader && children}
		</AuthContext.Provider>
	);
}
