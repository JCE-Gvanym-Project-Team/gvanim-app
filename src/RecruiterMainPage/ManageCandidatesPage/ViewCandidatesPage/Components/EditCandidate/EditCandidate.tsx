import { Edit } from '@mui/icons-material';
import { Box, Button, Container, Divider, FormHelperText, Stack, TextField, Typography, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Candidate, getFilteredCandidates } from '../../../../../Firebase/FirebaseFunctions/Candidate';
import { candidateNameSx } from '../../ViewCandidatesPageStyle';
import AreYouSureDialog from '../AreYouSureDialog/AreYouSureDialog';
import SuccessMessageSnackbar from '../SuccessMessageSnackbar/SuccessMessageSnackbar';
import RemoveCandidateDialog from './../RemoveCandidateDialog/RemoveCandidateDialog';
import { BoxGradientSx, MyPaperSx } from './EditCandidateStyle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { designReturnButton } from '../../../../ManageJobsPage/ManageJobsPageStyle';

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));


const EditCandidate = () => {

    const { state } = useLocation();


    // values
    const [candidateId, setCandidateId] = useState('');
    const [candidateFirstname, setCandidateFirstname] = useState('');
    const [candidateLastname, setCandidateLastname] = useState('');
    const [candidatePhone, setCandidatePhone] = useState('');
    const [candidateMail, setCandidateMail] = useState('');
    const [candidateGeneralRating, setCandidateGeneralRating] = useState(-1);
    const [candidateToEdit, setCandidateToEdit] = useState<Candidate>();
    // errors
    const [errorJobName, setErrorJobName] = useState(false);
    const [errorJobRole, setErrorJobRole] = useState(false);
    const [errorJobRegion, setErrorJobRegion] = useState(false);
    const [errorJobState, setErrorJobState] = useState(false);
    const [errorJobRequirements, setErrorJobRequirements] = useState(false);


    useEffect(() => {
        const getCandidateDetails = async () => {
            const candidates = await getFilteredCandidates(["id"], [state]);


            setCandidateId(candidates[0]._id);
            setCandidateFirstname(candidates[0]._firstName);
            setCandidateLastname(candidates[0]._lastName);
            setCandidatePhone(candidates[0]._phone);
            setCandidateMail(candidates[0]._eMail);
            setCandidateGeneralRating(candidates[0]._generalRating);

            setCandidateToEdit(candidates[0]);
        }

        if (state !== null) {
            getCandidateDetails();
        }


    }, [state]);



    const navigate = useNavigate();


    const handleSubmit = async (event: any) => {

        event.preventDefault();
        setAreYouSureDialogOpen(true);
        setAreYouSureDialogMessage("פעולה זו תשנה את פרטי המועמד. הפרטים הקודמים ימחקו לצמיתות")
        setAreYouSureCallback(() => async () => {
            if (state !== null) {
                if (candidateToEdit) {
                    await candidateToEdit.edit(candidateFirstname, candidateLastname, candidatePhone, candidateMail, candidateGeneralRating);
                    //TODO: tell Gavriel to integrate this
                    navigate("/management/manageCandidates/" + candidateToEdit?._id, { state: `השינויים עבור המועמד' ${candidateToEdit._firstName + " " + candidateToEdit._lastName} נשמרו בהצלחה.` });
                }
            }
        })

    }

    const handleDelete = () => {
        if (candidateToEdit) {
            candidateToEdit.remove();
            console.log(`candidate (id: ${candidateToEdit._id}) deleted successfully`);
            navigate("/management/manageCandidates", { state: `המועמד' ${candidateToEdit._firstName + " " + candidateToEdit._lastName} הוסרה בהצלחה.` });
        }
    }

    const handleClick = () => {
        navigate("/management/manageCandidates");
    }; 

    // are you sure for update button
    const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
    const [areYouSureCallback, setAreYouSureCallback] = useState<(() => {})>();
    const [areYouSureDialogMessage, setAreYouSureDialogMessage] = useState("");
    const closeAreYouSureDialog = (event, reason) => {
        if ((reason && reason !== "backdropClick") || reason === undefined) {
            setAreYouSureDialogOpen(false);
        }
    }

    // success message
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const snackBarOnClose = () => {
        setSnackBarOpen(false);
    }

    return (
        <>
            <Box sx={BoxGradientSx}>

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '4%',
                    left: 'auto',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '10%',
                    left: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '40%',
                    top: '-1%',
                    right: 'auto',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />


                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    right: '5%',
                    top: '20%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '2%',
                    top: '12%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '4%',
                    top: '8%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                    left: '25%',
                    top: '12%',
                    bottom: 'auto',
                    backgroundColor: 'hsla(0,0%,100%,.1)',
                    background: 'hsla(0,0%,100%,.1)',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    position: 'absolute',
                }} />

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "end", height: { xs: "280px", md: "220px" }, marginBottom: { xs: "1rem", md: "0" } }}>
                    <Stack direction='row' spacing={1} sx={{ justifyContent: "center", alignItems: "center" }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Edit sx={{ color: '#fff', fontSize: "28px" }} />
                        </Box>
                        <Typography variant="h4" sx={{ color: '#fff', fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 500 }}>
                            עריכת מועמד
                        </Typography>
                    </Stack>
                    <Box sx={{ background: 'linear-gradient(90deg,hsla(0,0%,100%,0),#fff,hsla(0,0%,100%,0))', padding: 0.05, width: '100%', mt: 2 }} />
                    {/* Candidate Name */}
                    <Box sx={{ display: 'flex', alignSelf: "center" }}>
                        <Typography sx={candidateNameSx} variant='h3' >
                            {candidateFirstname + " " + candidateLastname}
                        </Typography>

                    </Box>
                </Box>
            </Box>

            <Box sx={MyPaperSx}>

                <Box>
                    <Container>
                        <Box >

                            <Box className="col-md-12">
                                <Box className="section-title">

                                    <Typography className='mt-1' sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'rgb(123, 128, 154)', textAlign: 'center' }} variant='subtitle1'>
                                        {'לתשומת ליבך: עדכון השינויים יגרום לאובדן הנתונים הקודמים לצמיתות.'}
                                    </Typography>

                                    <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />

                                    <Form noValidate={true} onSubmit={handleSubmit} sx={{ width: '100%' }} className='mt-3'>


                                        <Box sx={{ width: "100%" }} >
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>שם:</Typography>
                                            </label>

                                            <TextField style={{ width: '100%' }} size='small' placeholder="שם של המועמד" id="_JobName" type="text"
                                                className="form-control" required
                                                value={candidateFirstname}
                                                error={errorJobName}
                                                onChange={(e) => {
                                                    setCandidateFirstname(e.target.value);
                                                    if (candidateFirstname.length > 0 && errorJobName) { setErrorJobName(false); }
                                                }}
                                            />
                                            <FormHelperText hidden={!errorJobName} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>
                                        </Box>
                                        <Box sx={{ width: "100%" }} >
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>שם משפחה:</Typography>
                                            </label>
                                            <TextField style={{ width: '100%' }} size='small' placeholder="תפקיד (role)" id="_role" type="text"
                                                className="form-control" required
                                                value={candidateLastname}
                                                error={errorJobRole}
                                                onChange={(e) => {
                                                    setCandidateLastname(e.target.value);
                                                    if (candidateLastname.length > 0 && errorJobRole) { setErrorJobRole(false); }
                                                }}
                                            />
                                            <FormHelperText hidden={!errorJobRole} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>

                                        </Box>




                                        <Box sx={{ width: "100%" }}>
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>מס' טלפון:</Typography>
                                            </label>
                                            <TextField style={{ width: '100%' }} size='small' placeholder="איזור (region)" id="_region" type="text"
                                                className="form-control" required
                                                value={candidatePhone}
                                                error={errorJobRegion}
                                                onChange={(e) => {
                                                    setCandidatePhone(e.target.value);
                                                    if (candidatePhone.length > 0 && errorJobRegion) { setErrorJobRegion(false); }
                                                }}
                                            />

                                            <FormHelperText hidden={!errorJobRegion} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>

                                        </Box>
                                        <Box sx={{ width: "100%" }}>
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>אימייל:</Typography>
                                            </label>
                                            <TextField style={{ width: '100%' }} size='small' placeholder="(Job_state)" id="_job_state" type="text"

                                                required
                                                error={errorJobState}
                                                value={candidateMail}
                                                onChange={(e) => {
                                                    setCandidateMail(e.target.value);
                                                    if (candidateMail.length > 0 && errorJobState) { setErrorJobState(false); }
                                                }}
                                            />

                                            <FormHelperText hidden={!errorJobState} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>


                                        </Box>


                                        <Box sx={{ width: "100%", mt: 1 }}>
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>דירוג כללי:</Typography>
                                            </label>
                                            <TextField style={{ width: '100%' }} size='small' placeholder="דרישות (requirements)" id="_requirements" type="text"
                                                className="form-control" required
                                                error={errorJobRequirements}
                                                value={candidateGeneralRating}
                                                InputProps={{
                                                    inputProps: {
                                                        type: "number",
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    setCandidateGeneralRating(+e.target.value);
                                                }}
                                            />
                                            <FormHelperText hidden={!errorJobRequirements} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>

                                        </Box>

                                        <Stack direction='row' spacing={2} sx={{ mt: 3, width: "100%" }}>

                                            <Button type="submit" className='mt-3 mb-3' variant='contained' sx={{
                                                backgroundColor: 'rgb(52, 71, 103)',
                                                ":hover": {
                                                    bgcolor: "rgb(52, 71, 103)",
                                                }
                                            }} fullWidth>{'עדכן'}
                                            </Button>

                                            <RemoveCandidateDialog handleDelete={handleDelete} />

                                        </Stack>
                                        <AreYouSureDialog
                                            open={areYouSureDialogOpen}
                                            onClose={closeAreYouSureDialog}
                                            message={areYouSureDialogMessage}
                                            callback={areYouSureCallback}
                                            setSnackBarOpen={setSnackBarOpen}
                                        />
                                        <SuccessMessageSnackbar open={snackBarOpen} onClose={snackBarOnClose} />
                                    </Form>
                                </Box>
                            </Box>

                        </Box>

                    </Container>
                </Box>

            </Box>

            <Box style={{ position: 'absolute', top: '100px', right: '50px' }}>
                <Button
                    onClick={handleClick}
                    sx={designReturnButton}
                >
                    <ArrowForwardIosIcon></ArrowForwardIosIcon>
                    חזור
                </Button>
            </Box>

        </>
    )
}

export default EditCandidate;


