import { AddBoxSharp, ArrowDownward, ArrowUpward, AttachFile, DeleteForeverOutlined, DeleteOutlined, ErrorOutlineRounded, FileUpload, FileUploadOutlined, Redo, Send } from '@mui/icons-material';
import { Box, Breakpoint, Button, Divider, Icon, Input, TextField, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import JobDetails from './Components/JobDetails/JobDetails';
// icons
import { ReactComponent as CloudSVG } from './Resources/Cloud.svg';
import { ReactComponent as BackgroundSVG } from './Resources/Background.svg'
import { ReactComponent as UploadIconSVG } from './Resources/UploadIcon.svg'
import { ReactComponent as DownArrowSVG } from './Resources/DownArrow.svg'
import { ReactComponent as UpArrowSVG } from './Resources/UpArrow.svg'
import { ReactComponent as PlusIconSVG } from './Resources/Plus.svg'
import { ReactComponent as AttachFileSVG } from './Resources/AttachFile.svg'
import MobileBackground from './Resources/MobileBackground.png'


const ABOUT_MAX_LENGTH = 1000;
const MAX_RECOMMENDERS = 3;

const marginLeftAndRight = { xs: "25px", xl: "18.75vw", lg: "12vw" }

export default function OneJobPage()
{
    const [job, setJob] = useState<Job | null>(null);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const theme = useTheme();
    const colors = colorTokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    // scroll into details after error
    const errorRef = useRef<HTMLParagraphElement>(null);

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
    const [candidateNameTextFieldFocused, setCandidateNameTextFieldFocused] = useState(false);

    const [candidateSurname, setCandidateSurname] = useState("");
    const [candidateSurnameError, setCandidateSurnameError] = useState(false);
    const [candidateSurnameTextFieldFocuesd, setCandidateSurnameTextFieldFocuesd] = useState(false);

    const [candidatePhone, setCandidatePhone] = useState("");
    const [candidatePhoneError, setCandidatePhoneError] = useState(false);
    const [candidatePhoneTextFieldFocused, setCandidatePhoneTextFieldFocused] = useState(false);

    const [candidateEmail, setCandidateEmail] = useState("");
    const [candidateEmailError, setCandidateEmailError] = useState(false);
    const [candidateEmailTextFieldFocused, setCandidateEmailTextFieldFocused] = useState(false);

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

    const sendToDetails = () =>
    {
        if (errorRef.current)
        {
            errorRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // submit
    const handleSubmit = async () =>
    {
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

        if (!cvFile)
        {
            setCvFileError(true);
        }

        if (candidateName === "" ||
            candidateSurname === "" ||
            candidatePhone === "" ||
            candidateEmail === "" ||
            !isPhoneValid(candidatePhone) ||
            !isEmailValid(candidateEmail) ||
            !cvFile
        )
        {
            sendToDetails();
            return;
        }

        if (recommendersListOpen && !checkRecommenders())
        {
            return;
        }
        setCvFileError(false);


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

    // screen size
    type BreakpointOrNull = Breakpoint | null;

    function useWidth()
    {
        const theme: Theme = useTheme();
        const keys: readonly Breakpoint[] = [...theme.breakpoints.keys].reverse();
        return (
            keys.reduce((output: BreakpointOrNull, key: Breakpoint) =>
            {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const matches = useMediaQuery(theme.breakpoints.up(key));
                return !output && matches ? key : output;
            }, null) || 'xs'
        );
    }

    const screenSize = useWidth();

    return (
        loading ? <MyLoading loading={loading} setLoading={setLoading} /> :
            <React.Fragment>
                {/* Background */}
                <Box sx={{
                    width: '100%',
                    height: "676px",
                    position: 'absolute',
                    overflow: 'hidden',
                    zIndex: "-1"
                }}>
                    {screenSize === "xs" ?
                        <img src={MobileBackground}
                            height={"408px"}
                            width={"100%"}
                        />
                        :
                        <Icon sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: 'auto',
                            zIndex: "-1"
                        }} component={BackgroundSVG} />
                    }
                </Box>
                {/* Entire Page */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "stretch",
                        marginLeft: marginLeftAndRight,
                        marginRight: marginLeftAndRight,
                        marginTop: "136px",
                    }}
                >

                    {/* Job Number */}
                    <Box sx={{ display: "flex", flexDirection: "row", width: { xs: "100%", md: "41.71875vw" } }}>

                        <Typography variant={screenSize === "xs" ? "subtitle2" : 'h4'} sx={{ letterSpacing: 0, color: "secondary.jobDetails" }}>
                            משרה מספר:
                        </Typography>
                        <Typography variant={screenSize === "xs" ? "subtitle2" : 'h4'} sx={{ marginLeft: "11px", color: "secondary.descAndReqText" }}>
                            {job?._jobNumber}
                        </Typography>
                    </Box>

                    {/* Job Title */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            textAlign: "left",
                            width: { xs: "100%", md: "41.71875vw" }
                        }}
                    >

                        <Typography
                            sx={{
                                color: "primary.jobTitle",
                            }}
                            variant={screenSize === 'xs' ? "h6" : "h1"}
                        >
                            {job?._title}
                        </Typography>
                    </Box>

                    {/* Separator */}
                    <Box sx={{ width: { xs: "100%", md: "36.6vw" }, backgroundColor: "background.jobTitleSeparator", height: 2, opacity: 0.2, marginTop: "27px" }} />

                    <Box>

                        {/* Job description, stats and requirements */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                justifyContent: "stretch",
                                marginTop: { xs: "44px", md: "128px" }
                            }}
                        >

                            {/* Description, requirements, stats and additional info */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "background.box",
                                    flex: 100,
                                    marginRight: { xs: "0", md: "1rem" },
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
                                        <Typography variant={screenSize === "xs" ? "subtitle1" : 'h2'} color={"primary.descAndReqTitle"}>
                                            תיאור המשרה:
                                        </Typography>

                                        <Typography
                                            variant={screenSize === "xs" ? "subtitle2" : 'h4'}
                                            marginTop={"15px"}
                                            sx={{
                                                backgroundColor: "background.boxInner",
                                                color: "secondary.descAndReqText",
                                                width: { xs: "100%", md: "30vw" }
                                            }}
                                        >
                                            {job?._description?.length! >= 1 ?
                                                job?._description[0].split('\n').map((line, index) =>
                                                {
                                                    return (
                                                        <React.Fragment key={"jobDescriptionLine" + index}>
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
                                        backgroundColor: "transparent",
                                        flex: 4
                                    }}
                                >
                                    <Typography variant={screenSize === "xs" ? "subtitle1" : 'h2'} sx={{ color: "primary.descAndReqTitle", marginTop: { xs: "44px", md: "73px" } }}>
                                        דרישות התפקיד:
                                    </Typography>

                                    <Typography
                                        variant={screenSize === "xs" ? "subtitle2" : 'h4'}
                                        marginTop={"15px"}
                                        sx={{
                                            backgroundColor: "background.boxInner",
                                            color: "secondary.descAndReqText",
                                            width: { xs: "100%", md: "28vw" }
                                        }}
                                    >
                                        {job?._requirements.split('\n').map((line, index) =>
                                        {
                                            return (
                                                <React.Fragment key={"jobRequirementsLine" + index}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            )
                                        })}
                                    </Typography>

                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                        
                                    </Box>


                                </Box>

                                {/* not sure about additional info */}
                                {/* Additional Info
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
                            </Box> */}

                            </Box>

                            {/* Job Details */}
                            <JobDetails job={job} screenSize={screenSize} />

                        </Box>

                        {/* button that redirects to details */}
                        <Box sx={{ display: { md: "none", lg: "block" }, position: "absolute", left: { lg: "20px", xl: "1.5vw" }, marginTop: "-60px" }}>
                            <Button

                                sx={{
                                    paddingTop: "13px",
                                    paddingBottom: "13px",
                                    paddingLeft: "28px",
                                    paddingRight: "28px",
                                    backgroundColor: "background.cvButton",
                                    "&:hover": {
                                        backgroundColor: "background.cvButtonHover"
                                    },
                                    boxShadow: "0px 3px 6px #00000029",
                                    borderRadius: "36px"
                                }}
                                onClick={() => sendToDetails()}
                            >
                                <Typography
                                    variant='h4'
                                    color={"primary.textBright"}
                                    sx={{ display: { lg: "none", xl: "block" } }}>
                                    להגשת מועמדות
                                </Typography>

                                <Icon sx={{ height: "30px", width: "40px", color: "primary.textBright", marginLeft: { xs: "2px", md: "12px" } }}
                                    component={DownArrowSVG}
                                />

                            </Button>
                        </Box>
                    </Box>

                    {/* Apply Icon + Apply Text*/}
                    <Box
                        ref={errorRef}
                        sx={{ marginTop: "179px", alignSelf: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                    >
                        <Icon
                            sx={{ width: { xs: "118px", md: "208px" }, height: { xs: "65px", md: "115px" } }}
                            component={CloudSVG}
                        ></Icon>
                        <Typography
                            variant={screenSize === "xs" ? "h6" : 'h1'}
                            sx={{
                                marginTop: "19px",
                                marginBottom: { xs: "38px", md: "76px" },
                                color: "primary.jobTitle",
                            }}
                        >
                            השאירו פרטים כאן:
                        </Typography>
                    </Box>

                    {/* Candidate Details */}
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            backgroundColor: "background.box",
                            justifyContent: "center",
                        }}
                    >

                        {/* Details */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            {/* Firstname and Lastname */}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", md: "row" },
                                    marginRight: { xs: "0", md: "7px" },
                                    flexGrow: 1
                                }}
                            >
                                {/* Firstname */}
                                <Box>
                                    <Typography variant={screenSize === "xs" ? "subtitle1" : 'h4'} color={"primary.jobTitle"} sx={{ marginTop: "15px" }}>
                                        שם פרטי:
                                    </Typography>
                                    <TextField
                                        variant='outlined'
                                        placeholder='שם פרטי'
                                        sx={{
                                            backgroundColor: "background.candidateDetailsTextField",
                                            '& .MuiOutlinedInput-root': {
                                                borderColor: "red",
                                                '& fieldset': {
                                                    borderColor: candidateNameError ? 'error.main' : "secondary.labelText",
                                                    border: "0px solid red",
                                                    borderRadius: "4px"
                                                },
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
                                        alignItems: "center",
                                        position: "absolute"
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
                                        marginLeft: { xs: "0", md: "7px" },
                                    }}
                                >
                                    <Typography variant={screenSize === "xs" ? "subtitle1" : 'h4'} color={"primary.jobTitle"} sx={{ marginTop: "15px" }}>
                                        שם משפחה:
                                    </Typography>
                                    <TextField
                                        variant='outlined'
                                        placeholder='שם משפחה'
                                        sx={{
                                            backgroundColor: "background.candidateDetailsTextField",
                                            border: "0px solid red",
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: candidateSurnameError ? 'error.main' : "secondary.labelText",
                                                    border: "0px solid red",
                                                    borderRadius: "4px"
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
                                        alignItems: "center",
                                        position: "absolute"
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
                                    flexDirection: { xs: "column", md: "row" },

                                }}
                            >
                                {/* Phone */}
                                <Box >
                                    <Typography variant={screenSize === "xs" ? "subtitle1" : 'h4'} color={"primary.jobTitle"} sx={{ marginTop: "15px" }}>
                                        טלפון:
                                    </Typography>
                                    <TextField
                                        variant='outlined'
                                        placeholder='טלפון'
                                        sx={{
                                            backgroundColor: "background.candidateDetailsTextField",
                                            border: "0px solid red",
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: candidatePhoneError ? 'error.main' : "secondary.labelText",
                                                    border: "0px solid red",
                                                    borderRadius: "4px"
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
                                        alignItems: "center",
                                        position: "absolute"
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
                                        marginLeft: { xs: "0", md: "7px" },

                                    }}
                                >
                                    <Typography variant={screenSize === "xs" ? "subtitle1" : 'h4'} color={"primary.jobTitle"} sx={{ marginTop: "15px" }}>
                                        אימייל:
                                    </Typography>
                                    <TextField
                                        variant='outlined'
                                        type='email'
                                        placeholder='אימייל'
                                        sx={{
                                            backgroundColor: "background.candidateDetailsTextField",
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: candidateEmailError ? 'error.main' : "secondary.labelText",
                                                    border: "0px solid red",
                                                    borderRadius: "4px"
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
                                        alignItems: "center",
                                        position: "absolute"
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
                            <Typography variant={screenSize === "xs" ? "subtitle1" : 'h4'} color={"primary.jobTitle"}>
                                ספרו לנו קצת עליכם:
                            </Typography>
                            <TextField
                                label="כתבו כאן..."
                                multiline
                                variant='outlined'
                                rows={10}
                                sx={{
                                    width: { xs: "100%", md: "100%" },
                                    marginTop: "15px",
                                    backgroundColor: "background.candidateDetailsTextField",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: "0px solid red",
                                            borderRadius: "4px",
                                        }
                                    },
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
                                }}
                            >
                                <Typography variant='h4'>
                                    {aboutNumChars ? aboutNumChars : 0} / {ABOUT_MAX_LENGTH}
                                </Typography>
                            </Box>
                        </Box>

                        {/* attach CV file button */}
                        <Box sx={{ marginTop: "35px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", alignSelf: { xs: "center", md: "start" }, width: "fit-content" }}>
                            <Input
                                type="file"
                                inputRef={cvFileInputRef}
                                style={{ display: 'none' }}
                                inputProps={{
                                    accept: "application/pdf"
                                }}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                {
                                    const files = event.target.files!;
                                    if (files[0].type === "application/pdf"){
                                        setCvFile(files[0]);
                                        setCvFileError(false);
                                    }
                                }}
                            />
                            <Button
                                disableRipple
                                variant='contained'
                                sx={{
                                    backgroundColor: "background.cvButton",
                                    borderRadius: "36px",
                                    color: "primary.textBright",
                                    "&:hover": {
                                        backgroundColor: "background.cvButtonHover"
                                    },
                                    paddingTop: "21px",
                                    paddingBottom: "21px",
                                    paddingLeft: "65px",
                                    paddingRight: "58px"

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
                                <Icon
                                    sx={{ height: "27px", width: "27px", marginRight: "16px", fontFamily: "serif" }}
                                    component={UploadIconSVG}
                                />
                                <Box

                                    sx={{
                                        flexDirection: "column"

                                    }}
                                >
                                    <Typography variant={screenSize === "xs" ? "subtitle1" : 'h3'} >
                                        צירוף קורות חיים
                                    </Typography>



                                </Box>
                            </Button>
                            {/* display filename to the user */}
                            <Typography variant='h5' >
                                {cvFile ? "קובץ שצורף: " : ""}
                                {cvFile?.name.slice(0, 20)}
                                {cvFile?.name.length! > 20 ? '...' : ''}
                            </Typography>
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
                                alignItems: { xs: "center", md: "start" },
                                width: "100%",
                                marginTop: "134px",
                            }}
                        >

                            {/* show or hide recommenders button */}
                            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <Button disableRipple onClick={() => { setRecommendersListOpen(!recommendersListOpen) }} sx={{
                                    "&:hover": {
                                        backgroundColor: "background.main",
                                        '& .addRecommendersText': {
                                            color: 'secondary.addRecommendersTextHover', // Change the color to your desired hover color
                                        },
                                        '& .addRecommendersText2': {
                                            color: 'secondary.addRecommendersTextHover', // Change the color to your desired hover color
                                            opacity: "0.68"
                                        },
                                        '& .addRecommendersIcon1': {
                                            color: 'secondary.addRecommendersTextHover', // Change the color to your desired hover color
                                        },
                                        '& .addRecommendersIcon2': {
                                            color: 'secondary.addRecommendersTextHover', // Change the color to your desired hover color
                                        },

                                    }
                                }}>
                                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h2'} color={"primary.descAndReqTitle"} className='addRecommendersText'>
                                        הוספת ממליצים:
                                    </Typography>
                                    <Typography variant={screenSize === "xs" ? "subtitle2" : 'h2'} color={"primary.descAndReqTitle"} sx={{ marginLeft: { xs: "4px", md: "12px" }, opacity: 0.68 }} className='addRecommendersText2'>
                                        (אופציונאלי)
                                    </Typography>
                                    {recommendersListOpen ?
                                        <Icon sx={{ height: "30px", width: "40px", color: "primary.descAndReqTitle", marginLeft: { xs: "2px", md: "12px" } }}
                                            className='addRecommendersIcon1'
                                            component={DownArrowSVG}
                                        /> :

                                        <Icon sx={{ height: "30px", width: "40px", color: "primary.descAndReqTitle", marginLeft: { xs: "2px", md: "12px" } }}
                                            className='addRecommendersIcon1'
                                            component={UpArrowSVG}
                                        />
                                    }

                                </Button>
                            </Box>

                            {/* List of recommenders */}
                            <Box sx={{
                                backgroundColor: "background.recommendersBox",
                                borderRadius: "4px",
                                flexDirection: "column",
                                paddingTop: "36px",
                                paddingBottom: "36px",
                                paddingRight: { xs: "0px", md: "23px" },
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
                                                    marginBottom: index >= MAX_RECOMMENDERS - 1 ? "0" : "43px",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}
                                                key={index + "recommendersBox"}
                                            >

                                                {/* delete recommender button */}
                                                <Button
                                                    disableRipple
                                                    sx={{
                                                        alignSelf: "end",
                                                        marginBottom: "27px",
                                                        height: "fit-content",
                                                        display: { xs: "none", md: "flex" },
                                                        "&:hover": {
                                                            backgroundColor: "transparent",
                                                            color: "error.main"
                                                        }
                                                    }}
                                                    onClick={() =>
                                                    {
                                                        setAreYouSureDialogIndex(index);
                                                        setAreYouSureDialogOpen(true);
                                                        setAreYouSureDialogRecommenderName(recommender[0]?._fullName!);
                                                    }}
                                                >
                                                    <DeleteOutlined sx={{}} />
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
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",

                                                        paddingTop: "0",
                                                        paddingBottom: "1rem",
                                                    }}>

                                                    {/* name + phone + email + buttons*/}
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: { xs: "column", md: "row" },
                                                        }}
                                                    >
                                                        {/* mobile delete + attach file buttons */}
                                                        <Box
                                                            sx={{
                                                                alignSelf: "end",
                                                                display: { xs: "flex", md: "none" },
                                                                flexDirection: "row",
                                                                justifyContent: "space-between"
                                                            }}
                                                        >

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
                                                                marginRight: "20px",
                                                                marginLeft: { xs: "20px", md: 0 },
                                                                marginTop: { xs: "20px", md: "0" }
                                                            }}
                                                        >
                                                            <Typography
                                                                variant={screenSize === "xs" ? "subtitle1" : 'h3'}
                                                                sx={{ marginBottom: "15px" }}
                                                                color={"primary.jobTitle"}
                                                            >
                                                                שם מלא:
                                                            </Typography>
                                                            <TextField
                                                                placeholder='שם מלא'
                                                                variant='outlined'
                                                                sx={{
                                                                    backgroundColor: "background.main",
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: recommendersErrors[index][0] ? 'error.main' : "secondary.labelText",
                                                                            border: "0px solid black"
                                                                        }
                                                                    },
                                                                    '& .MuiInputBase-input': {
                                                                        height: '71px', // Adjust the height value as needed
                                                                        paddingTop: "0",
                                                                        paddingBottom: "0"
                                                                    },
                                                                }}
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
                                                                marginRight: "20px",
                                                                marginLeft: { xs: "20px", md: 0 },
                                                                marginTop: { xs: "20px", md: "0" }
                                                            }}>
                                                            <Typography
                                                                variant='h3'
                                                                color={"secondary.labelText"}
                                                                sx={{ marginBottom: "15px" }}
                                                            >
                                                                טלפון:
                                                            </Typography>
                                                            <TextField
                                                                placeholder='טלפון'
                                                                variant='outlined'
                                                                sx={{
                                                                    backgroundColor: "background.main",
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: recommendersErrors[index][0] ? 'error.main' : "secondary.labelText",
                                                                            border: "0px solid black"
                                                                        }
                                                                    },
                                                                    '& .MuiInputBase-input': {
                                                                        height: '71px', // Adjust the height value as needed
                                                                        paddingTop: "0",
                                                                        paddingBottom: "0"
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
                                                                alignItems: "center",
                                                                position: "absolute"
                                                            }}>
                                                                <ErrorOutlineRounded sx={{ fontSize: "24px", color: "error.main" }} />

                                                                <Typography variant='h4' color={"error.main"}>
                                                                    שדה זה שגוי
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        {/* Recommender email */}
                                                        <Box sx={{ marginRight: "20px", marginLeft: { xs: "20px", md: 0 }, marginTop: { xs: "20px", md: "0" } }}>
                                                            <Typography
                                                                variant='h3'
                                                                color={"secondary.labelText"}
                                                                sx={{ marginBottom: "15px" }}
                                                            >
                                                                אימייל:
                                                            </Typography>
                                                            <TextField
                                                                placeholder='אימייל'
                                                                variant='outlined'
                                                                sx={{
                                                                    backgroundColor: "background.main",
                                                                    '& .MuiOutlinedInput-root': {
                                                                        '& fieldset': {
                                                                            borderColor: recommendersErrors[index][1] ? 'error.main' : "secondary.labelText",
                                                                            border: "0px solid black"
                                                                        }
                                                                    },
                                                                    '& .MuiInputBase-input': {
                                                                        height: '71px', // Adjust the height value as needed
                                                                        paddingTop: "0",
                                                                        paddingBottom: "0"
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
                                                                alignItems: "center",
                                                                position: "absolute"
                                                            }}>
                                                                <ErrorOutlineRounded sx={{ color: "error.main" }} />

                                                                <Typography variant='h4' color={"error.main"}>
                                                                    שדה זה שגוי
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                        {/* Attach recommender file button */}
                                                        <Box sx={{ display: "flex", flexDirection: "column", alignSelf: { xs: "center", md: "end" }, marginTop: "49px" }}>
                                                            {/* display filename to the user */}
                                                            <Box sx={{ position: "absolute", marginTop: "-20px", marginLeft: "20px" }}>
                                                                <Typography variant='h5' sx={{ alignSelf: "center" }}>
                                                                    {recommendersList[index][1] ? "קובץ שצורף: " : ""}
                                                                    {recommendersList[index][1]?.name.length! > 12 ? '...' : ''}
                                                                    {recommendersList[index][1] ? recommendersList[index][1]?.name.slice(0, 12) : ""}
                                                                </Typography>
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display: "flex",
                                                                    flexDirection: "row",
                                                                    alignSelf: "end"
                                                                }}
                                                            >
                                                                {/* TODO: pdf files only  */}
                                                                {/* PC add recommender file input */}
                                                                <Input
                                                                    type="file"
                                                                    inputRef={(input) => (recommenderFileInputRefs.current[index] = input)}
                                                                    style={{ display: 'none' }}
                                                                    inputProps={{
                                                                        accept: "application/pdf"
                                                                    }}
                                                                    onChange={(event) =>
                                                                    {
                                                                        const inputElement = event.target as HTMLInputElement;
                                                                        const files = inputElement.files;
                                                                        if (files && files.length > 0 && files[0].type === "application/pdf")
                                                                        {
                                                                            updateRecommendersListAtIndex(recommendersList[index][0], files[0], index);
                                                                        }
                                                                    }}
                                                                />
                                                                <Button
                                                                    disableRipple
                                                                    sx={{
                                                                        borderRadius: "36px",
                                                                        paddingTop: "21px",
                                                                        paddingBottom: "21px",
                                                                        backgroundColor: "background.cvButton",
                                                                        "&:hover": {
                                                                            backgroundColor: "background.cvButtonHover"
                                                                        }
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
                                                                    <Icon
                                                                        sx={{
                                                                            height: "21px",
                                                                            width: "19px",
                                                                            color: "primary.textBright",
                                                                            marginRight: "9px",
                                                                            marginLeft: "30px"
                                                                        }}
                                                                        component={AttachFileSVG}
                                                                    />
                                                                    <Box
                                                                        sx={{
                                                                            flexDirection: "column", paddingRight: "30px"
                                                                        }}
                                                                    >
                                                                        <Typography
                                                                            variant='h3'
                                                                            sx={{
                                                                                whiteSpace: 'nowrap',
                                                                                overflow: 'hidden',
                                                                                textOverflow: 'ellipsis',
                                                                                color: "primary.textBright"
                                                                            }}>
                                                                            צירוף קובץ
                                                                        </Typography>

                                                                    </Box>
                                                                </Button>

                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                </Box>
                                            </Box>
                                        );
                                    }
                                })}

                                {/* Add recommender button */}
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: numRecommenders >= MAX_RECOMMENDERS ? "none" : "block"
                                    }}>

                                    <Button
                                        disableRipple
                                        sx={{
                                            minWidth: "200px",
                                            backgroundColor: "transparent",
                                            alignSelf: "start",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: "60px",
                                            "&:hover": {
                                                backgroundColor: "transparent",
                                                "& .addRecommenderIcon": {
                                                    color: "secondary.addRecommenderButtonHover"
                                                },
                                                "& .addRecommenderText": {
                                                    color: "secondary.addRecommenderButtonHover"
                                                },
                                                "& .addRecommenderLine": {
                                                    backgroundColor: "secondary.addRecommenderButtonHover"
                                                }
                                            }

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
                                        {/* Icon and text */}
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center"
                                        }}>

                                            <Icon
                                                sx={{ width: "30px", height: "30px", marginRight: "10px", color: "primary.addRecommenderButton" }}
                                                component={PlusIconSVG}
                                                className='addRecommenderIcon'
                                            />
                                            <Typography variant='h3' color={"primary.addRecommenderButton"} className='addRecommenderText'>
                                                הוספת ממליץ
                                            </Typography>
                                        </Box>
                                        {/* Line underneath */}
                                        <Box
                                            className="addRecommenderLine"
                                            sx={{ backgroundColor: "primary.addRecommenderButton", height: "3px", borderRadius: "36px", marginTop: "9px", width: "100%" }}
                                        />
                                    </Button>
                                </Box>

                            </Box>

                        </Box>

                        {/* Separator for the submit button */}
                        <Box sx={{ height: "1px", width: "100%", borderRadius: "1px", backgroundColor: "background.JobDetailsText", marginTop: "39px" }} />

                        {/* Submit Button */}
                        <Box
                            sx={{
                                width: "100%",
                                alignSelf: "center",
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                marginBottom: "537px",
                                marginTop: "76px",
                            }}
                        >

                            <Button
                                variant='contained'
                                sx={{
                                    backgroundColor: "background.JobDetailsText",
                                    borderRadius: "36px",
                                    paddingTop: "21px",
                                    paddingBottom: "21px",
                                    paddingRight: { xs: "84px", md: "8vw" },
                                    paddingLeft: { xs: "84px", md: "8vw" },
                                    color: "primary.main",
                                    "&:hover": {
                                        backgroundColor: "background.submitButtonHover"
                                    }
                                }}
                                onClick={handleSubmit}
                            >
                                <Typography variant='h4' color={"primary.textBright"}>
                                    שלח/י טופס
                                </Typography>
                            </Button>
                        </Box>

                    </Box>

                    {/* Dialogs */}
                    <ErrorDialog open={errorDialogOpen} onClose={errorDialogOnClose} />
                    <SuccessDialog open={successDialogOpen} onClose={successDialogOnClose} />
                </Box>
            </React.Fragment>
    );
}

const getJobIdFromUrl = (pathname: string) =>
{
    return pathname.split("/").slice(-1)[0];
}