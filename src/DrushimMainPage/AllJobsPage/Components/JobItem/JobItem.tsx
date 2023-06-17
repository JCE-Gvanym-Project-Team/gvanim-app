import { experimentalStyled as styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as LocationSVG } from '../JobItem/Resources/icon-location1.svg';
import { ReactComponent as ClockSVG } from '../JobItem/Resources/icon-clock1.svg';
import './JobItem.css'
import { NavigateBefore } from '@mui/icons-material';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    width: '521px',
    borderTop: '5px solid #053B7A',
    borderRadius: '0px 0px 10px 10px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: ' 0px 3px 10px #00000029',
    textAlign: 'center',

}));


export default function JobItem(props: { job: any }) {
    const { job } = props;

    const theme = useTheme();

    return (
        <Stack direction='row-reverse'>
            <Item id='JobCard'>

                <Box sx={{
                    top: '48px',
                 
                    background: '#053B7A 0% 0% no-repeat padding-box',
                    direction: 'column',
                    paddingTop: 0.5,
                    paddingBottom: 0.5,
                    justifyContent: 'end',
                    borderRadius: '0px 31px 31px 0px',
                    opacity: 1,
                    marginTop: '48px',
                    ml: '-20px',
                    mr: '100px',
                    width: 'fit-content'

                }}>

                    <Typography sx={{
                        textAlign: 'left',
                        fontFamily: "'Rubik'",
                        fontWeight: 'medium',
                        fontSize: '25px',
                        letterSpacing: '0px',
                        color: '#FFFFFF',
                        opacity: 1,
                        maxWidth: '80%',
                        ml: '47px',
                        mr: '40px',

                    }}>
                        תפקיד: {job?._role}
                    </Typography>
                </Box>


                <Box sx={{ width: '100%', paddingLeft: '26px', paddingRight: '26px', paddingTop: '10px', mt: 1 }}>
                    <Typography sx={{
                        textAlign: 'left',
                        font: 'normal normal normal 19px Rubik',
                        letterSpacing: '0px',
                        color: '#767676',
                        opacity: 1,
                    }}
                    >
                   {job?._requirements}
                    </Typography>

                    <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <LocationSVG />
                        </Box>

                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography sx={{

                                textAlign: 'left',
                                font: 'normal normal normal 18px Rubik',
                                letterSpacing: '0px',
                                color: '#AC2F69',
                                opacity: 1,
                            }}>מיקום:</Typography>
                            <Typography sx={{
                                textAlign: 'left',
                                font: 'normal normal normal 18px Rubik',
                                letterSpacing: '0px',
                                color: '#767676',
                                opacity: 1,
                            }}>
                                {job?._region}
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction='row' spacing={1.8} justifyContent='start' sx={{ mt: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <ClockSVG />
                        </Box>

                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography sx={{
                                textAlign: 'left',
                                font: 'normal normal normal 18px Rubik',
                                letterSpacing: '0px',
                                color: '#AC2F69',
                                opacity: 1,
                            }}>היקף משרה:</Typography>
                            <Typography sx={{

                                textAlign: 'left',
                                font: 'normal normal normal 18px Rubik',
                                letterSpacing: '0px',
                                color: '#767676',
                                opacity: 1,
                            }}>

                                {job?._scope[0] !== job?._scope[1] ? `${job?._scope[1]}% -  ${job?._scope[0]}%` : `${job?._scope[0]}%`}
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction='row' spacing={1.8} justifyContent='start' sx={{ mt: 5 }}>
                        <Link id="mylink" style={{display: 'flex', flexDirection: 'row', textDecoration: 'none'}} to={`${job?._jobNumber}`}    
                                         
                            >

                          <Box>
                          <Typography sx={{color: '#5BA1AA',font: 'normal normal normal 18px Rubik',  opacity: 1, letterSpacing: '0px',mb: 0}}>
                            צפייה במשרה והגשת מועמדות
                            </Typography>

                            <Box sx={{
                                mt: 0,
                                background: '#5BA1AA 0% 0% no-repeat padding-box',
                                height: '1.5px',
                                borderRadius: '1px',
                            }} />
                          </Box>

                            <NavigateBefore id="arrow" sx={{
                                color: '#5BA1AA',
                               fontSize: 22,
                               alignSelf: 'center'

                            }} />
                        </Link>

                    </Stack>

                    
                </Box>

                <Stack direction='row' justifyContent='end' spacing={1} sx={{ mt: 2, paddingBottom: 1, paddingRight: 2}}>
                            <Typography sx={{
                                textAlign: 'left',
                                font: 'normal normal normal 18px Rubik',
                                letterSpacing: '0px',
                                color: '#AC2F69',
                                opacity: 1,
                            }}>משרה מספר:</Typography>
                            <Typography sx={{

                                textAlign: 'left',
                                font: 'normal normal normal 18px Rubik',
                                letterSpacing: '0px',
                                color: '#767676',
                                opacity: 1,
                            }}>

                              {job?._jobNumber}
                            </Typography>
                        </Stack>

            </Item>
        </Stack>


    )
}
