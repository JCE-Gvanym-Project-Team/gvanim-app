import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <h1>יצירת דוחות</h1>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">אופצייה 1</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>משרות</MenuItem>
          <MenuItem value={20}>מועמדים</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>


    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">אופצייה 2</InputLabel>
    <Select
     labelId="demo-simple-select-label"
     id="demo-simple-select"
     value={age}
     label="Age"
     onChange={handleChange}
     >
     <MenuItem value={10}>1</MenuItem>
     <MenuItem value={20}>2</MenuItem>
     <MenuItem value={30}>3</MenuItem>
    </Select>
    </FormControl>

    <FormControl fullWidth>
    <InputLabel id="demo-simple-select-label">אופצייה 3</InputLabel>
    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={age}
    label="Age"
    onChange={handleChange}
    >
   <MenuItem value={10}>1</MenuItem>
   <MenuItem value={20}>2</MenuItem>
   <MenuItem value={30}>3</MenuItem>
   </Select>
   </FormControl>
   <Button variant="contained">צור ד"וח</Button>
   </Box>     
  );
}