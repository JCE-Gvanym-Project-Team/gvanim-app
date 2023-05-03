import { Form } from "react-bootstrap";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { ReactSVG } from "react-svg";
import SvgLogo from "../../../Components/Logo/gvanim_logo_svg.svg"
import { Alert, CssBaseline, TextField, createTheme } from "@mui/material";
import React from "react";


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

                        <Form className={classes.form} noValidate onSubmit={handleLogin}>

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
                                helperText={emailError && 'הזן כתובת אימייל או מספר טלפון.'}
                            />



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
                                helperText={passwordError && 'הזן סיסמה.'}
                            />


                            <Grid container className="mt-2">
                                <Grid item>
                                    <Link type="submit" href={"/Recovery"} variant="caption">
                                        שכחת את הסיסמה?
                                    </Link>

                                </Grid>
                            </Grid>

                            <Grid container className="mt-4">
                                <Grid item xs>
                                    <div style={{ textAlign: 'start' }}>
                                        <Form.Text style={{ fontSize: 'small', fontWeight: '500' }} muted>
                                            זה לא המחשב שלך? מומלץ להשתמש במצב אורח כדי להיכנס לחשבון בפרטיות. <Link
                                                href="https://support.google.com/chrome/answer/6130773?hl=iw"
                                                variant="body2">
                                                מידע נוסף
                                            </Link>
                                        </Form.Text>
                                    </div>
                                </Grid>
                            </Grid>

                            <div dir='ltr'>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    type={validated ? "submit" : "button"}
                                    onClick={handleLogin}
                                    className={classes.submit}
                                >
                                    התחבר
                                </Button>
                            </div>

                        </Form>


                    </div>

                </Container>

            </div>
        </>
    );
}

export default Login;
