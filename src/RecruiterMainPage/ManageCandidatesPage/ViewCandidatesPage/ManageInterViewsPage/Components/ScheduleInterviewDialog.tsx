import { Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { currentStatusTextSx, dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx, submitButtonSx } from "./ScheduleInterviewDialogStyle";
import { Close, WhatsApp } from "@mui/icons-material";
import { DatePicker, LocalizationProvider, MobileTimePicker, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/he'
import { Candidate } from "../../../../../Firebase/FirebaseFunctions/Candidate";
import React from "react";
import dayjs from "dayjs";
import { CandidateJobStatus, candidateStatuses } from "../../../../../Firebase/FirebaseFunctions/CandidateJobStatus";

export default function ScheduleInterviewDialog(props: { open, onClose, candidate: Candidate | null, candidateJobStatus: CandidateJobStatus | null })
{

    const { open, onClose, candidate, candidateJobStatus } = props;
    const [time, setTime] = useState<any>();
    const [date, setDate] = useState<any>();

    // disable time and date if status 
    const [timeDisabled, setTimeDisabled] = useState(false);
    const [dateDisabled, setDateDisabled] = useState(false);

    const [newStatus, setNewStatus] = useState("");

    const handleDateChange = (value) =>
    {
        setDate(value);
    };

    const handleTimeChange = (value) =>
    {
        setTime(value);
    };

    const handleSubmit = (event) =>
    {
        // TODO: Perform submit logic here
        if (newStatus === "עבר למשרה אחרת"){
            
        }
        console.log(time.$d.getDate());
        onClose(event, "submit");
    };

    const handleStatusChanged = (status) => {
        const disabledDateTimeList = ["עבר ראיון ראשון", "עבר ראיון שני","התקבל","עבר למשרה אחרת"];
        setNewStatus(status);
        if (disabledDateTimeList.includes(status)) {
            setTimeDisabled(true);
            setDateDisabled(true);
        }else{
            setTimeDisabled(false);
            setDateDisabled(false);
        }
    }


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
                    options={Array.from(candidateStatuses.keys()).filter((key => key !== candidateJobStatus?._status))}
                    renderInput={(params) => <TextField {...params} label="סטטוס חדש" />}
                    onInputChange={(event, value) =>
                    {
                        handleStatusChanged(value);
                    }}
                />
                <Box sx={{ display: "flex", flexDirection: "row", marginTop: "1rem" }}>
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
            </DialogContent>


            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSubmit} variant="contained" sx={submitButtonSx}>
                    <WhatsApp sx={{marginRight: "0.5rem"}}/>
                        שליחת הודעה למועמד
                    </Button>
            </DialogActions>
        </Dialog>
    )
}