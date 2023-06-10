import Close from '@mui/icons-material/Close';
import { Alert, Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import * as React from 'react';

export default function SuccessDialog(props: { open, onClose })
{
    const { open, onClose } = props;
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            action={
                <React.Fragment>
                    <Button color="secondary" size="small" onClick={onClose}>
                        UNDO
                    </Button>
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={onClose}
                    >
                        <Close />
                    </IconButton>
                </React.Fragment>
            }
        >
            <Alert
                variant="filled"
                sx={{ alignItems: 'flex-start', '--Alert-gap': '1rem' }}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={onClose}
                        >
                            <Close />
                        </IconButton>
                    </React.Fragment>
                }
            >
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ mt: 1 }}>
                        מועמדותך נקלטה בהצלחה
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        האם תרצה\י להגיש מועמדות למשרות נוספות?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "secondary.main",
                                "&:hover": {
                                    backgroundColor: "secondary.dark",
                                    color: "primary.textBright"
                                }
                            }}
                            onClick={onClose}>
                            כן
                        </Button>
                        <Button 
                        variant="outlined" 

                        onClick={onClose}>
                            לא
                        </Button>
                    </Box>
                </Box>
            </Alert>
        </Snackbar>
    );
}
