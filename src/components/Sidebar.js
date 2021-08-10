import React from "react";
import { Link } from "react-router-dom";
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
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ViewListIcon from "@material-ui/icons/ViewList";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
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
		backgroundColor: "#082032",
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	sidebarLink: {
		padding: "4px 2px",
		color: "#ddd",
		textDecoration: "none",
		fontSize: "16px",
		"&:hover": {
			color: "#fff",
		},
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
		boxShadow: "3px 1px 5px -2px rgba(0,0,0,0.75)",
		backgroundColor: "#082032",
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

	const handleLogout = async (e) => {
		handleDrawerClose();
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
					<h2>Admin</h2>
					<Typography
						variant="h6"
						noWrap
						className={classes.logoutBtn}
						onClick={handleLogout}
					>
						<Button variant="outlined" color="secondary">
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
							<ClearRoundedIcon style={{ color: "#fff" }} />
						) : (
							<ClearRoundedIcon style={{ color: "#fff" }} />
						)}
					</IconButton>
				</div>
				<Divider />
				<List>
					<Link
						to="/"
						className={classes.sidebarLink}
						onClick={handleDrawerClose}
					>
						<ListItem button>
							<ListItemIcon>
								<DashboardIcon style={{ color: "#fff" }} />
							</ListItemIcon>
							<p>Dashboard</p>
						</ListItem>
					</Link>
					<Link
						to="/retailers"
						className={classes.sidebarLink}
						onClick={handleDrawerClose}
					>
						<ListItem button>
							<ListItemIcon>
								<PersonIcon style={{ color: "#fff" }} />
							</ListItemIcon>
							<p>Retailers</p>
						</ListItem>
					</Link>
					<Link
						to="/orders"
						className={classes.sidebarLink}
						onClick={handleDrawerClose}
					>
						<ListItem button>
							<ListItemIcon>
								<ViewListIcon style={{ color: "#fff" }} />
							</ListItemIcon>
							<p>Total Orders</p>
						</ListItem>
					</Link>

					<Link
						to="/orders/paid"
						className={classes.sidebarLink}
						onClick={handleDrawerClose}
					>
						<ListItem button>
							<ListItemIcon>
								<PlaylistAddCheckIcon style={{ color: "#fff" }} />
							</ListItemIcon>
							<p>Paid Orders</p>
						</ListItem>
					</Link>
					<Link
						to="/orders/unpaid"
						className={classes.sidebarLink}
						onClick={handleDrawerClose}
					>
						<ListItem button>
							<ListItemIcon>
								<EventBusyIcon style={{ color: "#fff" }} />
							</ListItemIcon>
							<p>Unpaid Orders</p>
						</ListItem>
					</Link>
					<a href className={classes.sidebarLink}>
						<ListItem button onClick={handleLogout}>
							<ListItemIcon>
								<ExitToAppRoundedIcon style={{ color: "#fff" }} />
							</ListItemIcon>
							<p>Logout</p>
						</ListItem>
					</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
