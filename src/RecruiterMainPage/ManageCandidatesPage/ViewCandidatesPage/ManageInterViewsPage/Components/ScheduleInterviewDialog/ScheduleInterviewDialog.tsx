import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField, Typography, createFilterOptions } from "@mui/material";
import { useEffect, useState } from "react";
import { changeJobContainerStyle, changeJobContainerSx, currentStatusTextSx, dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx, locationTextFieldSx, locationTitleSx, submitButtonSx } from "./ScheduleInterviewDialogStyle";
import { ArrowBack, ArrowDownward, Autorenew, Check, Close, DoneAll, ElevatorSharp, MoodBad, NestCamWiredStandOutlined, ThumbDown, ThumbUp, WhatsApp } from "@mui/icons-material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/he'
import { Candidate } from "../../../../../../Firebase/FirebaseFunctions/Candidate";
import { CandidateJobStatus, allStatus, getAllRejectCause, getFilteredCandidateJobStatuses, getMessage } from "../../../../../../Firebase/FirebaseFunctions/CandidateJobStatus";
import { Recruiter } from "../../../../../../Firebase/FirebaseFunctions/Recruiter";
import { Job, getFilteredJobs } from "../../../../../../Firebase/FirebaseFunctions/Job";
import { useNavigate } from "react-router-dom";
import AreYouSureDialog from "../../../Components/AreYouSureDialog/AreYouSureDialog";
import SuccessMessageSnackbar from "../../../Components/SuccessMessageSnackbar/SuccessMessageSnackbar";
import { getConnectedUser } from "../../../../../../Firebase/FirebaseFunctions/Authentication";

const filter = createFilterOptions<string>();


