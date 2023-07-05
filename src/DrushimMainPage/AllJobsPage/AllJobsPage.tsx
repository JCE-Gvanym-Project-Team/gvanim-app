import { Box, Breakpoint, Button, Collapse, Divider, Fab, Fade, Grid, Stack, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';
import JobItem from './Components/JobItem/JobItem';
import SearchBar from './Components/SearchBar/SearchBar';
import { Job, getFilteredJobs } from '../../Firebase/FirebaseFunctions/Job';
import NavBarImage from '../AllJobsPage/Resources/navbarImage.png';
import NavBarImage_mobile from '../AllJobsPage/Resources/navbarImage_mobile.png';
import LocationMultiSelect from './Components/CustomSelectLocationsDropMenu/LocationMultiSelect';
import RolesMultiSelect from './Components/CustomSelectRolesDropMenu/RolesMultiSelect';
import { Close, FilterListRounded, KeyboardArrowUpRounded, Place, SupervisorAccount, WatchLater } from '@mui/icons-material';
import MyLoading from '../../Components/MyLoading/MyLoading';
import { Option } from "./Components/CustomSelectLocationsDropMenu/CustomSelectLocationsDropMenu";
import { ColorModeContext } from '../theme';
import NoItems from './Components/NoItems/NoItems';

export default function AllJobsPage() {
    const [buttonLoading, setButtonLoading] = React.useState(false);

    const [showTopBtn, setShowTopBtn] = React.useState(false);

    const [visible, setVisible] = React.useState(0); // how many items to show every time, mobile: 4, desktop: 6

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


    // ############################### FUNCTIONS ######################################################

    // ################################
    type BreakpointOrNull = Breakpoint | null;
    const useWidth = () => {
        const theme: Theme = useTheme();
        const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
        return (
            keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const matches = useMediaQuery(theme.breakpoints.up(key));
                return !output && matches ? key : output;
            }, null) || 'xs'
        );
    };
    const screenSize = useWidth();
    // #####################################

    const showMoreItems = () => {
        screenSize === 'xs' || screenSize === 'sm' // mobile
            ? setVisible((prevValue) => prevValue + 4)
            : setVisible((prevValue) => prevValue + 6);
    };

    const fetchJobs = async () => {
        setJobs(await getFilteredJobs(["open"], ["true"]));
    }

    React.useEffect(() => {
        screenSize === 'xs' || screenSize === 'sm' // mobile
            ? setVisible(4)
            : setVisible(6);

        fetchJobs();
        setLoading(false);

        window.addEventListener("scroll", () => {
            if (window.scrollY > 1500) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });

    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 500,
            behavior: "smooth",
        });
    };


    const handleFilter = () => {
        setLoading(true);

        setSearch(text);
        // console.log("SearchField: " + text);
        // console.log("LocationField: ");
        // locationSelected?.forEach((loc) => console.log(loc?.label));

        setLocationFilter(locationSelected);

        if (halfScope === true) {
            setScope(50);
            // console.log('half');
        }
        else {
            // console.log('full'); setScope(100);
        }
        // console.log("roleField: ");

        // roleSelected?.forEach((role) => console.log(role?.label));
        setRoleFilter(roleSelected);

        setLoading(false);

        setFilterMobile(false);

        screenSize === 'xs' || screenSize === 'sm' // mobile
        ? setVisible(4)
        : setVisible(6);

        goToTop();

    };


    // ############################### END FUNCTIONS ######################################################
    return (
        <>
            {loading ? (
                <MyLoading loading={loading} setLoading={setLoading} />
            ) :
                (
                    <Box>
                        <Box id='NavbarImage_and_TitlePaper'>

                            <Box id='NavBarImage_container_desktop' display={{ xs: 'none', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }}>
                                <img src={NavBarImage} alt="NavBarImage"
                                    style={{
                                        maxWidth: '100%',
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

                            <Box id='NavBarImage_container_mobile' display={{ xs: 'flex', sm: 'none', md: 'none', lg: 'none', xl: 'none' }}>
                                <img src={NavBarImage_mobile} alt="NavBarImage_mobile"
                                    style={{
                                        maxWidth: '100%',
                                        display: 'flex',
                                        filter:
                                            colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast' && colorMode?.getActualMode()! !== 'bright-contrast'
                                                ? 'grayscale(1)'
                                                : colorMode?.getActualMode()! === 'bright-contrast'
                                                ? 'brightness(0.7)' 
                                                : colorMode?.getActualMode()! === 'dark-contrast'
                                                ? 'brightness(0.5)'
                                                : 'grayscale(0)'
                                                
                                    }} />
                            </Box>


                            <Stack id="title_container_desktop" sx={{
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
                                color: 'secondary.drushimTitleContainer',
                                borderRadius: '15px',
                                opacity: 1,
                                display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center'
                            }}>
                                <Stack direction='row' justifyContent='center' width='100%' sx={{
                                    filter: colorMode?.getActualMode()! === 'bright-contrast'
                                        ? 'brightness(0.7)' : 'brightness(1)',
                                }}>
                                    <Typography variant='h1' sx={{
                                        color: 'secondary.drushimTitle',
                                    }}>
                                        גְּ
                                    </Typography>
                                    <Typography variant='h1' sx={{
                                        color: 'primary.drushimTitle',
                                        alignSelf: 'center',

                                    }}>
                                        וָו
                                    </Typography>
                                    <Typography variant='h1' sx={{
                                        color: 'secondary.drushimTitle',
                                        alignSelf: 'center',

                                    }}>
                                        נִים
                                    </Typography>
                                    <Typography variant='h1' sx={{
                                        color: 'primary.drushimTitle',
                                        alignSelf: 'center',

                                    }}>
                                        ,
                                    </Typography>
                                    <Typography variant='h1' sx={{
                                        ml: 1,
                                        alignSelf: 'center',
                                        color: 'primary.drushimTitle',

                                    }}>
                                        לעבוד עם הנשמה
                                    </Typography>
                                </Stack>

                                <Typography variant='body2' sx={{
                                    mt: 1,
                                    color: 'secondary.drushimTitle',
                                    filter: colorMode?.getActualMode()! === 'bright-contrast'
                                        ? 'brightness(0.7)' : 'brightness(1)',
                                }}>
                                    בואו לעבוד עם עמותת גוונים 9913*
                                </Typography>
                            </Stack>

                            <Box id='title_container_mobile' display={{ xs: 'block', sm: 'block', md: 'none' }} paddingRight={3} paddingLeft={3} paddingTop={2}
                                sx={{
                                    filter: colorMode?.getActualMode()! === 'bright-contrast'
                                        ? 'brightness(0.7)' : 'brightness(1)',
                                }}
                            >

                                <Stack direction='row' justifyContent='center' width='100%'>
                                    <Typography variant='h2' sx={{
                                        alignSelf: 'center',
                                        color: 'secondary.drushimTitle',
                                    }}>
                                        גְּ
                                    </Typography>
                                    <Typography variant='h2' sx={{
                                        alignSelf: 'center',
                                        color: 'primary.drushimTitle',
                                    }}>
                                        וָו
                                    </Typography>
                                    <Typography variant='h2' sx={{
                                        alignSelf: 'center',
                                        color: 'secondary.drushimTitle',
                                    }}>
                                        נִים
                                    </Typography>
                                    <Typography variant='h2' sx={{
                                        color: 'primary.drushimTitle',
                                        alignSelf: 'center',
                                    }}>
                                        ,
                                    </Typography>
                                    <Typography variant='h2' sx={{
                                        ml: 1,
                                        alignSelf: 'center',
                                        color: 'primary.drushimTitle',
                                    }}>
                                        לעבוד עם הנשמה
                                    </Typography>
                                </Stack>
                                <Typography variant='body2' sx={{
                                    mt: 1,
                                    textAlign: 'center',
                                    color: 'secondary.drushimTitle',
                                }}>
                                    בואו לעבוד עם עמותת גוונים 9913*
                                </Typography>
                            </Box>
                        </Box>



                        <Stack direction='row' justifyContent={{ sm: 'center', md: 'center', lg: 'space-between' }} sx={{
                            paddingTop: { sm: '14px', md: '30px', lg: '22px', xl: '30px' },
                            marginTop: {md: 2},
                            marginBottom: 2,
                            padding: 0,
                        }}>

                            <Fade timeout={450} in={showTopBtn} style={{
                                left: 20,
                                filter:
                                    colorMode?.getActualMode()! === 'bright-contrast'
                                        ? 'contrast(50%)'
                                        : colorMode?.getActualMode()! !== 'light' && colorMode?.getActualMode()! !== 'dark-contrast'
                                            ? 'grayscale(1)'
                                            : 'grayscale(0)'
                            }} >
                                <Box id="floatingButton" sx={{
                                    position: 'fixed',
                                    zIndex: 100,
                                    width: 'fit-content',
                                    rigth: 'auto',
                                    left: { sm: 'auto', md: 0, lg: '12%' },
                                    padding: { lg: 1 },
                                    paddingLeft: { xs: 1, sm: 0, md: 1, lg: 1 },
                                    bottom: { xs: '20px', md: '120px', lg: '310px', xl: '370px' }

                                }}>

                                    <Fab
                                        sx={{

                                            backgroundColor: {
                                                xs: 'secondary.jobDetails',
                                                md:
                                                    colorMode?.getActualMode()! === 'dark-contrast'
                                                        ? '#7aa3c2'
                                                        : '#3b82f680'
                                            },
                                            ':hover': {
                                                backgroundColor: {
                                                    xs: colorMode?.getActualMode()! === 'bright-contrast' ? '#38212C' : '#BC5887',
                                                    md: '#99CCF3'
                                                },
                                            },
                                            transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

                                        }}
                                        aria-label="add" onClick={goToTop}>
                                        <KeyboardArrowUpRounded sx={{
                                            color: {
                                                xs: '#FFFFFF',
                                                md: '#004C99'
                                            },

                                        }} />
                                    </Fab>

                                </Box>
                            </Fade>

                            <Box id='filterContainerDesktop' padding={{ xl: 2 }} display={{ xs: 'none', sm: 'none', md: 'none', lg: 'block', xl: 'block' }} width={'26%'}>

                                <Box>
                                    <Box width="26%">
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
                                            <SearchBar text={text} setText={setText} />
                                        </Box>
                                        <Divider sx={{ mt: 3.5, mb: 3, backgroundColor: 'primary.filterDivider', borderRadius: 1 }} />

                                        {/* ################# Location FILTER #################### */}
                                        <Box>
                                            <Stack direction='row' spacing={2} justifyContent='start' sx={{ paddingLeft: 4 }}>


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
                                            <Stack direction='row' spacing={2} justifyContent='start' sx={{ paddingLeft: 4 }}>

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
                                            <Stack direction='row' spacing={2} justifyContent='start' sx={{ paddingLeft: 4 }}>

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
                                            <LoadingButton
                                                loading={buttonLoading}
                                                loadingIndicator="טוען.."
                                                onClick={handleFilter} sx={{
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
                                            </LoadingButton>
                                        </Box>
                                    </Box>
                                </Box>



                            </Box>


                            <Grid
                                alignContent='start'
                                justifyContent='start'
                                container
                                maxWidth={{ xs: '100%', sm: '100%', md: '100%', lg: '74%', xl: '74%' }}
                                rowSpacing={{ xs: 0, sm: 2, md: 4, lg: 3, xl: 4 }}
                                columnSpacing={{ xs: 0, sm: 0, md: 4, lg: 4, xl: 4 }}
                                columns={{ xs: 12, sm: 8, md: 8, lg: 8, xl: 8 }}
                                sx={{
                                    padding: { xs: 2, sm: 4, md: 2, lg: 1 },
                                    paddingRight: { lg: 4, xl: 4 },
                                    ml: 'auto',
                                    // border: '2px solid pink'
                                }}>
                                <Box width='100%' display={{ xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} paddingLeft={{ xs: 0, sm: 0, md: 4, lg: 0, xl: 0 }} justifyContent='center' sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                                    <Box display='flex' flexDirection='column' justifyContent='space-between' width='100%'>
                                        <Box display={{ xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} sx={{ backgroundColor: 'primary.divider', height: '2px', width: '100%', mt: 2, mb: 2, ml: 'auto', borderRadius: 1 }} />
                                        <Stack direction='column' justifyContent='center'
                                            sx={{
                                                backgroundColor: 'primary.filterBar',
                                                borderRadius: '10px',
                                                minHeight: '60px',
                                                width: '100%'

                                            }}>
                                            <Button disableRipple sx={{ display: 'flex', justifyContent: 'start', ":hover": { backgroundColor: 'primary.filterBar' } }} onClick={() => setFilterMobile(!filterMobile)}>
                                                <Stack direction='row' spacing={filterMobile ? 1.5 : 2} justifyContent='start' sx={{ paddingLeft: filterMobile ? 0 : 2 }}>
                                                    <Box sx={{ display: filterMobile ? 'none' : 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                                        <FilterListRounded sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }} />
                                                    </Box>

                                                    <Box sx={{ display: filterMobile ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'center', paddingTop: filterMobile ? 1.5 : 0 }}>
                                                        <Close sx={{ color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2' }} />
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

                                                    <Box sx={{ borderRadius: '10px', backgroundColor: 'primary.filterBar', paddingBottom: 2 }}>

                                                        <Box sx={{ paddingLeft: 4, paddingTop: 2 }}>
                                                            <Typography variant='subtitle2' sx={{
                                                                color: colorMode?.getActualMode()! === 'bright-contrast' ? '#6e86a2' : 'background.JobTitle2',
                                                            }}>חיפוש לפי מילה חופשית:</Typography>
                                                            <SearchBar text={text} setText={setText} />
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
                                                            <LoadingButton
                                                                loading={buttonLoading}
                                                                loadingIndicator="טוען.."
                                                                onClick={handleFilter}
                                                                sx={{
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
                                                            </LoadingButton>
                                                        </Box>
                                                    </Box>

                                                </Box>
                                            </Collapse>
                                        </Stack>
                                        <Box display={{ xs: 'flex', sm: 'flex', md: 'flex', lg: 'none' }} sx={{ backgroundColor: 'primary.divider', height: '2px', width: '100%', mt: 2, mb: 2, ml: 'auto', borderRadius: 1 }} />
                                    </Box>
                                </Box>

                                {/* desktop divider */}
                                <Box display={{ xs: 'none', sm: 'none', md: 'none', lg: 'flex' }} sx={{ backgroundColor: 'primary.divider', height: '2px', width: 'calc(100% - 31px)', mt: 2, ml: 'auto', borderRadius: 1 }} />

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
                                    }).length <= 0 ?
                                        <NoItems />
                                        : (

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
                                                .slice(0, visible)
                                                .map((job: Job, index: any) => (

                                                    <Grid item
                                                        xs={12} sm={8} md={4} lg={4} xl={4}
                                                        key={index}
                                                        sx={{ mb: { xs: 3, sm: 3, md: 0 } }} >

                                                        <JobItem job={job} />

                                                    </Grid>
                                                ))

                                        )
                                }

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
                                    }).length > visible &&
                                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', mt: 5, mb: 5 }}>
                                        <LoadingButton
                                            loading={buttonLoading}
                                            loadingIndicator="טוען.."
                                            onClick={showMoreItems} sx={{
                                                width: { xs: '185px', md: '330px' },
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
                                            פתח עוד..
                                        </LoadingButton>
                                    </Box>

                                }


                            </Grid>


                        </Stack>

                    </Box>
                )}






        </>
    );
}



