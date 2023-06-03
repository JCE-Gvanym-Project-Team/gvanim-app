import React from 'react'
import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material';
import { ArticleOutlined, AssessmentOutlined, Home, PeopleAltOutlined, Settings } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { NavBarSx } from './NavBarStyle';
import MyDrawer from './Components/MyDrawer/MyDrawer';
import MyLogoutDialog from './Components/LogoutDialog';

export default function NavBar(props: { handlelogout }) {
	const userFirstName = "משתמש";
    const { handlelogout } = props;
    const navigate = useNavigate();

    return (
        <>
            <Box sx={NavBarSx}>



                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Box id="drawer-button" display={{ xs: 'inline-block', sm: 'inline-block', md: 'inline-block', lg: 'none', xl: 'none' }} sx={{
                        pt: '0.5rem', pb: '0.5rem', width: '100%'
                    }}>
                        <MyDrawer handlelogout={handlelogout} userFirstName={userFirstName} />
                    </Box>


                    <Stack id='welcome-user' display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }} sx={{ width: 'fit-content', borderRight: '1px solid rgba(0, 0, 0, 0.125)', paddingLeft: 1, paddingRight: 3 }}>
                        <Stack direction='row' spacing={1}>
                            <Typography sx={{ color: '#344767', fontSize: '0.875rem', lineHeight: '1.625',opacity: 0.8 }} >
                                שלום
                            </Typography>

                            <Stack direction='row'>
                                <Typography sx={{ color: 'black', fontSize: '0.9rem', lineHeight: '1.625', fontWeight: 600 }} >
                                    {userFirstName}
                                </Typography>

                            </Stack>
                        </Stack>
                        <Typography sx={{ color: '#344767', fontSize: '0.875rem', lineHeight: '1.625',opacity: 0.8  }} >
                            ברוך הבא!
                        </Typography>
                    </Stack>
					

                    <Stack id='items' divider={<Divider sx={{ height: '50%', alignSelf: 'center' }} orientation="vertical" flexItem />} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }} direction='row' spacing={'1.7rem'}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                                <Link onClick={() => navigate('/management')}
                                    sx={{
										cursor: 'pointer', 
                                        ":hover > #home": {
                                            transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                            transform: 'translateY(-2px)',
                                        },
                                        textDecoration: 'unset',
                                        color: '#344767',
                                        fontSize: '0.87rem'
                                    }}>
                                    <Home id="home" sx={{ fontSize: '1.07rem', marginRight: 1, alignSelf: 'bottom' }} />
                                    דף הבית
                                </Link>
                            </Stack>

                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                                <Link onClick={() => navigate('/management/manageJobs')}
                                    sx={{
										cursor: 'pointer',
                                        ":hover > #jobsIcon": {
                                            transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                            transform: 'translateY(-2px)',
                                        },
                                        textDecoration: 'unset',
                                        color: '#344767',
                                        fontSize: '0.87rem'
                                    }}
                                >
                                    <ArticleOutlined id="jobsIcon" sx={{ fontSize: '1.07rem', marginRight: 1, alignSelf: 'bottom' }} />
                                    ניהול משרות
                                </Link>
                            </Stack>

                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                                <Link onClick={() => navigate('/management/manageCandidates')}
                                    sx={{
										cursor: 'pointer',
                                        ":hover > #candidatesIcon": {
                                            transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                            transform: 'translateY(-2px)',
                                        },
                                        textDecoration: 'unset',
                                        color: '#344767',
                                        fontSize: '0.87rem'
                                    }}
                                >
                                    <PeopleAltOutlined id="candidatesIcon" sx={{ fontSize: '1.07rem', marginRight: 1, alignSelf: 'bottom' }} />
                                    ניהול מועמדים
                                </Link>
                            </Stack>

                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                            <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                                <Link onClick={() => navigate('/management/reports')}
                                    sx={{
										cursor: 'pointer',
                                        ":hover > #reportsIcon": {
                                            transition: 'all .2s cubic-bezier(.34,1.61,.7,1.3)',
                                            transform: 'translateY(-2px)',
                                        },
                                        textDecoration: 'unset',
                                        color: '#344767',
                                        fontSize: '0.87rem'
                                    }}
                                >
                                    <AssessmentOutlined id="reportsIcon" sx={{ fontSize: '1.07rem', marginRight: 1, alignSelf: 'bottom' }} />
                                    ניהול דוחות
                                </Link>
                            </Stack>

                        </Box>


                    </Stack>



                    <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' }} sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                        <Stack direction='row' sx={{ height: 'fit-content' }}>

                            <Button onClick={() => navigate("/management/settings")} disableRipple sx={{
                                ":hover": {
                                    backgroundColor: '#555abf',
                                    borderColor: '#344767',
                                    boxShadow: '0 14px 26px -12px rgba(52,71,103,.4), 0 4px 23px 0 rgba(52,71,103,.15), 0 8px 10px -5px rgba(52,71,103,.2)'
                                },
                                ":hover > #settings": {
                                    WebkitAnimation: 'spin 2s linear infinite',
                                    MozAnimation: 'spin 8s infinite',
                                    animation: ' spin 8s infinite'
                                },
                                backgroundColor: '#555abf',
                                boxShadow: '0 3px 3px 0 rgba(52,71,103,.15), 0 3px 1px -2px rgba(52,71,103,.2), 0 1px 5px 0 rgba(52,71,103,.15)',
                                border: 0,
                                color: '#fff',
                                mb: 0,
                                mt: 0,
                                mr: '0.25rem',
                                letterSpacing: 0,
                                backgroundSize: '150%',
                                backgroundPositionX: '25%',
                                position: 'relative',
                                overflow: 'hidden',
                                WebkitAppearance: 'none',
                                borderRadius: '0.5rem',
                                fontSize: '0.8rem',
                                paddingX: '1rem',
                                paddingY: '0.375rem',
                                fontWeight: 600,
                                margin: '0px 4px 0px 4px',
                                lineHeight: 1.667,
                                minWidth: '100px',
                                height: '32px'

                            }}> <Settings id="settings" sx={{ fontSize: '1rem' }} />
                                <Typography sx={{ font: '13px Roboto, Helvetica,Arial, sans-serif', margin: '0px 4px 0px 0px', padding: '4px 12px', fontWeight: 600 }}>הגדרות</Typography>
                            </Button>

                            <MyLogoutDialog handlelogout={handlelogout} isMobile={false} />

                        </Stack>
                    </Box>
                </Box>


            </Box >

        </>
    )
}
