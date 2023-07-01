
import {
    Alert,
    CssBaseline,
    Button,
    Link,
    Grid,
    Container,
    FormHelperText,
    TextField,
    Typography,
    Paper,
    Box,
    Snackbar,
    Collapse
} from "@mui/material";

import { styled } from "@mui/material/styles";


// svg importer
import { ReactSVG } from "react-svg";
import SvgLogo from "../../Components/Logo/Logo.svg"
import MyAvatar from "../../Components/GvanimAvatar/GvanimAvatar";
import PasswordRecover from "../RecoveryPasswordPage/RecoveryPasswordPage";
import { useState } from "react";
// -----------------------------------------------------------------


const StyledPaper = styled(Paper)(({ theme }) => ({
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: '1px solid rgba(0, 0, 0, 0.125)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));


const Login = (props: { email: any; setEmail: any; password: any; setPassword: any; handleLogin: any; hasAccount: any; setHasAccount: any; emailError: any; passwordError: any; setValidated:any, validated: any; alertHidden: any; }) => {


    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        setValidated,
        validated,
        alertHidden
    } = props;    
    
    return (
        <div>
            <CssBaseline />

            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Container maxWidth="xs">

                        <StyledPaper>

                            <ReactSVG src={SvgLogo} />

                            { !validated && <Alert className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="error" hidden={alertHidden}>
                                    אחד או יותר מפרטי ההזדהות שמסרת שגויים.
                            </Alert>}


                            <Typography
                                sx={{ mt: 1 }}
                                variant="h6"
                                style={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'GrayText', textAlign: 'center' }}>
                                כניסת משתמש
                            </Typography>

                            <Form noValidate={true} onSubmit={handleLogin}>
                                
                                <Collapse in={!alertHidden}>
                                    <Alert sx={{ mt: 1,mb: 1 }} variant="outlined" severity="error">
                                        אחד או יותר מפרטי ההזדהות שמסרת שגויים.
                                    </Alert>
                                </Collapse>


                                <TextField
                                    sx={{ mt: 1 }}
                                    label={"כתובת אימייל"}
                                    variant="standard"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => {setValidated(true); setEmail(e.target.value)}}
                                    autoComplete="on"
                                    fullWidth
                                    error={emailError}
                                />

                                <FormHelperText hidden={!emailError} security="invalid" style={{ color: '#ef5350', textAlign: 'right' }}>זהו שדה חובה.</FormHelperText>

                                <TextField
                                    sx={{mt: 1}}
                                    label={"סיסמה"}
                                    variant="standard"
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => {setValidated(true);setPassword(e.target.value)}}
                                    fullWidth
                                    autoComplete="off"
                                    error={passwordError}
                                />
                                <FormHelperText hidden={!passwordError} security="invalid" style={{ color: '#ef5350', textAlign: 'right' }}>זהו שדה חובה.</FormHelperText>

                                <Grid container sx={{ mt: 1 }}>
                                    <Grid item>
                                        <Link type="submit" href={"/passwordRecovery"} variant="caption">
                                            שכחת את הסיסמה?
                                        </Link>
                                    </Grid>
                                </Grid>

                                <Grid container sx={{ mt: 3 }}>
                                    <Grid item xs>
                                        <div style={{ textAlign: 'start' }}>
                                            <Typography style={{ fontSize: 'small', fontWeight: '500', color: 'GrayText' }} variant="body2">
                                                זה לא המחשב שלך? מומלץ להשתמש במצב אורח כדי להיכנס לחשבון בפרטיות. <Link
                                                    href="https://support.google.com/chrome/answer/6130773?hl=iw"
                                                    variant="body2">
                                                    מידע נוסף
                                                </Link>
                                            </Typography>
                                        </div>
                                    </Grid>
                                </Grid>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <SubmitButton
                                        size="medium"
                                        variant="contained"
                                        type={"submit"}
                                    >
                                        התחבר
                                    </SubmitButton>
                                </div>

                            </Form>

                        </StyledPaper>
                    </Container>
                </Box>
            </Box>
        </div >
    );
}

export default Login;