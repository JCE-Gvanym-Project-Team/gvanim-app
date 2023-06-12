import { AddBoxSharp, ArrowDownward, ArrowUpward, AttachFile, DeleteForeverOutlined, ErrorOutlineRounded, Redo, Send } from '@mui/icons-material';
import { Box, Button, Divider, Input, TextField, Typography, useTheme } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MyLoading from '../../Components/MyLoading/MyLoading';
import { Job, getFilteredJobs } from '../../Firebase/FirebaseFunctions/Job';
import { Recomendation } from '../../Firebase/FirebaseFunctions/Recomendation';
import { Candidate, generateCandidateId, getFilteredCandidateJobStatuses, getFilteredCandidates } from '../../Firebase/FirebaseFunctions/functionIndex';
import { ColorModeContext, colorTokens } from '../theme';
import AreYouSureDialog from './Components/AreYouSureDialog/AreYouSureDialog';
import SuccessDialog from './Components/SuccessDialog/SuccessDialog';
import ErrorDialog from './Components/ErrorDialog/ErrorDialog';
import JobsDetails from './Components/JobDetails/JobDetails';



const ABOUT_MAX_LENGTH = 1000;
const MAX_RECOMMENDERS = 3;

const marginLeftAndRight = "18.75vw"

export default function OneJobPage()
{
    const [job, setJob] = useState<Job | null>(null);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // dialogs
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
    const [areYouSureDialogIndex, setAreYouSureDialogIndex] = useState(0);
    const [areYouSureDialogRecommenderName, setAreYouSureDialogRecommenderName] = useState("");

    const successDialogOnClose = (event, reason, sendDataToAllJobsPage) =>
    {
        if ((reason && reason !== "backdropClick" && reason !== "clickaway") || reason === undefined)
        {
            console.log(sendDataToAllJobsPage);
            if (sendDataToAllJobsPage)
            {
                const state = {
                    candidateName: candidateName,
                    candidateSurname: candidateSurname,
                    candidateEmail: candidateEmail,
                    candidatePhone: candidatePhone,
                    candidateAboutText: aboutText
                }
                navigate("/career/jobs", { state })
            }
            setSuccessDialogOpen(false);
        }
    }

    const errorDialogOnClose = (event, reason) =>
    {
        if ((reason && reason !== "backdropClick") || reason === undefined)
        {
            setErrorDialogOpen(false);
        }
    }

    const areYouSureDialogOnClose = (event, reason, index, areYouSureValue) =>
    {
        if ((reason && reason !== "backdropClick") || reason === undefined)
        {
            setAreYouSureDialogOpen(false);
        }
        if (areYouSureValue)
        {
            updateRecommendersListAtIndex(null, null, index);
            setNumRecommenders(numRecommenders - 1);
        }
    }

    // about text field
    const [aboutNumChars, setAboutNumChars] = useState(0);

    // recommenders
    const [numRecommenders, setNumRecommenders] = useState(0);
    const [recommendersList, setRecommendersList] = useState<Array<[Recomendation | null, File | null]>>();
    const [recommendersListOpen, setRecommendersListOpen] = useState(false);
    const [recommendersErrors, setRecommendersErrors] = useState<boolean[][]>
        ([
            // index 0 = phone error. index 1 = email error
            [false, false],
            [false, false],
            [false, false]
        ]);

    // changes recommendersList at the given index
    const updateRecommendersListAtIndex = function (newRecommendation: Recomendation | null, newFile: File | null, index: number)
    {
        setRecommendersList(prevList =>
        {
            const newList = [...prevList!]; // Create a copy of the array
            if (newList.length > 0)
            {
                newList[index] = [newRecommendation, newFile]; // Set the new value at index 0
            }
            return newList;
        });
    }

    // candidate details
    const [candidateName, setCandidateName] = useState("");
    const [candidateNameError, setCandidateNameError] = useState(false);

    const [candidateSurname, setCandidateSurname] = useState("");
    const [candidateSurnameError, setCandidateSurnameError] = useState(false);

    const [candidatePhone, setCandidatePhone] = useState("");
    const [candidatePhoneError, setCandidatePhoneError] = useState(false);

    const [candidateEmail, setCandidateEmail] = useState("");
    const [candidateEmailError, setCandidateEmailError] = useState(false);

    const [aboutText, setAboutText] = useState("");

    // recommender file input ref
    const recommenderFileInputRefs = useRef<HTMLInputElement[]>([]);

    // CV file
    const cvFileInputRef = useRef<HTMLInputElement>(null);
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvFileError, setCvFileError] = useState(false);

    // get current job from URL
    const location = useLocation();
    const fetchJob = async () =>
    {
        setJob((await getFilteredJobs(["jobNumber"], [getJobIdFromUrl(location.pathname)]))[0]);
    }

    useEffect(() =>
    {
        fetchJob();
        // init recommendersList
        let temp = Array<[Recomendation | null, File | null]>();
        for (let index = 0; index < MAX_RECOMMENDERS; index++)
        {
            temp.push([null, null])
        }
        setRecommendersList(temp);

        setDefaults();

        // get info from state
        setCandidateName(location.state?.candidateName);
        setCandidateSurname(location.state?.candidateSurname);
        setCandidatePhone(location.state?.candidatePhone);
        setCandidateEmail(location.state?.candidateEmail);
        setAboutText(location.state?.candidateAboutText);
        setAboutNumChars(location.state?.candidateAboutText.length);

        updateRecommendersListAtIndex(new Recomendation("", "", ""), null, 0);
        setNumRecommenders(1);

        setLoading(false);
    }, [location.state])

    // submit
    const handleSubmit = async () =>
    {
        console.log(candidateName);
        // handle errors
        if (!candidateName || candidateName === "")
        {
            setCandidateNameError(true);
        } else
        {
            setCandidateNameError(false);
        }

        if (!candidateSurname || candidateSurname === "")
        {
            setCandidateSurnameError(true);
        } else
        {
            setCandidateSurnameError(false);
        }

        if (candidatePhone === "" || !isPhoneValid(candidatePhone))
        {
            setCandidatePhoneError(true);
        } else
        {
            setCandidatePhoneError(false);
        }

        if (candidateEmail === "" || !isEmailValid(candidateEmail))
        {
            setCandidateEmailError(true);
        } else
        {
            setCandidateEmailError(false);
        }

        if (candidateName === "" || candidateSurname === "" || candidatePhone === "" || candidateEmail === "")
        {
            console.log(candidateNameError);
            return;
        }

        if (!cvFile)
        {
            setCvFileError(true);
            return;
        }
        setCvFileError(false);

        if (recommendersListOpen && !checkRecommenders())
        {
            console.log(recommendersErrors);
            return;
        }

        // insert candidate into database
        setLoading(true);
        let newCandidateId = await generateCandidateId();
        let newCandidate = new Candidate(
            newCandidateId,
            candidateName,
            candidateSurname,
            candidatePhone,
            candidateEmail,
            -1,
            ""
        );
        // add candidate, or get existing candidate
        if (!await newCandidate.add())
        {
            newCandidate = (await getFilteredCandidates(["eMail", "phone"], [candidateEmail, candidatePhone]))[0];
            newCandidateId = newCandidate._id;
        }

        // apply 
        if (!await newCandidate.apply(job?._jobNumber!, aboutText))
        {
            setLoading(false);
            setErrorDialogOpen(true);
            return;
        }

        if (recommendersListOpen)
        {
            // add recommenders and CV
            let candidateJobStatus = (await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [job?._jobNumber.toString()!, newCandidateId]))[0];
            await candidateJobStatus.updateAbout(aboutText);
            recommendersList?.forEach(async (recommender) =>
            {
                const recommenderInfo = recommender[0];
                const file = recommender[1];
                if (recommenderInfo)
                {
                    if (!file)
                    {
                        await candidateJobStatus.addRecomendation(recommenderInfo._fullName, recommenderInfo._phone, recommenderInfo._eMail, new File([''], ''));
                    } else
                    {
                        await candidateJobStatus.addRecomendation(recommenderInfo._fullName, recommenderInfo._phone, recommenderInfo._eMail, file);
                    }
                }
            })
        }

        newCandidate.uploadCv(cvFile);
        setLoading(false);

        setSuccessDialogOpen(true);

        // set defaults values
        setDefaults();
    }

    const isPhoneValid = (phone: string) =>
    {
        return /^05[0-57-8][0-9]{7}$/gm.test(phone);
    }

    const isEmailValid = (email: string) =>
    {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
    }

    const setDefaults = () =>
    {
        // reset cv file
        setCvFileError(false);
        setCvFile(null);

        // reset recommenders
        for (let index = 0; index < numRecommenders; index++)
        {
            updateRecommendersListAtIndex(null, null, index);

        }
        setNumRecommenders(0);
        setRecommendersErrors(
            recommendersErrors.map(() =>
            {
                return [false, false]
            })
        );

        // reset dialogs
        setErrorDialogOpen(false);
        setAreYouSureDialogOpen(false);
    }

    /**
     * checks whether the phone and email provided 
     * by the user for each recommender is valid. 
     * @returns false if any of them are invalid (and updates recommendersErrors). true otherwise.
     */
    const checkRecommenders = () =>
    {
        let result = true;
        let recommendersErrorsResult = recommendersErrors;
        recommendersList?.forEach((recommender, index) =>
        {
            const recommenderInfo = recommender[0];
            const file = recommender[1];
            if (!recommenderInfo && !file)
            {
                return result && true;
            } else
            {
                let emailValid = isEmailValid(recommenderInfo?._eMail!);
                let phoneValid = isPhoneValid(recommenderInfo?._phone!);
                if (!emailValid || !phoneValid)
                {
                    // set errors for appropriate index
                    recommendersErrorsResult = recommendersErrorsResult.map((recommenderError, errorIndex) =>
                    {
                        if (errorIndex === index)
                        {
                            return [!phoneValid, !emailValid];
                        } else
                        {
                            return [recommenderError[0], recommenderError[1]];
                        }
                    });
                    result = result && false;
                }
                result = result && true;
            }
        })
        setRecommendersErrors(recommendersErrorsResult);
        return result;
    }

    return (
        loading ? <MyLoading loading={loading} setLoading={setLoading} /> :
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "stretch",
                    justifyContent: "stretch",
                    marginLeft: { xs: "0", md: marginLeftAndRight },
                    marginRight: { xs: "0", md: marginLeftAndRight },
                    backgroundColor: "background.main",
                    marginTop: "256px"
                }}
            >

                {/* Go back to all jobs button */}
                <Button
                    variant='outlined'
                    sx={{
                        alignSelf: "start",
                        backgroundColor: "background.boxInner",
                        "&:hover": {
                            backgroundColor: "background.main"
                        },
                        marginTop: "1rem"
                    }}
                    onClick={() => navigate("/career/jobs")}

                >
                    <Typography
                        variant='h6'
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold",
                            color: "primary.title"
                        }}
                    >

                        <Redo sx={{ marginRight: "0.3rem" }} />
                        לכל המשרות
                    </Typography>
                </Button>

                {/* Job Number */}
                <Box sx={{ display: "flex", flexDirection: "row", width: "41.71875vw" }}>

                    <Typography variant='h5' sx={{ letterSpacing: 0 }}>
                        משרה מספר:
                    </Typography>
                    <Typography variant='h5' sx={{ marginLeft: "11px" }}>
                        {job?._jobNumber}
                    </Typography>
                </Box>

                {/* Job Title */}
                <Box
                    sx={{
                        backgroundColor: "background.box",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        textAlign: "left",
                        width: "41.71875vw"
                    }}
                >

                    <Typography
                        sx={{
                            color: "primary.main"
                        }}
                        variant='h1'
                    >
                        {job?._title}
                    </Typography>
                </Box>

                {/* Job description, stats and requirements */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: "stretch",
                        backgroundColor: "background.main",
                        marginTop: "1rem",
                    }}
                >

                    {/* Description, requirements, stats and additional info */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "background.box",
                            flex: 8,
                            marginRight: { xs: "0", md: "1rem" },
                            marginBottom: { xs: "1rem", md: "0" }
                        }}
                    >
                        {/* description and requirements */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column"
                            }}
                        >

                            {/* description */}
                            <Box
                                sx={{
                                    flex: 7
                                }}
                            >
                                <Typography variant="h2">
                                    תיאור המשרה:
                                </Typography>

                                <Typography
                                    variant='h3'
                                    marginTop={"15px"}
                                    sx={{
                                        backgroundColor: "background.boxInner",
                                        width: "30vw"
                                    }}
                                >
                                    {job?._description?.length! >= 1 ?
                                        job?._description[0].split('\n').map((line) =>
                                        {
                                            return (
                                                <React.Fragment>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            )
                                        })
                                        : ""
                                    }
                                </Typography>
                            </Box>

                        </Box>
                        {/* requirements */}
                        <Box
                            sx={{
                                backgroundColor: "background.box",
                                flex: 4
                            }}
                        >
                            <Typography variant="h2" marginTop={"73px"}>
                                דרישות התפקיד:
                            </Typography>

                            <Typography
                                variant='h3'
                                marginTop={"15px"}
                                sx={{
                                    backgroundColor: "background.boxInner",
                                    width: "28vw"
                                }}
                            >
                                {job?._requirements.split('\n').map((line) =>
                                {
                                    return (
                                        <React.Fragment>
                                            {line}
                                            <br />
                                        </React.Fragment>
                                    )
                                })}
                            </Typography>
                        </Box>

                        {/* Additional Info */}
                        <Box
                            sx={{
                                display: job?._description?.length! >= 2 ? "none" : "block"
                            }}
                        >
                            <Typography variant="h1">
                                מידע נוסף
                            </Typography>

                            <Divider sx={{
                                marginRight: "3rem",
                                backgroundColor: "primary.faded"
                            }} />

                            <Typography
                                variant='h3'
                                marginTop={"0.5rem"}
                                sx={{
                                    backgroundColor: "background.boxInner"
                                }}
                            >
                                {job?._description?.length! >= 2 ? job?._description[1] : ""}
                            </Typography>
                        </Box>

                    </Box>

                    {/* Job Details */}
                    <JobsDetails job={job} />

                </Box>

                {/* Apply Text */}
                <Typography
                    variant='h2'
                    sx={{
                        alignSelf: "center",
                        marginTop: "313px",
                        marginBottom: "76px"
                    }}
                >
                    השאירו פרטים כאן:
                </Typography>

                {/* Candidate Details */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "background.box",
                        marginTop: "0.5rem",
                    }}
                >

                    {/* Details */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        {/* Firstname and Lastname */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                marginRight: { xs: "1rem", md: "5rem" }
                            }}
                        >
                            {/* Firstname */}
                            <Box>
                                <Typography variant='h4'>
                                    שם פרטי:
                                </Typography>
                                <TextField
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: candidateNameError ? 'error.main' : "primary.main",
                                            }
                                        },
                                    }}
                                    color={candidateNameError ? 'error' : "primary"}
                                    onChange={(event) =>
                                    {
                                        setCandidateNameError(false);
                                        setCandidateName(event.target.value);
                                    }}
                                />
                                <Box sx={{
                                    display: candidateNameError ? "flex" : "none",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <ErrorOutlineRounded sx={{ fontSize: "24px", color: "error.main" }} />

                                    <Typography variant='h4' color={"error.main"}>
                                        שדה זה שגוי
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Lastname */}
                            <Box
                                sx={{
                                    marginLeft: { xs: "0", md: "5rem" }
                                }}
                            >
                                <Typography variant='h4'>
                                    שם משפחה:
                                </Typography>
                                <TextField
                                    variant='outlined'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: candidateSurnameError ? 'error.main' : "primary.main",
                                            }
                                        },
                                    }}
                                    color={candidateSurnameError ? 'error' : "primary"}
                                    onChange={(event) =>
                                    {
                                        setCandidateSurnameError(false);
                                        setCandidateSurname(event.target.value);
                                    }}
                                />
                                <Box sx={{
                                    display: candidateSurnameError ? "flex" : "none",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <ErrorOutlineRounded sx={{ fontSize: "24px", color: "error.main" }} />

                                    <Typography variant='h4' color={"error.main"}>
                                        שדה זה שגוי
                                    </Typography>
                                </Box>

                            </Box>

                        </Box>

                        {/* Phone and Email */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" }
                            }}
                        >
                            {/* Phone */}
                            <Box>
                                <Typography variant='h4'>
                                    טלפון:
                                </Typography>
                                <TextField
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: candidatePhoneError ? 'error.main' : "primary.main",
                                            }
                                        },
                                    }}
                                    color={candidatePhoneError ? 'error' : "primary"}
                                    onChange={(event) =>
                                    {
                                        setCandidatePhoneError(false);
                                        setCandidatePhone(event.target.value);
                                    }}
                                />
                                <Box sx={{
                                    display: candidatePhoneError ? "flex" : "none",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <ErrorOutlineRounded sx={{ fontSize: "24px", color: "error.main" }} />

                                    <Typography variant='h4' color={"error.main"}>
                                        שדה זה שגוי
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Email */}
                            <Box
                                sx={{
                                    marginLeft: { xs: "0", md: "5rem" }
                                }}
                            >
                                <Typography variant='h4'>
                                    אימייל:
                                </Typography>
                                <TextField
                                    variant='outlined'
                                    type='email'
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: candidateEmailError ? 'error.main' : "primary.main",
                                            }
                                        },
                                    }}
                                    color={candidateEmailError ? 'error' : "primary"}
                                    onChange={(event) =>
                                    {
                                        setCandidateEmailError(false);
                                        setCandidateEmail(event.target.value);
                                    }}
                                />
                                <Box sx={{
                                    display: candidateEmailError ? "flex" : "none",
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}>
                                    <ErrorOutlineRounded sx={{ fontSize: "24px", color: "error.main" }} />

                                    <Typography variant='h4' color={"error.main"}>
                                        שדה זה שגוי
                                    </Typography>
                                </Box>
                            </Box>

                        </Box>
                    </Box>

                    {/* About */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            marginTop: "54px"
                        }}
                    >
                        <Typography variant='h4'>
                            ספרו לנו קצת עליכם:
                        </Typography>
                        <TextField
                            label="כתבו כאן..."
                            multiline
                            variant='outlined'
                            rows={10}
                            sx={{
                                width: { xs: "100%", md: "100%" },
                                backgroundColor: "background.boxInner",
                                marginTop: "15px"
                            }}
                            inputProps={{
                                maxLength: ABOUT_MAX_LENGTH
                            }}
                            onChange={(event) =>
                            {
                                setAboutNumChars(event?.target.value.length);
                                setAboutText(event.target.value);
                            }}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "end",
                                width: "100%",
                                marginBottom: "1rem"
                            }}
                        >
                            <Typography variant='h4'>
                                {aboutNumChars} / {ABOUT_MAX_LENGTH}
                            </Typography>
                        </Box>
                    </Box>
                    {/* attach CV file button */}
                    <Box>
                        <Input
                            type="file"
                            inputRef={cvFileInputRef}
                            style={{ display: 'none' }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            {
                                const files = event.target.files!;
                                setCvFile(files[0]);
                                setCvFileError(false);
                            }}
                        />
                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: "background.boxInner",
                                color: "primary.main",
                                "&:hover": {
                                    backgroundColor: "background.main"
                                }
                            }}
                            onClick={() =>
                            {
                                // trigger input onChange
                                if (cvFileInputRef.current)
                                {
                                    cvFileInputRef.current.click();
                                }
                            }}

                        >
                            <AttachFile
                                sx={{ fontSize: "24px" }}
                            />
                            <Box
                                sx={{
                                    flexDirection: "column"
                                }}
                            >
                                <Typography variant='h4'>
                                    צירוף קורות חיים
                                </Typography>

                                {/* display filename to the user */}
                                <Typography variant='h6'>
                                    {cvFile?.name.slice(0, 10)}
                                    {cvFile?.name.length! > 10 ? '...' : ''}
                                </Typography>


                            </Box>
                        </Button>
                        <Box sx={{
                            display: cvFileError ? "flex" : "none",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <ErrorOutlineRounded sx={{ fontSize: "24px", color: "error.main" }} />

                            <Typography variant='h4' color={"error.main"}>
                                שדה זה הוא חובה
                            </Typography>
                        </Box>
                    </Box>

                    {/* Recommenders */}
                    <Box
                        sx={{
                            display: "flex",
                            alignSelf: "center",
                            flexDirection: "column",
                            alignItems: "start",
                            width: "100%",
                            marginTop: "134px",
                        }}
                    >

                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                            <Button onClick={() => { setRecommendersListOpen(!recommendersListOpen) }}>
                                <Typography variant='h2'>
                                    הוספת ממליצים
                                </Typography>
                                <Typography variant='h2' marginLeft={"12px"}>
                                    (אופציונאלי)
                                </Typography>
                                <Typography variant='h2' marginLeft={"22px"}>
                                    {recommendersListOpen ? <ArrowDownward /> : <ArrowUpward />}
                                </Typography>
                            </Button>
                        </Box>

                        {/* List of recommenders */}
                        <Box sx={{
                            backgroundColor: "background.boxInner",
                            flexDirection: "column",
                            paddingTop: "36px",
                            paddingBottom: "36px",
                            paddingRight: "23px",
                            paddingLeft: "23px",
                            alignItems: "center",
                            marginTop: "30px",

                            display: recommendersListOpen ? "flex" : "none"
                        }}
                        >
                            {recommendersList?.map((recommender, index) =>
                            {
                                if (recommender[0] !== null)
                                {
                                    return (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                width: "100%",
                                                marginBottom: index >= MAX_RECOMMENDERS - 1 ? "0" : "43px"
                                            }}
                                            key={index + "recommendersBox"}
                                        >

                                            {/* delete recommender button */}
                                            <Button
                                                sx={{
                                                    display: { xs: "none", md: "flex" }
                                                }}
                                                onClick={() =>
                                                {
                                                    setAreYouSureDialogIndex(index);
                                                    setAreYouSureDialogOpen(true);
                                                    setAreYouSureDialogRecommenderName(recommender[0]?._fullName!);
                                                }}
                                            >
                                                <DeleteForeverOutlined />
                                            </Button>
                                            {/* are you sure you want to delete recommender dialog */}
                                            <AreYouSureDialog
                                                open={areYouSureDialogOpen}
                                                onClose={areYouSureDialogOnClose}
                                                recommenderName={areYouSureDialogRecommenderName}
                                                index={areYouSureDialogIndex}
                                            />
                                            {/* Recommender */}
                                            <Box
                                                sx={{
                                                    backgroundColor: "background.box",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent: "space-between",
                                                    padding: "1rem",
                                                    paddingTop: "0",
                                                    paddingBottom: "1rem",
                                                }}>

                                                {/* name + phone + email + buttons*/}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: { xs: "column", md: "row" }
                                                    }}
                                                >
                                                    {/* mobile delete + attach file buttons */}
                                                    <Box
                                                        sx={{
                                                            display: { xs: "flex", md: "none" },
                                                            flexDirection: "row",
                                                            justifyContent: "space-between"
                                                        }}
                                                    >
                                                        {/* mobile attach file button */}
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignSelf: "end",
                                                            }}
                                                        >
                                                            {/* add recommender file button */}
                                                            <Input
                                                                type="file"
                                                                inputRef={(input) => (recommenderFileInputRefs.current[index] = input)}
                                                                style={{ display: 'none' }}
                                                                onChange={(event) =>
                                                                {
                                                                    const inputElement = event.target as HTMLInputElement;
                                                                    const files = inputElement.files;
                                                                    if (files && files.length > 0)
                                                                    {
                                                                        updateRecommendersListAtIndex(recommendersList[index][0], files[0], index);
                                                                    }
                                                                }}
                                                            />
                                                            <Button
                                                                sx={{
                                                                    display: { xs: "flex", md: "none" }
                                                                }}
                                                                onClick={() =>
                                                                {
                                                                    // trigger input onChange
                                                                    if (recommenderFileInputRefs.current[index])
                                                                    {
                                                                        recommenderFileInputRefs.current[index]?.click()
                                                                    }
                                                                }}

                                                            >
                                                                <AttachFile
                                                                    sx={{ fontSize: "24px" }}
                                                                />
                                                                {/* display filename to the user */}
                                                                <Typography variant='h6'>
                                                                    {recommendersList[index][1]?.name.length! > 20 ? '...' : ''}
                                                                    {recommendersList[index][1] ? recommendersList[index][1]?.name.slice(0, 20) : ""}
                                                                </Typography>
                                                            </Button>

                                                        </Box>

                                                        {/* Remove recommender button */}
                                                        <Button
                                                            onClick={() =>
                                                            {
                                                                setAreYouSureDialogIndex(index);
                                                                setAreYouSureDialogOpen(true);
                                                                setAreYouSureDialogRecommenderName(recommender[0]?._fullName!);
                                                            }}
                                                        >
                                                            <DeleteForeverOutlined />
                                                        </Button>
                                                    </Box>

                                                    {/* Recommender name */}
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            marginRight: "1rem"
                                                        }}
                                                    >
                                                        <Typography
                                                            variant='h4'
                                                        >
                                                            שם:
                                                        </Typography>
                                                        <TextField
                                                            onChange={(event) =>
                                                            {
                                                                const currentRecommender = recommendersList[index][0];
                                                                updateRecommendersListAtIndex(
                                                                    new Recomendation(event.target.value,
                                                                        currentRecommender?._phone!,
                                                                        currentRecommender?._eMail!
                                                                    ),
                                                                    null,
                                                                    index
                                                                );
                                                            }}
                                                        />
                                                    </Box>

                                                    {/* Recommender phone */}
                                                    <Box
                                                        sx={{
                                                            marginRight: "1rem"
                                                        }}>
                                                        <Typography
                                                            variant='h4'
                                                        >
                                                            טלפון:
                                                        </Typography>
                                                        <TextField
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        borderColor: recommendersErrors[index][0] ? 'error.main' : "primary.main",
                                                                    }
                                                                },
                                                            }}
                                                            onChange={(event) =>
                                                            {
                                                                const currentRecommender = recommendersList[index][0];
                                                                updateRecommendersListAtIndex(
                                                                    new Recomendation(currentRecommender?._fullName!,
                                                                        event.target.value,
                                                                        currentRecommender?._eMail!
                                                                    ),
                                                                    null,
                                                                    index
                                                                );

                                                                // remove error message
                                                                setRecommendersErrors(
                                                                    recommendersErrors.map((recommenderError, ind) =>
                                                                    {
                                                                        if (index === ind)
                                                                        {
                                                                            return [false, recommenderError[1]];
                                                                        } else
                                                                        {
                                                                            return [recommenderError[0], recommenderError[1]];
                                                                        }
                                                                    })
                                                                );
                                                            }}
                                                        />
                                                        <Box sx={{
                                                            display: recommendersErrors[index][0] ? "flex" : "none",
                                                            flexDirection: "row",
                                                            alignItems: "center"
                                                        }}>
                                                            <ErrorOutlineRounded sx={{ fontSize: "24px", color: "error.main" }} />

                                                            <Typography variant='h4' color={"error.main"}>
                                                                שדה זה שגוי
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                    {/* Recommender email */}
                                                    <Box sx={{ marginRight: "1rem" }}>
                                                        <Typography
                                                            variant='h4'
                                                        >
                                                            אימייל:
                                                        </Typography>
                                                        <TextField
                                                            sx={{
                                                                '& .MuiOutlinedInput-root': {
                                                                    '& fieldset': {
                                                                        borderColor: recommendersErrors[index][1] ? 'error.main' : "primary.main",
                                                                    }
                                                                },
                                                            }}
                                                            onChange={(event) =>
                                                            {
                                                                const currentRecommender = recommendersList[index][0];
                                                                updateRecommendersListAtIndex(
                                                                    new Recomendation(currentRecommender?._fullName!,
                                                                        currentRecommender?._phone!,
                                                                        event.target.value
                                                                    ),
                                                                    null,
                                                                    index
                                                                );

                                                                // remove error message
                                                                setRecommendersErrors(
                                                                    recommendersErrors.map((recommenderError, ind) =>
                                                                    {
                                                                        if (index === ind)
                                                                        {
                                                                            return [recommenderError[0], false];
                                                                        } else
                                                                        {
                                                                            return [recommenderError[0], recommenderError[1]];
                                                                        }
                                                                    })
                                                                );
                                                            }}
                                                        />
                                                        <Box sx={{
                                                            display: recommendersErrors[index][1] ? "flex" : "none",
                                                            flexDirection: "row",
                                                            alignItems: "center"
                                                        }}>
                                                            <ErrorOutlineRounded sx={{ color: "error.main" }} />

                                                            <Typography variant='h4' color={"error.main"}>
                                                                שדה זה שגוי
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </Box>

                                                {/* Attach recommender file button */}
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        height: "72%",
                                                        alignSelf: "end",
                                                    }}
                                                >
                                                    {/* PC add recommender file input */}
                                                    <Input
                                                        type="file"
                                                        inputRef={(input) => (recommenderFileInputRefs.current[index] = input)}
                                                        style={{ display: 'none' }}
                                                        onChange={(event) =>
                                                        {
                                                            const inputElement = event.target as HTMLInputElement;
                                                            const files = inputElement.files;
                                                            if (files && files.length > 0)
                                                            {
                                                                updateRecommendersListAtIndex(recommendersList[index][0], files[0], index);
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        sx={{
                                                            display: { xs: "none", md: "flex" }
                                                        }}
                                                        onClick={() =>
                                                        {
                                                            // trigger input onChange
                                                            if (recommenderFileInputRefs.current[index])
                                                            {
                                                                recommenderFileInputRefs.current[index]?.click()
                                                            }
                                                        }}

                                                    >
                                                        <AttachFile
                                                            sx={{ fontSize: "24px" }}
                                                        />
                                                        <Box
                                                            sx={{
                                                                flexDirection: "column"
                                                            }}
                                                        >
                                                            <Typography
                                                                variant='h4'
                                                                sx={{
                                                                    display: { xs: "none", md: "block" }
                                                                }}>
                                                                צירוף קובץ
                                                            </Typography>

                                                            {/* display filename to the user */}
                                                            <Typography variant='h6'>
                                                                {recommendersList[index][1]?.name.length! > 20 ? '...' : ''}
                                                                {recommendersList[index][1] ? recommendersList[index][1]?.name.slice(0, 20) : ""}
                                                            </Typography>
                                                        </Box>
                                                    </Button>

                                                </Box>

                                            </Box>
                                        </Box>
                                    );
                                }
                            })}

                            {/* Add recommender button */}
                            <Box
                                sx={{
                                    width: "95%",
                                    display: numRecommenders >= MAX_RECOMMENDERS ? "none" : "block"
                                }}>

                                <Button
                                    sx={{
                                        alignSelf: "start"
                                    }}
                                    onClick={() =>
                                    {
                                        for (let index = 0; index < recommendersList?.length!; index++)
                                        {
                                            const recommender = recommendersList?.at(index);
                                            if (recommender?.at(0) === null)
                                            {
                                                updateRecommendersListAtIndex(new Recomendation("", "", ""), null, index);
                                                setNumRecommenders(numRecommenders + 1);
                                                if (numRecommenders > MAX_RECOMMENDERS)
                                                {
                                                    setNumRecommenders(MAX_RECOMMENDERS);
                                                }
                                                return;
                                            }
                                        }
                                    }}
                                >
                                    <AddBoxSharp />
                                    הוספת ממליץ
                                </Button>
                            </Box>

                        </Box>

                    </Box>

                    {/* Submit Button */}
                    <Box
                        sx={{
                            width: "90%",
                            alignSelf: "center",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: "1rem",
                            marginTop: "5rem"
                        }}
                    >

                        <Button
                            variant='contained'
                            sx={{
                                backgroundColor: "background.boxInner",
                                color: "primary.main",
                                "&:hover": {
                                    backgroundColor: "background.main"
                                }
                            }}
                            onClick={handleSubmit}
                        >
                            <Typography variant='h4'>
                                שליחה
                            </Typography>
                            <Send sx={{ fontSize: "24px", transform: "scaleX(-1)", marginLeft: "0.5rem" }} />
                        </Button>
                    </Box>

                </Box>

                {/* Dialogs */}
                <ErrorDialog open={errorDialogOpen} onClose={errorDialogOnClose} />
                <SuccessDialog open={successDialogOpen} onClose={successDialogOnClose} />
            </Box>
    );
}

const getJobIdFromUrl = (pathname: string) =>
{
    return pathname.split("/").slice(-1)[0];
}