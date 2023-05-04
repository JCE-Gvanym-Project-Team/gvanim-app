import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert, CssBaseline, TextField } from "@mui/material";
import { FormHelperText, Typography } from "@material-ui/core";
import Collapse from '@mui/material/Collapse';
import { useState } from "react";
import firebase1 from "../../../FirebaseConfig/firebase";
import "firebase/compat/auth";

// svg importer
import { ReactSVG } from "react-svg";
import SvgLogo from "../../../Components/Logo/gvanim_logo_svg.svg"

// plugin rtl (right to left) for specific widget (input form) of MUI
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
// -----------------------------------------------------------------

// setup the plugin RTL
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const PasswordRecover = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [invalidEmail,setInvalidEmail] = useState(false);

    const classes = useStyles();


    const handleResetPassword = (event) => {
        setValidated(false);
        setEmailError(false);

        event.preventDefault();
        event.stopPropagation();

        if (email.length === 0) { setEmailError(true); }
        else {
            firebase1.auth().sendPasswordResetEmail(email)
                .then(function () { setEmailError(false); setInvalidEmail(false); setValidated(true); })
                .catch(error => {
                    setInvalidEmail(true);
                 
                   // alert(error.code);
                });
        }
    };


    return (
        <>
            <CssBaseline />
            <div className='d-flex' dir='rtl' style={{ alignItems: 'center', height: '100vh' }}>

                <Container maxWidth="xs" className="shadow-sm border rounded">

                    <div className={classes.paper}>
                        <ReactSVG className="mt-3" src={SvgLogo} />

                        <form className={classes.form} noValidate onSubmit={handleResetPassword}>


                            <Typography
                                className="mt-4"
                                variant="h5"
                                style={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'GrayText', textAlign: 'center' }}>
                                איפוס סיסמה
                            </Typography>


                            <CacheProvider value={cacheRtl}>
                                <Alert  className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="success" hidden={!validated}>
                                בדוק את תיבת האימייל שלך, נשלח לך הוראות ליצירת סיסמה חדשה.
                                </Alert>
                            </CacheProvider>
                            
                            <CacheProvider value={cacheRtl}>
                                <Alert  className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="error" hidden={!invalidEmail}>
                                לא ניתן לאפס סיסמה לאימייל זה.
                                </Alert>
                            </CacheProvider>


                            <Collapse className="mt-3" in={!validated}>

                                <Typography
                                    className="mt-2"
                                    variant="subtitle2"
                                    style={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'GrayText', textAlign: 'center' }}>
                                    הזן את כתובת האימייל בכדי להתחיל את תהליך איפוס הסיסמה
                                </Typography>

                                <TextField
                                    size="small"
                                    className="mt-3"
                                    placeholder="אימייל"
                                    variant="outlined"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="on"
                                    fullWidth
                                    error={emailError}
                                />

                                <FormHelperText hidden={!emailError} security="invalid" style={{ color: '#ef5350', textAlign: 'right' }}>זהו שדה חובה.</FormHelperText>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button
                                        dir="ltr"
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        type={"submit"}
                                        className={classes.submit}
                                    >
                                        המשך
                                    </Button>
                                </div>

                            </Collapse>

                        </form>


                    </div>

                </Container>

            </div>
        </>
    );
}

export default PasswordRecover;
