import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box, IconButton, FormControl, InputLabel, Select, MenuItem, Autocomplete, Icon } from '@mui/material';
import { dialogActionsSx, dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './ChangeJobDialogStyle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function ChangeJobDialog({ open, onClose, candidateAppliedJobs, allJobs, candidate })
{
    const [formData, setFormData] = useState('');
    const [fromJobValue, setFromJobValue] = useState('');
    const [toJobValue, setToJobValue] = useState('');
    const handleChange = (event) =>
    {
        setFormData(event.target.value);
    };

    const handleSubmit = () =>
    {
        // TODO: Perform submit logic here
        console.log(toJobValue);
        onClose();
    };


    return (
        // popup dialog
        <Dialog open={open} onClose={onClose} sx={dialogSx} >
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    העברת משרה
                </DialogTitle>

                <Box sx={{ display: "flex", justifyContent: "end"}}>

                    {/* Close button */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>


            {/* Job Picking Area */}
            <DialogContent sx={dialogContentSx} style={dialogContentStyle}>
                <Autocomplete
                    disablePortal
                    options={candidateAppliedJobs}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="ממשרה" />}
                    onInputChange={(event, value)=>{
                        setFromJobValue(value);
                    }}
                />

                <ArrowBackIcon sx={{ display: { xs: "none", md: "block" } }} />
                <ArrowDownwardIcon sx={{ display: { xs: "block", md: "none" } }} />

                <Autocomplete
                    disablePortal
                    options={allJobs}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="למשרה" />}
                    onInputChange={(event, value)=>{
                        setToJobValue(value);
                    }}
                />
            </DialogContent>

            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSubmit}>העבר</Button>
            </DialogActions>
        </Dialog>
    );
}
