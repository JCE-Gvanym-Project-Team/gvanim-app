import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { changeJobContainerStyle, changeJobContainerSx, currentStatusTextSx, dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx, submitButtonSx } from "./ScheduleInterviewDialogStyle";
import { ArrowBack, ArrowDownward, Close, WhatsApp } from "@mui/icons-material";
import { DatePicker, LocalizationProvider, MobileTimePicker, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/he'
import { Candidate } from "../../../../../Firebase/FirebaseFunctions/Candidate";
import { CandidateJobStatus, allStatus } from "../../../../../Firebase/FirebaseFunctions/CandidateJobStatus";
import { Recruiter } from "../../../../../Firebase/FirebaseFunctions/Recruiter";
import ChangeJobDialog from "../../Components/ChangeJobDialog/ChangeJobDialog";
import { Job } from "../../../../../Firebase/FirebaseFunctions/Job";

// this is a list of statuses that the user can change
const dropdownOptions = [
    "זומן לראיון ראשון",
    "זומן לראיון שני",
    "הועבר למשרה אחרת",
    "התקבל",
    "נדחה"
]

const disabledDateTimeList = [
    "עבר ראיון ראשון",
    "עבר ראיון שני",
    "התקבל",
    "הועבר למשרה אחרת",
    "נדחה"
];

export default function ScheduleInterviewDialog(props: { open, onClose, candidate: Candidate | null, candidateJobStatus: CandidateJobStatus | null, candidateJobs: Job[], allJobs: Job[] })
{

    const { open, onClose, candidate, candidateJobStatus, candidateJobs, allJobs } = props;
    const [time, setTime] = useState<any>();
    const [date, setDate] = useState<any>();

    // disable time and date if status 
    const [timeDisabled, setTimeDisabled] = useState(false);
    const [dateDisabled, setDateDisabled] = useState(false);

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
        const interviewDate: Date = date?.$d;
        const interviewTime: Date = time?.$d;
        interviewDate?.setHours(interviewTime.getHours());
        interviewDate?.setMinutes(interviewTime.getMinutes());
        await candidateJobStatus?.updateStatus(newStatus, interviewDate);
        //TODO: replace this with a real recruiter, and a real location
        console.log(candidate?._phone);
        const link = await candidateJobStatus?.getWhatsappUrl(
            new Recruiter("asd@gmail.com", "firstname", "lastname", ["sector1", "sector2"]),
            interviewDate,
            "makom"
        );
        console.log("link: " + link);
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
            setDateDisabled(true);
        } else
        {
            setTimeDisabled(false);
            setDateDisabled(false);
        }

        // change job popup
        if (status === "הועבר למשרה אחרת")
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
    const [toJobError, setToJobError] = useState(true);


    useEffect(() =>
    {
        setToJobError(false);
        setFromJobError(false);
    }, [])

    const handleFromJobChange = (event, value) =>
    {
        setFromJobValue(value);
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
                    options={allStatus.filter((key =>
                    {
                        return key !== candidateJobStatus?._status && dropdownOptions.includes(key);

                    }))}
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
                            sx={{ marginRight: "1rem" }}
                            disabled={dateDisabled}
                        />
                        <MobileTimePicker
                            label="בחירת שעה"
                            views={['hours', "minutes"]}
                            onChange={handleTimeChange}
                            disabled={timeDisabled}
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ display: changeJobDialogOpen ? "block" : "none" }}>
                    <Box sx={changeJobContainerSx} style={changeJobContainerStyle}>
                        {/* Change job if the user chose to */}
                        <Autocomplete
                            disablePortal
                            options={candidateJobs}
                            sx={{width: "50%"}}
                            renderInput={(params) => <TextField {...params} label="ממשרה" />}
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
                            options={allJobs}
                            sx={{width: "50%"}}
                            renderInput={(params) => <TextField {...params} sx={{ border: toJobError ? "1px solid red" : "0px" }} label="למשרה" />}
                            onClick={() => setToJobError(false)}
                            onChange={handleToJobChange}
                            onInputChange={(event, value) =>
                            {
                                setToJobValue(value);
                            }}
                        />
                    </Box>
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