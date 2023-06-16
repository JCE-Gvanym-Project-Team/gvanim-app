import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Recruiter, getRecruitersFromDatabase } from '../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import { OutlinedInput } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function UpdateAccount() {
  const [recruitersSelected, setRecruitersSelected] = React.useState<string[]>([]);
  const [recruiters, setRecruiters] = React.useState<Recruiter[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const listRecruiters = await getRecruitersFromDatabase();
      setRecruiters(listRecruiters);
    };
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setRecruitersSelected(event.target.value as string[]);
  };

  const handleResetPassword = () => {
    // Add logic for resetting passwords here
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <FormControl sx={{ width: '100%', marginBottom: '1rem' }}>
            <label>מגייסים/ות:</label>
            <Select
              multiple
              size="small"
              label="מגייסים/ות"
              value={recruitersSelected}
              onChange={handleChange}
              input={<OutlinedInput />}
              MenuProps={MenuProps}
              required
              sx={{ height: '200px' }}
            >
              {recruiters.map((recruiter) => (
                <MenuItem key={recruiter._id} value={recruiter._id}>
                  <div>
                    <span>{recruiter._lastName} </span>
                    <span>{recruiter._firstName}</span>
                    <span style={{ marginLeft: '10px' }}> | </span>
                    <span>{recruiter._email}</span>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button variant="outlined" onClick={handleResetPassword} sx={{ width: '100%' }}>
              אפס סיסמא
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
