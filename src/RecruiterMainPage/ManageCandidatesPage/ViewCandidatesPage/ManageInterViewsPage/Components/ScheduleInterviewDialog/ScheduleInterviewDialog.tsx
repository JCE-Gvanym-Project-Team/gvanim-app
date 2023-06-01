import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { changeJobContainerStyle, changeJobContainerSx, currentStatusTextSx, dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx, locationTextFieldSx, locationTitleSx, submitButtonSx } from "./ScheduleInterviewDialogStyle";
import { ArrowBack, ArrowDownward, Autorenew, Check, Close, MoodBad, ThumbDown, WhatsApp } from "@mui/icons-material";
import { DatePicker, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/he'
import { Candidate } from "../../../../../../Firebase/FirebaseFunctions/Candidate";
import { CandidateJobStatus, allStatus } from "../../../../../../Firebase/FirebaseFunctions/CandidateJobStatus";
import { Recruiter } from "../../../../../../Firebase/FirebaseFunctions/Recruiter";
import { Job } from "../../../../../../Firebase/FirebaseFunctions/Job";

export default function ScheduleInterviewDialog(props: { open, onClose, candidate: Candidate | null, candidateJobStatus: CandidateJobStatus | null, candidateJobs: Job[], allJobs: Job[] })
{

    const { open, onClose, candidate, candidateJobStatus, candidateJobs, allJobs } = props;
    const [time, setTime] = useState<any>();
    const [date, setDate] = useState<any>();

    // disable time and date if status doesn't require them
    const [timeDisabled, setTimeDisabled] = useState(true);

    // disable whatsapp message if there's no need for a message
    const [disableWhatsappMessage, setDisableWhatsappMessage] = useState(true);

    // for rejection reason textfield
    const [disableRejectionReason, setDisableRejectionReason] = useState(true);

    const [newStatus, setNewStatus] = useState("");

    // time changed 
    const handleDateChange = (value) =>
    {
        setDate(value);
    };

    const handleTimeChange = (value) =>
    {
        setTime(value);
    };

    // submit button handlers
    const handleSubmitChangeJob = (event) =>
    {
        if (fromJobValue === "" && toJobValue === "")
        {
            setFromJobError(true);
            setToJobError(true);
            return;
        }

        if (fromJobValue === "")
        {
            setFromJobError(true);
            return;
        }

        if (toJobValue === "")
        {
            setToJobError(true);
            return;
        }

        onClose(event, "submit");
    }

    const handleSubmitSaveRejectionReason = async (event) =>
    {
        await candidateJobStatus?.updateStatus(newStatus, undefined);
    }

    const handleSubmitSendWhatsappMessage = async (event) =>
    {
        if (!timeDisabled)
        {
            const interviewDate: Date = date?.$d;
            const interviewTime: Date = time?.$d;
            interviewDate?.setHours(interviewTime.getHours());
            interviewDate?.setMinutes(interviewTime.getMinutes());
            await candidateJobStatus?.updateStatus(newStatus, interviewDate);
            const link = await candidateJobStatus?.getWhatsappUrl(
                new Recruiter("asd@gmail.com", "firstname", "lastname", ["sector1", "sector2"]),
                interviewDate,
                "makom"
            );

            window.open(link);
        } else
        {
            await candidateJobStatus?.updateStatus(newStatus, undefined);
            //TODO: replace this with a real recruiter, and a real location
        }

        onClose(event, "submit");
    }

    const handleSubmitSaveStatus = async (event) =>
    {
        await candidateJobStatus?.updateStatus(newStatus, undefined);
        onClose(event, "submit");
    }

    // status changed handler
    const handleStatusChanged = (status) =>
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

    // change job handlers
    const [changeJobDialogOpen, setChangeJobDialogOpen] = useState(false);
    const [fromJobValue, setFromJobValue] = useState('');
    const [toJobValue, setToJobValue] = useState('');
    const [fromJobError, setFromJobError] = useState(false);
    const [toJobError, setToJobError] = useState(false);


    useEffect(() =>
    {
        setToJobError(false);
        setFromJobError(false);
    }, [])

    const handleFromJobChange = (event, value) =>
    {
        //TODO: THIS
    };

    const handleToJobChange = (event, value) =>
    {
        setToJobError(false);
        setFromJobError(false);
        setToJobValue(value);
    };



    return (
        // popup dialog
        <Dialog open={open} onClose={onClose} sx={dialogSx}>
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
                        onClick={onClose}
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
                            <Divider />
                            <Typography sx={{ color: option ? option.textColor : "black" }}>
                                {option?.status}
                            </Typography>
                        </MenuItem>
                    }
                    renderInput={(params) => <TextField {...params} label="סטטוס חדש" />}
                    onInputChange={(event, value) =>
                    {
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
                            onChange={handleFromJobChange}
                            onInputChange={(event, value) =>
                            {
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
                            onChange={handleToJobChange}
                            onInputChange={(event, value) =>
                            {
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
                        sx={locationTextFieldSx}
                        style={{ display: disableWhatsappMessage ? "none" : "block" }}
                    />
                    <TextField
                        sx={locationTextFieldSx}
                        style={{ display: disableRejectionReason ? "none" : "block" }}
                    />
                </Box>
            </DialogContent>


            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                {(() =>
                {
                    if (changeJobDialogOpen)
                    {
                        return (
                            <Button onClick={handleSubmitChangeJob} variant="contained" sx={submitButtonSx}>
                                העברת משרה
                            </Button>
                        );
                    }
                    if (!disableRejectionReason)
                    {
                        return (
                            <Button onClick={handleSubmitSaveRejectionReason} variant="contained" sx={submitButtonSx}>
                                שמירה
                            </Button>
                        );
                    }
                    if (!disableWhatsappMessage)
                    {
                        return (
                            <Button onClick={handleSubmitSendWhatsappMessage} variant="contained" sx={submitButtonSx}>
                                <WhatsApp sx={{ marginRight: "0.5rem" }} />
                                שליחת הודעה למועמד
                            </Button>
                        );
                    }
                    return (
                        <Button onClick={handleSubmitSaveStatus} variant="contained" sx={{ backgroundColor: "blueviolet" }}>
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
    if (status === allStatus[1] || status === allStatus[2] || status === allStatus[3] || status === allStatus[4])
    {
        return { status: status, textColor: "#4CAF50", icon: <Check sx={{ color: "#4CAF50" }} /> };
    }
    if (status === allStatus[5])
    {
        return { status: status, textColor: "#008000", icon: <Check sx={{ color: "#008000" }} /> };
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