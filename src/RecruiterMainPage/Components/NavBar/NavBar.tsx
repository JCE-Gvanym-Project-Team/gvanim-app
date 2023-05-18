
import Toolbar from "@mui/material/Toolbar";
import { Avatar, Box, Button, Stack } from "@mui/material";
import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ArticleOutlined, AssessmentOutlined, Home, Logout, PeopleAltOutlined, PersonOutline } from "@mui/icons-material";
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyLogoutDialog from "./Components/LogoutDialog";



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
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
				<Avatar />
			</Box>

			<Typography
				variant="caption"
				sx={{ marginLeft: 2, }}
			>
				ברוך הבא UserUser.
			</Typography>

			<Divider sx={{ marginTop: 1 }} />
			<List>

				<ListItem disablePadding>
					<ListItemButton sx={{ textAlign: 'center' }} onClick={handleHomeClick}>
						<ListItemText primary='דף הבית' />
					</ListItemButton>
				</ListItem>

				<ListItem disablePadding>
					<ListItemButton sx={{ textAlign: 'center' }} onClick={handleReportsClick}>
						<ListItemText primary='דוחות' />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton sx={{ textAlign: 'center' }} onClick={handleCandidatesClick}>
						<ListItemText primary='ניהול מועמדים' />
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton sx={{ textAlign: 'center' }}>
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
			<AppBar component="nav" sx={{
				background: 'linear-gradient(to top, rgb(9, 32, 63) 0%, rgb(83, 120, 149) 100%)',
				margin: '16px 24px',
				width: 'calc(100% - 48px)',
				borderRadius: '0.75rem',
				paddingTop: '0px',
				paddingBottom: '0px',
				boxShadow: 5
			}}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { md: 'none' } }}
					>
						<MenuIcon sx={{ color: '#fff' }} />
					</IconButton>


					<Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}>

						<IconButton
							color="inherit"
							edge="start"
							disabled

						>
							<AccountCircle sx={{ color: '#fff' }} />
						</IconButton>

						<Typography
							variant="caption"
						>
							ברוך הבא User.
						</Typography>

					</Box>

					<Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', justifyContent: 'center', width: '100%' } }}>
						<Stack direction="row" spacing={2}>
							<Button disableFocusRipple disableRipple size="large" startIcon={<Home />} variant="text"
								sx={{
									"&:hover": {
										backgroundColor: HomeActive ? 'white' : 'primary',
										color: HomeActive ? 'primary' : 'white'
									},

									borderRadius: '0.75rem',
									backgroundColor: HomeActive ? 'white' : 'primary',
									color: HomeActive ? 'primary' : 'white',
								}}
								onClick={handleHomeClick}
							>
								דף הבית
							</Button>
							<Button disableFocusRipple disableRipple size="large" startIcon={<AssessmentOutlined />} variant="text"
								sx={{
									"&:hover": {
										backgroundColor: ReportsActive ? 'white' : 'primary',
										color: ReportsActive ? 'primary' : 'white'
									},
									borderRadius: '0.75rem',
									backgroundColor: ReportsActive ? 'white' : 'primary',
									color: ReportsActive ? 'primary' : 'white',
								}}
								onClick={handleReportsClick}
							>
								דוחות
							</Button>
							<Button size="large" startIcon={<PeopleAltOutlined />} variant="text"
								sx={{
									"&:hover": {
										backgroundColor: CandidatesActive ? 'white' : 'primary',
										color: CandidatesActive ? 'primary' : 'white'
									},
									borderRadius: '0.75rem',
									backgroundColor: CandidatesActive ? 'white' : 'primary',
									color: CandidatesActive ? 'primary' : 'white',
								}}
								onClick={handleCandidatesClick}
							>
								ניהול מועמדים
							</Button>
							<Button size="large" startIcon={<ArticleOutlined />} variant="text"
								sx={{
									"&:hover": {
										backgroundColor: JobsActive ? 'white' : 'primary',
										color: JobsActive ? 'primary' : 'white'
									},
									borderRadius: '0.75rem',
									backgroundColor: JobsActive ? 'white' : 'primary',
									color: JobsActive ? 'primary' : 'white',
								}}
								onClick={handleJobsClick}
							>
								ניהול משרות
							</Button>

						</Stack>
					</Box>
					<Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', justifyContent: 'center', width: 'fit-content' } }}>
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
					sx={{
						display: { md: 'block', lg: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

export default NavBar;