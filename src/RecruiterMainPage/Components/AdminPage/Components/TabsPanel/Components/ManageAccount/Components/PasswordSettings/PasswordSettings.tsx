import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormGroup, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sleep } from '../../../../../../../../../Firebase/FirebaseFunctions/test';
import { updateRecruiterPassword } from '../../../../../../../../../Firebase/FirebaseFunctions/Authentication';

export default function PasswordSettings(props: { passwordEdit: any }) {
    const { passwordEdit } = props;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);

    const navigate = useNavigate();

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordError(false);
        const regex = /^[a-zA-Z0-9@$#]+$/;
        const newPasswordValue = event.target.value;

        if (!newPasswordValue.includes(' ') && (!newPasswordValue || regex.test(newPasswordValue))) {
            setNewPassword(newPasswordValue);
            setConfirmPasswordError(false);
            if (!newPasswordValue) {
                setConfirmPassword('');
            }
        } else {
            setConfirmPassword('');
            setPasswordError(true);
        }
    };


    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleUpdatePassword = async () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$#]{8,}$/;

        if (newPassword.length < 8 || !regex.test(newPassword)) {
            setNewPassword('');
            setConfirmPassword('');
            setPasswordError(true);
        } else {
            setPasswordError(false);
            if (newPassword !== confirmPassword) {
                setConfirmPasswordError(true);
            } else { // if sucsess
                updateRecruiterPassword(newPassword);
                setConfirmPasswordError(false);
                setDialogOpen(true);
                setNewPassword('');
                setConfirmPassword('');
                await sleep(2300);
                navigate('/management');
            }
        }
    };

    return (
        <>
            <Stack direction="column" spacing={1} sx={{ width: '100%', mt: 1, padding: 2 }}>
                <Stack
                    direction="row"
                    display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                    spacing={{ xs: 0, sm: 0, md: 0, lg: 5, xl: 5 }}
                >
                    <Box sx={{ width: '100%' }}>
                        <label>
                            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>סיסמה חדשה:</Typography>
                        </label>

                        <TextField
                            style={{ width: '100%' }}
                            size="small"
                            placeholder="סיסמה חדשה"
                            type="password"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            error={passwordError}
                            helperText={passwordError ? 'אורך הסיסמא חייבת להיות 8-12 תווים, אות גדולה ואות קטנה באנגלית ומספר. תווים מותרים הם גם @ $ #' : ''}
                        />


                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <label>
                            <Typography sx={{ fontWeight: 600, fontSize: 13 }}>אימות סיסמה חדשה:</Typography>
                        </label>

                        <TextField
                            disabled={!passwordEdit}
                            style={{ width: '100%' }}
                            size="small"
                            placeholder="אימות סיסמה חדשה"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? 'הסיסמאות לא תואמות' : ''}
                        />


                    </Box>
                </Stack>
            </Stack>

            <Box sx={{ padding: 2, width: '100%', display: 'flex', justifyContent: 'end' }}>
                <Button disabled={!passwordEdit} variant="contained" onClick={handleUpdatePassword}>
                    עדכן
                </Button>

                <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                    <DialogTitle>עדכון סיסמה</DialogTitle>
                    <DialogContent>
                        <DialogContentText>סיסמתך החדשה עודכנה בהצלחה!</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>סגור</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
