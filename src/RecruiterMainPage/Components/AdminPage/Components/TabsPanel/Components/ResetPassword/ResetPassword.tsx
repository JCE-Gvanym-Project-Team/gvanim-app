import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Recruiter, getRecruitersFromDatabase } from '../../../../../../../Firebase/FirebaseFunctions/Recruiter';
import { Dialog, DialogActions, DialogContent, DialogTitle, OutlinedInput } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { getConnectedUser, sendResetMail } from '../../../../../../../Firebase/FirebaseFunctions/Authentication';

const ITEM_HEIGHT = 38;
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
  const [openDialog, setOpenDialog] = React.useState(false);
  const [recruiterSelect, setRecruiterSelect] = React.useState(false);
  const [isAdminUser, setIsAdminUser] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    const currentUser = getConnectedUser()
      .then((userCredential) => {
        if (userCredential?.email != null)
          setUserEmail(userCredential?.email);
        console.log(userEmail);
        if (process.env.REACT_APP_ADMIN_MAIL === userEmail)
          setIsAdminUser(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userEmail]);


  React.useEffect(() => {
    const fetchData = async () => {
      const listRecruiters = await getRecruitersFromDatabase();
      setRecruiters(listRecruiters);
    };
    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValue = event.target.value as string[];

    if (selectedValue.length === 1) {
      setRecruitersSelected(selectedValue);
      setRecruiterSelect(true);
    } else {
      setRecruitersSelected([]);
      setRecruiterSelect(false);
    }
    // setOpenDialog(true);
  };

  const handleResetPassword = () => {
    console.log(recruitersSelected[0]);
    const mail: string = recruitersSelected[0];
    sendResetMail(mail);
    if (recruiterSelect) setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const resetThePasswordOfTheCurrentUser = () => {
    sendResetMail(userEmail);
    setOpenDialog(true);
  };


  return (
    <Box sx={{ display: 'flex', justifyContent: 'fixed', alignItems: 'center', height: '270px' }}>
      <Grid container justifyContent="center">
        <Grid item xs={8} sm={6} md={4} lg={3}>
          {isAdminUser && (
            <>
              <FormControl sx={{ width: '100%', marginBottom: '10px', marginTop: '20px' }}>
                <label>אנא בחר/י מגייס/ת:</label>
                <Select
                  multiple
                  size="small"
                  label="מגייסים/ות"
                  value={recruitersSelected}
                  onChange={handleChange}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  required
                  sx={{ height: '10%' }}
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
                <Button variant="outlined" onClick={handleResetPassword} sx={{ width: '45%' }}>
                  אפס/י סיסמא
                </Button>
              </Box>

            </>
          )}

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle sx={{ textAlign: 'center', margin: '1rem 0' }}>הסיסמא אופסה בהצלחה!</DialogTitle>
            <DialogContent>
              <Box sx={{ textAlign: 'center', margin: '1rem 0' }}>
                <p>אנא עקב/י אחרי ההוראות במייל:</p>
                <p>{recruitersSelected.join(', ')}</p>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>סגור</Button>
            </DialogActions>
          </Dialog>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' }}>
            <Button variant="outlined" onClick={resetThePasswordOfTheCurrentUser} sx={{ width: '85%' }}>
              אפס/י את הסיסמא של החשבון הנוכחי
            </Button>
          </Box>

          {!isAdminUser && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button variant="outlined" onClick={resetThePasswordOfTheCurrentUser} sx={{ width: '85%' }}>
              אפס/י את הסיסמא של החשבון הנוכחי
            </Button>
          </Box>
          )}

        </Grid>
      </Grid>
    </Box>
  );
}
