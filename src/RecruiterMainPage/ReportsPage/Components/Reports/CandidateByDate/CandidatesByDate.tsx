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
// import { Job, getOpenRoles } from '../../../../Firebase/FirebaseFunctions/functionIndex'


//...../Firebase/FirebaseFunctions/functionIndex


// Style
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

///end style/////////////////





export default function CandidateByDate() {
  const [age, setAge] = React.useState('');
  const createReport = () => {
    console.log("createReport");
  }
  

  return (


    <FormControl>
      <h1>ד"וח מועמדים לפי תאריכים</h1>

      {/*מועמדים */}
      <FormLabel id="demo-row-radio-buttons-group-label">מועמדים</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="קיימים באתר" control={<Radio />} label="קיימים באתר" />
        <FormControlLabel value="מועמדים שלא קיימים באתר" control={<Radio />} label="מועמדים שלא קיימים באתר" />
        <FormControlLabel value="כולם" control={<Radio />} label="כולם" />
      </RadioGroup>






      {/* אזור */}
      <FormLabel id="demo-row-radio-buttons-grDoup-label">אזור</FormLabel>

      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControl sx={{ m: 1, width: '40%', }} variant="standard">
          <InputLabel htmlFor="demo-customized-textbox"></InputLabel>
          <BootstrapInput id="demo-customized-textbox" />
        </FormControl>
        <FormControlLabel value="כל הארץ" control={<Radio />} label="כל הארץ" />
      </RadioGroup>












      {/* select role */}
      <FormLabel id="demo-row-radio-buttons-group-label">בחר תפקיד</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControl sx={{ m: 1, width: '40%', }} variant="standard">
          <InputLabel htmlFor="demo-customized-textbox"></InputLabel>
          <BootstrapInput id="demo-customized-textbox" />
        </FormControl>
        <FormControlLabel value="כל הכל התפקידים" control={<Radio />} label="כל התפקידים" />
      </RadioGroup>

      {/* status */}
      <FormLabel id="demo-row-radio-buttons-group-label">סטטוס</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControl sx={{ m: 1, width: '40%', }} variant="standard">
          <InputLabel htmlFor="demo-customized-textbox"></InputLabel>
          <BootstrapInput id="demo-customized-textbox" />
        </FormControl>
        <FormControlLabel value="כל הכל התפקידים" control={<Radio />} label="כל הסטטוסים" />
      </RadioGroup>



      {/* select time */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker />
      <DatePicker />
    </LocalizationProvider>
      {/* create report */}
      <Button onClick={createReport} variant="contained" disableElevation>צור דו"ח</Button>
    </FormControl>
  );
}
