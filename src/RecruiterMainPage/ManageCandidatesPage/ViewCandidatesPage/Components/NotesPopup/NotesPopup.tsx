import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MyLoading from '../../../../../Components/MyLoading/MyLoading';
import { Candidate } from '../../../../../Firebase/FirebaseFunctions/Candidate';
import { dialogActionsSx, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './NotesPopupStyles';

export default function NotesPopup(props: { open, onClose, candidate: Candidate | null, initialData: string | undefined, setLoading, loading })
{
    const { open, onClose, candidate, initialData, setLoading, loading } = props;
    const [formData, setFormData] = useState('');
    const handleChange = (event) =>
    {
        setFormData(event.target.value);
    };

    useEffect(() =>
    {
        setFormData(initialData ? initialData : "");
    }, [initialData]);

    const handleSave = () =>
    {
        setLoading(true);
        candidate?.edit(candidate._firstName, candidate._lastName, candidate._phone, candidate._eMail, candidate._generalRating, formData);
        onClose();
    };


    return (
        loading ? <MyLoading loading={loading} setLoading={setLoading} /> :
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
                    <Button
                        variant='contained'
                        onClick={handleSave}
                        sx={{
                            backgroundColor: "#339933",
                            "&:hover": {
                                backgroundColor: "#008000",
                            }
                        }}
                    >שמירה</Button>
                </DialogActions>
            </Dialog>
    );
}