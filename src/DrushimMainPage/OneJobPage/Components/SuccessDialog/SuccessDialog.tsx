import Close from '@mui/icons-material/Close';
import { Alert, Box, Button, IconButton, Snackbar, Typography } from '@mui/material';
import * as React from 'react';

export default function SuccessDialog(props: { open, onClose })
{
    const { open, onClose } = props;
    return (
        <Snackbar
            open={open}
            onClose={(event, reason) => {onClose(event, reason, false)}}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
        >
            <Alert
                variant="filled"
                sx={{ alignItems: 'flex-start', backgroundColor: "success.main" }}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0 }}
                            onClick={onClose}
                        >
                            <Close />
                        </IconButton>
                    </React.Fragment>
                }
            >
                <Box sx={{ flex: 1 }}>
                    <Typography variant='h3'>
                        מועמדותך נקלטה בהצלחה
                    </Typography>
                    <Typography variant='h4' sx={{ mt: 1 }}>
                        האם תרצה/י להגיש מועמדות למשרות נוספות?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "secondary.main",
                                "&:hover": {
                                    backgroundColor: "secondary.dark",
                                    color: "primary.textBright"
                                }
                            }}
                            onClick={(event) => {onClose(event, undefined, true)}}>
                            כן
                        </Button>
                        <Button 
                        variant="outlined" 

                        onClick={(event) => {onClose(event, undefined, false)}}>
                            לא
                        </Button>
                    </Box>
                </Box>
            </Alert>
        </Snackbar>
    );
}
