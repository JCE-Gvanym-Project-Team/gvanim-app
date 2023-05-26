import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box, IconButton, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { dialogActionsSx, dialogContentSx, dialogSx } from './ChangeJobDialogStyle';
import CloseIcon from '@mui/icons-material/Close';

export default function ChangeJobDialog({ open, onClose })
{
    const [formData, setFormData] = useState('');
    const handleChange = (event) =>
    {
        setFormData(event.target.value);
    };

    const handleSave = () =>
    {
        // TODO: Perform save logic here
        console.log(formData);
        onClose();
    };

    let job1


    return (
        // popup dialog
        <Dialog open={open} onClose={onClose} sx={dialogSx}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>

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

            {/* Title */}
            <DialogTitle>
                הערות למועמד
            </DialogTitle>

            {/* Text Field area */}
            <DialogContent sx={dialogContentSx}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">משרה מס'</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={"hi"}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>

            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSave}>שמירה</Button>
            </DialogActions>
        </Dialog>
    );
}