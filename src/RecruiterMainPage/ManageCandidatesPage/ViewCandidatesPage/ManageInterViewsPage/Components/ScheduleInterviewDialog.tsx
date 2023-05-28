import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from "./ScheduleInterviewDialogStyle";
import { Close } from "@mui/icons-material";
import { DatePicker, LocalizationProvider, MobileTimePicker, TimeField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/he'
import { Candidate } from "../../../../../Firebase/FirebaseFunctions/Candidate";

export default function ScheduleInterviewDialog(props: { open, onClose, candidate: Candidate | null})
{

    const {open, onClose, candidate} = props;
    const [time, setTime] = useState<any>();
    const [date, setDate] = useState<any>();
    
    const handleDateChange = (value) =>
    {
        setDate(value);
    };

    const handleTimeChange = (value) => {
        setTime(value);
    };

    const handleSubmit = () =>
    {
        // TODO: Perform submit logic here
        console.log(time.$d.getDate());
        onClose();
    };


    return (
        // popup dialog
        <Dialog open={open} onClose={onClose} sx={dialogSx}>
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    בחר\י תאריך לראיון
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
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
                    <DatePicker
                        label={'בחירת תאריך'}
                        views={['year', 'month', 'day']}
                        onChange={handleDateChange}
                    />
                    <MobileTimePicker
                        label="בחירת שעה"
                        views={['hours']}
                        onChange={handleTimeChange}
                    />
                </LocalizationProvider>
            </DialogContent>

            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSubmit} variant="contained">שליחת זימון בוואצאפ</Button>
            </DialogActions>
        </Dialog>
    )
}