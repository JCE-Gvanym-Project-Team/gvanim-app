import { Box, Stack, Typography, IconButton, Collapse, Divider } from '@mui/material'
import { Link } from 'react-router-dom';
import React from 'react'
import Logo from '../../../Components/Logo/logo.png';
import MyDrawer from '../../../RecruiterMainPage/Components/NavBar/Components/MyDrawer/MyDrawer';

export default function Navbar() {
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', top: 0 }}>
            <Stack direction='row' justifyContent='space-between' sx={{ height: '85px', backgroundColor: '#FFFFFF', paddingLeft: 2, paddingRight: 4, borderTop: '5px solid #053B7A' }}>
                <Stack direction='row' id='desk' sx={{ mt: '5px', width: 'fit-content' }} spacing={{ xs: 5, sm: 5, md: 10 }} justifyContent='start' display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                    <Box>
                        <img src={Logo} alt="Logo" style={{ height: '70px' }} />
                    </Box>
                    <Stack direction='column' justifyContent='center' display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                        <Stack direction='row' spacing={4}>
                            <Box>
                                <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/`}>
                                    <Box>
                                        <Typography sx={{ color: '#053B7A', font: 'normal normal normal 20px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
                                            ראשי
                                        </Typography>

                                        <Box sx={{
                                            mt: 0,
                                            background: '#053B7A 0% 0% no-repeat padding-box',
                                            height: '1px',
                                            borderRadius: '1px',
                                        }} />
                                    </Box>
                                </Link>
                            </Box>

                            <Box>
                                <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`/career/jobs`}>
                                    <Box>
                                        <Typography sx={{ color: '#053B7A', font: 'normal normal normal 20px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
                                            משרות
                                        </Typography>

                                        <Box sx={{
                                            mt: 0,
                                            background: '#053B7A 0% 0% no-repeat padding-box',
                                            height: '1px',
                                            borderRadius: '1px',
                                        }} />
                                    </Box>
                                </Link>
                            </Box>
                            <Box>
                                <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/index.php/he/node/4`}>
                                    <Box>
                                        <Typography sx={{ color: '#053B7A', font: 'normal normal normal 20px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
                                            אודות
                                        </Typography>

                                        <Box sx={{
                                            mt: 0,
                                            background: '#053B7A 0% 0% no-repeat padding-box',
                                            height: '1px',
                                            borderRadius: '1px',
                                        }} />
                                    </Box>
                                </Link>
                            </Box>


                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction='column' justifyContent='center' >
                    <Stack direction='row' spacing={2} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                        <Box>
                            <Typography sx={{
                                font: 'normal normal normal 18px Rubik',
                                color: '#91A749',
                                letterSpacing: 0,
                                opacity: 1,
                            }}>צריכים עזרה? דברו איתנו
                            </Typography>

                            <Box sx={{
                                mt: 0,
                                background: '#91A749 0% 0% no-repeat padding-box',
                                height: '1.5px',
                                borderRadius: '1px',
                            }} />

                        </Box>

                        <Typography sx={{
                            font: 'normal normal normal 18px Rubik',
                            color: '#5BA1AA',
                            letterSpacing: 0,
                            opacity: 1,
                        }}>
                            9913*
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction='row' id='mobile' sx={{ mt: '5px', width: '100%' }} justifyContent='space-between' display={{ xs: 'flex', sm: 'flex', md: 'none' }}>

                    <Box display='flex' flexDirection='column' justifyContent='center'>
                        <IconButton disableRipple onClick={() => setOpen(!open)}>
                            <Stack direction='column' spacing='7px' justifyContent='space-between' minHeight='17px'>
                                <Box sx={{
                                    transform: open ? 'rotate(45deg)' : 'none',
                                    transformOrigin: open ? '10% 10%' : 'unset',
                                    display: 'block',
                                    position: 'relative',
                                    width: '22px',
                                    height: '1px',
                                    borderRadius: '1px',
                                    background: '#053B7A',
                                    transition: 'all .2s',
                                    margin: '0 auto'
                                }} />

                                <Box display={open ? 'none' : 'block'} sx={{
                                    position: 'relative',
                                    width: '22px',
                                    height: '1px',
                                    borderRadius: '1px',
                                    background: '#053B7A',
                                    transition: 'all .2s',
                                    margin: '0 auto',

                                }} />

                                <Box sx={{
                                    transform: open ? 'rotate(-45deg)' : 'none',
                                    transformOrigin: open ? '-10% -10%' : 'unset',
                                    display: 'block',
                                    position: 'relative',
                                    width: '22px',
                                    height: '1px',
                                    borderRadius: '1px',
                                    background: '#053B7A',
                                    transition: 'all .2s',
                                    margin: '0 auto',

                                }} />
                            </Stack>

                        </IconButton>
                    </Box>

                    <Box>
                        <img src={Logo} alt="Logo" style={{ height: '70px' }} />
                    </Box>

                    <Box display='flex' flexDirection='column' justifyContent='center'>
                        <Typography sx={{
                            font: 'normal normal normal 18px Rubik',
                            color: '#5BA1AA',
                            letterSpacing: 0,
                            opacity: 1,
                        }}>
                            9913*
                        </Typography>
                    </Box>

                </Stack>
            </Stack>

            <Collapse in={open} sx={{display: {xs: 'flex', sm: 'flex', md: 'none'}}}>
            
                <Stack direction='column' justifyContent='center' divider={<Divider />} marginTop={4} paddingBottom={2} spacing={2} width='100%' height='fit-content'>
                    <Stack direction='row' justifyContent='center' width='100%'>
                        <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/`} onClick={() => setOpen(false)}>
                            <Box>
                                <Typography sx={{ color: '#053B7A', font: 'normal normal normal 20px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
                                    ראשי
                                </Typography>

                                <Box sx={{
                                    mt: 0,
                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                    height: '1px',
                                    borderRadius: '1px',
                                }} />
                            </Box>
                        </Link>
                    </Stack>

                    <Stack direction='row' justifyContent='center' width='100%'>
                        <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`/career/jobs`} onClick={() => setOpen(false)}>
                            <Box>
                                <Typography sx={{ color: '#053B7A', font: 'normal normal normal 20px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
                                    משרות
                                </Typography>

                                <Box sx={{
                                    mt: 0,
                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                    height: '1px',
                                    borderRadius: '1px',
                                }} />
                            </Box>
                        </Link>
                    </Stack>

                    <Stack direction='row' justifyContent='center' width='100%'>
                        <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/index.php/he/node/4`} onClick={() => setOpen(false)}>
                            <Box>
                                <Typography sx={{ color: '#053B7A', font: 'normal normal normal 20px Rubik', opacity: 1, letterSpacing: '0px', mb: 0 }}>
                                    אודות
                                </Typography>

                                <Box sx={{
                                    mt: 0,
                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                    height: '1px',
                                    borderRadius: '1px',
                                }} />
                            </Box>
                        </Link>
                    </Stack>
                </Stack>


            </Collapse>
        </Box>

    )
}
