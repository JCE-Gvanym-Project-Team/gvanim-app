import { Box, Stack, Typography, IconButton, Collapse, Divider } from '@mui/material'
import { Link } from 'react-router-dom';
import Logo from '../../../Components/Logo/logo.png';
import React from 'react';
import { ColorModeContext } from '../../theme';

export default function Navbar() {
    const colorMode = React.useContext(ColorModeContext);
    const [open, setOpen] = React.useState<boolean>(false);
    return (
        <Box sx={{
            position: "sticky",
            overflow: 'hidden',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            top: 0,
            boxShadow: "0px 3px 10px",
            color:
                colorMode?.getActualMode()! === 'light' || colorMode?.getActualMode()! === 'bright-contrast'
                    ? '#00000029'
                    : colorMode?.getActualMode()! === 'dark-contrast'
                        ? 'primary.divider'
                        : '#00000029', // black & white 
            zIndex: 20,
        }}>
            <Stack direction='row' justifyContent='space-between'
                sx={{
                    height: '73px',
                    backgroundColor:
                        colorMode?.getActualMode()! === 'light'
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
                                    : '#000000', // black & white
                }}>
                <Stack direction='row' id='desk' sx={{ mt: '5px', width: 'fit-content' }} spacing={{ xs: 5, sm: 5, md: 10 }} justifyContent='start' display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                    <Box id="logo_desktop" display={'flex'} flexDirection={'row'} sx={{ height: '58px', overflow: 'hidden' }}>
                        <img src={Logo} alt="Logo"
                            style={{
                                height: '70px',
                                WebkitFilter:
                                    colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast' && colorMode?.getActualMode()! !== 'bright-contrast'
                                        ? 'grayscale(1)'
                                        : 'grayscale(0)',
                                filter:
                                    colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast' && colorMode?.getActualMode()! !== 'bright-contrast'
                                        ? 'grayscale(1)'
                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                            ? 'brightness(0.7)' : 'brightness(1)',
                            }} />


                    </Box>
                    <Stack direction='column' justifyContent='center' display={{ xs: 'none', sm: 'none', md: 'flex' }} >
                        <Stack direction='row' spacing={4} sx={{
                            height: '100%', filter: colorMode?.getActualMode()! === 'bright-contrast'
                                ? 'brightness(0.7)' : 'brightness(1)',
                        }}>
                            <Box id="generalPage" display='flex' flexDirection='column' justifyContent='end' height='100%'>
                                <Box sx={{ height: '100%' }}>
                                    <Link style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none' }} to={`https://www.gvanim.org.il/`}>
                                        <Box sx={{
                                            mt: 'auto',
                                            mb: 'auto',
                                            ":hover + #borderBottom": {
                                                display: 'flex',
                                            }
                                        }}>
                                            <Typography variant='body2'
                                                sx={{
                                                    color:
                                                        colorMode?.getActualMode()! === 'light'
                                                            ? '#053B7A'
                                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                                ? '#b2d0ec'
                                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                                    ? '#053B7A'
                                                                    : '#000000', // black & white

                                                    opacity: 1,
                                                    letterSpacing: '0px',
                                                    mb: 0
                                                }}>
                                                ראשי
                                            </Typography>


                                        </Box>
                                        <Box id='borderBottom' sx={{
                                            display: 'none',
                                            mt: 0,
                                            mr: 'auto',
                                            ml: 'auto',
                                            background:
                                                colorMode?.getActualMode()! === 'light'
                                                    ? '#053B7A'
                                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                                        ? '#b2d0ec'
                                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                                            ? '#053B7A'
                                                            : '#000000', // black & white
                                            height: '4px',
                                            width: '100%',
                                            borderTopLeftRadius: '4px',
                                            borderTopRightRadius: '4px',
                                        }} />
                                    </Link>
                                </Box>
                            </Box>

                            <Box id="jobsPage" display='flex' flexDirection='column' justifyContent='end' height='100%' >
                                <Box
                                    sx={{ height: '100%' }}>
                                    <Link style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none' }} to={`/career/jobs`}>
                                        <Box sx={{
                                            mt: 'auto',
                                            mb: 'auto',
                                            ":hover + #borderBottom": {
                                                display: 'flex',
                                            }
                                        }}>
                                            <Typography variant='body2'
                                                sx={{
                                                    color:
                                                        colorMode?.getActualMode()! === 'light'
                                                            ? '#053B7A'
                                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                                ? '#b2d0ec'
                                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                                    ? '#053B7A'
                                                                    : '#000000', // black & white

                                                    opacity: 1,
                                                    letterSpacing: '0px',
                                                    mb: 0
                                                }}>
                                                משרות
                                            </Typography>


                                        </Box>
                                        <Box id="borderBottom" sx={{
                                            display: 'none',
                                            mt: 0,
                                            mr: 'auto',
                                            ml: 'auto',
                                            background:
                                                colorMode?.getActualMode()! === 'light'
                                                    ? '#053B7A'
                                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                                        ? '#b2d0ec'
                                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                                            ? '#053B7A'
                                                            : '#000000', // black & white
                                            height: '4px',
                                            width: '90%',
                                            borderTopLeftRadius: '4px',
                                            borderTopRightRadius: '4px',
                                        }} />
                                    </Link>
                                </Box>
                            </Box>


                            <Box id="aboutUsPage" display='flex' flexDirection='column' justifyContent='end' height='100%' >
                                <Box sx={{ height: '100%' }}>
                                    <Link style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textDecoration: 'none' }} to={`https://www.gvanim.org.il/index.php/he/node/4`}>
                                        <Box sx={{
                                            mt: 'auto',
                                            mb: 'auto',
                                            ":hover + #borderBottom": {
                                                display: 'flex',
                                            }
                                        }}>
                                            <Typography variant='body2'
                                                sx={{
                                                    color:
                                                        colorMode?.getActualMode()! === 'light'
                                                            ? '#053B7A'
                                                            : colorMode?.getActualMode()! === 'dark-contrast'
                                                                ? '#b2d0ec'
                                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                                    ? '#053B7A'
                                                                    : '#000000', // black & white

                                                    opacity: 1,
                                                    letterSpacing: '0px',
                                                    mb: 0
                                                }}>
                                                אודות
                                            </Typography>


                                        </Box>
                                        <Box id="borderBottom" sx={{
                                            display: 'none',
                                            mt: 0,
                                            mr: 'auto',
                                            ml: 'auto',
                                            background:
                                                colorMode?.getActualMode()! === 'light'
                                                    ? '#053B7A'
                                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                                        ? '#b2d0ec'
                                                        : colorMode?.getActualMode()! === 'bright-contrast'
                                                            ? '#053B7A'
                                                            : '#000000', // black & white
                                            height: '4px',
                                            width: '85%',
                                            borderTopLeftRadius: '4px',
                                            borderTopRightRadius: '4px',
                                        }} />
                                    </Link>
                                </Box>
                            </Box>



                        </Stack>
                    </Stack>
                </Stack>
                <Stack direction='column' justifyContent='center' >
                    <Stack direction='row' spacing={2.5} display={{ xs: 'none', sm: 'none', md: 'flex' }}>
                        <Box>
                            <Typography variant='caption' sx={{
                                textDecorationLine: 'underline',
                                color:
                                    colorMode?.getActualMode()! === 'light'
                                        ? '#91A749'
                                        : colorMode?.getActualMode()! === 'dark-contrast'
                                            ? '#c3c6aa'
                                            : colorMode?.getActualMode()! === 'bright-contrast'
                                                ? '#91A749'
                                                : 'darkgray', // black & white
                                                filter: 
                                                colorMode?.getActualMode()! === 'bright-contrast'
                                                ? 'brightness(0.7)'
                                                : 'brightness(1)',

                                letterSpacing: 0,
                                opacity: 1,
                            }}>צריכים עזרה? דברו איתנו
                            </Typography>

                        </Box>

                        <Box>
                            <Typography variant='caption' sx={{
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
                                filter: 
                                colorMode?.getActualMode()! === 'bright-contrast'
                                ? 'brightness(0.7)'
                                : 'brightness(1)',
                            }}>
                                9913*
                            </Typography>
                        </Box>
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

                    <Box display='flex' flexDirection='row' sx={{ height: '58px', overflow: 'hidden' }}>


                        <img src={Logo} alt="Logo"
                            style={{
                                height: '70px',
                                filter:
                                colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast' && colorMode?.getActualMode()! !== 'bright-contrast'
                                    ? 'grayscale(1)'
                                    : colorMode?.getActualMode()! === 'bright-contrast'
                                    ? 'brightness(0.5)' 
                                    : colorMode?.getActualMode()! === 'dark-contrast'
                                    ? 'brightness(0.8)'
                                    : 'grayscale(0)'
                            }} />


                    </Box>

                    <Box display='flex' flexDirection='column' justifyContent='center'>
                        <Typography variant='caption' sx={{
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
                            filter: 
                            colorMode?.getActualMode()! === 'bright-contrast'
                            ? 'brightness(0.7)'
                            : 'brightness(1)',
                        }}>
                            9913*
                        </Typography>
                    </Box>

                </Stack>
            </Stack>

            <Stack
                direction='column'
                justifyContent='center'
                sx={{
                    display: { xs: 'flex', sm: 'flex', md: 'none' },
                    backgroundColor:
                        colorMode?.getActualMode()! === 'light'
                            ? '#FFFFFF'
                            : colorMode?.getActualMode()! === 'dark-contrast'
                                ? '#000000'
                                : colorMode?.getActualMode()! === 'bright-contrast'
                                    ? '#FFFFFF'
                                    : '#FFFFFF' // black & white
                }}>
                <Collapse in={open}>

                    <Stack
                        direction='column'
                        justifyContent='center'
                        divider={<Divider sx={{ backgroundColor: 'primary.divider' }} />}
                        marginTop={4}
                        paddingBottom={2}
                        spacing={2}
                        width='100%'
                        height='fit-content'
                    >
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
            </Stack>
        </Box>

    )
}
