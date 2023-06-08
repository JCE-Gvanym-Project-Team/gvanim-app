import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Stack } from '@mui/material';
import rejection from '../../../../Firebase/FirebaseFunctions/Reports/Rejection';
import { CandidateJobStatus, Job, generateJobNumber, getFilteredCandidateJobStatuses, getFilteredCandidates, getFilteredJobs, loginAdmin } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import { exportToExcel } from '../../../../Firebase/FirebaseFunctions/Reports/GlobalFunctions'
import CandidatesByFilters from '../../../../Firebase/FirebaseFunctions/Reports/CandidatesFilters';
import { formContainerStyles, radioStyle } from '../../ReportPageStyle';



export default function CandidateFiltersForm() {
  const createReport = (status_ind, timeOnStatus_ind, sector_ind, role_ind, selectGarde, selectInterviewDate, startDate, endDate) => {
       // checking if the user select all the buttons
        const isDateSelected = startDate && endDate;

        if (!status_ind || !timeOnStatus_ind || !sector_ind || !role_ind || !selectGarde || !isDateSelected) {
            // displaying an error message or indicating to the user that the parameters are mandatory
            alert('יש למלא את כל השדות');
            return;
        }

        const statusChiseArr = ["הוגשה מועמדות", "זומן לראיון ראשון", "עבר ראיון ראשון", "זומן לראיון שני", "עבר ראיון שני", "התקבל", "הועבר למשרה אחרת", "נדחה", "אינו מעוניין במשרה", "בחר כל הסטטוסים"];
        const timeThatOnCurrentStatusArr = ["שבוע", "חודש", "כל זמן"];
        const regionArr = ["מרכז", "צפון", "דרום", "כל הארץ"];
        const roleArr = ["מנהל", "עובד סוציאלי", "מתנדב", "כל התפקידים"];
        const choice = ["כן" , "לא"];

        const status = statusChiseArr[Math.floor(status_ind / 10) - 1];
        const timeOnStatus = timeThatOnCurrentStatusArr[Math.floor(timeOnStatus_ind / 10) - 1];
        const sector = regionArr[Math.floor(sector_ind / 10) - 1];
        const role = roleArr[Math.floor(role_ind / 10) - 1];
        const formattedStartDate = startDate.toDate();
        const formattedEndDate = endDate.toDate();
        console.log(status);

        const result = CandidatesByFilters(status, timeOnStatus, sector, role, selectGarde, selectInterviewDate,  formattedStartDate, formattedEndDate)
            .then((result) => {
                // console.log(result);
                exportToExcel(result, "Candidate");
            })
            .catch((error) => {
                // handle the error
                console.log(error);
            });
    }


    // const 
    const [status, setSelectStatus] = React.useState('');
    const [timeOnStatus, setTimeOnStatus] = React.useState('');
    const [sector, setRegion] = React.useState('');
    const [role, setRole] = React.useState('');
    const [includeGrade, setSelectGarde] = React.useState('yes');
    const [includeInterviewDate, setSelectInterviewDate] = React.useState('yes');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');


    // handls
    function handleChangeStatus(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setSelectStatus(event.target.value);
    }

    function handleChangeTimeInStatus(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setTimeOnStatus(event.target.value);
    }

    const handleChangeSector = (event) => {
        setRegion(event.target.value);
    };

    const handleChangeRole = (event) => {
        setRole(event.target.value);
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



    return (
        <div style={formContainerStyles}>
            <FormControl  >
            <br />
            <br />
                <h1>ד"וח מועמדים על פי פילטרים</h1>
                <br />
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

                <br />
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

                <br />

                {/* אשכול*/}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">בחירת אשכול</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sector} // שנה את הערך של value ל-rejectionCause
                        label="sector" // שנה את הערך של label ל-rejectionCause
                        onChange={handleChangeSector}
                    >
                        <MenuItem value={10}>מרכז</MenuItem>
                        <MenuItem value={20}>צפון</MenuItem>
                        <MenuItem value={30}>דרום</MenuItem>
                        <MenuItem value={40}>כל הארץ</MenuItem>
                    </Select>
                </FormControl>

                <br />

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
                
                <button onClick={() => createReport(status, timeOnStatus, sector, role, includeGrade ,includeInterviewDate, startDate, endDate)}>צור דוח</button>

                {/* <button onClick={() => main()}>add data</button> */}


            </FormControl>

        </div>

    );

}



export async function main() {
    loginAdmin().then(async () => {
        // 
        // let jobstatus1 = new CandidateJobStatus(109, "28", "נדחה",  "לא מתאים לגוונים בגלל..", 1,  new Date(2023, 4, 1),new Date(2023, 5, 1), new Date(0, 0, 0), ["ded", "ded"], [], "פערים על היקף משרה"  );
        // let jobstatus2 = new CandidateJobStatus(102, "28", "עבר ראיון ראשון",  "בחור מצוין", 4,  new Date(2023, 4, 1), new Date(2023, 4, 5), new Date(2023, 6, 25), ["ed", "ed"], [], "" );
        // let jobstatus3 = new CandidateJobStatus(94, "53", "התקבל",  "בחור מצוין", 5,  new Date(2023, 4, 1), new Date(2023, 8, 1), new Date(2023, 6, 25), ["ed", "ed"], [], "" );
        // let jobstatus4 = new CandidateJobStatus(91, "66", "הודשה מועמדות",  "בחור מצוין", 4,  new Date(2023, 4, 1), new Date(2023, 4, 17), new Date(2023, 6, 25), ["ed", "ed"], [], "" );
        let jobstatus5 = new CandidateJobStatus(76, "28", "זומן לראיון ראשון", "", 0, new Date(), new Date(2023, 5, 1), new Date(0, 0, 0), ["ed", "ed"], [], "");
        //await jobstatus5.add();
        // await jobstatus5.remove();
        // jobstatus2.add();
        // jobstatus3.add();
        // jobstatus4.add();

        // const viewsPerPlatform = new Map<string, number>();
        // viewsPerPlatform.set("פייסבוק", 23);
        // viewsPerPlatform.set("ווצאפ", 12);
        // viewsPerPlatform.set("דרושים", 90);
        // const applyPerPlatform = new Map<string, number>();
        // applyPerPlatform.set("פייסבוק", 12);
        // applyPerPlatform.set("ווצאפ", 12);
        // applyPerPlatform.set("דרושים", 12);

        //  let job1 = new Job(await generateJobNumber(), "דרוש מנהל", "מנהל", [0,100], "שדרות", "דרום", [""], "", true, true,viewsPerPlatform,applyPerPlatform, new Date(2023, 4, 1) );
        //  let job2 = new Job(await generateJobNumber(), "דרוש עובד סוצאלי", "עובד סוציאלי", [0,100], "חיפה", "צפון",  [""], "", true, true,viewsPerPlatform,applyPerPlatform, new Date(2023, 4, 1));
        //  let job3 = new Job(await generateJobNumber(), "דרושה מנהלת ", "מנהלת", [0,100], "ירושלים", "מרכז",  [""], "", true, true,viewsPerPlatform,applyPerPlatform, new Date(2023, 4, 1));
        //  let job4 = new Job(await generateJobNumber(), "דרוש עובד סוצאלי ", "עובד סוציאלי", [0,100], "רמת גן", "מרכז", [""], "", true, true,viewsPerPlatform,applyPerPlatform, new Date(2023, 4, 1));
        //  let job5 = new Job(await generateJobNumber(), "דרוש מתנדב ", "מתנדב", [0,100], "מודיעין", "מרכז" , [""], "", true, true,viewsPerPlatform,applyPerPlatform, new Date(2023, 4, 1));
        //  job1.add();
        //  job2.add();
        //  job3.add();
        //  job4.add();
        //  job5.add();
        await console.log((await getFilteredCandidateJobStatuses()));
    });


}

