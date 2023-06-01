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

// this is a list of statuses that the user can change to or from
const dropdownOptions = allStatus.filter((status) => status !== allStatus[0]).map((status) =>
{
    if (status === allStatus[1] || status === allStatus[2] || status === allStatus[3] || status === allStatus[4])
    {
        return { status: status, textColor: "#4CAF50", icon: <Check sx={{color: "#4CAF50"}} /> };
    }
    if (status === allStatus[5]){
        return { status: status, textColor: "#008000", icon: <Check sx={{color: "#008000"}} />};
    }
    if (status === allStatus[6]){
        return { status: status, textColor: "#2196F3", icon: <Autorenew sx={{color: "#2196F3"}}/> };
    }
    if (status === allStatus[7]){
        return { status: status, textColor: "#FF5733", icon: <ThumbDown sx={{color: "#FF5733"}}/> };
    }
    if (status === allStatus[8]){
        return { status: status, textColor: "#800000", icon: <MoodBad sx={{color: "#800000"}}/>};
    }
});

const disabledDateTimeList = allStatus.filter((status) => status !== allStatus[1] && status !== allStatus[3])

const noMessageList = allStatus.filter((status) => status !== allStatus[2] && status !== allStatus[4]);

export default function ScheduleInterviewDialog(props: { open, onClose, candidate: Candidate | null, candidateJobStatus: CandidateJobStatus | null, candidateJobs: Job[], allJobs: Job[] })
{

    const { open, onClose, candidate, candidateJobStatus, candidateJobs, allJobs } = props;
    const [time, setTime] = useState<any>();
    const [date, setDate] = useState<any>();

    // disable time and date if status doesn't require them
    const [timeDisabled, setTimeDisabled] = useState(false);

    // disable whatsapp message if there's no need for a message
    const [disableMessage, setDisableMessage] = useState(false);

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

    // save button
    const handleSubmit = async (event) =>
    {
        // TODO: Perform submit logic here
        if (newStatus === "הועבר למשרה אחרת")
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

        }

        const interviewDate: Date = date?.$d;
        const interviewTime: Date = time?.$d;
        interviewDate?.setHours(interviewTime.getHours());
        interviewDate?.setMinutes(interviewTime.getMinutes());
        await candidateJobStatus?.updateStatus(newStatus, interviewDate);
        //TODO: replace this with a real recruiter, and a real location
        const link = await candidateJobStatus?.getWhatsappUrl(
            new Recruiter("asd@gmail.com", "firstname", "lastname", ["sector1", "sector2"]),
            interviewDate,
            "makom"
        );
        window.open(link);

        onClose(event, "submit");
    };

    // status changed handler
    const handleStatusChanged = (status) =>
    {
        setNewStatus(status);
        if (disabledDateTimeList.includes(status))
        {
            setTimeDisabled(true);
        } else
        {
            setTimeDisabled(false);
        }

        if (noMessageList.includes(status))
        {
            setDisableMessage(true);
        } else
        {
            setDisableMessage(false);
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
                    options={dropdownOptions}
                    renderOption={(props, option) =>
                        <MenuItem {...props} sx={{display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                            {option?.icon}
                            <Divider />
                            <Typography sx={{color: option ? option.textColor : "black"}}>
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
                {/* TODO: block this if disabledMessage is true */}
                <Box sx={{ display: disableMessage ? "none" : "block" }}>
                    {/* TODO: change message if status = not interested in job */}
                    <Typography sx={locationTitleSx}>
                        הודעה בוואצאפ
                    </Typography>
                    <TextField
                        sx={locationTextFieldSx}
                    />
                </Box>
            </DialogContent>


            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                {
                    !changeJobDialogOpen
                        ?
                        <Button onClick={handleSubmit} variant="contained" sx={submitButtonSx}>
                            <WhatsApp sx={{ marginRight: "0.5rem" }} />
                            שליחת הודעה למועמד
                        </Button>
                        :
                        <Button onClick={handleSubmit} variant="contained" sx={submitButtonSx}>
                            העברת משרה
                        </Button>
                }
            </DialogActions>
        </Dialog>
    )
}