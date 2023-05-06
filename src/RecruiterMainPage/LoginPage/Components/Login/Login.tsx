import React from "react";

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
    Paper
} from "@mui/material";

import {styled, createTheme, ThemeProvider } from "@mui/material/styles";
import AlertIcon from '@mui/icons-material/Info';

// svg importer
import { ReactSVG } from "react-svg";
import SvgLogo from "../../../../Components/Logo/gvanim_logo_svg.svg"
// -----------------------------------------------------------------


const theme = createTheme({
    direction: 'rtl',
    // Other theme options...
});



// override TextField style of MUI

const StyledTextField = styled(TextField)({
    '& label': {
        transformOrigin: 'top right',
        right: 0,
        left: 'auto'
    }
});



// create theme
// const useStyles = makeStyles((theme) => ({
//     paper: {
//         padding: theme.spacing(2),
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     form: {
//         width: '100%', // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));



const StyledPaper = styled(Paper)(({ theme }) => ({
    boxShadow: 'unset',
    padding: theme.spacing(2),
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

const StyledIcon = styled(AlertIcon)({
    flexShrink: 0,
    marginLeft: '8px',
});

const Login = (props: { email: any; setEmail: any; password: any; setPassword: any; handleLogin: any; handleSignup: any; hasAccount: any; setHasAccount: any; emailError: any; passwordError: any; validated: any; alertHidden: any; }) => {


    const {
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passwordError,
        validated,
        alertHidden
    } = props;


    return (



        <div>
      

            <CssBaseline />
            <div className='d-flex' dir='rtl' style={{ alignItems: 'center', height: '100vh' }}>

                <Container maxWidth="xs" className="shadow-sm border rounded">
                    
                    <StyledPaper>

                        <ReactSVG className="mt-3" src={SvgLogo} />

                        <Typography
                            className="mt-4"
                            variant="h5"
                            style={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'GrayText', textAlign: 'center' }}>
                            כניסת משתמש
                        </Typography>

                        <Form noValidate={true} onSubmit={handleLogin}>


                            {/* the CacheProvider set the RTL plugin all components inside tag*/}

                            <Alert className="mt-3" sx={{ fontSize: 'small' }} style={{ padding: '5px' }} variant="outlined" severity="error" hidden={alertHidden}>
                                <div style={{ marginRight: '10px' }}>
                                    אחד או יותר מפרטי ההזדהות שמסרת שגויים.
                                </div>
                            </Alert>
                            
                          



                            <StyledTextField
                                className="mt-3"
                                label={"כתובת אימייל"}
                                variant="standard"
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="on"
                                fullWidth
                                error={emailError}
                            />

                            <FormHelperText hidden={!emailError} security="invalid" style={{ color: '#ef5350', textAlign: 'right' }}>זהו שדה חובה.</FormHelperText>

                            <StyledTextField
                                className="mt-3"
                                label={"סיסמה"}
                                variant="standard"
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                autoComplete="off"
                                error={passwordError}
                            />
                            <FormHelperText hidden={!passwordError} security="invalid" style={{ color: '#ef5350', textAlign: 'right' }}>זהו שדה חובה.</FormHelperText>

                            <Grid container className="mt-2">
                                <Grid item>
                                    <Link type="submit" href={"/#/recovery"} variant="caption">
                                        שכחת את הסיסמה?
                                    </Link>
                                </Grid>
                            </Grid>

                            <Grid container className="mt-5">
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
                                        color="primary"
                                        type={"submit"}
                                    >
                                        התחבר
                                    </SubmitButton>
                            </div>

                        </Form>

                    </StyledPaper>
                </Container>
            </div>

        </div >
    );
}

export default Login;