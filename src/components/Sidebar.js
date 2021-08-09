import React from "react";
import { Link, withRouter } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";
const useStyles = makeStyles((theme) => ({
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		boxShadow: "1px 1px 7px 3px #ddd",
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 240,
	},
	logoutBtn: {
		position: "absolute",
		right: "10px",
		color: "#fff",
	},
}));

const drawerWidth = 240;

function Sidebar(props) {
	const { open, handleDrawerClose, handleDrawerOpen } = props;
	const { signOut } = useContext(AuthContext);

	const handleLogout = async () => {
		await signOut();
	};

	const classes = useStyles();
	const theme = useTheme();
	return (
		<>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Admin
					</Typography>
					<Typography
						variant="h6"
						noWrap
						className={classes.logoutBtn}
						onClick={handleLogout}
					>
						<Button variant="contained" color="primary">
							<ExitToAppRoundedIcon />
							Logout
						</Button>
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ClearRoundedIcon />
						) : (
							<ClearRoundedIcon />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<Link to="/" onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary="Dashboard" />
						</ListItem>
					</Link>
					<Link to="/customers" onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary="Customers" />
						</ListItem>
					</Link>
					<Link to="/orders" onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary="Orders" />
						</ListItem>
					</Link>

					<Link to="/Items" onClick={handleDrawerClose}>
						<ListItem button>
							<ListItemIcon>
								<MailIcon />
							</ListItemIcon>
							<ListItemText primary="Items" />
						</ListItem>
					</Link>
				</List>
			</Drawer>
		</>
	);
}

const mapStateToProps = (state) => {
	return state.Sidebar;
};

const mapDispatchToProps = (dispatch) => {
	return {
		handleDrawerOpen: () => {
			return dispatch({ type: "open_sidebar" });
		},
		handleDrawerClose: () => {
			return dispatch({ type: "close_sidebar" });
		},
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar));
