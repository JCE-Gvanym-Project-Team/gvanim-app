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
import JobsByFilters from '../../../../Firebase/FirebaseFunctions/Reports/JobsFilters'



export default function JobsFiltersForm() {
    const createReport = (role_ind, scope_ind, sector_ind, openJobs_ind, highPriority_ind, viewsAndApplyPerPlatform_ind, startDate, endDate) => {
        // checking if the user select all the buttons
        const isDateSelected = startDate && endDate;

        if (!role_ind || !scope_ind || !sector_ind || !role_ind || !viewsAndApplyPerPlatform_ind || !isDateSelected) {
            // displaying an error message or indicating to the user that the parameters are mandatory
            alert('יש למלא את כל השדות');
            return;
        }

        const roleArr = ["מנהל", "עובד סוציאלי", "מתנדב", "כל התפקידים"];
        const scopeArr = ["25", "50", "75", "100", "1"]; // [1] mean evry scope of jobs
        const sectorArr = ["מרכז", "צפון", "דרום", "כל הארץ"];
        const viewsAndApplyPerPlatformArr = ["אל תכלול", "פייסבוק", "יד 2", "מאסטר גוב", "גוגל", "כל הפלטפורמות"];
        //const applyPerPlatformArr = ["אל תכלול", "פייסבוק", "יד 2", "מאסטר גוב", "גוגל", "מפה לאוזן", "כל הפלטפורמות"];
        const choice = ["true", "false"];

        const role = roleArr[Math.floor(role_ind / 10) - 1];
        const scope = scopeArr[Math.floor(scope_ind / 10) - 1];
        const sector = sectorArr[Math.floor(sector_ind / 10) - 1];

console.log(highPriority_ind);

        let openJobs: boolean;
        if (openJobs_ind === 'yes')
            openJobs = true;
        else
            openJobs = false;

        let highPriority:boolean;
        if (highPriority_ind === 'yes')
            highPriority = true;
        else
            highPriority = false;

        const viewsAndApplyPerPlatform = viewsAndApplyPerPlatformArr[Math.floor(viewsAndApplyPerPlatform_ind / 10) - 1];
        // const applyPerPlatform = applyPerPlatformArr[Math.floor(applyPerPlatform_ind / 10) - 1];
        const formattedStartDate = startDate.toDate();
        const formattedEndDate = endDate.toDate();

        const result = JobsByFilters(role, scope, sector, openJobs, highPriority, viewsAndApplyPerPlatform, formattedStartDate, formattedEndDate)
            .then((result) => {
                // console.log(result);
                // exportToExcel(result, "Candidate");
            })
            .catch((error) => {
                // handle the error
                console.log(error);
            });
    }


    // const 
    const [role, setRole] = React.useState('');
    const [scope, setScope] = React.useState('');
    const [sector, setSector] = React.useState('');
    const [openJobs, setOpenJobs] = React.useState('yes');
    const [highPriority, setHighPriority] = React.useState('no');
    // const [viewsPerPlatform, setViewsPerPlatform] = React.useState('');
    // const [applyPerPlatform, setApplyPerPlatform] = React.useState('');
    const [viewsAndApplyPerPlatform, setViewsAndApplyPerPlatform] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');


    // handls
    function handleChangeRole(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setRole(event.target.value);
    }

    function handleChangeScope(event: SelectChangeEvent<string>, child: React.ReactNode): void {
        setScope(event.target.value);
    }

    const handleChangeSector = (event) => {
        setSector(event.target.value);
    };

    const handleChangeOpenJobs = (event) => {
        setOpenJobs(event.target.value);
    };

    const handleChangeHighPriority = (event) => {
        setHighPriority(event.target.value);
    };

    const handleViewsAndApplyPerPlatform = (event) => {
        setViewsAndApplyPerPlatform(event.target.value);
    };

    // const handleChangeViewsPerPlatform = (event) => {
    // setViewsPerPlatform(event.target.value);
    // };
    // 
    // const handleChangeApplyPerPlatform = (date) => {
    // setApplyPerPlatform(date);
    // };
    // 
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
                <h1>ד"וח משרות על פי פילטרים</h1>
                <br />

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
                        <MenuItem value={10}>25% משרה</MenuItem>
                        <MenuItem value={20}>50% משרה</MenuItem>
                        <MenuItem value={30}>75% משרה</MenuItem>
                        <MenuItem value={40}>100% משרה</MenuItem>
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
                        <FormControlLabel value="yes" control={<Radio />} label="כלול רק את המשרות הפתוחות  " />
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

                {/* <br /> */}
                {/* בחירת הגשות דרך פלטפורמה */}
                {/* <FormControl fullWidth> */}
                {/* <InputLabel id="demo-simple-select-label">הגשות דרך פלטפורמה:</InputLabel> */}
                {/* <Select */}
                {/* // labelId="demo-simple-select-label" */}
                {/* // id="demo-simple-select" */}
                {/* // value={applyPerPlatform} */}
                {/* // label="sector" */}
                {/* // onChange={handleChangeApplyPerPlatform} */}
                {/* // > */}
                {/* <MenuItem value={10}>אל תכלול</MenuItem> */}
                {/* <MenuItem value={20}>פייסבוק</MenuItem> */}
                {/* <MenuItem value={30}>יד 2</MenuItem> */}
                {/* <MenuItem value={40}>מאסטר גוב</MenuItem> */}
                {/* <MenuItem value={50}>גוגל</MenuItem> */}
                {/* <MenuItem value={60}>מפה לאוזן</MenuItem> */}
                {/* <MenuItem value={70}>כל הפלטפורמות</MenuItem> */}

                {/* </Select> */}
                {/* </FormControl> */}


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
                <button onClick={() => createReport(role, scope, sector, openJobs, highPriority, viewsAndApplyPerPlatform, startDate, endDate)}>צור דוח</button>
                <button onClick={() => main()}>צור גובס</button>

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
        //let jobstatus5 = new CandidateJobStatus(76, "28", "זומן לראיון ראשון", "", 0, new Date(), new Date(2023, 5, 1), new Date(0, 0, 0), ["ed", "ed"], [], "");
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

        //  let job1 = new Job(await generateJobNumber(), "דרוש מנהל", "מנהל", [0,100], "שדרות", "דרום", [""], "", true, false,new Map<string, number>(),new Map<string, number>(), new Date(2023, 4, 1) );
        //  let job2 = new Job(await generateJobNumber(), "דרוש עובד סוצאלי", "עובד סוציאלי", [0,30], "חיפה", "צפון",  [""], "", false, true,new Map<string, number>(),new Map<string, number>(), new Date(2023, 5, 1));
        //  let job3 = new Job(await generateJobNumber(), "דרושה מנהלת ", "מנהלת", [0,30], "ירושלים", "מרכז",  [""], "", true, true, new Map<string, number>(), new Map<string, number>(), new Date(2023, 6, 1));
        //  let job4 = new Job(await generateJobNumber(), "דרוש עובד סוצאלי ", "עובד סוציאלי", [0,70], "רמת גן", "מרכז", [""], "", true, false  ,new Map<string, number>() , new Map<string, number>(), new Date(2023,6, 2));
        //  let job5 = new Job(await generateJobNumber(), "דרוש מתנדב ", "מתנדב", [0,20], "מודיעין", "מרכז" , [""], "", true, true, new Map<string, number>() , new Map<string, number>(), new Date(2023, 5, 13));
        //  await job1.add();
        //  await job2.add();
        //  await job3.add();
        //  await job4.add();
        //  await job5.add();
        await console.log((await getFilteredJobs()));
    });


}

