
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
			backgroundColor: HomeActive ? 'white' : 'primary',
			color: HomeActive ? 'primary' : 'white'
		},

		borderRadius: '0.75rem',
		backgroundColor: HomeActive ? 'white' : 'primary',
		color: HomeActive ? 'primary' : 'white'
	}

	const ReportsButtonNavigationSx: SxProps = {
		"&:hover": {
			backgroundColor: ReportsActive ? 'white' : 'primary',
			color: ReportsActive ? 'primary' : 'white'
		},
		borderRadius: '0.75rem',
		backgroundColor: ReportsActive ? 'white' : 'primary',
		color: ReportsActive ? 'primary' : 'white'
	}

	const CandidatesButtonNavigationSx: SxProps = {
		"&:hover": {
			backgroundColor: CandidatesActive ? 'white' : 'primary',
			color: CandidatesActive ? 'primary' : 'white'
		},
		borderRadius: '0.75rem',
		backgroundColor: CandidatesActive ? 'white' : 'primary',
		color: CandidatesActive ? 'primary' : 'white'
	}

	const JobsButtonNavigationSx: SxProps = {
		"&:hover": {
			backgroundColor: JobsActive ? 'white' : 'primary',
			color: JobsActive ? 'primary' : 'white'
		},
		borderRadius: '0.75rem',
		backgroundColor: JobsActive ? 'white' : 'primary',
		color: JobsActive ? 'primary' : 'white'
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

						<IconButton
							color="inherit"
							aria-label="welcome user"
							edge="start"
							disabled

						>
							<AccountCircle sx={NavBarIconColorSx} />
						</IconButton>

						<Typography
							variant="caption"
						>
							ברוך הבא User.
						</Typography>

					</Box>

					<Box sx={BoxNavigationOptionsSx}>
						<Stack direction="row" spacing={2}>
							<Button disableFocusRipple disableRipple size="large" startIcon={<Home />} variant="text"
								sx={HomeButtonNavigationSx}
								onClick={handleHomeClick}
							>
								דף הבית
							</Button>
							<Button disableFocusRipple disableRipple size="large" startIcon={<AssessmentOutlined />} variant="text"
								sx={ReportsButtonNavigationSx}
								onClick={handleReportsClick}
							>
								דוחות
							</Button>
							<Button size="large" startIcon={<PeopleAltOutlined />} variant="text"
								sx={CandidatesButtonNavigationSx}
								onClick={handleCandidatesClick}
							>
								ניהול מועמדים
							</Button>
							<Button size="large" startIcon={<ArticleOutlined />} variant="text"
								sx={JobsButtonNavigationSx}
								onClick={handleJobsClick}
							>
								ניהול משרות
							</Button>

						</Stack>
					</Box>
					<Box sx={LogoutButtonBoxSx}>
						<MyLogoutDialog handlelogout={handlelogout} isMobile={false} />
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