import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack, Container } from '@mui/material';
import { CandidateJobStatus, Job, generateJobNumber, getFilteredCandidateJobStatuses, getFilteredCandidates, getFilteredJobs, loginAdmin } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import { exportToExcel } from '../../../../Firebase/FirebaseFunctions/Reports/GlobalFunctions'
import CandidatesByFilters from '../../../../Firebase/FirebaseFunctions/Reports/CandidatesFilters';
import { MyReportStyle, formContainerStyles, radioStyle } from '../../ReportPageStyle';
import JobsByFilters from '../../../../Firebase/FirebaseFunctions/Reports/JobsFilters'
import { ArticleOutlined } from "@mui/icons-material";
import { MyPaperSx, BoxGradientSx } from '../../../ManageJobsPage/Components/NewJobPage/NewJobStyle';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


export default function JobsFiltersForm()
{

    const createReport = (role_ind, scope_ind, sector_ind, openJobs_ind, highPriority_ind, viewsAndApplyPerPlatform_ind, startDate, endDate) =>
    {
        // checking if the user select all the buttons
        const isDateSelected = startDate && endDate;


        if (!role_ind || !scope_ind || !sector_ind || !role_ind || !viewsAndApplyPerPlatform_ind || !isDateSelected)
        {
            // displaying an error message or indicating to the user that the parameters are mandatory
            alert('יש למלא את כל השדות');
            return;
        }

        const scopeArr = [25, 50, 75, 100, 1]; // [1] mean evry scope of jobs
        const choice = ["true", "false"];
        const viewsAndApplyPerPlatformArr: string[] = ["אל תכלול", "פייסבוק", "יד 2", "מאסטר גוב", "גוגל", "כל הפלטפורמות"];
        const roleArr = ["מנהל", "עובד סוציאלי", "מתנדב", "כל התפקידים"];
        const sectorArr = ["מרכז", "צפון", "דרום", "כל הארץ"];

        const role = roleArr[Math.floor(role_ind / 10) - 1];
        const scope = scopeArr[Math.floor(scope_ind / 10) - 1];
        const sector = sectorArr[Math.floor(sector_ind / 10) - 1];

        let openJobs: boolean;
        if (openJobs_ind === 'yes')
            openJobs = true;
        else
            openJobs = false;

        let highPriority: boolean;
        if (highPriority_ind === 'yes')
            highPriority = true;
        else
            highPriority = false;

        const viewsAndApplyPerPlatform = viewsAndApplyPerPlatformArr[Math.floor(viewsAndApplyPerPlatform_ind / 10) - 1];
        const formattedStartDate = startDate.toDate();
        const formattedEndDate = endDate.toDate();

        const result = JobsByFilters(role, scope, sector, openJobs, highPriority, viewsAndApplyPerPlatform, formattedStartDate, formattedEndDate)
            .then((result) =>
            {
                if (result.length === 0)
                    alert('אין נתונים להצגה');
                else
                    exportToExcel(result, "משרות");
            })
            .catch((error) =>
            {
                // handle the error
                console.log(error);
            });
    }


    // const 
    const navigate = useNavigate();

    const [role, setRole] = React.useState('');
    const [scope, setScope] = React.useState('');
    const [sector, setSector] = React.useState('');
    const [openJobs, setOpenJobs] = React.useState('yes');
    const [highPriority, setHighPriority] = React.useState('no');
    const [viewsAndApplyPerPlatform, setViewsAndApplyPerPlatform] = React.useState('');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);


    // handls
    function handleChangeRole(event: SelectChangeEvent<string>, child: React.ReactNode): void
    {
        setRole(event.target.value);
    }

    function handleChangeScope(event: SelectChangeEvent<string>, child: React.ReactNode): void
    {
        setScope(event.target.value);
    }

    const handleChangeSector = (event) =>
    {
        setSector(event.target.value);
    };

    const handleChangeOpenJobs = (event) =>
    {
        setOpenJobs(event.target.value);
    };

    const handleChangeHighPriority = (event) =>
    {
        setHighPriority(event.target.value);
    };

    const handleViewsAndApplyPerPlatform = (event) =>
    {
        setViewsAndApplyPerPlatform(event.target.value);
    }
    const handleChangeStartDate = (date) =>
    {
        setStartDate(date);
    };

    const handleChangeEndDate = (date) =>
    {
        setEndDate(date);
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
                                                value={role}
                                                label="rejectionCause"
                                                onChange={handleChangeRole}
                                            >
                                                <MenuItem value={10}>מנהל</MenuItem>
                                                <MenuItem value={20}>עובד סוציאלי</MenuItem>
                                                <MenuItem value={30}>מתנדב</MenuItem>
                                                <MenuItem value={40}>כל התפקידים</MenuItem>
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
                                                <MenuItem value={20}>50%-משרות בין 26%</MenuItem>
                                                <MenuItem value={30}>75%-משרות בין 51%</MenuItem>
                                                <MenuItem value={40}>100%-76% משרות בין</MenuItem>
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
                                                value={sector}
                                                label="sector"
                                                onChange={handleChangeSector}
                                            >
                                                <MenuItem value={10}>מרכז</MenuItem>
                                                <MenuItem value={20}>צפון</MenuItem>
                                                <MenuItem value={30}>דרום</MenuItem>
                                                <MenuItem value={40}>כל הארץ</MenuItem>
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

                                        {/* בחירת צפיות דרך פלטפורמה*/}
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">צפיות והגשות בפלטפורמות:</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={viewsAndApplyPerPlatform}
                                                label="sector"
                                                onChange={handleViewsAndApplyPerPlatform}
                                            >
                                                <MenuItem value={10}>אל תכלול</MenuItem>
                                                <MenuItem value={20}>פייסבוק</MenuItem>
                                                <MenuItem value={30}>יד 2</MenuItem>
                                                <MenuItem value={40}>מאסטר גוב</MenuItem>
                                                <MenuItem value={50}>גוגל</MenuItem>
                                                <MenuItem value={60}>כל הפלטפורמות</MenuItem>
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
                                        <button onClick={() => createReport(role, scope, sector, openJobs, highPriority, viewsAndApplyPerPlatform, startDate, endDate)}>צור דוח</button>
                                        {/* <button onClick={() => main()}>צור גובס</button> */}
                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>

                    </Container>
                </Box >
            </Box>

        </>

    )
}



