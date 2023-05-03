import { Form } from "react-bootstrap";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { ReactSVG } from "react-svg";
import SvgLogo from "../../../Components/Logo/gvanim_logo_svg.svg"
import { Alert, CssBaseline } from "@mui/material";
import React from "react";
import { KeyOutlined, MailOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Typography } from "@material-ui/core";


 
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

                        <form className={classes.form} noValidate onSubmit={handleLogin}>

                            <Alert className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="error" hidden={alertHidden}>
                                אחד או יותר מפרטי ההזדהות שמסרת שגויים.
                            </Alert>

                                <Input
                                    className="mt-3"
                                    placeholder="כתובת אימייל"
                                    onError={emailError}
                                    style={{ width: '100%' }}
                                    required
                                    value={email}
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="on"
                                    status={emailError ? 'error' : ''}
                                    prefix={<MailOutlined className="site-form-item-icon"
                                    />}
                                />


                                <Input
                                    className="mt-3"
                                    placeholder="סיסמה"
                                    onError={passwordError}
                                    style={{ width: '100%' }}
                                    required
                                    value={password}
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="off"
                                    status={passwordError ? 'error' : ''}
                                    prefix={<KeyOutlined className="site-form-item-icon"
                                    />}
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

                                <div  style={{display: 'flex', justifyContent: 'center'}}>
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

                        </form>


                    </div>

                </Container>

            </div>
        </>
    );
}

export default Login;
