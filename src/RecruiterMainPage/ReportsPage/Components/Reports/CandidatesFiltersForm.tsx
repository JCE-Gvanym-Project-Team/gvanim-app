import { ArticleOutlined } from "@mui/icons-material";
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
import CandidatesByFilters from '../../../../Firebase/FirebaseFunctions/Reports/CandidatesFilters';
import { exportToExcel } from '../../../../Firebase/FirebaseFunctions/Reports/GlobalFunctions';
import { getAllRoles, getAllSectors, getFilteredCandidateJobStatuses, loginAdmin } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import { BoxGradientSx, MyPaperSx } from '../../../ManageJobsPage/Components/NewJobPage/NewJobStyle';
import { designReturnButton } from '../../../ManageJobsPage/ManageJobsPageStyle';
import { MyReportStyle, radioStyle } from '../../ReportPageStyle';

interface typeMyData {
    id: number;
    name: string;
}

export default function CandidateFiltersForm() {
    const [status, setSelectStatus] = React.useState('');
    const [timeOnStatus, setTimeOnStatus] = React.useState('');
    const [roles, setRoles] = React.useState<typeMyData[]>([]);
    const [sectors, setSectors] = React.useState<typeMyData[]>([]);
    const [selectedRole, setSelectedRole] = React.useState<string>();
    const [selectedSector, setSelectedSector] = React.useState<string>();
    const [includeGrade, setSelectGarde] = React.useState('yes');
    const [includeInterviewDate, setSelectInterviewDate] = React.useState('yes');
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
        };
        fileData();
    }, []);

    const createReport = (statusName, timeOnStatus, sectorName, roleName, selectGarde, selectInterviewDate, startDate, endDate) => {
        // checking if the user select all the buttons
        const isDateSelected = startDate && endDate;

        if (!statusName || !timeOnStatus || !sectorName || !roleName || !selectGarde || !isDateSelected) {
            // displaying an error message or indicating to the user that the parameters are mandatory
            alert('יש למלא את כל השדות');
            return;
        }
        const choice = ["כן", "לא"];
        const formattedStartDate = startDate.toDate();
        const formattedEndDate = endDate.toDate();

        const result = CandidatesByFilters(statusName, timeOnStatus, sectorName, roleName, selectGarde, selectInterviewDate, formattedStartDate, formattedEndDate)
            .then((result) => {
                if (result.length === 0) {
                    alert('אין נתונים להצגה');
                    return;
                }
                else {
                    exportToExcel(result, "מועמדים");
                }
            })
            .catch((error) => {
                // handle the error
                console.log(error);
            });
    }

    // handls
    function handleChangeStatus(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setSelectStatus(event.target.value);
    }

    function handleChangeTimeInStatus(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setTimeOnStatus(event.target.value);
    }

    const handleChangeSector = (event) => {
        setSelectedSector(event.target.value);
    };

    const handleChangeRole = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleChangeIncludeGrade = (event) => {
        setSelectGarde(event.target.value);
    };

    const handleChangeIncludeInterviewDate = (event) => {
        setSelectInterviewDate(event.target.value);
    };

    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };

    const handleChangeEndDate = (date) => {
        setEndDate(date);
    };

    const navigate = useNavigate();

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
                                דו"ח מועמדים
                            </Typography>

                        </Stack>

                        <Typography sx={{ opacity: 0.6, width: '100%', textAlign: 'center', color: '#fff', fontSize: '16px', fontFamily: "'Noto Sans Hebrew', sans-serif", mt: 1 }} variant='subtitle1'>
                            הפקת דוחות על מועמדים לפי מס' קטגוריות
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
                                <Box className="section-title"></Box>
                                <FormControl>
                                    {/* select the status */}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">בחר סטטוס</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={status}
                                            label="selectStatus"
                                            onChange={handleChangeStatus}
                                        >
                                            <MenuItem value={"בחר כל הסטטוסים"}>בחר כל הסטטוסים</MenuItem>
                                            <MenuItem value={'הוגשה מועמדות'}>הוגשה מועמדות</MenuItem>
                                            <MenuItem value={"זומן לראיון ראשון"}>זומן לראיון ראשון</MenuItem>
                                            <MenuItem value={"עבר ראיון ראשון"}>עבר ראיון ראשון</MenuItem>
                                            <MenuItem value={"זומן לראיון שני"}>זומן לראיון שני</MenuItem>
                                            <MenuItem value={"עבר ראיון שני"}>עבר ראיון שני</MenuItem>
                                            <MenuItem value={"התקבל"}>התקבל</MenuItem>
                                            <MenuItem value={"הועבר למשרה אחרת"}>הועבר למשרה אחרת</MenuItem>
                                            <MenuItem value={"נדחה"}>נדחה</MenuItem>
                                            <MenuItem value={"אינו מעוניין במשרה"}>אינו מעוניין במשרה</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <br />
                                    {/* זמן שהוא על הסטטוס הנוכחי*/}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">בחירת הזמן שהוא על הסטטוס הנוכחי</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={timeOnStatus}
                                            label="timeOnStatus"
                                            onChange={handleChangeTimeInStatus}
                                        >
                                            <MenuItem value={'עד שבוע'}>עד שבוע</MenuItem>
                                            <MenuItem value={'עד חודש'}>עד חודש</MenuItem>
                                            <MenuItem value={'כל זמן'}>כל זמן</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <br />

                                    {/* אשכול*/}
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
                                    {/* select role */}
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">בחר תפקיד</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedRole} // שנה את הערך של value ל-rejectionCause
                                            label="rejectionCause" // שנה את הערך של label ל-rejectionCause
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

                                    {/* select include grade */}
                                    <RadioGroup
                                        value={includeGrade}
                                        onChange={handleChangeIncludeGrade}
                                        aria-label="include-grade"
                                        name="include-grade"
                                    >
                                        <div style={radioStyle}>
                                            <FormControlLabel value="yes" control={<Radio />} label="כלול ציון המועמד" />
                                            <FormControlLabel value="no" control={<Radio />} label="אל תכלול" />
                                        </div>
                                    </RadioGroup>
                                    <br />

                                    {/* select include mathcing rate */}
                                    <RadioGroup
                                        value={includeInterviewDate}
                                        onChange={handleChangeIncludeInterviewDate}
                                        aria-label="include-grade"
                                        name="include-grade"
                                    >
                                        <div style={radioStyle}>
                                            <FormControlLabel value="yes" control={<Radio />} label="כלול במידה ונקבע את תאריך הראיון הבא\האחרון שלו" />
                                            <FormControlLabel value="no" control={<Radio />} label="אל תכלול" />
                                        </div>
                                    </RadioGroup>

                                    <br />
                                    {/* select time */}
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker', 'DatePicker']}>
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
                                    <button onClick={() => createReport(status, timeOnStatus, selectedSector, selectedRole, includeGrade, includeInterviewDate, startDate, endDate)}>צור דוח</button>
                                </FormControl>
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
    );
}


