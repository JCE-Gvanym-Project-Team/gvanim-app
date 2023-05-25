import { Box, Button, Container, Divider, FormHelperText, Stack, TextField, TextareaAutosize, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { BoxGradientSx, MyPaperSx } from './NewJobStyle'
import JobScopeSlider from './Components/ScopeSlider/ScopeSlider';
import { Job, generateJobNumber, getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';
import { useLocation, useNavigate } from 'react-router-dom';
import MyJobRemoveDialog from './Components/RemoveJobDialog/RemoveJobDialog';
import "./NewJobPage.css"

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));


const NewJobPage = (props: { setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any }) => {

    const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;

    const { state } = useLocation();

    // values
    const [jobName, setJobName] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [jobRegion, setJobRegion] = useState('');
    const [jobState, setJobState] = useState('');
    const [jobRequirements, setJobRequirements] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [jobDescriptionSkills, setJobDescriptionSkills] = useState('');
    const [jobAdditionalInfo, setJobAdditionalInfo] = useState('');
    const [jobScope, setJobScope] = useState<number[]>([50, 100]);
    const [newJob, setNewJob] = useState(true);
    const [JobToEdit, setJobToEdit] = useState<Job[]>([]);
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



    useEffect(() => {

        // for navbar
        setHomeActive(false); setCandidatesActive(false);
        setReportsActive(false); setJobsActive(false);

        const getAllJobs = async () => {
            const jobs = await getFilteredJobs();

            let _JobToEdit = jobs.filter(job => job._jobNumber === state);
            setJobToEdit(_JobToEdit);

            setJobName(_JobToEdit[0]._title);
            setJobRole(_JobToEdit[0]._role);
            setJobRegion(_JobToEdit[0]._region);
            setJobState(_JobToEdit[0]._sector);
            setJobRequirements(_JobToEdit[0]._requirements);
            setJobDescription(_JobToEdit[0]._description[0]);
            setJobDescriptionSkills(_JobToEdit[0]._description[1]);
            setJobAdditionalInfo(_JobToEdit[0]._description[2]);
            setJobScope(_JobToEdit[0]._scope);

        }

        if (state !== null) { // edit job
            setNewJob(false);
            getAllJobs();
        }


    }, []);



    const navigate = useNavigate();


    const handleSubmit = async (event: any) => {

        event.preventDefault();
        var description_array = new Array(jobDescription, jobDescriptionSkills, jobAdditionalInfo);

        //edit
        if (state !== null) {
            let _job = JobToEdit[0];

            _job.edit(_job._title = jobName, _job._role = jobRole, _job._scope = jobScope, _job._region = jobRegion,
                _job._sector = jobState, _job._description = description_array, _job._requirements = jobRequirements, true, false);
            navigate("/manageJobs", { state: `השינויים עבור משרה מס' ${_job._jobNumber} נשמרו בהצלחה.` });
        }
        //add
        else {

            if (jobName.length === 0 || jobRole.length === 0 || jobRegion.length === 0 || jobState.length === 0 || jobRequirements.length === 0) {

                if (jobName.length === 0) { setErrorJobName(true); } if (jobRegion.length === 0) { setErrorJobRegion(true); }
                if (jobRole.length === 0) { setErrorJobRole(true); } if (jobState.length === 0) { setErrorJobState(true); }
                if (jobRequirements.length === 0) { setErrorJobRequirements(true); }
            }
            else {


                let job1 = new Job(await generateJobNumber(), jobName, jobRole, jobScope, jobRegion, jobState, description_array, jobRequirements, true, false);
                job1.add();

                console.log(
                    'Job Name: ' + jobName + '\n'
                    + 'Job Role: ' + jobRole + '\n'
                    + 'Job Region: ' + jobRegion + '\n'
                    + 'Job State: ' + jobState + '\n'
                    + 'Job Requirements: ' + jobRequirements + '\n'
                    + 'Job Description: ' + jobDescription + '\n'
                    + 'Job Description Skills: ' + jobDescriptionSkills + '\n'
                    + 'Job Additional Info: ' + jobAdditionalInfo + '\n'
                    + 'Job Scope: ' + jobScope[0].toString() + '% - ' + jobScope[1].toString() + '%' + '\n'
                );

                navigate("/manageJobs", { state: `משרה מס' ${job1._jobNumber} נוספה בהצלחה.` });
            }
        }
    }

    const handleDelete = () => {
        JobToEdit[0].remove();
        console.log(`job (id: ${JobToEdit[0]._jobNumber}) deleted successfully`);
        navigate("/manageJobs", { state: `משרה מס' ${JobToEdit[0]._jobNumber} הוסרה בהצלחה.` });
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
                                        {newJob ? 'משרה חדשה' : `משרה מס' ${state}`}
                                    </Typography>

                                    <Typography className='mt-1' sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: 'rgb(123, 128, 154)', textAlign: 'center' }} variant='subtitle1'>
                                        {newJob ? `לתשומת ליבך: פעולה זו תיצור משרה חדשה ומס' משרה חדש.` : 'לתשומת ליבך: עדכון השינויים יגרום לאובדן הנתונים הקודמים לצמיתות.'}
                                    </Typography>

                                    <Divider sx={{ marginTop: '1rem', marginBottom: '1rem' }} />

                                    <Form noValidate={true} onSubmit={handleSubmit} sx={{ width: '100%' }} className='mt-3'>


                                        <Stack direction='row'
                                            display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                                            spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }} >
                                            <Box sx={{ width: '100%' }} >
                                                <label>
                                                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>שם המשרה:</Typography>
                                                </label>

                                                <TextField style={{ width: '100%' }} sx={MyTextFieldJobNameSx} size='small' placeholder="שם המשרה (title)" id="_JobName" type="text"
                                                    className="form-control" required
                                                    value={jobName}
                                                    error={errorJobName}
                                                    onChange={(e) => {
                                                        setJobName(e.target.value);
                                                        if (jobName.length > 0 && errorJobName) { setErrorJobName(false); }
                                                    }}
                                                />
                                                <FormHelperText hidden={!errorJobName} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>
                                            </Box>
                                            <Box sx={{ width: '100%' }} >
                                                <label>
                                                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>תפקיד:</Typography>
                                                </label>
                                                <TextField style={{ width: '100%' }} sx={MyTextFieldJobRoleSx} size='small' placeholder="תפקיד (role)" id="_role" type="text"
                                                    className="form-control" required
                                                    value={jobRole}
                                                    error={errorJobRole}
                                                    onChange={(e) => {
                                                        setJobRole(e.target.value);
                                                        if (jobRole.length > 0 && errorJobRole) { setErrorJobRole(false); }
                                                    }}
                                                />
                                                <FormHelperText hidden={!errorJobRole} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>

                                            </Box>
                                        </Stack>



                                        <Stack direction='row'
                                            sx={{ mt: 1 }}
                                            display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                                            spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }}>
                                            <Box sx={{ width: '100%' }}>
                                                <label>
                                                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>איזור:</Typography>
                                                </label>
                                                <TextField style={{ width: '100%' }} sx={MyTextFieldJobRegionSx} size='small' placeholder="איזור (region)" id="_region" type="text"
                                                    className="form-control" required
                                                    value={jobRegion}
                                                    error={errorJobRegion}
                                                    onChange={(e) => {
                                                        setJobRegion(e.target.value);
                                                        if (jobRegion.length > 0 && errorJobRegion) { setErrorJobRegion(false); }
                                                    }}
                                                />

                                                <FormHelperText hidden={!errorJobRegion} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>

                                            </Box>
                                            <Box sx={{ width: '100%' }}>
                                                <label>
                                                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>Label:</Typography>
                                                </label>
                                                <TextField style={{ width: '100%' }} sx={MyTextFieldJobStateSx} size='small' placeholder="(Job_state)" id="_job_state" type="text"

                                                    required
                                                    error={errorJobState}
                                                    value={jobState}
                                                    onChange={(e) => {
                                                        setJobState(e.target.value);
                                                        if (jobState.length > 0 && errorJobState) { setErrorJobState(false); }
                                                    }}
                                                />

                                                <FormHelperText hidden={!errorJobState} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>


                                            </Box>
                                        </Stack>


                                        <Box sx={{ width: '100%', mt: 1 }}>
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>דרישות:</Typography>
                                            </label>
                                            <TextField style={{ width: '100%' }} sx={MyTextFieldJobRequirementsSx} size='small' placeholder="דרישות (requirements)" id="_requirements" type="text"
                                                className="form-control" required
                                                error={errorJobRequirements}
                                                value={jobRequirements}
                                                onChange={(e) => {
                                                    setJobRequirements(e.target.value);
                                                    if (jobRequirements.length > 0 && errorJobRequirements) { setErrorJobRequirements(false); }
                                                }}
                                            />
                                            <FormHelperText hidden={!errorJobRequirements} security="invalid" style={{ color: '#ef5350', marginRight: 0 }}>זהו שדה חובה.</FormHelperText>

                                        </Box>

                                        <Stack direction='row'
                                            sx={{ mt: 1 }}
                                            display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                                            spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }}>
                                            <Box sx={{ width: '100%' }}>
                                                <label>
                                                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>תיאור המשרה:</Typography>
                                                </label>
                                                <TextareaAutosize placeholder="Description" id="_description"
                                                    className="MyTextField" minRows={2} required
                                                    value={jobDescription}
                                                    onChange={(e) => { setJobDescription(e.target.value) }}
                                                />
                                            </Box>

                                            <Box sx={{ width: '100%' }}>
                                                <label>
                                                    <Typography sx={{ fontWeight: 600, fontSize: 13 }}>Label:</Typography>
                                                </label>
                                                <TextareaAutosize placeholder="Description_skills" id="_description_skills"
                                                    className="MyTextField" minRows={2} required
                                                    value={jobDescriptionSkills}
                                                    onChange={(e) => { setJobDescriptionSkills(e.target.value) }}
                                                />
                                            </Box>

                                        </Stack>
                                        <Box className="mt-1">
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>מידע נוסף:</Typography>
                                            </label>
                                            <TextareaAutosize placeholder="מידע נוסף (additional_info)" id="_additional_info"
                                                className="MyTextField" minRows={2} required
                                                value={jobAdditionalInfo}
                                                onChange={(e) => { setJobAdditionalInfo(e.target.value) }}
                                            />
                                        </Box>

                                        <Box className="form-group mt-1">
                                            <label>
                                                <Typography sx={{ fontWeight: 600, fontSize: 13 }}>היקף המשרה:</Typography>
                                            </label>
                                            <Box style={MyTextFieldJobRequirementsSx}>
                                                <JobScopeSlider setJobScope={setJobScope} jobScope={jobScope} />
                                            </Box>

                                        </Box>
                                        {/* <button type="submit" className="primary-btn submit">Submit</button> */}

                                        <Stack direction='row' spacing={2} sx={{ mt: 3 }}>

                                            <Button type="submit" className='mt-3 mb-3' variant='contained' sx={{
                                                backgroundColor: 'rgb(52, 71, 103)',
                                                ":hover": {
                                                    bgcolor: "rgb(52, 71, 103)",
                                                }
                                            }} fullWidth>{newJob ? 'פרסם' : 'עדכן'}</Button>

                                            {newJob ? (
                                                <></>
                                            ) : (
                                                <MyJobRemoveDialog handleDelete={handleDelete} />
                                            )}

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

export default NewJobPage;


