import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useState } from "react";
import { dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from "./ScheduleInterviewDialogStyle";
import { Close } from "@mui/icons-material";

export default function ScheduleInterviewDialog({ open, onClose })
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


    return (
        // popup dialog
        <Dialog open={open} onClose={onClose} sx={dialogSx}>
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    
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
                
            </DialogContent>

            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSave}>שמירה</Button>
            </DialogActions>
        </Dialog>
    )
}