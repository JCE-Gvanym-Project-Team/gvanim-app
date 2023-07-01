import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { NavigateBefore, Place, WatchLater } from '@mui/icons-material';
import { ColorModeContext } from '../../../theme';
import React from 'react';



export default function JobItem(props: { job: any }) {
    const { job } = props;

    const navigate = useNavigate();
    const colorMode = React.useContext(ColorModeContext);


    return (
        <Stack direction='row-reverse'>
            <Box borderTop={`5px solid`} id='JobCard' sx={{
                width: { xs: '100%', sm: '100%', md: '521px' },
                borderRadius: '0px 0px 10px 10px',
                boxShadow: '0px 3px 10px',
                color: 'primary.myBoxShadow',
                borderColor: 'background.JobTitle2',
                textAlign: 'center',
            }}>
                <Stack direction='row' justifyContent='end' display={{xs: 'none', sm: job?._highPriority ? 'flex' : 'none'}}>
                    <Box padding={1} sx={{position: 'absolute'}}>
                        <Chip label={'משרה חמה'} sx={{borderRadius: 2, fontSize: 'small', height: 'fit-content',paddingTop: 0.2,paddingBottom: 0.2,
                        backgroundColor: 
                        colorMode?.getActualMode()! === 'bright-contrast' 
                        ? '#B2C17F' 
                        : 'primary.filterButton',
                        color: colorMode?.getActualMode()! === 'dark-contrast' ? '#000000' : '#FFFFFF',
                        }}/>
                    </Box>
                </Stack>

                <Box sx={{
                    mt: {xs: '28px', sm: '28px', md: '48px'} ,
                    backgroundColor: 'background.JobTitle2',
                    direction: 'column',
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                    justifyContent: 'end',
                    borderRadius: '0px 31px 31px 0px',
                    opacity: 1,
                    marginTop: '48px',
                    ml: { xs: 0, sm: 0, md: '-10px', lg: '-15px' },
                    mr: { xs: '50px', sm: '50px', md: '100px' },
                    width: 'fit-content'

                }}>

                    <Typography variant='body1' sx={{
                        textAlign: 'left',
                        fontWeight: 600,
                        letterSpacing: '0px',
                        color: 'primary.JobTitle2',
                        opacity: 1,
                        maxWidth: '80%',
                        ml: { xs: '20px', sm: '20px', md: '32px', lg: '39px' },
                        mr: '40px',

                    }}>
                        תפקיד: {job?._role}
                    </Typography>
                </Box>


                <Box sx={{ width: '100%', paddingLeft: { xs: 2.5, sm: 2.5, md: '26px' }, paddingRight: '26px', paddingTop: '10px', mt: 1 }}>
                    <Typography variant='h5' display='block' sx={{
                        textAlign: 'left',
                        letterSpacing: '0px',
                        color: 'primary.myCardText',
                        opacity: 1,
                        ml: 0.25
                    }}
                    >
                        {job?._requirements}
                    </Typography>

                    <Stack direction='row' spacing={1.5} justifyContent='start' sx={{ mt: 4 }}>

                        <Box display='flex' flexDirection='column' justifyContent='center'>
                            <Place fontSize='inherit' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#CC4584' : 'secondary.jobDetails' }} />
                        </Box>

                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography display='block' variant='caption' sx={{
                                textAlign: 'left',
                                letterSpacing: '0px',
                                color: colorMode?.getActualMode()! === 'bright-contrast' ? '#CC4584' : 'secondary.jobDetails',
                                opacity: 1,

                            }}>מיקום:</Typography>
                            <Typography display='block' variant='caption' sx={{
                                textAlign: 'left',
                                letterSpacing: '0px',
                                color: 'primary.myCardText',
                                opacity: 1,
                            }}>
                                {job?._region}
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction='row' spacing={1.5} justifyContent='start' sx={{ mt: 1.5 }}>

                        <Box display='flex' flexDirection='column' justifyContent='center'>
                            <WatchLater fontSize='inherit' sx={{ padding: 0.15, color: colorMode?.getActualMode()! === 'bright-contrast' ? '#CC4584' : 'secondary.jobDetails' }} />
                        </Box>

                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography display='block' variant='caption' sx={{
                                textAlign: 'left',
                                letterSpacing: '0px',
                                color: colorMode?.getActualMode()! === 'bright-contrast' ? '#CC4584' : 'secondary.jobDetails',
                                opacity: 1,
                            }}>היקף משרה:</Typography>
                            <Typography display='block' variant='caption' sx={{
                                textAlign: 'left',
                                letterSpacing: '0px',
                                color: 'primary.myCardText',
                                opacity: 1,
                            }}>

                                {job?._scope[0] !== job?._scope[1] ? `${job?._scope[1]}% -  ${job?._scope[0]}%` : `${job?._scope[0]}%`}
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction='row' className='mylink' spacing={1.8} justifyContent='start' sx={{ mt: 5 }}>
                        <Link onClick={() => navigate(`${job?._jobNumber}`)}
                            sx={{
                                cursor: 'pointer',
                                display: 'flex',
                                flexDirection: 'row',
                                textDecoration: 'none',
                                ":hover > #arrow": {
                                    transition: 'all .3s cubic-bezier(.34,1.61,.7,1.3)',
                                    transform: 'translateX(5px)',
                                    color: 'secondary.visitJobButton'
                                },
                                ":hover #element1": {
                                    color: 'secondary.visitJobButton',
                                },
                                ":hover #element2": {
                                    backgroundColor: 'secondary.visitJobButton',
                                },
                                ":hover": {
                                    color: 'secondary.visitJobButton'
                                },
                            }}
                        >

                            <Box>
                                <Typography display='block' variant='caption' id="element1" sx={{
                                    textAlign: 'left',
                                    color: 'primary.visitJobButton',
                                    opacity: 1,
                                    textDecorationLine: 'underline',
                                    letterSpacing: '0px',
                                    mb: 0,
                                    ':hover': { color: 'secondary.visitJobButton' }
                                }}>
                                    צפייה במשרה והגשת מועמדות
                                </Typography>

                            </Box>

                            <NavigateBefore id="arrow" sx={{
                                color: 'primary.visitJobButton',
                                fontSize: 21.5,
                                alignSelf: 'center',
                                mt: 0.3

                            }} />
                        </Link>

                    </Stack>


                </Box>

                <Stack direction='row' justifyContent={{ xs: 'start', sm: 'start', md: 'end' }} spacing={1} sx={{ mt: { xs: 5, sm: 5, md: 2 }, paddingBottom: 2, paddingRight: 2.5, paddingLeft: 2.5, paddingTop: 2.5 }}>
                    <Typography display='block' variant='caption' sx={{
                        textAlign: 'left',
                        letterSpacing: '0px',
                        color: colorMode?.getActualMode()! === 'bright-contrast' ? '#CC4584' : 'secondary.jobDetails',
                        opacity: 1,
                    }}>משרה מספר:</Typography>
                    <Typography display='block' variant='caption' sx={{
                        textAlign: 'left',
                        letterSpacing: '0px',
                        color: 'primary.myCardText',
                        opacity: 1,
                    }}>

                        {job?._jobNumber}
                    </Typography>
                </Stack>

            </Box>
        </Stack>


    )
}
