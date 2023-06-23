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
import { getAllRoles, getAllSectors } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import { BoxGradientSx, MyPaperSx } from '../../../ManageJobsPage/Components/NewJobPage/NewJobStyle';
import { designReturnButton } from '../../../ManageJobsPage/ManageJobsPageStyle';
import { MyReportStyle, radioStyle } from '../../ReportPageStyle';




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
    const [viewsAndApplyPerPlatform, setViewsAndApplyPerPlatform] = React.useState('');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    React.useEffect(() => {
        const fileData = async () => {
            // --- sectors 
            
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


            // ---- roles
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

            // setSectors([{ id: 10, name: 'כל האשכולות' }]);
        };


        fileData();
    }, []);




    const createReport = (roleName, scope_ind, sectorName, openJobs_ind, highPriority_ind, viewsAndApplyPerPlatform_ind, startDate, endDate) => {
        // checking if the user select all the buttons
        const isDateSelected = startDate && endDate;
    
        if (!roleName || !scope_ind || !sectorName || !viewsAndApplyPerPlatform_ind || !isDateSelected) {
            // displaying an error message or indicating to the user that the parameters are mandatory
            alert('יש למלא את כל השדות');
            return;
        }

        const scopeArr = [25, 50, 75, 100, 1]; // [1] mean evry scope of jobs
        const choice = ["true", "false"];
        const viewsAndApplyPerPlatformArr: string[] = ["אל תכלול", "פייסבוק", "יד 2", "מאסטר גוב", "גוגל", "כל הפלטפורמות"];
        const scope = scopeArr[Math.floor(scope_ind / 10) - 1];

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

        const result = JobsByFilters(roleName, scope, sectorName, openJobs, highPriority, viewsAndApplyPerPlatform, formattedStartDate, formattedEndDate)
            .then((result) => {
                if (result.length === 0)
                    alert('אין נתונים להצגה');
                else
                    exportToExcel(result, "משרות");
            })
            .catch((error) => {
                // handle the error
                console.log(error);
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

    const handleViewsAndApplyPerPlatform = (event) => {
        setViewsAndApplyPerPlatform(event.target.value);
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
                                        <button onClick={() => createReport(selectedRole, scope, selectedSector, openJobs, highPriority, viewsAndApplyPerPlatform, startDate, endDate)}>צור דוח</button>
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



