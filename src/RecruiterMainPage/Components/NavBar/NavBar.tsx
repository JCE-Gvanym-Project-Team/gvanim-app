
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Box, Button, Stack, SxProps } from "@mui/material";
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ArticleOutlined, AssessmentOutlined, Home, PeopleAltOutlined, PersonOutline } from "@mui/icons-material";
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import MyLogoutDialog from "./Components/LogoutDialog";
import { AppBarSx, BoxDrawerAvatarSx, BoxDrawerSx, BoxNavigationOptionsSx, DividerDrawerSx, ListItemButtonDrawerSx, LogoutButtonBoxSx, NavBarIconColorSx, OpenDrawerIconSx, TypographyDrawerSx, WelcomeUserBoxSx } from "./NavBarStyle";
import { blue, blueGrey, grey, lightBlue } from "@mui/material/colors";
import UserDropMenu from "./Components/UserDropMenu/UserDropMenu";



const drawerWidth = 240;



const NavBar = (props: {
	handlelogout: any, HomeActive: any, setHomeActive: any,
	ReportsActive: any, setReportsActive: any, CandidatesActive: any, setCandidatesActive: any,
	JobsActive: any, setJobsActive: any
}) => {

	const {
		handlelogout,
		HomeActive,
		setHomeActive,
		ReportsActive,
		setReportsActive,
		CandidatesActive,
		setCandidatesActive,
		JobsActive,
		setJobsActive
	} = props;

	const navigate = useNavigate();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	// ############# Sx Props that cant be in another file #########
	const HomeButtonNavigationSx: SxProps = {
		"&:hover": {
			backgroundColor: HomeActive ? 'white' : 'rgb(52, 71, 103)',
			color: HomeActive ? 'rgb(52, 71, 103)' : 'white',
			outline: HomeActive ? 'none' : `3px ${blueGrey[300]}`,

		},
		'&:focus': {
			border: `solid ${blueGrey[300]}`,


		},
		border: HomeActive ? `3px solid ${blueGrey[300]}` : 'none',
		borderRadius: '0.6rem',
		backgroundColor: HomeActive ? 'white' : 'rgb(52, 71, 103)',
		color: HomeActive ? 'rgb(52, 71, 103)' : 'white'
	}

	const ReportsButtonNavigationSx: SxProps = {
		"&:hover": {
			backgroundColor: ReportsActive ? 'white' : 'rgb(52, 71, 103)',
			color: ReportsActive ? 'rgb(52, 71, 103)' : 'white',
			outline: ReportsActive ? 'none' : `3px ${blueGrey[300]}`,

		},
		'&:focus': {
			border: `3px solid ${blueGrey[300]}`,


		},
		border: ReportsActive ? `3px solid ${blueGrey[300]}` : 'none',
		borderRadius: '0.6rem',
		backgroundColor: ReportsActive ? 'white' : 'rgb(52, 71, 103)',
		color: ReportsActive ? 'rgb(52, 71, 103)' : 'white'
	}

	const CandidatesButtonNavigationSx: SxProps = {
		"&:hover": {
			backgroundColor: CandidatesActive ? 'white' : 'rgb(52, 71, 103)',
			color: CandidatesActive ? 'rgb(52, 71, 103)' : 'white',
			outline: CandidatesActive ? 'none' : `3px ${blueGrey[300]}`,
		},

		'&:focus': {
			border: `solid ${blueGrey[300]}`,
		},

		border: CandidatesActive ? `3px solid ${blueGrey[300]}` : 'none',
		borderRadius: '0.6rem',
		backgroundColor: CandidatesActive ? 'white' : 'rgb(52, 71, 103)',
		color: CandidatesActive ? 'rgb(52, 71, 103)' : 'white'
	}

	const JobsButtonNavigationSx: SxProps = {
		"&:hover": {
			backgroundColor: JobsActive ? 'white' : 'rgb(52, 71, 103)',
			color: JobsActive ? 'rgb(52, 71, 103)' : 'white',
			outline: JobsActive ? 'none' : `3px ${blueGrey[300]}`,
		},

		'&:focus': {
			border: `solid ${blueGrey[300]}`,
		},

		border: JobsActive ? `3px solid ${blueGrey[300]}` : 'none',
		borderRadius: '0.6rem',
		backgroundColor: JobsActive ? 'white' : 'rgb(52, 71, 103)',
		color: JobsActive ? 'rgb(52, 71, 103)' : 'white'
	}

	const DrawerPaperSx: SxProps = {
		display: { md: 'block', lg: 'none' },
		'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
	}
	// ######### END Sx Props #######################################

	const handleHomeClick = () => {
		setReportsActive(false);
		setCandidatesActive(false);
		setJobsActive(false);
		setHomeActive(true);
		navigate("/");
	};

	const handleReportsClick = () => {
		setCandidatesActive(false);
		setJobsActive(false);
		setHomeActive(false);
		setReportsActive(true);
		navigate("/reports");
	};

	const handleCandidatesClick = () => {
		setReportsActive(false);
		setJobsActive(false);
		setHomeActive(false);
		setCandidatesActive(true);
		navigate("/manageCandidates");
	};

	const handleJobsClick = () => {
		setReportsActive(false);
		setCandidatesActive(false);
		setHomeActive(false);
		setJobsActive(true);
		navigate("/manageJobs");
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={BoxDrawerSx}>
			<Box sx={BoxDrawerAvatarSx}>
				<Avatar />
			</Box>
			<Typography variant="caption" sx={TypographyDrawerSx}>
				ברוך הבא UserUser.
			</Typography>
			

			<Divider sx={DividerDrawerSx} />

			<List>
				<ListItem disablePadding>
					<ListItemButton sx={ListItemButtonDrawerSx} onClick={handleHomeClick}>
						<ListItemText primary='דף הבית' />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton sx={ListItemButtonDrawerSx} onClick={handleReportsClick}>
						<ListItemText primary='דוחות' />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton sx={ListItemButtonDrawerSx} onClick={handleCandidatesClick}>
						<ListItemText primary='ניהול מועמדים' />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton sx={ListItemButtonDrawerSx}>
						<ListItemText primary='ניהול משרות' onClick={handleJobsClick} />
					</ListItemButton>
				</ListItem>

				<MyLogoutDialog handlelogout={handlelogout} isMobile={true} />

			</List>
		</Box>
	);


	return (
		<Box sx={{ display: 'flex', marginTop: '80px' }}>
			<CssBaseline />
			<AppBar component="nav" sx={AppBarSx}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={OpenDrawerIconSx}
					>
						<MenuIcon sx={NavBarIconColorSx} />
					</IconButton>


					<Box sx={WelcomeUserBoxSx}>

						<UserDropMenu handlelogout={handlelogout} />
						<Typography
							marginLeft={1}
							sx={{maxWidth: 80,maxHeight: 20}}
							variant="caption"
						>
							ברוך הבא משתמש
						</Typography>
				

					</Box>

					<Box sx={BoxNavigationOptionsSx}>
						<Stack direction="row" spacing={2}>
							<Button disableRipple startIcon={<Home />} variant="text"
								sx={HomeButtonNavigationSx}
								onClick={handleHomeClick}
							>
								דף הבית
							</Button>
							<Button disableRipple startIcon={<AssessmentOutlined />} variant="text"
								sx={ReportsButtonNavigationSx}
								onClick={handleReportsClick}
							>
								דוחות
							</Button>
							<Button disableRipple startIcon={<PeopleAltOutlined />} variant="text"
								sx={CandidatesButtonNavigationSx}
								onClick={handleCandidatesClick}
							>
								ניהול מועמדים
							</Button>
							<Button disableRipple startIcon={<ArticleOutlined />} variant="text"
								sx={JobsButtonNavigationSx}
								onClick={handleJobsClick}
							>
								ניהול משרות
							</Button>

						</Stack>
					</Box>
				
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={DrawerPaperSx}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

export default NavBar;