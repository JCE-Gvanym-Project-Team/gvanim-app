import { ArticleOutlined } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Container, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { exportToExcel } from '../../../../Firebase/FirebaseFunctions/Reports/GlobalFunctions';
import JobsByFilters from '../../../../Firebase/FirebaseFunctions/Reports/JobsFilters';
import { Job, generateJobNumber, getAllRoles, getAllSectors, getFilteredCandidateJobStatuses, getFilteredCandidates, getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import { BoxGradientSx, MyPaperSx } from '../../../ManageJobsPage/Components/NewJobPage/NewJobStyle';
import { designReturnButton } from '../../../ManageJobsPage/ManageJobsPageStyle';
import { MyReportStyle, radioStyle } from '../../ReportPageStyle';
import { useEffect } from 'react';

interface typeMyData {
    id: number;
    name: string;
}

export default function JobsFiltersForm() {
    const navigate = useNavigate();
    const [roles, setRoles] = React.useState<typeMyData[]>([]);
    const [sectors, setSectors] = React.useState<typeMyData[]>([]);
    const [selectedRole, setSelectedRole] = React.useState<string>();
    const [selectedSector, setSelectedSector] = React.useState<string>();
    const [scope, setScope] = React.useState('');
    const [openJobs, setOpenJobs] = React.useState('yes');
    const [highPriority, setHighPriority] = React.useState('no');
    const [startOn, setStartOn] = React.useState('no');
    const [platformForApplys, setPlatformForApplys] = React.useState<typeMyData[]>([]);
    const [platformForViews, setPlatformForViews] = React.useState<typeMyData[]>([]);
    const [applayPlatformUserSelected, setApplayPlatformUserSelected] = React.useState<string>();
    const [viewPlatformUserSelected, setViewPlatformUserSelected] = React.useState<string>();
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [platformIsExist, setPlatformIsExist] = React.useState(false);


    useEffect(() => {
        const fileData = async () => {
            // get sectors 
            let i = 20;
            const sectorsFromDb = await getAllSectors();
            let updatedSectors = [{ id: 10, name: 'כל האשכולות' }];

            updatedSectors = updatedSectors.concat(
                sectorsFromDb.map((sector) => {
                    const sectorObj = { id: i, name: sector._name };
                    i = i + 10
                    return sectorObj;
                })
            );

            setSectors(updatedSectors);
            // get roles
            const rolesFromDb = await getAllRoles();
            i = 20;
            let updatedRoles = [{ id: 10, name: "כל התפקידים" }];
            updatedRoles = updatedRoles.concat(
                rolesFromDb.map((role) => {
                    const roleObj = { id: i, name: role._name };
                    i = i + 10;
                    return roleObj;
                })
            );
            setRoles(updatedRoles);

            let oneChoice: typeMyData = { id: 10, name: 'כל הפלטפורמות' };
            let secondChoice: typeMyData = { id: 20, name: 'איני רוצה לבחור אף פלטפורמה' };

            // platform for apply
            const jobs = await getFilteredJobs();
            let updatedPlatformsForApply: typeMyData[] = [];
            updatedPlatformsForApply.push(oneChoice);
            updatedPlatformsForApply.push(secondChoice);
            i = 30;

            for (let k = 0; k < jobs.length; k++) {
                const jobPlatformsApply = Object.keys(jobs[k]._applyPerPlatform) as string[];
                for (let j = 0; j < jobPlatformsApply.length; j++) {
                    const platform = jobPlatformsApply[j];
                    const isPlatformExist = updatedPlatformsForApply.some((item) => item.name === platform);

                    if (!isPlatformExist) {
                        const platformObj: typeMyData = { id: i, name: platform };
                        updatedPlatformsForApply.push(platformObj);
                        i += 10;
                    }
                }
            }
            setPlatformForApplys(updatedPlatformsForApply);

            // platform for views 
            let updatedPlatformsForViews: typeMyData[] = [];
            updatedPlatformsForViews.push(oneChoice);
            updatedPlatformsForViews.push(secondChoice);
            i = 30;

            for (let k = 0; k < jobs.length; k++) {
                const jobPlatformsViews = Object.keys(jobs[k]._viewsPerPlatform) as string[];
                for (let j = 0; j < jobPlatformsViews.length; j++) {
                    const platform = jobPlatformsViews[j];
                    const isPlatformExist = updatedPlatformsForViews.some((item) => item.name === platform);

                    if (!isPlatformExist) {
                        const platformObj: typeMyData = { id: i, name: platform };
                        updatedPlatformsForViews.push(platformObj);
                        i += 10;
                    }
                }
            }
            setPlatformForViews(updatedPlatformsForViews);
        };

        fileData();
    }, []);


    const createReport = (roleName, scope_ind, sectorName, openJobs_ind, highPriority_ind, startOn_ind, platformForApply, platformForView, startDate, endDate) => {
        // checking if the user select all the buttons
        const isDateSelected = startDate && endDate;

        if (!roleName || !scope_ind || !sectorName || !platformForApply || !platformForView || !isDateSelected) {
            // displaying an error message or indicating to the user that the parameters are mandatory
            alert('יש למלא את כל השדות');
            return;
        }

        const scopeArr = [[0, 25], [25, 50], [50, 75], [100, 100], [1]]; // [1] mean evry scope of jobs
        const choice = ["true", "false"];
        const scope = scopeArr[Math.floor(scope_ind / 10) - 1];
        let openJobs: boolean;
        let highPriority: boolean;
        let startOn: boolean;

        if (openJobs_ind === 'yes')
            openJobs = true;
        else
            openJobs = false;

        if (highPriority_ind === 'yes')
            highPriority = true;
        else
            highPriority = false;

        if (startOn_ind === 'yes')
            startOn = true;
        else
            startOn = false;

        const formattedStartDate = startDate.toDate();
        const formattedEndDate = endDate.toDate();

        const result = JobsByFilters(roleName, scope, sectorName, openJobs, highPriority, startOn, platformForApply, platformForView, formattedStartDate, formattedEndDate)
            .then((result) => {
                if (result.length === 0)
                    alert('אין נתונים להצגה');
                else
                    exportToExcel(result, "משרות");
            })
            .catch((error) => {
                return
            });
    }




    // handls
    function handleChangeRole(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setSelectedRole(event.target.value);
    }

    function handleChangeScope(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setScope(event.target.value);
    }

    const handleChangeSector = (event) => {
        setSelectedSector(event.target.value);
    };

    const handleChangeOpenJobs = (event) => {
        setOpenJobs(event.target.value);
    };

    const handleChangeHighPriority = (event) => {
        setHighPriority(event.target.value);
    };

    const handleChangeStartOn = (event) => {
        setStartOn(event.target.value);
    };

    const handleApplyPerPlatform = (event) => {
        setApplayPlatformUserSelected(event.target.value);
    }

    const handleViewPerPlatform = (event) => {
        setViewPlatformUserSelected(event.target.value);
    }
    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };

    const handleChangeEndDate = (date) => {
        setEndDate(date);
    };

    const handleClick = () => {
        navigate("/management/reports");
    };

    return (
        <>
            <Box sx={BoxGradientSx}>
                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '2%',
                    left: 'auto',
                    top: '15%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '10%',
                    left: 'auto',
                    top: '0%',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '170px',
                    height: '170px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '40%',
                    top: '-1%',
                    right: 'auto',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />


                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: 'auto',
                    top: '16%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '-2%',
                    top: '12%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '4%',
                    top: '8%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '25%',
                    top: '12%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', top: "165px", position: "absolute" }}>
                    <Stack direction='column'>
                        <Stack direction='row' justifyContent='center' spacing={1}>

                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <ArticleOutlined sx={{ color: '#fff' }} />
                            </Box>
                            <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: '#fff', textAlign: 'center' }} variant='h4'>
                                דו"ח משרות
                            </Typography>

                        </Stack>

                        <Typography sx={{ opacity: 0.6, width: '100%', textAlign: 'center', color: '#fff', fontSize: '16px', fontFamily: "'Noto Sans Hebrew', sans-serif", mt: 1 }} variant='subtitle1'>
                            הפקת דוחות על משרות לפי מס' קטגוריות
                        </Typography>
                        <Box sx={{ background: 'linear-gradient(90deg,hsla(0,0%,100%,0),#fff,hsla(0,0%,100%,0))', padding: 0.05, width: '100%', mt: 2 }} />
                    </Stack>
                </Box>
            </Box>

            <Box sx={MyPaperSx}>
                <Box sx={MyReportStyle}>
                    <Container>
                        <Box >
                            <Box className="col-md-12">
                                <Box className="section-title">
                                    <FormControl  >
                                        {/* select role */}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">בחר תפקיד</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedRole}
                                                label="rejectionCause"
                                                onChange={handleChangeRole}
                                            >
                                                {roles.map((role) => (
                                                    <MenuItem key={role.id} value={role.name}>
                                                        {role.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <br />

                                        {/* select % scope of job */}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">בחר משרות על פי אחוזי משרה</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={scope}
                                                label="selectStatus"
                                                onChange={handleChangeScope}
                                            >
                                                <MenuItem value={10}>25%-משרות בין 0 </MenuItem>
                                                <MenuItem value={20}>50%-משרות בין 25%</MenuItem>
                                                <MenuItem value={30}>75%-משרות בין 50%</MenuItem>
                                                <MenuItem value={40}>100%-75% משרות בין</MenuItem>
                                                <MenuItem value={50}>בחר את כל אחוזי המשרה</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <br />
                                        {/* sector*/}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">בחירת אשכול</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={selectedSector}
                                                label="sector"
                                                onChange={handleChangeSector}
                                            >
                                                {sectors.map((sector) => (
                                                    <MenuItem key={sector.id} value={sector.name}>
                                                        {sector.name}
                                                    </MenuItem>
                                                ))}

                                            </Select>
                                        </FormControl>
                                        <br />

                                        {/* select include grade */}
                                        <RadioGroup
                                            value={openJobs}
                                            onChange={handleChangeOpenJobs}
                                            aria-label="include-grade"
                                            name="include-grade"
                                        >
                                            <div style={radioStyle}>
                                                <FormControlLabel value="yes" control={<Radio />} label="כלול רק את המשרות הפתוחות" />
                                                <FormControlLabel value="no" control={<Radio />} label="כלול את כולם" />
                                            </div>
                                        </RadioGroup>
                                        <br />

                                        {/* select include mathcing rate */}
                                        <RadioGroup
                                            value={highPriority}
                                            onChange={handleChangeHighPriority}
                                            aria-label="include-grade"
                                            name="include-grade"
                                        >
                                            <div style={radioStyle}>
                                                <FormControlLabel value="yes" control={<Radio />} label="כלול רק את המשרות בעדיפות גבוהה" />
                                                <FormControlLabel value="no" control={<Radio />} label="כלול את כל העדיפיות" />
                                            </div>
                                        </RadioGroup>
                                        <br />

                                        {/* select include job that startOn*/}
                                        <RadioGroup
                                            value={startOn}
                                            onChange={handleChangeStartOn}
                                            aria-label="include-grade"
                                            name="startOn"
                                        >
                                            <div style={radioStyle}>
                                                <FormControlLabel value="yes" control={<Radio />} label="בחר משרות לתחילת עבודה מיידית" />
                                                <FormControlLabel value="no" control={<Radio />} label="כלול הכל" />
                                            </div>
                                        </RadioGroup>
                                        <br />

                                        {/*בחירת הגשות דרך פלטפורמה*/}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">כמה הגישו קורות חיים דרך הפלטפורמה הבאה:</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={applayPlatformUserSelected}
                                                label="platformForApplys"
                                                onChange={handleApplyPerPlatform}
                                            >
                                                {platformForApplys.map((plat) => (
                                                    <MenuItem key={plat.id} value={plat.name}>
                                                        {plat.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <br />

                                        {/* בחירת צפיות דרך פלטפורמה*/}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">כמה צפו בעמוד המשרה דרך הפלטפורמה הבאה:</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={viewPlatformUserSelected}
                                                label="platformForViews"
                                                onChange={handleViewPerPlatform}
                                            >
                                                {platformForViews.map((plat) => (
                                                    <MenuItem key={plat.id} value={plat.name}>
                                                        {plat.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                        <br />
                                        {/* select time */}
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer
                                                components={['DatePicker', 'DatePicker', 'DesktopDatePicker', 'MobileDatePicker']}>
                                                <DatePicker
                                                    label="מתאריך"
                                                    value={startDate}
                                                    onChange={handleChangeStartDate}
                                                />
                                                <DatePicker
                                                    label="עד תאריך"
                                                    value={endDate}
                                                    onChange={handleChangeEndDate}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>

                                        <br />
                                        {/* create report */}
                                        <button onClick={() => createReport(selectedRole, scope, selectedSector, openJobs, highPriority, startOn, applayPlatformUserSelected, viewPlatformUserSelected, startDate, endDate)}>צור דוח</button>
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>

                    </Container>
                </Box >
            </Box>

            <Box style={{ position: 'absolute', top: '100px', right: '50px' }}>
                <Button
                    onClick={handleClick}
                    sx={designReturnButton}
                >
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    חזור
                </Button>
            </Box>
        </>
    )
}
