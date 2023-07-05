import { Box, Button, Collapse, Divider, Grid, Stack, Typography, useTheme } from '@mui/material';
import React from 'react'
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
import { Close, FilterListRounded, Place, SupervisorAccount, WatchLater } from '@mui/icons-material';
import MyLoading from '../../Components/MyLoading/MyLoading';
import { Option } from "./Components/CustomSelectLocationsDropMenu/CustomSelectLocationsDropMenu";
import { theme } from 'highcharts';
import { ColorModeContext } from '../theme';

export default function AllJobsPage() {

    const colorMode = React.useContext(ColorModeContext);
    const [loading, setLoading] = React.useState(true);

    const [jobs, setJobs] = React.useState<Job[]>([]);

    const [locationSelected, setLocationSelected] = React.useState<Option[] | null>();
    const [locationFilter, setLocationFilter] = React.useState<Option[] | null>();

    const [roleSelected, setRoleSelected] = React.useState<Option[] | null>();
    const [roleFilter, setRoleFilter] = React.useState<Option[] | null>();

    const [text, setText] = React.useState('');
    const [search, setSearch] = React.useState('');

    const [halfScope, setHalfScope] = React.useState(false);
    const [fullScope, setFullScope] = React.useState(false);

    const [scope, setScope] = React.useState<number>(0);


    const [filterMobile, setFilterMobile] = React.useState(false);


    const fetchJobs = async () => {
        setJobs(await getFilteredJobs(["open"], ["true"]));
    }
    React.useEffect(() => {
        fetchJobs();
        setLoading(false);
    }, []);


    const handleFilter = async (text) => {
            
        setLoading(true);

        setSearch(text);
        locationSelected?.forEach((loc) => console.log(loc?.label));

        setLocationFilter(locationSelected);

        if (halfScope === true) {
            setScope(50);
        }
        else { setScope(100); }
        
        setRoleFilter(roleSelected);

        setLoading(false);
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
                                background:
                                    colorMode?.getActualMode()! === 'light'
                                        ? '#FFFFFF'
                                        : colorMode?.getActualMode()! === 'dark-contrast'
                                            ? '#000000'
                                            : colorMode?.getActualMode()! === 'bright-contrast'
                                                ? '#FFFFFF'
                                                : '#FFFFFF', // black & white

                                boxShadow: '0px 3px 6px',
                                color: 'secondary.drushimTitleContainer', // light: #00000029 dark: #e5e5e9
                                borderRadius: '15px',
                                opacity: 1,
                                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}>
                                <Stack direction='row' justifyContent='center' width='100%'>
                                    <Typography sx={{
                                        // color: '#053B7A',
                                        color: 'secondary.drushimTitle',
                                        fontFamily: 'Rubik',
                                        fontWeight: 'bold',
                                        fontSize: '36px',
                                        opacity: 1,
                                        letterSpacing: 0

                                    }}>
                                        גְּ
                                    </Typography>
                                    <Typography sx={{
                                        // color: '#41C2F0',
                                        color: 'primary.drushimTitle',
                                        fontFamily: 'Rubik',
                                        fontWeight: 'bold',
                                        fontSize: '36px',
                                        opacity: 1,
                                        letterSpacing: 0

                                    }}>
                                        וָו
                                    </Typography>
                                    <Typography sx={{
                                        // color: '#053B7A',
                                        color: 'secondary.drushimTitle',
                                        fontFamily: 'Rubik',
                                        fontWeight: 'bold',
                                        fontSize: '36px',
                                        opacity: 1,
                                        letterSpacing: 0

                                    }}>
                                        נִים
                                    </Typography>
                                    <Typography sx={{
                                        // color: '#41C2F0',
                                        color: 'primary.drushimTitle',
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
                                        // color: '#41C2F0',
                                        color: 'primary.drushimTitle',
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
                                    // color: '#053B7A',
                                    color: 'secondary.drushimTitle',
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
                                        // color: '#053B7A',
                                        color: 'secondary.drushimTitle',
                                        fontFamily: 'Rubik',
                                        fontWeight: 'bold',
                                        fontSize: '32px',
                                        opacity: 1,
                                        letterSpacing: 0

                                    }}>
                                        גְּ
                                    </Typography>
                                    <Typography sx={{
                                        // color: '#41C2F0',
                                        color: 'primary.drushimTitle',
                                        fontFamily: 'Rubik',
                                        fontWeight: 'bold',
                                        fontSize: '32px',
                                        opacity: 1,
                                        letterSpacing: 0

                                    }}>
                                        וָו
                                    </Typography>
                                    <Typography sx={{
                                        // color: '#053B7A',
                                        color: 'secondary.drushimTitle',
                                        fontFamily: 'Rubik',
                                        fontWeight: 'bold',
                                        fontSize: '32px',
                                        opacity: 1,
                                        letterSpacing: 0

                                    }}>
                                        נִים
                                    </Typography>
                                    <Typography sx={{
                                        // color: '#41C2F0',
                                        color: 'primary.drushimTitle',
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
                                        // color: '#41C2F0',
                                        color: 'primary.drushimTitle',
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
                                    // color: '#053B7A',
                                    color: 'secondary.drushimTitle',
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
                                    <Stack direction='row' spacing={1} justifyContent='start' sx={{ paddingLeft: 2 }}>

                                        <FilterListRounded sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }} />


                                        <Stack direction='row' spacing={1} >
                                            <Typography variant='h2' sx={{
                                                color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                            }}>סינון</Typography>

                                        </Stack>
                                    </Stack>


                                </Box>
                                {/* #2b2c25 */}
                                <Box sx={{ backgroundColor: 'primary.divider', height: '2px', width: '92%', mt: 2, mb: 2, mr: 'auto', ml: 'auto', borderRadius: 1 }} />
                                {/* #191919 */}
                                <Box sx={{ borderRadius: '10px', backgroundColor: 'primary.filterBar', paddingBottom: 2 }}>
                                    <Box sx={{ paddingLeft: 4, paddingTop: 2 }}>
                                        <Typography variant='subtitle2' sx={{
                                            color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                        }}>חיפוש לפי מילה חופשית:</Typography>
                                        <SearchBar text={text} setText={setText} handleFilter={handleFilter} />
                                    </Box>
                                    <Divider sx={{ mt: 3.5, mb: 3, backgroundColor: 'primary.filterDivider', borderRadius: 1 }} />

                                    {/* ################# Location FILTER #################### */}
                                    <Box>
                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>


                                            <Place fontSize='small' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2', mb: 0.6 }} />

                                            <Stack direction='row' spacing={1} alignItems='end'>
                                                <Typography variant='subtitle2' sx={{
                                                    color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                                }}>חיפוש לפי מיקום:</Typography>

                                            </Stack>
                                        </Stack>
                                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                            <LocationMultiSelect optionSelected={locationSelected} setSelected={setLocationSelected} />
                                        </Box>
                                    </Box>
                                    {/* ############################################## */}

                                    <Divider sx={{ mt: 3, mb: 3, backgroundColor: 'primary.filterDivider' }} />

                                    {/* ################# Scope FILTER #################### */}
                                    <Box>
                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>

                                            <WatchLater fontSize='small' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2', padding: 0.20, mt: -0.4 }} />
                                            <Stack direction='row' spacing={1.2} >
                                                <Typography variant='subtitle2' alignItems='end' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }}>
                                                    בחרו היקף משרה:
                                                </Typography>

                                            </Stack>
                                        </Stack>
                                        <Stack direction='row' spacing={2.5} sx={{ mt: 2.5, paddingLeft: 4.5, paddingRight: 4.5 }}>
                                            <Button onClick={() => { setFullScope(true); setHalfScope(false); }} sx={{
                                                width: '100%',

                                                fontSize: 'medium',
                                                padding: 1.2,
                                                backgroundColor: fullScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'primary.jobScopeButton',
                                                color: (fullScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#FFFFFF' : 'primary.JobTitle2') : (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2')),
                                                borderRadius: '4px',
                                                opacity: 1,

                                                ':hover': {
                                                    backgroundColor: fullScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'secondary.jobScopeButton'
                                                },
                                            }}>
                                                משרה מלאה
                                            </Button>
                                            <Button onClick={() => { setHalfScope(true); setFullScope(false); }} sx={{
                                                width: '100%',
                                                fontSize: 'medium',
                                                padding: 1.2,
                                                backgroundColor: halfScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'primary.jobScopeButton',
                                                color: (halfScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#FFFFFF' : 'primary.JobTitle2') : (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2')),

                                                borderRadius: '4px',
                                                opacity: 1,
                                                ':hover': {
                                                    backgroundColor: halfScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'secondary.jobScopeButton'
                                                },

                                            }}>חצי משרה</Button>
                                        </Stack>
                                    </Box>
                                    {/* ############################################## */}

                                    <Divider sx={{ mt: 3, mb: 3, backgroundColor: 'primary.filterDivider' }} />

                                    {/* ################# Role FILTER #################### */}
                                    <Box>
                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>

                                            <SupervisorAccount sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }} />

                                            <Stack direction='row' spacing={1} alignItems='end'>
                                                <Typography variant='subtitle2' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }}>חיפוש לפי תפקיד:</Typography>

                                            </Stack>
                                        </Stack>
                                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                            <RolesMultiSelect optionSelected={roleSelected} setSelected={setRoleSelected} />
                                        </Box>
                                    </Box>
                                    {/* ############################################## */}
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                                        <Button onClick={(event) => handleFilter(text)} sx={{
                                            width: '185px',
                                            height: '40px',
                                            fontWeight: 500,
                                            backgroundColor: 'primary.filterButton',
                                            color: 'primary.JobTitle2',
                                            opacity: 1,
                                            borderRadius: '30px',
                                            ':hover': {
                                                backgroundColor: 'secondary.filterButton',
                                            },
                                        }}>
                                            החל סינון
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>


                            <Grid container width='100%' maxWidth={{ xs: '100%', sm: '100%', md: '100%', lg: '75%', xl: '75%' }} spacing={{ xs: 0, sm: 0, md: 4, lg: 4, xl: 4 }} columns={{ xs: 12, sm: 8, md: 8, lg: 8, xl: 8 }} sx={{ padding: { xs: 0, sm: 0, md: 2 } }}>
                                <Box display={{ xs: 'flex', sm: 'flex', md: 'none' }} borderTop='2px solid' borderBottom='2px solid' color='primary.divider' sx={{ width: '100%', paddingTop: 1.5, paddingBottom: 1.5, mb: 5, mt: 5, }}>
                                    <Box display='flex' flexDirection='column' justifyContent='center'
                                        sx={{
                                            backgroundColor: 'primary.filterBar',
                                            borderRadius: '10px',
                                            minHeight: '60px',
                                            width: '100%',

                                        }}>

                                        <Button disableRipple sx={{ display: 'flex', justifyContent: 'start', ":hover": { backgroundColor: 'primary.filterBar' } }} onClick={() => setFilterMobile(!filterMobile)}>
                                            <Stack direction='row' spacing={filterMobile ? 1.5 : 2} justifyContent='start' sx={{ paddingLeft: filterMobile ? 0 : 2 }}>
                                                <Box sx={{ display: filterMobile ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                <FilterListRounded sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }} />
                                                </Box>

                                                <Box sx={{ display: filterMobile ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', paddingTop: filterMobile ? 1.5 : 0 }}>
                                                    <Close sx={{color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2'}} />
                                                </Box>

                                                <Stack direction='row' spacing={1} sx={{ paddingTop: filterMobile ? 1.5 : 0 }} >
                                                    <Typography sx={{
                                                        textAlign: 'left',
                                                        fontWeight: 'bold',
                                                        fontFamily: 'Rubik',
                                                        letterSpacing: '0px',
                                                        color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                                        opacity: 1,
                                                    }}>סינון</Typography>

                                                </Stack>
                                            </Stack>
                                        </Button>
                                        {/* here */}
                                        <Collapse in={filterMobile}>
                                            <Box sx={{ width: '100%', height: 'fit-content' }}>

                                                <Box sx={{ backgroundColor: 'primary.divider', height: '1px', width: '100%', mt: 1.5, mb: 2, mr: 'auto', ml: 'auto' }} />

                                                <Box sx={{ borderRadius: '10px', backgroundColor:'primary.filterBar', paddingBottom: 2 }}>

                                                    <Box sx={{ paddingLeft: 4, paddingTop: 2 }}>
                                                        <Typography variant='subtitle2' sx={{
                                                            color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                                        }}>חיפוש לפי מילה חופשית:</Typography>
                                                        <SearchBar text={text} setText={setText} handleFilter={handleFilter}/>
                                                    </Box>
                                                    <Divider sx={{ mt: 3.5, mb: 3, backgroundColor: 'primary.filterDivider', borderRadius: 1 }} />

                                                    {/* ################# Location FILTER #################### */}
                                                    <Box>
                                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>


                                                            <Place fontSize='small' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2', mb: 0.6 }} />

                                                            <Stack direction='row' spacing={1} alignItems='end'>
                                                                <Typography variant='subtitle2' sx={{
                                                                    color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                                                }}>חיפוש לפי מיקום:</Typography>

                                                            </Stack>
                                                        </Stack>
                                                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                                            <LocationMultiSelect optionSelected={locationSelected} setSelected={setLocationSelected} />
                                                        </Box>
                                                    </Box>
                                                    {/* ############################################## */}

                                                    <Divider sx={{ mt: 3, mb: 3, backgroundColor: 'primary.filterDivider' }} />

                                                    {/* ################# Scope FILTER #################### */}
                                                    <Box>
                                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>

                                                            <WatchLater fontSize='small' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2', padding: 0.20, mt: -0.4 }} />
                                                            <Stack direction='row' spacing={1.2} >
                                                                <Typography variant='subtitle2' alignItems='end' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }}>
                                                                    בחרו היקף משרה:
                                                                </Typography>

                                                            </Stack>
                                                        </Stack>
                                                        <Stack direction='row' spacing={2.5} sx={{ mt: 2.5, paddingLeft: 4.5, paddingRight: 4.5 }}>
                                                            <Button onClick={() => { setFullScope(true); setHalfScope(false); }} sx={{
                                                                width: '100%',

                                                                fontSize: 'medium',
                                                                padding: 1.2,
                                                                backgroundColor: fullScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'primary.jobScopeButton',
                                                                color: (fullScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#FFFFFF' : 'primary.JobTitle2') : (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2')),
                                                                borderRadius: '4px',
                                                                opacity: 1,

                                                                ':hover': {
                                                                    backgroundColor: fullScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'secondary.jobScopeButton'
                                                                },
                                                            }}>
                                                                משרה מלאה
                                                            </Button>
                                                            <Button onClick={() => { setHalfScope(true); setFullScope(false); }} sx={{
                                                                width: '100%',
                                                                fontSize: 'medium',
                                                                padding: 1.2,
                                                                backgroundColor: halfScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'primary.jobScopeButton',
                                                                color: (halfScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#FFFFFF' : 'primary.JobTitle2') : (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2')),

                                                                borderRadius: '4px',
                                                                opacity: 1,
                                                                ':hover': {
                                                                    backgroundColor: halfScope ? (colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2') : 'secondary.jobScopeButton'
                                                                },

                                                            }}>חצי משרה</Button>
                                                        </Stack>
                                                    </Box>
                                                    {/* ############################################## */}

                                                    <Divider sx={{ mt: 3, mb: 3, backgroundColor: 'primary.filterDivider' }} />

                                                    {/* ################# Role FILTER #################### */}
                                                    <Box>
                                                        <Stack direction='row' spacing={2} justifyContent='start' sx={{ mt: 4, paddingLeft: 4 }}>

                                                            <SupervisorAccount sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }} />

                                                            <Stack direction='row' spacing={1} alignItems='end'>
                                                                <Typography variant='subtitle2' sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }}>חיפוש לפי תפקיד:</Typography>

                                                            </Stack>
                                                        </Stack>
                                                        <Box sx={{ mt: 2, paddingLeft: 4, paddingRight: 4 }}>
                                                            <RolesMultiSelect optionSelected={roleSelected} setSelected={setRoleSelected} />
                                                        </Box>
                                                    </Box>
                                                    {/* ############################################## */}
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5, mb: 2 }}>
                                                        <Button onClick={(event) => handleFilter(text)} sx={{
                                                            width: '185px',
                                                            height: '40px',
                                                            fontWeight: 500,
                                                            backgroundColor: 'primary.filterButton',
                                                            color: 'primary.JobTitle2',
                                                            opacity: 1,
                                                            borderRadius: '30px',
                                                            ':hover': {
                                                                backgroundColor: 'secondary.filterButton',
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
                                <Box display={{ xs: 'none', sm: 'none', md: 'flex' }} sx={{ backgroundColor: 'primary.divider', height: '2px', width: { xs: '100%', sm: '100%', md: '95%' }, mt: 2, mb: 2, ml: 'auto', borderRadius: 1 }} />


                                {
                                    jobs?.filter((job1: Job) => {
                                        return (

                                            // filter by tole
                                            (
                                                (roleFilter === undefined || roleFilter?.length === undefined || roleFilter?.length === 0) ? true :
                                                    (roleFilter?.map((e) => e?.label).includes(job1?._role))
                                            )

                                            // filter by region
                                            && (
                                                (locationFilter === null || locationFilter?.length === undefined || locationFilter?.length === 0) ? true :
                                                    (locationFilter?.map((e) => e?.label).includes(job1?._region))
                                            )

                                            // filter by scope
                                            && (
                                                (scope === null || scope === 0) ? true :
                                                    scope === 100 ? (job1?._scope[1]! === scope!) :
                                                        job1?._scope[1]! <= scope!
                                            )
                                            && (
                                                (job1?._region.toLowerCase().includes(search) || job1?._role.toLowerCase().includes(search.toLowerCase())
                                                    || job1?._requirements.toLowerCase().includes(search.toLowerCase())) ? true : false
                                            )

                                        );
                                    }).
                                        sort((job2: Job) => {
                                            return job2?._highPriority ? -1 : 1
                                        })
                                        .map((job: Job, index: any) => (

                                            <Grid item xs={12} sm={8} md={4} lg={4} xl={4} key={index} sx={{ mb: { xs: 3, sm: 3, md: 0 } }} >

                                                <JobItem job={job} />

                                            </Grid>
                                        ))
                                }

                            </Grid>
                        </Stack>
                    </>
                )}
        </>
    );
}



