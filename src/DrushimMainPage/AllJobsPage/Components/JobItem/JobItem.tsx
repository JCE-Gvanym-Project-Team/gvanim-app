import { experimentalStyled as styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Box, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { ReactComponent as LocationSVG } from '../JobItem/Resources/icon-location1.svg';
import { ReactComponent as ClockSVG } from '../JobItem/Resources/icon-clock1.svg';
import { NavigateBefore } from '@mui/icons-material';





const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    // width: '521px', 
    borderTop: '5px solid #053B7A',
    borderRadius: '0px 0px 10px 10px',
    background: '#FFFFFF 0% 0% no-repeat padding-box',
    boxShadow: ' 0px 3px 10px #00000029',
    textAlign: 'center',

}));


export default function JobItem(props: { job: any }) {
    const { job } = props;

    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Stack direction='row-reverse'>
            <Item id='JobCard' sx={{ width: { xs: '100%', sm: '100%', md: '521px' } }}>

                <Box sx={{
                    mt: { xs: '28px', sm: '28px', md: '48px' },

                    background: '#053B7A 0% 0% no-repeat padding-box',
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

                    <Typography sx={{
                        textAlign: 'left',
                        fontFamily: "'Rubik'",
                        fontWeight: 500,
                        fontSize: '23px',
                        letterSpacing: '0px',
                        color: '#FFFFFF',
                        opacity: 1,
                        maxWidth: '80%',
                        ml: { xs: '20px', sm: '20px', md: '32px', lg: '39px' },
                        mr: '40px',

                    }}>
                        תפקיד: {job?._role}
                    </Typography>
                </Box>


                <Box sx={{ width: '100%', paddingLeft: { xs: 2.5, sm: 2.5, md: '26px' }, paddingRight: '26px', paddingTop: '10px', mt: 1 }}>
                    <Typography sx={{
                        textAlign: 'left',
                        font: 'normal normal normal 17px Rubik',
                        letterSpacing: '0px',
                        color: '#767676',
                        opacity: 1,
                        ml: 0.25
                    }}
                    >
                        {job?._requirements}
                    </Typography>

                    <Stack direction='row' spacing={1.5} justifyContent='start' sx={{ mt: 4 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <LocationSVG style={{ width: '16px', height: '16px' }} />
                        </Box>

                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography sx={{

                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontSize: '17px',
                                letterSpacing: '0px',
                                color: '#AC2F69',
                                opacity: 1,
                            }}>מיקום:</Typography>
                            <Typography sx={{
                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontSize: '17px',
                                letterSpacing: '0px',
                                color: '#767676',
                                opacity: 1,
                            }}>
                                {job?._region}
                            </Typography>
                        </Stack>

                    </Stack>

                    <Stack direction='row' spacing={1.65} justifyContent='start' sx={{ mt: 1.5, ml: 0.14 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <ClockSVG style={{ width: '13px', height: '13px' }} />
                        </Box>

                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Typography sx={{
                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontSize: '17px',
                                letterSpacing: '0px',
                                color: '#AC2F69',
                                opacity: 1,
                            }}>היקף משרה:</Typography>
                            <Typography sx={{

                                textAlign: 'left',
                                fontFamily: 'Rubik',
                                fontSize: '17px',
                                letterSpacing: '0px',
                                color: '#767676',
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
                                    color: '#72C3CE'
                                },
                                ":hover #element1": {
                                    color: '#72C3CE',
                                },
                                ":hover #element2": {
                                    backgroundColor: '#72C3CE',
                                },
                                ":hover": {
                                    color: '#72C3CE'
                                },
                            }}
                            >
                            {/* to={`${job?._jobNumber}`} */}
                            <Box>
                                <Typography id="element1" sx={{
                                    color: '#5BA1AA',
                                    font: 'normal normal normal 17px Rubik',
                                    opacity: 1,
                                    letterSpacing: '0px',
                                    mb: 0,
                                    ':hover': { color: '#72C3CE' }
                                }}>
                                    צפייה במשרה והגשת מועמדות
                                </Typography>

                                <Box id="element2" sx={{
                                    mt: 0,
                                    background: '#5BA1AA 0% 0% no-repeat padding-box',
                                    height: '1.5px',
                                    borderRadius: '1px',
                                }} />
                            </Box>

                            <NavigateBefore id="arrow" sx={{
                                color: '#5BA1AA',
                                fontSize: 21.5,
                                alignSelf: 'center'

                            }} />
                        </Link>

                    </Stack>


                </Box>

                <Stack direction='row' justifyContent={{ xs: 'start', sm: 'start', md: 'end' }} spacing={1} sx={{ mt: { xs: 5, sm: 5, md: 2 }, paddingBottom: 2, paddingRight: 2.5, paddingLeft: 2.5, paddingTop: 2.5 }}>
                    <Typography sx={{
                        textAlign: 'left',
                        font: 'normal normal normal 17px Rubik',
                        letterSpacing: '0px',
                        color: '#AC2F69',
                        opacity: 1,
                    }}>משרה מספר:</Typography>
                    <Typography sx={{

                        textAlign: 'left',
                        font: 'normal normal normal 17px Rubik',
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
