import { Box, Stack, Typography, IconButton, Collapse, Divider } from '@mui/material'
import { Link } from 'react-router-dom';
import Logo from '../../../Components/Logo/logo.png';
import React from 'react';
import { ColorModeContext } from '../../theme';

export default function Navbar() {
    const colorMode = React.useContext(ColorModeContext);
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <Box sx={{ position: "sticky",width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', top: 0, boxShadow: "0px 3px 10px #00000029;", zIndex: 20 }}>
            <Stack direction='row' justifyContent='space-between'
                sx={{
                    height: '85px',
                    backgroundColor: colorMode?.getActualMode()! === 'light'
                        ? '#FFFFFF'
                        : colorMode?.getActualMode()! === 'dark-contrast'
                            ? '#000000'
                            : colorMode?.getActualMode()! === 'bright-contrast'
                                ? '#FFFFFF'
                                : '#FFFFFF', // black & white

                    paddingLeft: 2,
                    paddingRight: 4,
                    borderTop: '5px solid',
                    borderColor:
                        colorMode?.getActualMode()! === 'light'
                            ? '#053B7A'
                            : colorMode?.getActualMode()! === 'dark-contrast'
                                ? '#b2d0ec'
                                : colorMode?.getActualMode()! === 'bright-contrast'
                                    ? '#a9d1ff'
                                    : '#323232', // black & white
                }}>
                <Stack direction='row' id='desk' sx={{ mt: '5px', width: 'fit-content' }} spacing={{ xs: 5, sm: 5, md: 10 }} justifyContent='start' display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                    <Box>
                        <img src={Logo} alt="Logo" style={{ height: '70px' }} />
                    </Box>
                    <Stack direction='column' justifyContent='center' display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                        <Stack direction='row' spacing={4}>
                            <Box>
                                <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/`}>
                                    <Box>
                                        <Typography
                                            sx={{
                                                color: 
                                                colorMode?.getActualMode()! === 'light'
                                                ? '#053B7A'
                                                : colorMode?.getActualMode()! === 'dark-contrast'
                                                    ? '#b2d0ec'
                                                    : colorMode?.getActualMode()! === 'bright-contrast'
                                                        ? '#053B7A'
                                                        : '#000000', // black & white
                                                font: 'normal normal normal 20px Rubik',
                                                opacity: 1,
                                                letterSpacing: '0px',
                                                mb: 0
                                            }}>
                                            ראשי
                                        </Typography>

                                        <Box sx={{
                                            mt: 0,
                                            background:
                                            colorMode?.getActualMode()! === 'light'
                                            ? '#053B7A'
                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                ? '#b2d0ec'
                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                    ? '#053B7A'
                                                    : '#000000', // black & white
                                            height: '1px',
                                            borderRadius: '1px',
                                        }} />
                                    </Box>
                                </Link>
                            </Box>

                            <Box>
                                <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`/career/jobs`}>
                                    <Box>
                                        <Typography sx={{ 
                                            color: 
                                            colorMode?.getActualMode()! === 'light'
                                            ? '#053B7A'
                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                ? '#b2d0ec'
                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                    ? '#053B7A'
                                                    : '#000000', // black & white
                                             font: 'normal normal normal 20px Rubik',
                                              opacity: 1,
                                               letterSpacing: '0px',
                                                mb: 0 
                                                }}>
                                            משרות
                                        </Typography>

                                        <Box sx={{
                                            mt: 0,
                                            background: 
                                            colorMode?.getActualMode()! === 'light'
                                            ? '#053B7A'
                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                ? '#b2d0ec'
                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                    ? '#053B7A'
                                                    : '#000000', // black & white
                                            height: '1px',
                                            borderRadius: '1px',
                                        }} />
                                    </Box>
                                </Link>
                            </Box>
                            <Box>
                                <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/index.php/he/node/4`}>
                                    <Box>
                                        <Typography sx={{ 
                                            color: 
                                            colorMode?.getActualMode()! === 'light'
                                            ? '#053B7A'
                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                ? '#b2d0ec'
                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                    ? '#053B7A'
                                                    : '#000000', // black & white
                                             font: 'normal normal normal 20px Rubik',
                                              opacity: 1,
                                               letterSpacing: '0px',
                                                mb: 0
                                                 }}>
                                            אודות
                                        </Typography>

                                        <Box sx={{
                                            mt: 0,
                                            background: 
                                            colorMode?.getActualMode()! === 'light'
                                            ? '#053B7A'
                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                ? '#b2d0ec'
                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                    ? '#053B7A'
                                                    : '#000000', // black & white
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
                                //#c3c6aa
                                // color: '#91A749',
                                color:
                                colorMode?.getActualMode()! === 'light'
                                ? '#91A749'
                                : colorMode?.getActualMode()! === 'dark-contrast'
                                    ? '#c3c6aa' 
                                    : colorMode?.getActualMode()! === 'bright-contrast'
                                        ? '#91A749'
                                        : 'gray', // black & white
                                letterSpacing: 0,
                                opacity: 1,
                            }}>צריכים עזרה? דברו איתנו
                            </Typography>

                            <Box sx={{
                                mt: 0,
                                background: 
                                colorMode?.getActualMode()! === 'light'
                                ? '#91A749'
                                : colorMode?.getActualMode()! === 'dark-contrast'
                                    ? '#c3c6aa'
                                    : colorMode?.getActualMode()! === 'bright-contrast'
                                        ? '#91A749'
                                        : 'gray', // black & white
                                height: '1.5px',
                                borderRadius: '1px',
                            }} />

                        </Box>

                        <Typography sx={{
                            font: 'normal normal normal 18px Rubik',
                            color: 
                            colorMode?.getActualMode()! === 'light'
                            ? '#5BA1AA'
                            : colorMode?.getActualMode()! === 'dark-contrast'
                                ? '#b2d0ec'
                                : colorMode?.getActualMode()! === 'bright-contrast'
                                    ? '#5BA1AA'
                                    : '#000000', // black & white

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
                                    background: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
        
                                    transition: 'all .2s',
                                    margin: '0 auto'
                                }} />

                                <Box display={open ? 'none' : 'block'} sx={{
                                    position: 'relative',
                                    width: '22px',
                                    height: '1px',
                                    borderRadius: '1px',
                                    background: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
        
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
                                    background: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
        
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
                            color: 
                            colorMode?.getActualMode()! === 'light'
                            ? '#5BA1AA'
                            : colorMode?.getActualMode()! === 'dark-contrast'
                                ? '#b2d0ec'
                                : colorMode?.getActualMode()! === 'bright-contrast'
                                    ? '#5BA1AA'
                                    : '#000000', // black & white

                            letterSpacing: 0,
                            opacity: 1,
                        }}>
                            9913*
                        </Typography>
                    </Box>

                </Stack>
            </Stack>

            <Collapse in={open} sx={{ display: { xs: 'flex', sm: 'flex', md: 'none', } }}>

                <Stack direction='column' justifyContent='center' divider={<Divider sx={{backgroundColor: 'primary.divider'}} />} marginTop={4} paddingBottom={2} spacing={2} width='100%' height='fit-content'>
                    <Stack direction='row' justifyContent='center' width='100%'>
                        <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/`} onClick={() => setOpen(false)}>
                            <Box>
                                <Typography
                                sx={{ 
                                    color: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
                                     font: 'normal normal normal 20px Rubik',
                                      opacity: 1,
                                       letterSpacing: '0px',
                                        mb: 0 
                                        }}>
                                    ראשי
                                </Typography>

                                <Box sx={{
                                    mt: 0,
                                    background: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
                                    height: '1px',
                                    borderRadius: '1px',
                                }} />
                            </Box>
                        </Link>
                    </Stack>

                    <Stack direction='row' justifyContent='center' width='100%'>
                        <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`/career/jobs`} onClick={() => setOpen(false)}>
                            <Box>
                                <Typography 
                                sx={{ 
                                    color: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
                                     font: 'normal normal normal 20px Rubik',
                                      opacity: 1,
                                       letterSpacing: '0px',
                                        mb: 0 
                                        }}>
                                    משרות
                                </Typography>

                                <Box sx={{
                                    mt: 0,
                                    background: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
                                    height: '1px',
                                    borderRadius: '1px',
                                }} />
                            </Box>
                        </Link>
                    </Stack>

                    <Stack direction='row' justifyContent='center' width='100%'>
                        <Link style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }} to={`https://www.gvanim.org.il/index.php/he/node/4`} onClick={() => setOpen(false)}>
                            <Box>
                                <Typography 
                                sx={{ 
                                    color: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
                                     font: 'normal normal normal 20px Rubik',
                                      opacity: 1,
                                       letterSpacing: '0px',
                                        mb: 0 
                                        }}>
                                    אודות
                                </Typography>

                                <Box sx={{
                                    mt: 0,
                                    background: 
                                    colorMode?.getActualMode()! === 'light'
                                    ? '#053B7A'
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                        ? '#b2d0ec'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? '#053B7A'
                                            : '#000000', // black & white
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
