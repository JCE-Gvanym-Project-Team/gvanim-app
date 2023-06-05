import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, MenuItem, Radio, Select, SelectChangeEvent } from '@mui/material';
import rejection from '../../../../Firebase/FirebaseFunctions/Reports/Rejection';
import { getFilteredJobs, loginAdmin } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import { exportToExcel } from '../../../../Firebase/FirebaseFunctions/Reports/GlobalFunctions'
import CandidateByFilters from '../../../../Firebase/FirebaseFunctions/Reports/CandidatesFilters';
import {formContainerStyles} from '../../ReportPageStyle';



export default function CandidateFiltersForm() {
    //main();

    const createReport = (status_ind, timeOnStatus_ind, sector_ind, role_ind, selectGarde, startDate, endDate) => {
        // checking if the user select all the buttons
        const isDateSelected = startDate && endDate;

        if (!status_ind || !timeOnStatus_ind || !sector_ind || role_ind || selectGarde || !isDateSelected) {
            // displaying an error message or indicating to the user that the parameters are mandatory
            alert('יש למלא את כל השדות');
            return;
        }

        const statusChiseArr = ["הוגשה מועמדות", "זומן לראיון ראשון" ,"עבר ראיון ראשון", "זומן לראיון שני", "עבר ראיון שני"+
        "התקבל", "הועבר למשרה אחרת","נדחה" , "אינו מעוניין במשרה", "בחר כל הסטטוסים"];
        const timeThatOnCurrentStatusArr = ["שבוע", "חודש", "כל זמן"];
        const regionArr = ["מרכז", "צפון", "דרום", "כל הארץ"];
        const roleArr = ["מנהל", "עובד סוציאלי", "מתנדב", "כל התפקידים"];

        const status = statusChiseArr[Math.floor(status_ind / 10) - 1];
        const timeOnStatus = timeThatOnCurrentStatusArr[Math.floor(timeOnStatus_ind / 10) - 1];
        const sector = regionArr[Math.floor(sector_ind / 10) - 1];
        const role = roleArr[Math.floor(role_ind / 10) - 1];

        const formattedStartDate = startDate.toDate();
        const formattedEndDate = endDate.toDate();

        const result = CandidateByFilters(status, timeOnStatus ,sector, role, formattedStartDate, formattedEndDate)
            .then((result) => {
                console.log(result);
               // exportToExcel(result, "Candidate");
            })
            .catch((error) => {
                // handle the error
                console.log(error);
            });
    }


    // const 
    const [status, setSelectStatus] = React.useState('');
    const [timeOnStatus, setTimeOnStatus] = React.useState('');
    const [region, setRegion] = React.useState('');
    const [role, setRole] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [selectGarde, setSelectGarde] = React.useState('a');


    // handls
    function handleChangeStatus(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setSelectStatus(event.target.value);
    }

    function handleChangeTimeInStatus(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setTimeOnStatus(event.target.value);
    }

    const handleChangeRegion = (event) => {
        setRegion(event.target.value);
    };

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };

    
    const handleChangeSelectGarde = (event) => {
        setSelectGarde(event.target.value);
      };
    

    const handleChangeEndDate = (date) => {
        setEndDate(date);
    };



    return (
        <div style={formContainerStyles}>
        <FormControl  >
            {/* select the status */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">בחר סטטוס </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="selectStatus"
                    onChange={handleChangeStatus}
                >
                    <MenuItem value={10}>הוגשה מועמדות</MenuItem>
                    <MenuItem value={20}>זומן לראיון ראשון</MenuItem>
                    <MenuItem value={30}>עבר ראיון ראשון</MenuItem>
                    <MenuItem value={40}>זומן לראיון שני</MenuItem>
                    <MenuItem value={50}>עבר ראיון שני</MenuItem>
                    <MenuItem value={60}>התקבל</MenuItem>
                    <MenuItem value={70}>הועבר למשרה אחרת</MenuItem>
                    <MenuItem value={80}>נדחה</MenuItem>
                    <MenuItem value={90}>אינו מעוניין במשרה</MenuItem>
                    <MenuItem value={100}>בחר כל הסטטוסים</MenuItem>

                </Select>
            </FormControl>


            {/* זמן שהוא על הסטטוס הנוכחי*/}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">בחירת הזמן שהוא על הטטוס הנוכחי</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={timeOnStatus}
                    label="timeOnStatus"
                    onChange={handleChangeTimeInStatus}
                >
                    <MenuItem value={10}>שבוע</MenuItem>
                    <MenuItem value={20}>חודש</MenuItem>
                    <MenuItem value={30}>כל זמן</MenuItem>
                </Select>
            </FormControl>



            {/* אשכול*/}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">בחירת אשכול</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region} // שנה את הערך של value ל-rejectionCause
                    label="rejectionCause" // שנה את הערך של label ל-rejectionCause
                    onChange={handleChangeRegion}
                >
                    <MenuItem value={10}>מרכז</MenuItem>
                    <MenuItem value={20}>צפון</MenuItem>
                    <MenuItem value={30}>דרום</MenuItem>
                    <MenuItem value={40}>כל הארץ</MenuItem>
                </Select>
            </FormControl>



            {/* select role */}
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">בחר תפקיד</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role} // שנה את הערך של value ל-rejectionCause
                    label="rejectionCause" // שנה את הערך של label ל-rejectionCause
                    onChange={handleChangeRole}
                >
                    <MenuItem value={10}>מנהל</MenuItem>
                    <MenuItem value={20}>עובד סוציאלי</MenuItem>
                    <MenuItem value={30}>מתנדב</MenuItem>
                    <MenuItem value={40}>כל התפקידים</MenuItem>
                </Select>
            </FormControl>


            {/* select grade */}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Radio
                    checked={selectGarde === 'a'}
                    onChange={handleChangeSelectGarde}
                    value="a"
                    name="radio-buttons"
                />
                <Radio
                    checked={selectGarde === 'b'}
                    onChange={handleChangeSelectGarde}
                    value="b"
                    name="radio-buttons"
                />
            </Box>


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

            {/* create report */}
            <button onClick={() => createReport(status, timeOnStatus, region, role, selectGarde, startDate, endDate)}>צור דוח</button>
       
        </FormControl>
        </div>
    );

}



export async function main() {
    loginAdmin().then(async () => {
        // let jobstatus1 = new CandidateJobStatus(20, "47", "נדחה",  "", 1,  new Date(2023, 6, 25),new Date(2023, 6, 25),  ["", ""], [], "פערים על היקף משרה"  );
        // let jobstatus2 = new CandidateJobStatus(19, "70", "נדחה",  "", 1,  new Date(2023, 6, 20), new Date(2023, 6, 25),  ["", ""], [], "אחר" );
        // let jobstatus3 = new CandidateJobStatus(12, "125", "נדחה",  "", 1,  new Date(2023, 6, 19), new Date(2023, 6, 25),  ["", ""], [], "פערים על היקף משרה" );
        // jobstatus1.add();
        // jobstatus2.add();
        // jobstatus3.add();
        //  let job1 = new Job(await generateJobNumber(), "דרוש מנהל", "מנהל", [0,100], "", "דרום");
        //  let job2 = new Job(await generateJobNumber(), "דרוש עובד סוצאלי", "עובד סוציאלי", [0,100], "", "צפון");
        //  let job3 = new Job(await generateJobNumber(), "דרוש מתנדב ", "מתנדב", [0,100], "", "מרכז");
        //  job1.add();
        //  job2.add();
        //  job3.add();
        await console.log((await getFilteredJobs()));
    });


}

