import { Box, Button, Collapse, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import React, { useContext, useMemo } from 'react'
import { ColorModeContext, colorTokens } from '../theme';
import JobItem from './Components/JobItem/JobItem';
import SearchBar from './Components/SearchBar/SearchBar';
import { Job, getFilteredJobs } from '../../Firebase/FirebaseFunctions/Job';
import { ReactComponent as ScopeSVG } from '../AllJobsPage/Resources/Icon awesome-clock.svg';
import { ReactComponent as RoleSVG } from '../AllJobsPage/Resources/Group 71.svg';
import { ReactComponent as FilterSVG } from '../AllJobsPage/Resources/Group 1.svg';
import { ReactComponent as LocationSVG } from '../AllJobsPage/Resources/icon-location2.svg';
import NavBarImage from '../AllJobsPage/Resources/navbarImage.png';
import NavBarImage_mobile from '../AllJobsPage/Resources/navbarImage_mobile.png';
import LocationMultiSelect from './Components/CustomSelectLocationsDropMenu/LocationMultiSelect';
import RolesMultiSelect from './Components/CustomSelectRolesDropMenu/RolesMultiSelect';
import { Close } from '@mui/icons-material';
import MyLoading from '../../Components/MyLoading/MyLoading';
import { Option } from "./Components/CustomSelectLocationsDropMenu/CustomSelectLocationsDropMenu";

export default function AllJobsPage() {

    const [loading, setLoading] = React.useState(true);
    
    const [jobs, setJobs] = React.useState<Job[]>([]);

    // const [filteredJobs, setFilteredJobs] = React.useState<Job[]>([]);
    // const [submitSearch, setSubmitSearch] = React.useState<boolean>(false);

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);


    const [locationSelected, setLocationSelected] = React.useState<Option[] | null>();
    const [roleSelected, setRoleSelected] = React.useState<Option[] | null>();

    const [text, setText] = React.useState('');
    const [search, setSearch] = React.useState('');
    const [role, setRole] = React.useState('');

    const [location, setLocation] = React.useState('');

    const [halfScope, setHalfScope] = React.useState(false);
    const [fullScope, setFullScope] = React.useState(false);


    const [filterMobile, setFilterMobile] = React.useState(false);

    // const filteredJobs = jobs?.filter((job: Job) => {
    //     console.log("filtering users");
    //     return (job?._region.toLowerCase().includes(search.toLowerCase()) || job?._requirements.toLowerCase().includes(search.toLowerCase()) 
    //     || job?._title.toLowerCase().includes(search.toLowerCase()));
    //   });

    // const filteredJobs = useMemo(
    //     () =>
    //         jobs.filter((job: Job) => {
    //             console.log("filtering jobs");
    //             return (

    //                 job?._region.toLowerCase().includes(search) || job?._role.toLowerCase().includes(search.toLowerCase())
    //                 || job?._requirements.toLowerCase().includes(search.toLowerCase())

    //             );
    //         }), [search]
    // );

    // const filteredJobsByRole = useMemo(
    //     () =>
    //         jobs.filter((job: Job) => {
    //             console.log("filtering job by role");
    //             return job?._role.toLowerCase().includes(role);
    //         }),
    //     [role]
    // );

    // const filteredJobsByRegion = useMemo(
    //     () =>
    //         jobs.filter((job: Job) => {
    //             console.log("filtering jobs by region");
    //             return job?._region.toLowerCase().includes(location);
    //         }),
    //     [location]
    // );

    // await getFilteredJobs(\["role", "open"\], \["Psycholog", "true"\], "creationDate");

    const fetchJobs = async () => {
        setJobs(await getFilteredJobs(["open"],["true"]));
    }
    React.useEffect(() =>
    {
        fetchJobs();
        setLoading(false);
    }, []);


    const handleFilter = async () => {

        setSearch(text);
        console.log("SearchField: " + text);
        console.log("LocationField: ");
        locationSelected?.forEach((loc) => console.log(loc?.label));
        if(halfScope === true){
            console.log('half');
        } 
        else { console.log('full');}
        console.log("roleField: ");

         roleSelected?.forEach((role) => console.log(role?.label));
         
    }
    return (
      <>
      {loading ? (
         <MyLoading loading={loading} setLoading={setLoading} />
      ) :
       (
        <>
        <Box id='NavbarImage_and_TitlePaper'>

            <Box id='NavBarImage_container' display={{ xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }}>
                <img src={NavBarImage} alt="NavBarImage" style={{ maxWidth: '100%' }} />
            </Box>

            <Box id='NavBarImage_mobile_container' display={{ xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}>
                <img src={NavBarImage_mobile} alt="NavBarImage_mobile" style={{ maxWidth: '100%', display: 'flex' }} />
            </Box>


            <Stack sx={{
                mt: { md: -6, lg: -6, xl: -10 },
                position: 'relative',
                overflow: 'visible',
                height: '120px',
                maxWidth: '600px',
                mr: 'auto',
                ml: 'auto',
                background: '#FFFFFF 0% 0% no-repeat padding-box',
                boxShadow: '0px 3px 6px #00000029',
                borderRadius: '15px',
                opacity: 1,
                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <Stack direction='row' justifyContent='center' width='100%'>
                    <Typography sx={{
                        color: '#053B7A',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '36px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        גְּ
                    </Typography>
                    <Typography sx={{
                        color: '#41C2F0',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '36px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        וָו
                    </Typography>
                    <Typography sx={{
                        color: '#053B7A',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '36px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        נִים
                    </Typography>
                    <Typography sx={{
                        color: '#41C2F0',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '36px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        ,
                    </Typography>
                    <Typography sx={{
                        ml: 1,
                        color: '#41C2F0',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '36px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        לעבוד עם הנשמה 
                    </Typography>
                </Stack>

                <Typography sx={{
                    mt: 1,
                    color: '#053B7A',
                    font: 'normal normal normal 19px Rubik',
                    opacity: 1,
                    letterSpacing: 0
                }}>
                    בואו לעבוד עם עמותת גוונים 9913*
                </Typography>
            </Stack>
            <Box id='title_container' display={{ xs: 'block', sm: 'block', md: 'none' }} paddingRight={3} paddingLeft={3} paddingTop={2}>

            <Stack direction='row' justifyContent='center' width='100%'>
                    <Typography sx={{
                        color: '#053B7A',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '32px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        גְּ
                    </Typography>
                    <Typography sx={{
                        color: '#41C2F0',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '32px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        וָו
                    </Typography>
                    <Typography sx={{
                        color: '#053B7A',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '32px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        נִים
                    </Typography>
                    <Typography sx={{
                        color: '#41C2F0',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '32px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        ,
                    </Typography>
                    <Typography sx={{
                        ml: 1,
                        color: '#41C2F0',
                        fontFamily: 'Rubik',
                        fontWeight: 'bold',
                        fontSize: '32px',
                        opacity: 1,
                        letterSpacing: 0

                    }}>
                        לעבוד עם הנשמה 
                    </Typography>
                </Stack>
                <Typography sx={{
                    mt: 1,
                    textAlign: 'center',
                    color: '#053B7A',
                    font: 'normal normal normal 19px Rubik',
                    opacity: 1,
                    letterSpacing: 0
                }}>
                    בואו לעבוד עם עמותת גוונים 9913*
                </Typography>
            </Box>
        </Box>
        <Stack direction='row' sx={{ padding: { xs: 3, sm: 3, md: 4, lg: 6 }, mb: 10 }}>

            <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }} sx={{ width: { lg: '35%', xl: '25%' }, mr: '20px' }}>

                <Box sx={{ width: '25%', mr: '20px' }}>
                    <Stack direction='row' spacing={2} justifyContent='start' sx={{ paddingLeft: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <FilterSVG style={{ width: '25px', height: '25px' }} />
                        </Box>

                        <Stack direction='row' spacing={1} >
                            <Typography sx={{
                                textAlign: 'left',
                                fontSize: '22px',
                                fontWeight: 'bold',
                                fontFamily: 'Rubik',
                                letterSpacing: '0px',
                                color: '#053B7A',
                                opacity: 1,
                            }}>סינון</Typography>

                        </Stack>
                    </Stack>


                </Box>
                <Box sx={{ background: '#D3D3D3 0% 0% no-repeat padding-box', height: '2px', width: '92%', mt: 2, mb: 2, mr: 'auto', ml: 'auto' }} />

                <Box sx={{ borderRadius: '10px', background: '#FAFAFA 0% 0% no-repeat padding-box', paddingBottom: 2 }}>
                    <Box sx={{ paddingLeft: 4, paddingTop: 2 }}>
                        <Typography sx={{
                            font: 'normal normal normal 18px Rubik',
                            color: '#053B7A',
                        }}>חיפוש לפי מילה חופשית:</Typography>
                        <SearchBar text={text} setText={setText} />
                    </Box>
                    <Divider sx={{ mt: 3, mb: 3 }} />

                    {/* ################# Location FILTER #################### */}
                    <Box>
                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <LocationSVG style={{ width: '20px', height: '20px' }} />
                            </Box>

                            <Stack direction='row' spacing={1} alignItems='end'>
                                <Typography sx={{
                                    textAlign: 'left',
                                    font: 'normal normal normal 18px Rubik',
                                    letterSpacing: '0px',
                                    color: '#053B7A',
                                    opacity: 1,
                                }}>חיפוש לפי מיקום:</Typography>

                            </Stack>
                        </Stack>
                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                            {/* <LocationSingleSelection location={location} setLocation={setLocation} jobs={jobs} /> */}
                            <LocationMultiSelect optionSelected={locationSelected} setSelected={setLocationSelected} />
                        </Box>
                    </Box>
                    {/* ############################################## */}

                    <Divider sx={{ mt: 3, mb: 3 }} />

                    {/* ################# Scope FILTER #################### */}
                    <Box>
                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <ScopeSVG style={{ width: '18px', height: '18px' }} />
                            </Box>

                            <Stack direction='row' spacing={1} >
                                <Typography sx={{

                                    textAlign: 'left',
                                    font: 'normal normal normal 18px Rubik',
                                    letterSpacing: '0px',
                                    color: '#053B7A',
                                    opacity: 1,
                                }}>בחרו היקף משרה:</Typography>

                            </Stack>
                        </Stack>
                        <Stack direction='row' spacing={3} sx={{ mt: 2.5, paddingLeft: 4.5, paddingRight: 4.5 }}>
                            <Button onClick={() => { setFullScope(true); setHalfScope(false); }} sx={{
                                width: '100%',
                                fontFamily: 'Rubik',
                                fontSize: '0.7em',
                                height: '47px',
                                background: fullScope ? '#053B7A 0% 0% no-repeat padding-box' : '#EDEDED 0% 0% no-repeat padding-box',
                                color: fullScope ? '#FFFFFF' : '#053B7A',
                                borderRadius: '4px',
                                opacity: 1,

                                ':hover': {
                                    background: fullScope ? '#053B7A 0% 0% no-repeat padding-box' : '#D5D5D5 0% 0% no-repeat padding-box'
                                },
                                ':active': {
                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                    color: '#FFFFFF'
                                },
                                ':focus': {
                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                    color: '#FFFFFF'
                                }
                            }}>
                                משרה מלאה
                            </Button>
                            <Button onClick={() => { setHalfScope(true); setFullScope(false); }} sx={{
                                width: '100%',
                                font: 'normal normal normal 0.7em Rubik',
                                background: halfScope ? '#053B7A 0% 0% no-repeat padding-box' : '#EDEDED 0% 0% no-repeat padding-box',
                                color: halfScope ? '#FFFFFF' : '#053B7A',
                                height: '47px',
                                borderRadius: '4px',
                                opacity: 1,
                                ':hover': {
                                    background: halfScope ? '#053B7A 0% 0% no-repeat padding-box' : '#D5D5D5 0% 0% no-repeat padding-box'
                                },
                                ':active': {
                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                    color: '#FFFFFF'
                                },
                                ':focus': {
                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                    color: '#FFFFFF'
                                }
                            }}>חצי משרה</Button>
                        </Stack>
                    </Box>
                    {/* ############################################## */}

                    <Divider sx={{ mt: 3, mb: 3 }} />

                    {/* ################# Role FILTER #################### */}
                    <Box>
                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <RoleSVG style={{ width: '18px', height: '18px' }} />
                            </Box>

                            <Stack direction='row' spacing={1} alignItems='end'>
                                <Typography sx={{
                                    textAlign: 'left',
                                    font: 'normal normal normal 18px Rubik',
                                    letterSpacing: '0px',
                                    color: '#053B7A',
                                    opacity: 1,
                                }}>חיפוש לפי תפקיד:</Typography>

                            </Stack>
                        </Stack>
                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                            <RolesMultiSelect optionSelected={roleSelected} setSelected={setRoleSelected} />
                        </Box>
                    </Box>
                    {/* ############################################## */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                        <Button onClick={handleFilter} sx={{
                            width: '185px',
                            height: '40px',
                            background: '#91A749 0% 0% no-repeat padding-box',
                            color: '#FFFFFF',
                            opacity: 1,
                            borderRadius: '30px',
                            font: 'normal normal normal 18px Rubik',
                            ':hover': {
                                background: '#B4CC64 0% 0% no-repeat padding-box'
                            },
                        }}>
                            החל סינון
                        </Button>
                    </Box>
                </Box>
            </Box>


            <Grid container width='100%' maxWidth={{ xs: '100%', sm: '100%', md: '100%', lg: '75%', xl: '75%' }} spacing={{ xs: 0, sm: 0, md: 4, lg: 4, xl: 4 }} columns={{ xs: 12, sm: 8, md: 8, lg: 8, xl: 8 }} sx={{ padding: { xs: 0, sm: 0, md: 2 } }}>
                <Box display={{ xs: 'flex', sm: 'flex', md: 'none' }} borderTop='2px solid #D3D3D3' borderBottom='2px solid #D3D3D3' sx={{ width: '100%', paddingTop: 1.5, paddingBottom: 1.5, mb: 5, mt: 5, }}>
                    <Box display='flex' flexDirection='column' justifyContent='center'
                        sx={{
                            backgroundColor: '#FAFAFA',
                            borderRadius: '10px',
                            minHeight: '60px',
                            width: '100%',

                        }}>

                        <Button disableRipple sx={{ display: 'flex', justifyContent: 'start', ":hover": { backgroundColor: '#FAFAFA' } }} onClick={() => setFilterMobile(!filterMobile)}>
                            <Stack direction='row' spacing={filterMobile ? 1.5 : 2} justifyContent='start' sx={{ paddingLeft: filterMobile ? 0 : 2 }}>
                                <Box sx={{ display: filterMobile ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <FilterSVG style={{ width: '25px', height: '25px' }} />
                                </Box>

                                <Box sx={{ display: filterMobile ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', paddingTop: filterMobile ? 1.5 : 0 }}>
                                    <Close style={{ width: '30px', height: '30px', color: '#053B7A' }} />
                                </Box>

                                <Stack direction='row' spacing={1} sx={{ paddingTop: filterMobile ? 1.5 : 0 }} >
                                    <Typography sx={{
                                        textAlign: 'left',
                                        fontSize: '22px',
                                        fontWeight: 'bold',
                                        fontFamily: 'Rubik',
                                        letterSpacing: '0px',
                                        color: '#053B7A',
                                        opacity: 1,
                                    }}>סינון</Typography>

                                </Stack>
                            </Stack>
                        </Button>
                        {/* here */}
                        <Collapse in={filterMobile}>
                            <Box sx={{ width: '100%', height: 'fit-content' }}>

                                <Box sx={{ background: '#D3D3D3 0% 0% no-repeat padding-box', height: '1px', width: '100%', mt: 1.5, mb: 2, mr: 'auto', ml: 'auto' }} />

                                <Box sx={{ borderRadius: '10px', background: '#FAFAFA 0% 0% no-repeat padding-box', paddingBottom: 2 }}>
                                    <Box sx={{ paddingLeft: 4, paddingTop: 2 }}>
                                        <Typography sx={{
                                            font: 'normal normal normal 18px Rubik',
                                            color: '#053B7A',
                                        }}>חיפוש לפי מילה חופשית:</Typography>
                                        <SearchBar text={text} setText={setText} />
                                    </Box>
                                    <Divider sx={{ mt: 3, mb: 3 }} />

                                    {/* ################# Location FILTER #################### */}
                                    <Box>
                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <LocationSVG style={{ width: '20px', height: '20px' }} />
                                            </Box>

                                            <Stack direction='row' spacing={1} alignItems='end'>
                                                <Typography sx={{
                                                    textAlign: 'left',
                                                    font: 'normal normal normal 18px Rubik',
                                                    letterSpacing: '0px',
                                                    color: '#053B7A',
                                                    opacity: 1,
                                                }}>חיפוש לפי מיקום:</Typography>

                                            </Stack>
                                        </Stack>
                                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                            {/* <LocationSingleSelection location={location} setLocation={setLocation} jobs={jobs} /> */}
                                            <LocationMultiSelect optionSelected={locationSelected} setSelected={setLocationSelected} />
                                        </Box>
                                    </Box>
                                    {/* ############################################## */}

                                    <Divider sx={{ mt: 3, mb: 3 }} />

                                    {/* ################# Scope FILTER #################### */}
                                    <Box>
                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <ScopeSVG style={{ width: '18px', height: '18px' }} />
                                            </Box>

                                            <Stack direction='row' spacing={1} >
                                                <Typography sx={{

                                                    textAlign: 'left',
                                                    font: 'normal normal normal 18px Rubik',
                                                    letterSpacing: '0px',
                                                    color: '#053B7A',
                                                    opacity: 1,
                                                }}>בחרו היקף משרה:</Typography>

                                            </Stack>
                                        </Stack>
                                        <Stack direction='row' spacing={3} sx={{ mt: 2.5, paddingLeft: 4.5, paddingRight: 4.5 }}>
                                            <Button onClick={() => { setFullScope(true); setHalfScope(false); }} sx={{
                                                width: '100%',
                                                fontFamily: 'Rubik',
                                                fontSize: '0.7em',
                                                height: '47px',
                                                background: fullScope ? '#053B7A 0% 0% no-repeat padding-box' : '#EDEDED 0% 0% no-repeat padding-box',
                                                color: fullScope ? '#FFFFFF' : '#053B7A',
                                                borderRadius: '4px',
                                                opacity: 1,

                                                ':hover': {
                                                    background: fullScope ? '#053B7A 0% 0% no-repeat padding-box' : '#D5D5D5 0% 0% no-repeat padding-box'
                                                },
                                                ':active': {
                                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                                    color: '#FFFFFF'
                                                },
                                                ':focus': {
                                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                                    color: '#FFFFFF'
                                                }
                                            }}>
                                                משרה מלאה
                                            </Button>
                                            <Button onClick={() => { setHalfScope(true); setFullScope(false); }} sx={{
                                                width: '100%',
                                                font: 'normal normal normal 0.7em Rubik',
                                                background: halfScope ? '#053B7A 0% 0% no-repeat padding-box' : '#EDEDED 0% 0% no-repeat padding-box',
                                                color: halfScope ? '#FFFFFF' : '#053B7A',
                                                height: '47px',
                                                borderRadius: '4px',
                                                opacity: 1,
                                                ':hover': {
                                                    background: halfScope ? '#053B7A 0% 0% no-repeat padding-box' : '#D5D5D5 0% 0% no-repeat padding-box'
                                                },
                                                ':active': {
                                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                                    color: '#FFFFFF'
                                                },
                                                ':focus': {
                                                    background: '#053B7A 0% 0% no-repeat padding-box',
                                                    color: '#FFFFFF'
                                                }
                                            }}>חצי משרה</Button>
                                        </Stack>
                                    </Box>
                                    {/* ############################################## */}

                                    <Divider sx={{ mt: 3, mb: 3 }} />

                                    {/* ################# Role FILTER #################### */}
                                    <Box>
                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <RoleSVG style={{ width: '18px', height: '18px' }} />
                                            </Box>

                                            <Stack direction='row' spacing={1} alignItems='end'>
                                                <Typography sx={{
                                                    textAlign: 'left',
                                                    font: 'normal normal normal 18px Rubik',
                                                    letterSpacing: '0px',
                                                    color: '#053B7A',
                                                    opacity: 1,
                                                }}>חיפוש לפי תפקיד:</Typography>

                                            </Stack>
                                        </Stack>
                                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                            <RolesMultiSelect optionSelected={roleSelected} setSelected={setRoleSelected}/>
                                        </Box>
                                    </Box>
                                    {/* ############################################## */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                                        <Button onClick={handleFilter} sx={{
                                            width: '185px',
                                            height: '40px',
                                            background: '#91A749 0% 0% no-repeat padding-box',
                                            color: '#FFFFFF',
                                            opacity: 1,
                                            borderRadius: '30px',
                                            font: 'normal normal normal 18px Rubik',
                                            ':hover': {
                                                background: '#B4CC64 0% 0% no-repeat padding-box'
                                            },
                                        }}>
                                            החל סינון
                                        </Button>
                                    </Box>
                                </Box>

                            </Box>
                        </Collapse>
                    </Box>

                </Box>
                <Box display={{ xs: 'none', sm: 'none', md: 'flex' }} sx={{ background: '#D3D3D3 0% 0% no-repeat padding-box', height: '2px', width: { xs: '100%', sm: '100%', md: '96.7%' }, mt: 2, mb: 2, ml: 'auto' }} />

                {jobs?.map((job: Job, index: any) => (

                    <Grid item xs={12} sm={8} md={4} lg={4} xl={4} key={index} sx={{ mb: { xs: 3, sm: 3, md: 0 } }} >

                        <JobItem job={job} />

                    </Grid>
                ))}
            </Grid>

        </Stack>
    </>
       )}
      </>
    );
}



