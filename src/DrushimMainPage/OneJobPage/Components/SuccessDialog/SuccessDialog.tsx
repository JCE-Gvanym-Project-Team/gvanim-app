import * as React from 'react';




import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';
import { Alert, Box, Button, CircularProgress, IconButton, LinearProgress, Stack, Typography } from '@mui/material';
import { AspectRatio } from '@mui/icons-material';

export default function SuccessDialog(props: { open, onClose })
{
    const { open, onClose } = props;
    return (
        <Box
        sx={{
            width: "500px"
        }}
        >
            <Alert
                variant="filled"
                sx={{ alignItems: 'flex-start', '--Alert-gap': '1rem' }}
            >
                <Box sx={{ flex: 1 }}>
                    <Typography sx={{ mt: 1 }}>
                        מועמדותך נקלטה בהצלחה
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        האם תרצה\י להגיש למשרות נוספות?
                    </Typography>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                        <Button variant="outlined">
                            לא
                        </Button>
                        <Button variant="contained" >
                            כן
                        </Button>
                    </Box>
                </Box>
            </Alert>
        </Box>

    );
}
