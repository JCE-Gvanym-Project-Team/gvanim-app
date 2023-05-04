import React from "react";
import Link from '@material-ui/core/Link';
import { Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { Alert, CssBaseline } from "@mui/material";
import { FormHelperText, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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


// override TextField style of MUI
const StyledTextField = withStyles({
    root: {
        "& label": {
            transformOrigin: "top right",
            right: 0,
            left: "auto"
        }
    }
})(TextField);


// create theme
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


const Login = (props: { email: any; setEmail: any; password: any; setPassword: any; handleLogin: any; handleSignup: any; hasAccount: any; setHasAccount: any; emailError: any; passwordError: any; validated: any; alertHidden: any; }) => {
    const classes = useStyles();

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

        <>
            <CssBaseline />
            <div className='d-flex' dir='rtl' style={{ alignItems: 'center', height: '100vh' }}>

                <Container maxWidth="xs" className="shadow-sm border rounded">

                    <div className={classes.paper}>
                        <ReactSVG className="mt-3" src={SvgLogo} />

                        <Typography
                            className="mt-4"
                            variant="h5"
                            style={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'GrayText', textAlign: 'center' }}>
                            כניסת משתמש
                        </Typography>


                        <form className={classes.form} noValidate={true} onSubmit={handleLogin}>

                            {/* the CacheProvider set the RTL plugin all components inside tag*/}
                            <CacheProvider value={cacheRtl}>

                                <Alert className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="error" hidden={alertHidden}>
                                    אחד או יותר מפרטי ההזדהות שמסרת שגויים.
                                </Alert>

                            </CacheProvider>

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
                                    <Link type="submit" href={"/Recovery"} variant="caption">
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
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    type={"submit"}
                                    className={classes.submit}
                                >
                                    התחבר
                                </Button>
                            </div>
                        </form>

                    </div>

                </Container>
            </div>
        </>
    );
}

export default Login;
