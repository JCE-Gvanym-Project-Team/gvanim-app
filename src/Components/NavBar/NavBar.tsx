
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

interface Props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
}

const drawerWidth = 240;

export default function NavBar(props: Props) {
	const navigate = useNavigate();
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const [HomeActive, setHomeActive] = useState(true);
	const [ReportsActive, setReportsActive] = useState(false);
	const [CandidatesActive, setCandidatesActive] = useState(false);
	const [JobsActive, setJobsActive] = useState(false);


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
						<ListItemText primary='ניהול משרות' onClick={handleJobsClick}/>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton sx={{ textAlign: 'center' }}>
						<ListItemText primary='התנתק' />
					</ListItemButton>
				</ListItem>

			</List>
		</Box>
	);

	const container = window !== undefined ? () => window().document.body : undefined;


	return (
		<Box sx={{ display: 'flex', marginTop: '80px'}}>
			<CssBaseline />
			<AppBar component="nav" sx={{
				margin: '16px 24px',
				width: 'calc(100% - 48px)',
				borderRadius: '0.75rem',
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
						<Button size="large" endIcon={<Logout />} sx={{ color: '#fff' }}>
							התנתק
						</Button>


					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
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
}
