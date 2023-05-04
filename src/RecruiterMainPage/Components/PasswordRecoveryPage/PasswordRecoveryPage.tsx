// components
import {
    Button,
    Container,
    FormHelperText,
    Typography,
    Alert,
    CssBaseline,
    TextField,
    Collapse,
    Paper
} from '@mui/material'

import AlertIcon from '@mui/icons-material/Info';
import { styled } from '@mui/material/styles'

//firebase
import firebase1 from "../../../FirebaseConfig/firebase";
import "firebase/compat/auth";

//react
import { useState } from "react";

// svg importer
import { ReactSVG } from "react-svg";
import SvgLogo from "../../../Components/Logo/gvanim_logo_svg.svg"
// -----------------------------------------------------------------



// setup the plugin RTL
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

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const PasswordRecover = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

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

                    <StyledPaper>
                        <ReactSVG className="mt-3" src={SvgLogo} />

                        <Form>


                            <Typography
                                className="mt-4"
                                variant="h5"
                                style={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'GrayText', textAlign: 'center' }}>
                                איפוס סיסמה
                            </Typography>



                            <Alert className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="success" hidden={!validated}>
                                בדוק את תיבת האימייל שלך, נשלח לך הוראות ליצירת סיסמה חדשה.
                            </Alert>



                            <Alert className="mt-3" sx={{ fontSize: 'small' }} variant="outlined" severity="error" hidden={!invalidEmail}>
                                לא ניתן לאפס סיסמה לאימייל זה.
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
                                    <SubmitButton>
                                        <Button
                                            dir="ltr"
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            type={"submit"}
                                        >
                                            המשך
                                        </Button>
                                    </SubmitButton>
                                </div>

                            </Collapse>

                        </Form>


                    </StyledPaper>
                </Container>

            </div>
        </>
    );
}

export default PasswordRecover;
