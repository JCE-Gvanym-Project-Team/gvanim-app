import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { BootstrapInput } from '../../ReportPageStyle';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import rejection from '../../../../Firebase/FirebaseFunctions/Reports/Rejection';
import dayjs, { Dayjs } from 'dayjs';
import { Candidate, Job, generateJobNumber, getFilteredJobs, loginAdmin } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import { getFilteredCandidateJobStatuses, getFilteredCandidates, CandidateJobStatus} from '../../../../Firebase/FirebaseFunctions/functionIndex';


export default function RejectionReport() {
  //main();

  // Create report
  const createReport = (rejectionCause_ind, sector_ind, role_ind, startDate, endDate) => {
  // checking if the user select the all the buttons
  const isDateSelected = startDate && endDate; // בדיקה האם תאריכים נבחרו

  if (!rejectionCause || !region || !role || !startDate || !endDate) {
    // הצגת הודעת שגיאה או סימון למשתמש שהפרמטרים הם חובה
    alert('יש למלא את כל השדות');
    return;
  }


  const rejectionCauseArr = ["פערים כספיים", "פערים על היקף משרה", "חוסר התאמה", "כל הסיבות"];
  const regionArr = ["מרכז", "צפון", "דרום", "כל הארץ"];
  const roleArr = ["מנהל", "עובד סוציאלי", "מתנדב" , "כל התפקידים"];
  
  const result = rejection(rejectionCauseArr[rejectionCause_ind/10-1], regionArr[sector_ind/10 -1], roleArr[role_ind/10 -1], startDate, endDate)
  .then((result) => {
    //console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
};

  // const 
  const [rejectionCause, setRejectionCause] = React.useState(''); // הוסף משתנה סטייט חדש עבור הסיבה לדחייה
  const [region, setRegion] = React.useState('');
  const [role, setRole] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');


  // handls
  function handleRejection(event: SelectChangeEvent<string>, child: React.ReactNode): void {
    setRejectionCause(event.target.value); // עדכן את הערך הנבחר בסיבה לדחייה
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

  const handleChangeEndDate = (date) => {
    setEndDate(date);
  };



  return (
    <FormControl>
      <h1>ד"וח מועמדים שנדחו</h1>

      {/* reasons to rejection */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">סיבות לדחייה</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rejectionCause} // שנה את הערך של value ל-rejectionCause
          label="rejectionCause" // שנה את הערך של label ל-rejectionCause
          onChange={handleRejection}
        >
          <MenuItem value={10}>פערים כספיים</MenuItem>
          <MenuItem value={20}>פערים על היקף משרה</MenuItem>
          <MenuItem value={30}>חוסר התאמה</MenuItem>
          <MenuItem value={40}>כל הסיבות</MenuItem>

        </Select>
      </FormControl>


      {/* אשכול*/}
      {/* <FormLabel id="demo-row-radio-buttons-grDoup-label">אשכול</FormLabel> */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">בחירת אשכול</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rejectionCause} // שנה את הערך של value ל-rejectionCause
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
      {/* <FormLabel id="demo-row-radio-buttons-grDoup-label">בחירת תפקיד</FormLabel> */}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">בחר תפקיד</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rejectionCause} // שנה את הערך של value ל-rejectionCause
          label="rejectionCause" // שנה את הערך של label ל-rejectionCause
          onChange={handleChangeRole}
        >
          <MenuItem value={10}>מנהל</MenuItem>
          <MenuItem value={20}>עובד סוציאלי</MenuItem>
          <MenuItem value={30}>מתנדב</MenuItem>
          <MenuItem value={40}>כל התפקידים</MenuItem>
        </Select>
      </FormControl>

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
      <Button onClick={() => createReport(rejectionCause, region, role, startDate, endDate)} variant="contained" disableElevation>צור דו"ח</Button>
    </FormControl>
  );

}



export async function main(){
    loginAdmin().then(async () => {
        // let job1 = new Job(await generateJobNumber(), "דרוש מנהל", "מנהל", [0,100], "", "דרום");
        // let job2 = new Job(await generateJobNumber(), "דרוש עובד סוצאלי", "עובד סוציאלי", [0,100], "", "צפון");
        // let job3 = new Job(await generateJobNumber(), " דרוש מתנדב ", "מתנדב", [0,100], "", "מרכז");
        // let job4 = new Job(await generateJobNumber(), "דרוש מנהל", "מנהל", [0,100], "", "דרום");
        // job1.add();
        // job2.add();
        // job3.add();
        // job4.add();
        await console.log((await getFilteredJobs()));
    });


}

