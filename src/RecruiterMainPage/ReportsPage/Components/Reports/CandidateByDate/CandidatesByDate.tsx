import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase'; 

///Style //////////////
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





export default function Questions() {
  const [age, setAge] = React.useState('');
  const handleChange = (event: { target: { value: string } }) => {
    setAge(event.target.value);
  };

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
      <FormLabel id="demo-row-radio-buttons-group-label">אזור</FormLabel>
      <FormControl sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="demo-customized-textbox">Age</InputLabel>
        <BootstrapInput id="demo-customized-textbox" />
      </FormControl>
      <RadioGroup
       row
       aria-labelledby="demo-row-radio-buttons-group-label"
       name="row-radio-buttons-group"
        >
      <FormControlLabel value="כל הארץ" control={<Radio />} label="כל הארץ" />
      </RadioGroup> 
     </FormControl>
  );
}