export default function ScheduleInterviewDialog(props: {
    open,
    onClose,
    candidate: Candidate | null,
    candidateJobStatus: CandidateJobStatus | null,
    candidateJobs: Job[],
    allJobs: Job[],
    chosenJobValue: string,
    rerenderKey,
    setRerenderKey,
    setLoading
})
{
    const { open,
        onClose,
        candidate,
        candidateJobStatus,
        candidateJobs,
        allJobs,
        chosenJobValue,
        rerenderKey,
        setRerenderKey,
        setLoading
    } = props;

    const [time, setTime] = useState<any>();
    const [date, setDate] = useState<any>();
    const [interviewDate, setInterviewDate] = useState<any>();

    // disable time and date if status doesn't require them
    const [timeDisabled, setTimeDisabled] = useState(true);

    // disable whatsapp message if there's no need for a message
    const [disableWhatsappMessage, setDisableWhatsappMessage] = useState(true);

    // for rejection reason textfield
    const [disableRejectionReason, setDisableRejectionReason] = useState(true);
    const [rejectionReasons, setRejectionReasons] = useState<string[]>([]);
    const [chosenRejectionReasonValue, setChosenRejectionReasonValue] = useState("");

    const [whatsappMessage, setWhatsappMessage] = useState("");

    const [newStatus, setNewStatus] = useState("");

    const navigate = useNavigate();

    // time changed 
    const handleDateChange = async (value) =>
    {
        setDate(value);
        const chosenDate: Date = value?.$d;
        const chosenTime: Date = time?.$d;
        chosenDate?.setHours(chosenTime ? chosenTime.getHours() : 0);
        chosenDate?.setMinutes(chosenTime ? chosenTime.getMinutes() : 0);
        setInterviewDate(chosenDate);

        setWhatsappMessage(await getWhatsappMessage(candidate, chosenJobValue, allJobs, newStatus, chosenDate));
    };

    const handleTimeChange = async (value) =>
    {
        setTime(value);
        const chosenDate: Date = date?.$d;
        const chosenTime: Date = value?.$d;
        chosenTime?.setFullYear(chosenDate ? chosenDate.getFullYear() : 0);
        chosenTime?.setMonth(chosenDate ? chosenDate.getMonth() : 0);
        chosenTime?.setDate(chosenDate ? chosenDate.getDate() : 0);
        setInterviewDate(chosenDate);

        setWhatsappMessage(await getWhatsappMessage(candidate, chosenJobValue, allJobs, newStatus, chosenTime));
    };

    const setDefaults = () =>
    {
        setToJobValue("");
        setFromJobValue("");
        setDisableRejectionReason(true);
        setDisableWhatsappMessage(true);
        setChangeJobDialogOpen(false);
        setTimeDisabled(true);
    }

    // submit button handlers
    const handleSubmitChangeJob = async (event) =>
    {
        if ((fromJobValue === "" || !fromJobValue) && (toJobValue === "" || !toJobValue))
        {
            setFromJobError(true);
            setToJobError(true);
            return;
        }

        if ((fromJobValue === "" || !fromJobValue))
        {
            setFromJobError(true);
            return;
        }

        if ((toJobValue === "" || !toJobValue))
        {
            setToJobError(true);
            return;
        }

        const fromJobNumberString = fromJobValue?.match(/\d+/)?.[0];
        const fromJobNumber = fromJobNumberString ? parseInt(fromJobNumberString) : NaN;

        const toJobNumberString = toJobValue?.match(/\d+/)?.[0];
        const toJobNumber = toJobNumberString ? parseInt(toJobNumberString) : NaN;

        // change job in firebase
        const fromCandidateJobStatus = (await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [fromJobNumber.toString(), candidate ? candidate._id : ""]))[0];
        fromCandidateJobStatus.updateStatus(allStatus[6], undefined);
        setLoading(true);
        await candidate?.apply(toJobNumber, fromCandidateJobStatus._about);
        rerender(rerenderKey, setRerenderKey);
        setLoading(false);

        // send whatsapp message
        const link = await candidateJobStatus?.getWhatsappUrl(whatsappMessage);

        window.open(link);

        setDefaults();

        onClose(event, "submit");

        
    }

    const handleSubmitSaveRejectionReason = async (event) =>
    {
        if (chosenRejectionReasonValue !== "")
        {
            if (chosenRejectionReasonValue.includes("אחר: "))
            {
                candidateJobStatus?.updateRejectCause(chosenRejectionReasonValue.replace("אחר: ", ""));
            } else
            {
                candidateJobStatus?.updateRejectCause(chosenRejectionReasonValue);
            }
        }
        setLoading(true);
        await candidateJobStatus?.updateStatus(newStatus, undefined);
        rerender(rerenderKey, setRerenderKey);
        setLoading(false);
        setDefaults();
        onClose(event, "submit");
        
    }

    const handleSubmitSendWhatsappMessage = async (event) =>
    {
        setLoading(true);
        if (!timeDisabled)
        {
            await candidateJobStatus?.updateStatus(newStatus, interviewDate);
        } else
        {
            await candidateJobStatus?.updateStatus(newStatus, undefined);
        }
        const link = await candidateJobStatus?.getWhatsappUrl(whatsappMessage);
        rerender(rerenderKey, setRerenderKey);
        setLoading(false);
        setDefaults();
        window.open(link);
        
        onClose(event, "submit");
    }

    const handleSubmitSaveStatus = async (event) =>
    {
        setLoading(true);
        await candidateJobStatus?.updateStatus(newStatus, undefined);
        rerender(rerenderKey, setRerenderKey);
        setLoading(false);
        setDefaults();
        onClose(event, "submit");
    }

    // status changed handler
    const handleStatusChanged = async (status) =>
    {
        setNewStatus(status);
        // remove date and time fields
        if (disabledDateTimeList.includes(status))
        {
            setTimeDisabled(true);
        } else
        {
            setTimeDisabled(false);
        }

        // remove whatsapp message TextField
        if (noWhatsappMessageList.includes(status))
        {
            setDisableWhatsappMessage(true);
        } else
        {
            setDisableWhatsappMessage(false);
        }

        if (status === allStatus[8])
        {
            setDisableRejectionReason(false);
            setRejectionReasons(await getAllRejectCause());
        } else
        {
            setDisableRejectionReason(true);
        }

        // change job popup
        if (status === allStatus[6])
        {
            setChangeJobDialogOpen(true);
        } else
        {
            setChangeJobDialogOpen(false);
        }
    }

    // whatsapp message handler
    const handleWhatsappMessageOnInput = (event) =>
    {
        setWhatsappMessage(event.target.value);
    }

    // change job setters
    const [changeJobDialogOpen, setChangeJobDialogOpen] = useState(false);
    const [fromJobValue, setFromJobValue] = useState('');
    const [toJobValue, setToJobValue] = useState('');
    const [fromJobError, setFromJobError] = useState(false);
    const [toJobError, setToJobError] = useState(false);

    // are you sure dialog
    const [areYouSureDialogOpen, setAreYouSureDialogOpen] = useState(false);
    const [areYouSureCallback, setAreYouSureCallback] = useState<(() => {})>();
    const [areYouSureDialogMessage, setAreYouSureDialogMessage] = useState("");

    const closeAreYouSureDialog = (event, reason) =>
    {
        if ((reason && reason !== "backdropClick") || reason === undefined)
        {
            setAreYouSureDialogOpen(false);
        }
    }

    // success message
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const snackBarOnClose = () =>
    {
        setSnackBarOpen(false);
    }

    return (
        // popup dialog
        <Dialog open={open} onClose={(event, reason) =>
        {
            setDefaults();
            onClose(event, reason)
        }} sx={dialogSx}>
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    בחר\י תאריך לראיון ו\או שינוי סטטוס
                </DialogTitle>
                <Box sx={{ display: "flex", justifyContent: "end" }}>


                    {/* Close button */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={(event) =>
                        {
                            setDefaults();
                            onClose(event, undefined)
                        }}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Box>
            </Box>

            {/* Text Field area */}
            <DialogContent sx={dialogContentSx}>
                <Typography sx={currentStatusTextSx}>
                    סטטוס נוכחי: {candidateJobStatus?._status}
                </Typography>
                <Autocomplete
                    disablePortal
                    getOptionLabel={(option) => option ? option.status : ""}
                    options={dropdownOptions.filter(option => option?.status !== candidateJobStatus?._status)}
                    renderOption={(props, option) =>
                        <MenuItem {...props} sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            {option?.icon}
                            <Typography sx={{ color: option ? option.textColor : "black" }}>
                                | {option?.status}
                            </Typography>
                        </MenuItem>
                    }
                    renderInput={(params) => <TextField {...params} label="סטטוס חדש" />}
                    onInputChange={async(event, value) =>
                    {

                        setWhatsappMessage(await getWhatsappMessage(candidate, chosenJobValue, allJobs, value, interviewDate));

                        handleStatusChanged(value);
                    }}
                />

                <Box sx={{ display: changeJobDialogOpen ? "none" : "flex", flexDirection: "row", marginTop: "1rem" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
                        <DatePicker
                            label={'בחירת תאריך'}
                            views={['year', 'month', 'day']}
                            onChange={handleDateChange}
                            sx={{ display: timeDisabled ? "none" : "block", marginRight: "1rem" }}
                        />
                        <MobileTimePicker
                            label="בחירת שעה"
                            views={['hours', "minutes"]}
                            onChange={handleTimeChange}
                            sx={{ display: timeDisabled ? "none" : "block" }}
                        />
                    </LocalizationProvider>
                </Box>

                <Box sx={{ display: changeJobDialogOpen ? "block" : "none" }}>
                    <Box sx={changeJobContainerSx} style={changeJobContainerStyle}>
                        {/* Change job if the user chose to */}
                        <Autocomplete
                            disablePortal
                            options={candidateJobs.map((job) =>
                            {
                                return "מס' " + job._jobNumber + ", " + job._region + ", " + job._role
                            })}
                            sx={{ width: { xs: "100%", md: "50%" } }}
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: fromJobError && fromJobValue === "" ? 'red' : "", // Set the border color here
                                            }
                                        },
                                    }}
                                    label="ממשרה"
                                />}
                            // onChange={handleFromJobChange}
                            onInputChange={(event, value) =>
                            {
                                if (value !== "")
                                {
                                    setFromJobError(false);
                                }
                                setFromJobValue(value);
                            }}
                        />

                        <ArrowBack sx={{ display: { xs: "none", md: "block" }, alignSelf: "center" }} />
                        <ArrowDownward sx={{ display: { xs: "block", md: "none" }, alignSelf: "center" }} />

                        <Autocomplete
                            disablePortal
                            options={allJobs.filter(job => !candidateJobs.includes(job)).map((job) =>
                            {
                                return "מס' " + job._jobNumber + ", " + job._region + ", " + job._role
                            })}
                            sx={{ width: { xs: "100%", md: "50%" } }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: toJobError && toJobValue === "" ? 'red' : "", // Set the border color here
                                            }
                                        },
                                    }}
                                    label="למשרה"
                                />
                            }
                            onClick={() => setToJobError(false)}
                            onInputChange={(event, value) =>
                            {
                                if (value !== "")
                                {
                                    setToJobError(false);
                                }
                                setToJobValue(value);
                            }}
                        />
                    </Box>
                </Box>
                <Box>
                    <Typography sx={locationTitleSx}>
                        {(() =>
                        {
                            if (!disableWhatsappMessage && disableRejectionReason)
                            {
                                return "הודעה בוואצאפ";
                            }
                            if (disableWhatsappMessage && !disableRejectionReason)
                            {
                                return "סיבת דחייה"
                            }
                        })()}
                    </Typography>
                    <TextField
                        value={whatsappMessage}
                        multiline
                        fullWidth
                        maxRows={5}
                        sx={locationTextFieldSx}
                        style={{ display: disableWhatsappMessage ? "none" : "block" }}
                        onInput={handleWhatsappMessageOnInput}
                    />

                    {/* rejection reasons */}
                    <Box sx={{ display: disableRejectionReason ? "none" : "block" }}>
                        <Autocomplete

                            onChange={(event, newValue) =>
                            {
                                if (newValue && newValue !== "")
                                {
                                    setChosenRejectionReasonValue(newValue);
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
                            options={rejectionReasons}
                            renderOption={(props, option) => <li {...props}>{option}</li>}
                            sx={{ width: { xs: "100%", md: "50%" } }}
                            renderInput={(params) => <TextField {...params} label="" />}
                        />
                    </Box>
                </Box>
                <AreYouSureDialog
                    open={areYouSureDialogOpen}
                    onClose={closeAreYouSureDialog}
                    message={areYouSureDialogMessage}
                    callback={areYouSureCallback}
                    setSnackBarOpen={setSnackBarOpen}
                />
                <SuccessMessageSnackbar open={snackBarOpen} onClose={snackBarOnClose} />
            </DialogContent>


            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                {(() =>
                {
                    if (changeJobDialogOpen)
                    {
                        return (
                            <Button onClick={(event) =>
                            {
                                setAreYouSureDialogOpen(true);
                                setAreYouSureDialogMessage("פעולה זו תשנה את המשרה של המועמד: " +
                                    candidate?._firstName + " " + candidate?._lastName +
                                    "\nמ: " + fromJobValue + " ל: " + toJobValue);
                                setAreYouSureCallback(() => () => { handleSubmitChangeJob(event); setSnackBarOpen(true); return true; });
                            }} variant="contained" sx={submitButtonSx}>
                                העברת משרה
                            </Button>
                        );
                    }
                    if (!disableRejectionReason)
                    {
                        return (
                            <Button onClick={(event) =>
                            {
                                setAreYouSureDialogOpen(true);
                                setAreYouSureDialogMessage("פעולה זו תשנה את המשרה של המועמד: " + candidate?._firstName + " " + candidate?._lastName);
                                setAreYouSureCallback(() => () => { handleSubmitSaveRejectionReason(event); setSnackBarOpen(true);return true; });
                            }} variant="contained" sx={submitButtonSx}>
                                שמירה
                            </Button>
                        );
                    }
                    if (!disableWhatsappMessage)
                    {
                        return (
                            <Button onClick={(event) =>
                            {
                                setAreYouSureDialogOpen(true);
                                setAreYouSureDialogMessage('פעולה זו תשנה את הסטטוס של המועמד ל: ' + newStatus + '\nותנתב אותך לאתר של וואצאפ על מנת לשלוח למועמד הודעה');
                                setAreYouSureCallback(() => () => { handleSubmitSendWhatsappMessage(event); setSnackBarOpen(true); return true; });
                            }} variant="contained" sx={submitButtonSx}>
                                <WhatsApp sx={{ marginRight: "0.5rem" }} />
                                שליחת הודעה למועמד
                            </Button>
                        );
                    }
                    return (
                        <Button onClick={(event) =>
                        {
                            setAreYouSureDialogOpen(true);
                            setAreYouSureDialogMessage(" פעולה זו תשנה את סטטוס המועמד ל: " + newStatus);
                            setAreYouSureCallback(() => () => { handleSubmitSaveStatus(event);setSnackBarOpen(true); return true; });
                        }} variant="contained" sx={{ backgroundColor: "blueviolet" }}>
                            שמירת סטטוס
                        </Button>
                    );

                })()}
            </DialogActions>
        </Dialog>
    )
}

// this is a list of statuses that the user can change to or from
const dropdownOptions = allStatus.filter((status) => status !== allStatus[0]).map((status) =>
{
    if (status === allStatus[1] || status === allStatus[3])
    {
        return { status: status, textColor: "#CFAF00", icon: <Check sx={{ color: "#CFAF00" }} /> };
    }
    if (status === allStatus[2] || status === allStatus[4])
    {
        return { status: status, textColor: "#008000", icon: <DoneAll sx={{ color: "#008000" }} /> };
    }
    if (status === allStatus[5])
    {
        return { status: status, textColor: "#00AA00", icon: <ThumbUp sx={{ color: "#00AA00", transform: "scaleX(-1)" }} /> };
    }
    if (status === allStatus[6])
    {
        return { status: status, textColor: "#2196F3", icon: <Autorenew sx={{ color: "#2196F3" }} /> };
    }
    if (status === allStatus[7])
    {
        return { status: status, textColor: "#FF5733", icon: <ThumbDown sx={{ color: "#FF5733" }} /> };
    }
    if (status === allStatus[8])
    {
        return { status: status, textColor: "#800000", icon: <MoodBad sx={{ color: "#800000" }} /> };
    }
});

const disabledDateTimeList = allStatus.filter((status) => status !== allStatus[1] && status !== allStatus[3])

const noWhatsappMessageList = allStatus.filter((status) => status === allStatus[2] || status === allStatus[4] || status === allStatus[8]);

const rerender = function (rerenderKey, setRerenderKey)
{
    if (rerenderKey === "0")
    {
        setRerenderKey("1");
    } else
    {
        setRerenderKey("0");
    }
}

const getWhatsappMessage = async function (candidate, chosenJobValue, allJobs, status, interviewDate)
{
    const temp = new Candidate(candidate ? candidate._id : "", candidate?._firstName, candidate?._lastName, candidate?._phone, candidate?._eMail, candidate?._generalRating, candidate?._note);

    // todo: get real recruiter here
    const tempRecruiter = new Recruiter("recruiteremail@gmail.com", "firstname", "lastname", ["asd", "asdasd"]);

    // get currently connected recruiter
    const user = await getConnectedUser();
    console.log(user);

    const jobNumberString = chosenJobValue?.match(/\d+/)?.[0];
    const jobNumber = jobNumberString ? parseInt(jobNumberString) : NaN;
    const chosenJob = (allJobs.filter((job) => job._jobNumber === jobNumber))[0];

    return getMessage(temp, chosenJob, tempRecruiter, status, interviewDate, "makom");
}