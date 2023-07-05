import { ArticleOutlined } from '@mui/icons-material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Autocomplete, Box, Button, Container, Divider, FormHelperText, FormLabel, Stack, Switch, TextField, TextareaAutosize, Typography, createFilterOptions, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyLoading from '../../../../Components/MyLoading/MyLoading';
import { Job, generateJobNumber, getFilteredJobs } from '../../../../Firebase/FirebaseFunctions/Job';
import { designReturnButton } from '../../ManageJobsPageStyle';
import MyJobRemoveDialog from './Components/RemoveJobDialog/RemoveJobDialog';
import RoleSingleSelection from './Components/RoleSingleSelection/RoleSingleSelection';
import JobScopeSlider from './Components/ScopeSlider/ScopeSlider';
import SectorSingleSelection from './Components/SectorSingleSelection/SectorSingleSelection';
import "./NewJobPage.css";
import { BoxGradientSx, MyLabelSx, MyPaperSx } from './NewJobStyle';

const filter = createFilterOptions<string>();

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

const NewJobPage = () =>
{
    const { state } = useLocation();

    // values
    const [jobName, setJobName] = useState<string>('');
    const [jobRole, setJobRole] = useState<string>('');
    const [jobRegion, setJobRegion] = useState<string>('');
    const [jobSector, setJobSector] = useState<string>('');
    const [jobRequirements, setJobRequirements] = useState<string>('');
    const [jobStart, setJobStart] = useState<string>('');
    const [jobDescription, setJobDescription] = useState<string>('');
    const [jobDescriptionSkills, setJobDescriptionSkills] = useState<string>('');
    const [jobAdditionalInfo, setJobAdditionalInfo] = useState<string>('');
    const [jobScope, setJobScope] = useState<number[]>([50, 100]);
    const [jobPriority, setJobPriority] = useState<boolean>(false);
    const [jobOpen, setJobOpen] = useState<boolean>(true);


    // errors
    const [errorJobName, setErrorJobName] = useState<boolean>(false);
    const [errorJobRole, setErrorJobRole] = useState<boolean>(false);
    const [errorJobRegion, setErrorJobRegion] = useState<boolean>(false);
    const [errorJobSector, setErrorJobSector] = useState<boolean>(false);
    const [errorJobRequirements, setErrorJobRequirements] = useState<boolean>(false);

    // my "editJob"
    const [myJob, setMyJob] = useState<Job>();

    // my loading
    const [loading, setLoading] = useState(true);

    const [availableLocations, setAvailableLocations] = useState<string[]>([]);

    const fetchJob = async () =>
    {

        if ((typeof state?.job?._title === 'string')) { setJobName(state?.job?._title); }
        if ((typeof state?.job?._role === 'string')) { setJobRole(state?.job?._role); }
        if ((typeof state?.job?._region === 'string')) { setJobRegion(state?.job?._region); }
        if ((typeof state?.job?._sector === 'string')) { setJobSector(state?.job?._sector); }
        if ((typeof state?.job?._requirements === 'string')) { setJobRequirements(state?.job?._requirements); }
        if ((typeof state?.job?._startOn === 'string')) { setJobStart(state?.job?._startOn); }

        if ((state?.job?._description?.length >= 1) && (typeof state?.job?._description[0] === 'string')) { setJobDescription(state?.job?._description[0]); }
        if ((state?.job?._description?.length >= 2) && (typeof state?.job?._description[1] === 'string')) { setJobDescriptionSkills(state?.job?._description[1]); }
        if ((state?.job?._description?.length >= 3) && (typeof state?.job?._description[2] === 'string')) { setJobAdditionalInfo(state?.job?._description[2]); }

        if ((state?.job?._scope?.length === 2) && (typeof state?.job?._scope[0] === 'number') && (typeof state?.job?._scope[1] === 'number')) { setJobScope(state?.job?._scope); }

        if (typeof state?.job?._open === 'boolean') { setJobOpen(state?.job?._open); }

        if (typeof state?.job?._highPriority === 'boolean') { setJobPriority(state?.job?._highPriority); }

        setLoading(true);

        let job_ = await getFilteredJobs(["jobNumber"], [state?.job?._jobNumber?.toString()]);
        setMyJob(job_[0]);

        window.history.replaceState({}, document.title); // clean state
        setLoading(false);
    }

    const fetchLocations = async () =>
    {
        const jobs = await getFilteredJobs();
        let regions = jobs.map((job) =>
        {
            return job._region;
        })
        regions = regions.reduce((accumulator: string[], value: string) =>
        {
            if (!accumulator.includes(value))
            {
                accumulator.push(value);
            }
            return accumulator;
        }, []);
        setAvailableLocations(regions);
    }


    useEffect(() =>
    {
        setLoading(false);
        if (state !== null)
        { // edit job    
            if (state?.job !== null)
            {
                fetchJob();
            }
        }
        fetchLocations()
    }, []);



    const navigate = useNavigate();


    const handleSubmit = async (event: any) =>
    {
        event.preventDefault();

        if (jobName.length === 0 || jobRole.length === 0 || jobRegion.length === 0 || jobSector.length === 0 || jobRequirements.length === 0)
        {
            if (jobName.length === 0) { setErrorJobName(true); } if (jobRegion.length === 0) { setErrorJobRegion(true); }
            if (jobRole.length === 0) { setErrorJobRole(true); } if (jobSector.length === 0) { setErrorJobSector(true); }
            if (jobRequirements.length === 0) { setErrorJobRequirements(true); }
        }
        else
        {
            //edit
            if (state !== null)
            {

                if (myJob !== null)
                {

                    setLoading(true);

                    await myJob?.edit(
                        myJob._title = jobName,
                        myJob._role = jobRole,
                        myJob._scope = jobScope,
                        myJob._region = jobRegion,
                        myJob._sector = jobSector,
                        myJob._description = new Array<string>(jobDescription, jobDescriptionSkills, jobAdditionalInfo),
                        myJob._requirements = jobRequirements!,
                        myJob._open = jobOpen,
                        myJob._highPriority = jobPriority
                    );

                    await myJob?.updateStartOn(jobStart);

                    setLoading(false);
                }

                navigate("/management/manageJobs", { state: { msg: `השינויים עבור משרה מס' ${myJob?._jobNumber} נשמרו בהצלחה.` } });
            }
            //add
            else
            {
                setLoading(true);

                let job = new Job(
                    await generateJobNumber(),
                    jobName,
                    jobRole,
                    jobScope,
                    jobRegion,
                    jobSector,
                    new Array<string>(jobDescription, jobDescriptionSkills, jobAdditionalInfo),
                    jobRequirements,
                    jobOpen,
                    jobPriority
                );

                await job.add();

                await job.updateStartOn(jobStart);

                setLoading(false);

                navigate("/management/manageJobs", { state: { msg: `משרה מס' ${job._jobNumber} נוספה בהצלחה.` } });
            }
        }
    }

    const handleDelete = async () =>
    {

        if (state !== null && myJob !== null)
        {
            setLoading(true);
            await myJob?.remove();
        }

        setLoading(false);

        navigate("/management/manageJobs", { state: { msg: `משרה מס' ${myJob?._jobNumber} הוסרה בהצלחה.` } });
    }

    const handleClick = () =>
    {
        navigate("/management/manageJobs");
    };

    return (
        <>
            {loading ? (<MyLoading loading={loading} setLoading={setLoading} />) : (

                <>
                    <Box sx={BoxGradientSx}>

                        <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                            right: 0,
                            top: '55%',
                            left: 'auto',
                            bottom: 'auto',
                            backgroundColor: 'hsla(0,0%,100%,.1)',
                            background: 'hsla(0,0%,100%,.1)',
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            position: 'absolute',
                        }} />


                        <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                            right: '6%',
                            top: '6%',
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
                            top: 0,
                            right: 'auto',
                            bottom: 'auto',
                            backgroundColor: 'hsla(0,0%,100%,.1)',
                            background: 'hsla(0,0%,100%,.1)',
                            width: '90px',
                            height: '90px',
                            borderRadius: '50%',
                            position: 'absolute',
                        }} />


                        <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                            right: '20%',
                            top: '5%',
                            bottom: 'auto',
                            backgroundColor: 'hsla(0,0%,100%,.1)',
                            background: 'hsla(0,0%,100%,.1)',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            position: 'absolute',
                        }} />

                        <Box display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }} sx={{
                            left: '0',
                            top: '30%',
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
                            top: '16%',
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
                            top: '28%',
                            bottom: 'auto',
                            backgroundColor: 'hsla(0,0%,100%,.1)',
                            background: 'hsla(0,0%,100%,.1)',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            position: 'absolute',
                        }} />

                        <Box sx={{ display: 'flex', flexDirection: 'column', top: "165px", position: "absolute" }}>
                            <Stack direction='column'>
                                <Stack direction='row' justifyContent='center' spacing={1}>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                        <ArticleOutlined sx={{ color: '#fff' }} />
                                    </Box>
                                    <Typography sx={{ fontFamily: "'Noto Sans Hebrew', sans-serif", color: '#fff', textAlign: 'center' }} variant='h4'>
                                        {state === null ? 'משרה חדשה' : `משרה מס' ${state?.job?._jobNumber}`}
                                    </Typography>

                                </Stack>


                                <Typography sx={{ opacity: 0.6, width: '100%', textAlign: 'center', color: '#fff', fontSize: '16px', fontFamily: "'Noto Sans Hebrew', sans-serif", mt: 1 }} variant='subtitle1'>
                                    {state === null ? `לתשומת ליבך: פעולה זו תיצור משרה חדשה ומס' משרה חדש.` : 'לתשומת ליבך: עדכון השינויים יוביל לאובדן הנתונים הקודמים לצמיתות.'}
                                </Typography>
                                <Box sx={{ background: 'linear-gradient(90deg,hsla(0,0%,100%,0),#fff,hsla(0,0%,100%,0))', padding: 0.05, width: '100%', mt: 2 }} />
                            </Stack>

                        </Box>
                    </Box>

                    <Box sx={MyPaperSx}>

                        <Box>
                            <Container>
                                <Box >

                                    <Box className="col-md-12">
                                        <Box className="section-title">

                                            <Form noValidate={true} onSubmit={handleSubmit} sx={{ width: '100%', mt: 3 }} >
                                                <Stack
                                                    divider={<Divider orientation='vertical' flexItem />}
                                                    justifyContent='space-evenly'
                                                    direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}
                                                    spacing={{ xs: 2, sm: 2, md: 2, lg: 8, xl: 8 }}
                                                >

                                                    <Stack direction='column'
                                                        sx={{
                                                            borderRadius: '0.25rem',
                                                            paddingTop: 2,
                                                            paddingBottom: 2,
                                                            paddingRight: 4,
                                                            paddingLeft: 4,
                                                            boxShadow: 'rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                                                        }}>

                                                        <Stack direction='row' justifyContent='space-between'
                                                        >
                                                            <Typography sx={{ fontWeight: 600, fontSize: 14, fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
                                                                הגדר כ-'משרה חמה'
                                                            </Typography>
                                                            <Switch
                                                                checked={jobPriority}
                                                                onChange={() => setJobPriority(!jobPriority)}
                                                                sx={{
                                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                                        color: '#7795f8',

                                                                    },
                                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                        backgroundColor: '#7795f8',
                                                                    },
                                                                }}
                                                            />
                                                        </Stack>

                                                        <FormHelperText security="invalid" style={{ marginRight: 0, marginTop: 0, fontSize: 10 }}>
                                                            בחירה באפשרות זו תקפיץ את המשרה לראש האתר.</FormHelperText>
                                                    </Stack>

                                                    <Stack direction='column'
                                                        sx={{
                                                            borderRadius: '0.25rem',
                                                            paddingTop: 2,
                                                            paddingBottom: 2,
                                                            paddingRight: 4,
                                                            paddingLeft: 4,
                                                            boxShadow: 'rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',

                                                        }}>

                                                        <Stack direction='row' justifyContent='space-between' spacing={3}
                                                        >
                                                            <Typography sx={{ fontWeight: 600, fontSize: 14, fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
                                                                הגדר כ-'משרה פתוחה'
                                                            </Typography>
                                                            <Switch
                                                                checked={jobOpen}
                                                                onChange={() => setJobOpen(!jobOpen)}
                                                                sx={{

                                                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                                                        color: '#7795f8',

                                                                    },
                                                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                        backgroundColor: '#7795f8',
                                                                    },
                                                                }}
                                                            />
                                                        </Stack>


                                                        <FormHelperText security="invalid" style={{ marginRight: 0, marginTop: 0, fontSize: 10 }}>
                                                            אפשרות זו תגדיר האם המשרה תופיע / לא תופיע באתר.</FormHelperText>
                                                    </Stack>


                                                </Stack>

                                                <Divider sx={{ mt: 4 }} />

                                                <Stack
                                                    sx={{ mt: 3 }}
                                                    direction='row'
                                                    display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                                                    spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }} >
                                                    <Box sx={{ width: '100%' }} >
                                                        <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                            <Typography sx={MyLabelSx}>כותרת המשרה:</Typography>
                                                            <Typography sx={{ fontSize: 14, color: '#e91e63' }}>*</Typography>
                                                        </FormLabel>

                                                        <TextField
                                                            sx={{
                                                                '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
                                                                    borderRadius: '0.375rem',
                                                                    font: 'small-caption',
                                                                },
                                                                '& .muirtl-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                                                    ':focus': {
                                                                        boxShadow: '0 0 0 0.2rem #c0cefc',
                                                                        backgroundColor: '#fff',
                                                                        border: '1px solid #7795f8',
                                                                        borderRadius: '0.375rem',
                                                                        outline: 0,
                                                                    },
                                                                },
                                                                '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                    border: '1px solid #7795f8'
                                                                },

                                                                '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                    borderColor: 'rgba(220,53,69)'

                                                                },
                                                                '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                    border: '1px',
                                                                },
                                                            }}
                                                            style={{ width: '100%' }} size='small' id="_JobName" type="text"
                                                            required
                                                            autoComplete='off'
                                                            value={jobName}
                                                            error={errorJobName}
                                                            onChange={(e) =>
                                                            {
                                                                setJobName(e.target.value);
                                                                if (jobName.length > 0 && errorJobName) { setErrorJobName(false); }
                                                            }}
                                                        />
                                                        <FormHelperText hidden={!errorJobName} security="invalid" style={{ color: '#ef5350', marginRight: '2px', marginTop: 0 }}>זהו שדה חובה.</FormHelperText>
                                                        <FormHelperText hidden={errorJobName} security="invalid" style={{ marginRight: '2px', marginTop: 0, fontSize: 10 }}>
                                                            יופיע בתור הכותרת של הכרטיסייה.</FormHelperText>
                                                    </Box>
                                                    <Box sx={{ width: '100%' }} >
                                                        <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                            <Typography sx={MyLabelSx}>איזור:</Typography>
                                                            <Typography sx={{ fontSize: 14, color: '#e91e63' }}>*</Typography>
                                                        </FormLabel>
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={availableLocations}
                                                            sx={{ width: 300 }}
                                                            style={{ width: '100%' }}
                                                            renderInput={(params) => <TextField
                                                                {...params}
                                                                sx={{
                                                                    '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
                                                                        borderRadius: '0.375rem',
                                                                        font: 'small-caption',
                                                                    },
                                                                    '& .muirtl-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                                                        ':focus': {
                                                                            boxShadow: '0 0 0 0.2rem #c0cefc',
                                                                            backgroundColor: '#fff',
                                                                            border: '1px solid #7795f8',
                                                                            borderRadius: '0.375rem',
                                                                            outline: 0,
                                                                        },
                                                                    },
                                                                    '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                        border: '1px solid #7795f8'
                                                                    },

                                                                    '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                        borderColor: 'rgba(220,53,69)'

                                                                    },
                                                                    '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                        border: '1px',
                                                                    },
                                                                }}
                                                                size='small'
                                                                id="_region"
                                                                type="text"
                                                                required
                                                                value={jobRegion}
                                                                error={errorJobRegion}
                                                                onChange={(e) =>
                                                                {
                                                                    if (jobRegion.length > 0 && errorJobRegion) { setErrorJobRegion(false); }
                                                                }}
                                                            />
                                                            }
                                                            onChange={(event, value) =>
                                                            {
                                                                if (value?.includes("אחר: "))
                                                                {
                                                                    setJobRegion(value?.replace("אחר: ", ""));
                                                                } else
                                                                {
                                                                    setJobRegion(value ? value : "");
                                                                }
                                                            }}
                                                            filterOptions={(options, params) =>
                                                            {
                                                                const filtered = filter(options, params);

                                                                if (Object.keys(filtered).length === 0)
                                                                {
                                                                    filtered.push("אחר: " + params.inputValue);
                                                                }

                                                                return filtered;
                                                            }}
                                                        />

                                                        <FormHelperText hidden={!errorJobRegion} security="invalid" style={{ color: '#ef5350', marginRight: '2px', marginTop: 0 }}>זהו שדה חובה.</FormHelperText>
                                                    </Box>
                                                </Stack>



                                                <Stack direction={{ xs: 'column', sm: 'column', md: 'column', lg: 'row', xl: 'row' }}

                                                    sx={{ mt: 1 }}

                                                    spacing={{ xs: 0, sm: 0, md: 1, lg: 2, xl: 2 }}>


                                                    <Box sx={{ width: '100%' }}>
                                                        <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                            <Typography sx={MyLabelSx}>תפקיד:</Typography>
                                                            <Typography sx={{ fontSize: 14, color: '#e91e63' }}>*</Typography>
                                                        </FormLabel>

                                                        <RoleSingleSelection jobRole={jobRole} setJobRole={setJobRole} error={errorJobRole} setError={setErrorJobRole} />
                                                        <FormHelperText hidden={!errorJobRole} security="invalid" style={{ color: '#ef5350', marginRight: 0, marginTop: 0 }}>זהו שדה חובה.</FormHelperText>
                                                    </Box>


                                                    <Box sx={{ width: '100%' }}>
                                                        <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                            <Typography sx={MyLabelSx}>אשכול:</Typography>
                                                            <Typography sx={{ fontSize: 14, color: '#e91e63' }}>*</Typography>
                                                        </FormLabel>

                                                        <SectorSingleSelection jobSector={jobSector} setJobSector={setJobSector} error={errorJobSector} setError={setErrorJobSector} />

                                                        <FormHelperText hidden={!errorJobSector} security="invalid" style={{ color: '#ef5350', marginRight: 0, marginTop: 0 }}>זהו שדה חובה.</FormHelperText>

                                                    </Box>

                                                </Stack>


                                                <Box sx={{ width: '100%', mt: 1 }}>
                                                    <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                        <Typography sx={MyLabelSx}>תחילת עבודה:</Typography>
                                                        <Typography sx={{ fontSize: 14, color: '#e91e63' }}>*</Typography>
                                                    </FormLabel>

                                                    <TextField
                                                        sx={{
                                                            '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
                                                                borderRadius: '0.375rem',
                                                                font: 'small-caption',
                                                            },
                                                            '& .muirtl-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                                                                ':focus': {
                                                                    boxShadow: '0 0 0 0.2rem #c0cefc',
                                                                    backgroundColor: '#fff',
                                                                    border: '1px solid #7795f8',
                                                                    borderRadius: '0.375rem',
                                                                    outline: 0,
                                                                },
                                                            },
                                                            '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                                                                border: '1px solid #7795f8'
                                                            },

                                                            '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
                                                                borderColor: 'rgba(220,53,69)'

                                                            },
                                                            '& .muirtl-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                                border: '1px',
                                                            },
                                                        }}
                                                        style={{ width: '100%' }} size='small' id="_requirements" type="text"
                                                        required
                                                        error={errorJobRequirements}
                                                        value={jobStart}
                                                        onChange={(e) =>
                                                        {
                                                            setJobStart(e.target.value);
                                                            if (jobRequirements.length > 0 && errorJobRequirements) { setErrorJobRequirements(false); }
                                                        }}
                                                    />
                                                    <FormHelperText hidden={!errorJobRequirements} security="invalid" style={{ color: '#ef5350', marginRight: '2px', marginTop: 0 }}>זהו שדה חובה.</FormHelperText>
                                                    <FormHelperText hidden={errorJobRequirements} security="invalid" style={{ marginRight: '2px', marginTop: 0, fontSize: 10 }}>הסבר כללי על הדרישות, יופיע בתור תת הכותרת של הכרטיסייה.</FormHelperText>

                                                </Box>

                                                <Stack direction='row'
                                                    sx={{ mt: 1 }}
                                                    display={{ xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'flex' }}
                                                    spacing={{ xs: 0, sm: 0, md: 0, lg: 2, xl: 2 }}>

                                                    <Stack sx={{ width: '100%' }} direction='column' spacing={0}>
                                                        <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                            <Typography sx={MyLabelSx}>תיאור המשרה:</Typography>
                                                        </FormLabel>

                                                        <TextareaAutosize id="_description"
                                                            className="MyTextField" minRows={2} required
                                                            value={jobDescription}
                                                            onChange={(e) => { setJobDescription(e.target.value) }}
                                                        />
                                                        <FormHelperText security="invalid" style={{ marginRight: 0, marginTop: 0, fontSize: 10 }}>
                                                            הסבר כללי על המשרה, יופיע בתור "איך יראה היום שלך" בדף המשרה.</FormHelperText>
                                                    </Stack>

                                                    <Stack sx={{ width: '100%' }} direction='column' spacing={0}>
                                                        <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                            <Typography sx={MyLabelSx}>דרישות המשרה:</Typography>
                                                        </FormLabel>

                                                        <TextareaAutosize id="_description_skills"
                                                            className="MyTextField" minRows={2} required
                                                            value={jobRequirements}
                                                            onChange={(e) =>
                                                            {
                                                                setJobRequirements(e.target.value);
                                                                if (jobRequirements.length > 0 && errorJobRequirements) { setErrorJobRequirements(false); }
                                                            }}
                                                        />
                                                        <FormHelperText security="invalid" style={{ marginRight: '2px', marginTop: 0, fontSize: 10 }}>
                                                            תיאור מפורט יותר לגבי הדרישות, יופיע בתור "מה אנחנו מחפשים" בדף המשרה.</FormHelperText>
                                                    </Stack>

                                                </Stack>

                                                <Box sx={{ mt: 1 }}>
                                                    <FormLabel sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
                                                        <Typography sx={MyLabelSx}>היקף המשרה:</Typography>
                                                    </FormLabel>

                                                    <Box>
                                                        <JobScopeSlider setJobScope={setJobScope} jobScope={jobScope} />
                                                    </Box>

                                                </Box>





                                                <Stack direction='row' spacing={2} sx={{ mt: 3, mb: 3 }}>



                                                    <Button type="submit" variant='contained'
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            backgroundColor: '#555abf',
                                                            ":hover": {
                                                                bgcolor: "#555abf",
                                                            }
                                                        }} fullWidth>{state === null ? 'פרסם' : 'עדכן'}</Button>

                                                    {state === null ? (
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
            )}

        </>

    )
}

export default NewJobPage;


