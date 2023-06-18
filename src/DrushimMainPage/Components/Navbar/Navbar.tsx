import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import NavBar from '../../AllJobsPage/Resources/navbar.jpeg';
import Logo from '../../../Components/Logo/logo.png';

export default function NavbarDrushim() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', top: 0 }}>
            <Stack direction='row' justifyContent='space-between' sx={{ height: '70px', backgroundColor: '#FFFFFF', paddingLeft: 2, paddingRight: 10 }}>
                <Box id='logo'>
                    <img src={Logo} alt="Logo" style={{ height: '85px' }} />
                </Box>
                <Stack direction='column' justifyContent='center' >
                    <Stack direction='row' spacing={2}>
                        <Box>
                            <Typography sx={{
                                font: 'normal normal normal 20px Rubik',
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
                            font: 'normal normal normal 20px Rubik',
                            color: '#5BA1AA',
                            letterSpacing: 0,
                            opacity: 1,
                        }}>
                            9913*
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <img src={NavBar} alt="NavBar" style={{ width: '100%' }} />
        </Box>
    )
}
