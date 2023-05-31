import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Theme } from '@mui/material/styles';
import { Collapse, Divider, Link, Stack } from '@mui/material';
import MyDrawerButton from './Components/MyDrawerButton/MyDrawerButton';
import { ArticleOutlined, AssessmentOutlined, Home, LoginOutlined, PeopleAltOutlined, Settings } from '@mui/icons-material';
import MyLogoutDialog from '../LogoutDialog';
import { useNavigate } from "react-router-dom";


export default function MyDrawer(props: { handlelogout: any, userFirstName: any }) {
    const { handlelogout, userFirstName } = props;
    const [checked, setChecked] = React.useState(false);
    const [open, setOpen] = React.useState(false); // for the button drawer
    const navigate = useNavigate();

    return (
        <Box>
            <MyDrawerButton checked={checked} setChecked={setChecked} open={open} setOpen={setOpen} userFirstName={userFirstName} />

            <Collapse in={checked}>


                <Stack id="items" direction='column' spacing={3} sx={{ width: '100%' }} divider={<Divider sx={{ width: '100%' }} orientation="horizontal" flexItem />}>

                    <Box id="home" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', mt: 2 }}>
                        <Link onClick={()=>{navigate("/"); setChecked(!checked); setOpen(!open);}} 
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
                            <Home id="home" sx={{ fontSize: '1.07rem', marginRight: 1, alignSelf: 'bottom'}} />
                            דף הבית
                        </Link>
                    </Box>

                    <Box id="managejobs" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>

                        <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                            <Link onClick={()=> {navigate("/manageJobs"); setChecked(!checked); setOpen(!open);}} 
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
                                <ArticleOutlined id="jobsIcon" sx={{ fontSize: '1.07rem', marginRight: 1,alignSelf: 'bottom' }} />
                                ניהול משרות
                            </Link>
                        </Stack>

                    </Box>

                    <Box id="managecandidates" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>

                        <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                            <Link onClick={()=>{navigate("/manageCandidates"); setChecked(!checked); setOpen(!open);}} 
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
                                <PeopleAltOutlined id="candidatesIcon" sx={{ fontSize: '1.07rem', marginRight: 1,alignSelf: 'bottom' }} />
                                ניהול מועמדים
                            </Link>
                        </Stack>

                    </Box>

                    <Box id="reports" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>

                        <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                            <Link onClick={()=>{navigate("/reports"); setChecked(!checked); setOpen(!open);}} 
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
                                <AssessmentOutlined id="reportsIcon" sx={{ fontSize: '1.07rem', marginRight: 1,alignSelf: 'bottom' }} />
                                ניהול דוחות
                            </Link>
                        </Stack>

                    </Box>

                    <Box id="settings" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }}>

                        <Stack spacing={1} direction='row' sx={{ height: 'fit-content' }}>
                            <Link onClick={()=>{navigate("/settings"); setChecked(!checked); setOpen(!open);}}
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
                                <Settings id="reportsIcon" sx={{ fontSize: '1.07rem', marginRight: 1,alignSelf: 'bottom' }} />
                                הגדרות
                            </Link>
                        </Stack>

                    </Box>

                    <MyLogoutDialog handlelogout={handlelogout} isMobile={true} />

                </Stack>

            </Collapse>
        </Box>

    );
}