import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box, IconButton } from '@mui/material';
import { dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './NotesPopupStyles';
import CloseIcon from '@mui/icons-material/Close';
import { Candidate } from '../../../../../Firebase/FirebaseFunctions/Candidate';

export default function NotesPopup(props: { open, onClose, candidate: Candidate | null, initialData: string | undefined }) {
    const { open, onClose, candidate, initialData } = props;
    const [formData, setFormData] = useState('');
    const handleChange = (event) => {
        setFormData(event.target.value);
    };

    useEffect(() => {
        setFormData(initialData ? initialData : "");
    },[initialData]);

    const handleSave = () => {
        candidate?.edit(candidate._firstName, candidate._lastName, candidate._phone,candidate._eMail,candidate._generalRating, formData);
        onClose();
    };


    return (
        // popup dialog
        <Dialog open={open} onClose={onClose} sx={dialogSx}>
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    הערות למועמד
                </DialogTitle>
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
            </Box>

            {/* Text Field area */}
            <DialogContent sx={dialogContentSx}>
                <TextField
                    autoFocus
                    multiline
                    minRows={5}
                    maxRows={10}
                    variant="outlined"
                    value={formData}
                    onChange={handleChange}
                    fullWidth
                />
            </DialogContent>

            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSave}>שמירה</Button>
            </DialogActions>
        </Dialog>
    );
}