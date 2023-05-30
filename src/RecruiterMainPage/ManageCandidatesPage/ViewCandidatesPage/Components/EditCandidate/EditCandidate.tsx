import { Box, Button, Container, Divider, FormHelperText, Stack, TextField, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BoxGradientSx, MyPaperSx, MyTextFieldStyle } from './EditCandidateStyle'
import { useLocation, useNavigate } from 'react-router-dom';
import RemoveCandidateDialog from './../RemoveCandidateDialog/RemoveCandidateDialog';
import { Candidate, getFilteredCandidates } from '../../../../../Firebase/FirebaseFunctions/Candidate';

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));


const EditCandidate = () =>
{

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


    useEffect(() =>
    {
        const getCandidateDetails = async () =>
        {
            const candidates = await getFilteredCandidates(["id"], [state]);
            
            setCandidateId(candidates[0]._id);
            setCandidateFirstname(candidates[0]._firstName);
            setCandidateLastname(candidates[0]._lastName);
            setCandidatePhone(candidates[0]._phone);
            setCandidateMail(candidates[0]._eMail);
            setCandidateGeneralRating(candidates[0]._generalRating);
            
            let candidate = new Candidate(candidates[0]._firstName, candidates[0]._lastName, candidates[0]._phone, candidates[0]._eMail, candidates[0]._generalRating);
            setCandidateToEdit(candidate);
        }

        if (state !== null)
        {
            getCandidateDetails();
        }


    }, [state]);



    const navigate = useNavigate();


    const handleSubmit = async (event: any) =>
    {

        event.preventDefault();

        if (state !== null)
        {
            if (candidateToEdit)
            {
                candidateToEdit.edit(candidateFirstname, candidateLastname, candidatePhone, candidateMail, candidateGeneralRating);
                //TODO: tell Gavriel to integrate this
                navigate("/manageCandidates", { state: `השינויים עבור המועמד' ${candidateToEdit._firstName + " " + candidateToEdit._lastName} נשמרו בהצלחה.` });
            }
        }
    }

    const handleDelete = () =>
    {
        if (candidateToEdit)
        {
            candidateToEdit.remove();
            console.log(`candidate (id: ${candidateToEdit._id}) deleted successfully`);
            navigate("/manageCandidates", { state: `המועמד' ${candidateToEdit._firstName + " " + candidateToEdit._lastName} הוסרה בהצלחה.` });
        }
    }

    return (
        <>
            <Box sx={BoxGradientSx}></Box>

            <Box sx={MyPaperSx}>

                <Box>
                    <Container>
                        <Box >

                            <Box className="col-md-12">
                                <Box className="section-title">

                                    <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'rgb(52, 71, 103)', textAlign: 'center' }} variant='h3'>
                                        {`עריכת מועמד`}
                                    </Typography>

                                    <Typography className='mt-1' sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'rgb(123, 128, 154)', textAlign: 'center' }} variant='subtitle1'>
                                        {'לתשומת ליבך: עדכון השינויים יגרום לאובדן הנתונים הקודמים לצמיתות.'}
                                    </Typography>

                                    <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />

                                    <Form noValidate={true} onSubmit={handleSubmit} sx={{ width: '100%' }} className='mt-3'>


                                        <Box sx={{ width: "100%" }} >
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>שם:</Typography>
                                            </label>

                                            <TextField style={{ width: '100%' }}  size='small' placeholder="שם של המועמד" id="_JobName" type="text"
                                                className="form-control" required
                                                value={candidateFirstname}
                                                error={errorJobName}
                                                onChange={(e) =>
                                                {
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
                                                onChange={(e) =>
                                                {
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
                                                onChange={(e) =>
                                                {
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
                                                onChange={(e) =>
                                                {
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
                                                onChange={(e) =>
                                                {
                                                    setCandidateGeneralRating(+e.target.value);
                                                    // if (candidateGeneralRating.length > 0 && errorJobRequirements) { setErrorJobRequirements(false); }
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
                                            }} fullWidth>{'עדכן'}</Button>

                                            <RemoveCandidateDialog handleDelete={handleDelete} />

                                        </Stack>
                                    </Form>
                                </Box>
                            </Box>

                        </Box>

                    </Container>
                </Box>

            </Box>


        </>
    )
}

export default EditCandidate;


