
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

import {styled} from "@mui/material/styles";


// svg importer
import { ReactSVG } from "react-svg";
import SvgLogo from "../../Components/Logo/Logo.svg"
// -----------------------------------------------------------------


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

                            <Alert className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="error" hidden={alertHidden}>
                                    אחד או יותר מפרטי ההזדהות שמסרת שגויים.
                            </Alert>
                            
                            <TextField
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

                            <TextField
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