import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import rejection from '../../../../Firebase/FirebaseFunctions/Reports/Rejection';
import { getFilteredJobs, loginAdmin } from '../../../../Firebase/FirebaseFunctions/functionIndex';
import * as XLSX from 'xlsx';



export default function RejectionReport() {
  //main();

  const createReport = (rejectionCause_ind, sector_ind, role_ind, startDate, endDate) => {
    // checking if the user select all the buttons
    const isDateSelected = startDate && endDate;
    console.log(rejectionCause_ind);
    console.log(sector_ind);
    console.log(role_ind);
    console.log(startDate);
    console.log(endDate);

    if (!rejectionCause_ind || !sector_ind || !role_ind || !isDateSelected) {
      // displaying an error message or indicating to the user that the parameters are mandatory
      alert('יש למלא את כל השדות');
      return;
    }
  
    const rejectionCauseArr = ["פערים כספיים", "פערים על היקף משרה", "חוסר התאמה", "כל הסיבות"];
    const regionArr = ["מרכז", "צפון", "דרום", "כל הארץ"];
    const roleArr = ["מנהל", "עובד סוציאלי", "מתנדב", "כל התפקידים"];
  
    const rejectionCause = rejectionCauseArr[Math.floor(rejectionCause_ind / 10) - 1];
    const sector = regionArr[Math.floor(sector_ind / 10) - 1];
    const role = roleArr[Math.floor(role_ind / 10) - 1];
  
    const formattedStartDate = startDate.toDate();
    const formattedEndDate = endDate.toDate();
  
    const result = rejection(rejectionCause, sector, role, formattedStartDate, formattedEndDate)
      .then((result) => {
        // handle the result
        console.log(result);
  
        // Convert the result data to the Excel format
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  
        // Generate the Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
        // Create a download link
        const downloadLink = document.createElement('a');
        const url = window.URL.createObjectURL(data);
        downloadLink.href = url;
        downloadLink.download = 'rejection_report.xlsx';
  
        // Trigger the download
        downloadLink.click();
      })
      .catch((error) => {
        // handle the error
        console.log(error);
      });
  }
    

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
      <button onClick={() => createReport(rejectionCause, region, role, startDate, endDate)}>צור דוח</button>

      {/* <a href="#" id="download-report-button" download="report1.xlsx" onClick={() => createReport(rejectionCause, region, role, startDate, endDate)}>צור דו"ח</a> */}
    </FormControl>
  );

}



export async function main(){
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
