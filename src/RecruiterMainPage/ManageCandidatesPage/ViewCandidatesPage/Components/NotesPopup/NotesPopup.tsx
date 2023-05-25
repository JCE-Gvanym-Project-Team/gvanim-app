import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box, IconButton } from '@mui/material';
import { dialogActionsSx, dialogContentSx, dialogSx } from './NotesPopupStyles';
import CloseIcon from '@mui/icons-material/Close';

export default function NotesPopup({ open, onClose })
{
    const [formData, setFormData] = useState('');
    const handleChange = (event) =>
    {
        setFormData(event.target.value);
    };

    const handleSave = () =>
    {
        // Perform save logic here
        console.log(formData);
        onClose();
    };


    return (
        <Dialog open={open} onClose={onClose} sx={dialogSx}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogTitle>
                הערות למועמד
            </DialogTitle>
            <DialogContent sx={dialogContentSx}>
                <TextField
                    autoFocus
                    multiline
                    minRows={5}
                    variant="outlined"
                    value={formData}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSave}>שמירה</Button>
            </DialogActions>
        </Dialog>
    );
}