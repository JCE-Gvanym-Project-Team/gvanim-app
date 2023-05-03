import { Form } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SvgLogo from "../../../Components/Logo/gvanim_logo_svg.svg"
import { ReactSVG } from 'react-svg';
import { Alert, CssBaseline, TextField } from "@mui/material";
import { Typography } from "@material-ui/core";
import Collapse from '@mui/material/Collapse';
import { useState } from "react";
import firebase1 from "../../../FirebaseConfig/firebase";
import "firebase/compat/auth";
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

const PasswordRecover = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [validated, setValidated] = useState(false);

    const classes = useStyles();


    const handleResetPassword = () => {
        if (email.length === 0) { setEmailError(true); }
        else {
            firebase1.auth().sendPasswordResetEmail(email)
                .then(function () { alert("check youre email"); setValidated(true); })
                .catch(error => {
                    setEmailError(true);
                    alert(error.code);
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

                        <Form className={classes.form} noValidate onSubmit={handleResetPassword}>


                            <Typography
                                className="mt-4"
                                variant="h5"
                                style={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'GrayText', textAlign: 'center' }}>
                                איפוס סיסמה
                            </Typography>


                            <Alert className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="success" hidden={!validated}>
                                נשלח לכם אל כתובת האימייל שבה השתמשתם ליצירת החשבון, הוראות ליצירת סיסמה חדשה.
                            </Alert>


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
                                    label={"כתובת אימייל"}
                                    variant="outlined"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="on"
                                    fullWidth
                                    error={emailError}
                                    helperText={emailError && 'לא ניתן לאפס סיסמה למשתמש זה.'}
                                />

                                <div dir='ltr'>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        type={validated ? "submit" : "button"}
                                        onClick={handleResetPassword}
                                        className={classes.submit}
                                    >
                                        המשך
                                    </Button>
                                </div>

                            </Collapse>
                        </Form>


                    </div>

                </Container>

            </div>
        </>
    );
}

export default PasswordRecover;
