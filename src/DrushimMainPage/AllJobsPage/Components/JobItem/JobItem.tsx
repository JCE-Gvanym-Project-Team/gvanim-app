import { experimentalStyled as styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Icon, Link, ListItemIcon, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ReactComponent as LocationSVG } from '../JobItem/Resources/icon-location1.svg';
import { ReactComponent as ClockSVG } from '../JobItem/Resources/icon-clock1.svg';
import { NavigateBefore, Place, WatchLater } from '@mui/icons-material';
import { colorTokens } from '../../../theme';
import { color } from 'highcharts';



export default function JobItem(props: { job: any }) {
    const { job } = props;

    const navigate = useNavigate();

    
    return (
        <Stack direction='row-reverse'>
            <Box borderTop={`5px solid`} id='JobCard' sx={{ 
                width: { xs: '100%', sm: '100%', md: '521px' },
                borderRadius: '0px 0px 10px 10px',
                // boxShadow: ' 0px 3px 10px #FFFFFF', //dark #7c7c7c

                boxShadow: '0px 3px 10px',
                color: 'primary.myBoxShadow',
             
                borderColor: 'background.JobTitle2',
                // borderTop: '5px solid #053B7A',
                textAlign: 'center',
                }}>

                <Box sx={{
                    mt: { xs: '28px', sm: '28px', md: '48px' },

                    // backgroundColor: '#9FC5E8',
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
                        // color: 'secondary.descAndReqText',
                        color: 'primary.myCardText',
                        opacity: 1,
                        ml: 0.25
                    }}
                    >
                        {job?._requirements}
                    </Typography>

                    <Stack direction='row' spacing={1.5} justifyContent='start' sx={{ mt: 4 }}>
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <LocationSVG style={{ width: '16px', height: '16px' }} />
                        </Box> */}

                
                        <Box display='flex' flexDirection='column' justifyContent='center'>
                        <Place fontSize='inherit' sx={{color:'secondary.jobDetails'}}/>
                        </Box>

                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography display='block' variant='caption' sx={{
                                textAlign: 'left',
                                letterSpacing: '0px',
                                color: 'secondary.jobDetails',
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
                        {/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <ClockSVG style={{ width: '13px', height: '13px' }} />
                        </Box> */}

                        {/* WatchLater */}
                        <Box display='flex' flexDirection='column' justifyContent='center'>
                        <WatchLater fontSize='inherit' sx={{padding: 0.15, color:'secondary.jobDetails'}}/>
                        </Box>
                        {/* WatchLater */}
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography display='block' variant='caption' sx={{
                                textAlign: 'left',
                                letterSpacing: '0px',
                                color: 'secondary.jobDetails',
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
                            {/* to={`${job?._jobNumber}`} */}
                            <Box>
                                <Typography display='block' variant='caption' id="element1" sx={{
                                    textAlign: 'left',
                                     color: 'primary.visitJobButton',
                                         // #d9ddbd
                                        //  color: '#d9ddbd', hover: '#e8ead7'
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
                        color: 'secondary.jobDetails',
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
