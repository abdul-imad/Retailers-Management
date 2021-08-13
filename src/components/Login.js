import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import {
	Card,
	CardActions,
	CardContent,
	Button,
	TextField,
	Typography,
} from "@material-ui/core";
import { AuthContext } from "../auth/AuthProvider";

let useStyles = makeStyles({
	centerDiv: {
		height: "100vh",
		width: "100vw",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	card: {
		height: "20rem",
		width: "20rem",
	},
	alignCenter: {
		justifyContent: "center",
	},
	centerElements: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	mb: {
		marginBottom: "2rem",
	},
	image: {
		height: "6rem",
		backgroundSize: "contain",
	},
});

export default function Login(props) {
    console.log(props);
	const { currentUser, login } = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoader] = useState(false);
	const history = useHistory();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoader(true);
			await login(email, password);
			setLoader(false);
            if (props.customPath === "/login") {
				history.push("/");
			} else {
				history.push(props.customPath);
			}
		} catch (err) {
			console.log(err);
			setLoader(false);
			alert("ERROR!! Enter valid email and password");
			setEmail("");
			setPassword("");
		}
	};

	useEffect(() => {
		if (currentUser) {
			console.log(props);
			if (props.customPath === "/login") {
				history.push("/");
			} else {
				history.push(props.customPath);
			}
		}
	});

	const classes = useStyles();

	return (
		<div className={classes.centerDiv}>
			<Card variant="outlined" className={classes.card}>
				<CardContent className={classes.centerElements}>
					<Typography variant="h5" className={classes.mb}>
						Login
					</Typography>
					<TextField
						id="outlined-basic"
						variant="outlined"
						label="Email"
						type="email"
						placeholder="abc@xyz.com"
						className={classes.mb}
						size="small"
						style={{ display: "block", width: "80%" }}
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<TextField
						variant="outlined"
						label="Password"
						type="password"
						placeholder="Enter password"
						className={classes.mb}
						size="small"
						style={{ display: "block", width: "80%" }}
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					></TextField>
					<Link to="/forgetpassword">ForgotPassword</Link>
					<Button
						color="primary"
						variant="contained"
						disabled={loading}
						style={{ width: "100%", marginTop: "2rem" }}
						onClick={handleSubmit}
					>
						Login
					</Button>
				</CardContent>
				<CardActions></CardActions>
			</Card>
		</div>
	);
}
