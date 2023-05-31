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



export default function RejectionReport() {
  // Create report 
  const createReport = (rejectionCause, region, role, startDate, endDate) => {
    console.log(rejectionCause);
    console.log(region);
    console.log(role);
    console.log(startDate);
    console.log(endDate);

    const dates: Date[] = [];
    const selectedDates = document.querySelectorAll('.MuiPickersDay-daySelected');

    selectedDates.forEach((date) => {
      const ariaLabel = date.getAttribute('aria-label');
      if (ariaLabel !== null) {
        const parsedDate = new Date(ariaLabel);
        if (!isNaN(parsedDate.getTime())) {
          dates.push(parsedDate);
        }
      }
    });

    rejection(rejectionCause, dates)
    // .then((result) => {
    // console.log(result);
    // })
    // .catch((error) => {
    // console.log(error);
    // });
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
          <MenuItem value={10}>ירושלים</MenuItem>
          <MenuItem value={20}>שדרות</MenuItem>
          <MenuItem value={30}>חיפה והצפון</MenuItem>
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
