import { Box, Button, Container, Divider, FormHelperText, Stack, TextField, TextareaAutosize, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BoxGradientSx, MyPaperSx, MyTextFieldStyle } from './EditCandidateStyle'
import { Job, generateJobNumber, getFilteredJobs } from '../../../../../Firebase/FirebaseFunctions/Job';
import { useLocation, useNavigate } from 'react-router-dom';
import RemoveCandidateDialog from './../RemoveCandidateDialog/RemoveCandidateDialog';
import { Candidate, getFilteredCandidates } from '../../../../../Firebase/FirebaseFunctions/Candidate';

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));


const EditCandidate = (props: { setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any }) =>
{

    const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;

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

    // ### design TextFields #######################################################################################
    const MyTextFieldJobNameSx = {
        boxShadow: '0px 2px 24px #DAECFF',
        "& .MuiOutlinedInput-root": {
            fontSize: '0.875rem',
            "&:hover fieldset": {
                color: errorJobName ? '#dc3545' : '#212529',
                border: errorJobName ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,
            },
            "&.Mui fieldset": {
                color: errorJobName ? '#dc3545' : '#212529',
                border: errorJobName ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,
            },
            "&.Mui-focused fieldset": {
                border: errorJobName ? '1px solid #dc3545' : '1px solid #86b7fe',
                color: errorJobName ? '#dc3545' : '#212529',
                outline: 0,
                boxShadow: errorJobName ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(13,110,253,.25)'
            },

        },
    }
    const MyTextFieldJobRoleSx = {
        boxShadow: '0px 2px 24px #DAECFF',
        "& .MuiOutlinedInput-root": {
            fontSize: '0.875rem',
            "&:hover fieldset": {
                color: errorJobRole ? '#dc3545' : '#212529',
                border: errorJobRole ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,
            },
            "&.Mui fieldset": {
                color: errorJobRole ? '#dc3545' : '#212529',
                border: errorJobRole ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,


            },
            "&.Mui-focused fieldset": {
                border: errorJobRole ? '1px solid #dc3545' : '1px solid #86b7fe',
                color: errorJobRole ? '#dc3545' : '#212529',
                outline: 0,
                boxShadow: errorJobRole ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(13,110,253,.25)'
            },

        },
    }
    const MyTextFieldJobRegionSx = {
        boxShadow: '0px 2px 24px #DAECFF',
        "& .MuiOutlinedInput-root": {
            fontSize: '0.875rem',
            "&:hover fieldset": {
                color: errorJobRegion ? '#dc3545' : '#212529',
                border: errorJobRegion ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,
            },
            "&.Mui fieldset": {
                color: errorJobRegion ? '#dc3545' : '#212529',
                border: errorJobRegion ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,


            },
            "&.Mui-focused fieldset": {
                border: errorJobRegion ? '1px solid #dc3545' : '1px solid #86b7fe',
                color: errorJobRegion ? '#dc3545' : '#212529',
                outline: 0,
                boxShadow: errorJobRegion ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(13,110,253,.25)'
            },

        },
    }
    const MyTextFieldJobStateSx = {
        boxShadow: '0px 2px 24px #DAECFF',
        "& .MuiOutlinedInput-root": {
            fontSize: '0.875rem',
            "&:hover fieldset": {
                color: errorJobState ? '#dc3545' : '#212529',
                border: errorJobState ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,
            },
            "&.Mui fieldset": {
                color: errorJobState ? '#dc3545' : '#212529',
                border: errorJobState ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,


            },
            "&.Mui-focused fieldset": {
                border: errorJobState ? '1px solid #dc3545' : '1px solid #86b7fe',
                color: errorJobState ? '#dc3545' : '#212529',
                outline: 0,
                boxShadow: errorJobState ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(13,110,253,.25)'
            },

        },
    }
    const MyTextFieldJobRequirementsSx = {
        boxShadow: '0px 2px 24px #DAECFF',
        "& .MuiOutlinedInput-root": {
            fontSize: '0.875rem',
            "&:hover fieldset": {
                color: errorJobRequirements ? '#dc3545' : '#212529',
                border: errorJobRequirements ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,
            },
            "&.Mui fieldset": {
                color: errorJobRequirements ? '#dc3545' : '#212529',
                border: errorJobRequirements ? '1px solid #dc3545' : '1px solid #ced4da',
                outline: 0,


            },
            "&.Mui-focused fieldset": {
                border: errorJobRequirements ? '1px solid #dc3545' : '1px solid #86b7fe',
                color: errorJobRequirements ? '#dc3545' : '#212529',
                outline: 0,
                boxShadow: errorJobRequirements ? '0 0 0 0.25rem rgba(220,53,69,.25)' : '0 0 0 0.25rem rgba(13,110,253,.25)'
            },

        },
    }
    // #############################################################################################################



    useEffect(() =>
    {
        // for navbar
        setHomeActive(false); setCandidatesActive(false);
        setReportsActive(false); setJobsActive(false);

        const getCandidateDetails = async () =>
        {
            const candidates = await getFilteredCandidates(["id"], [state]);

            
            setCandidateId(candidates[0]._id);
            setCandidateFirstname(candidates[0]._firstName);
            setCandidateLastname(candidates[0]._lastName);
            setCandidatePhone(candidates[0]._phone);
            setCandidateMail(candidates[0]._eMail);
            setCandidateGeneralRating(candidates[0]._generalRating);
            
            let candidate = new Candidate(candidates[0]._id, candidates[0]._firstName, candidates[0]._lastName, candidates[0]._phone, candidates[0]._eMail, candidates[0]._generalRating, candidates[0]._note);
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

                                            <TextField style={{ width: '100%' }} sx={MyTextFieldJobNameSx} size='small' placeholder="שם של המועמד" id="_JobName" type="text"
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
                                            <TextField style={{ width: '100%' }} sx={MyTextFieldJobRoleSx} size='small' placeholder="תפקיד (role)" id="_role" type="text"
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
                                            <TextField style={{ width: '100%' }} sx={MyTextFieldJobRegionSx} size='small' placeholder="איזור (region)" id="_region" type="text"
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
                                            <TextField style={{ width: '100%' }} sx={MyTextFieldJobStateSx} size='small' placeholder="(Job_state)" id="_job_state" type="text"

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
                                            <TextField style={{ width: '100%' }} sx={MyTextFieldJobRequirementsSx} size='small' placeholder="דרישות (requirements)" id="_requirements" type="text"
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


