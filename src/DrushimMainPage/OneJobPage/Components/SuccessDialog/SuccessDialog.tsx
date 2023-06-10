import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React from 'react'
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTopAreaSx } from './SuccessDialogStyle';

export default function SuccessDialog(props: { open, onClose })
{

    const { open, onClose } = props;

    return (
        <Dialog open={open} onClose={onClose} sx={dialogSx} >
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle>
                    <Typography>

                        ספר עליך
                    </Typography>
                </DialogTitle>

                <Box sx={{ display: "flex", justifyContent: "end" }}>

                    {/* Close button */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={(event) => { onClose(event, undefined); }}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </Box>
            </Box>


            {/* about text */}
            <DialogContent sx={dialogContentSx} style={dialogContentStyle}>
                <Typography
                    sx={{
                        alignSelf: "center",
                        maxWidth: "100%",
                        overflowWrap: "break-word"
                    }}
                    variant='h4'
                    >
                </Typography>
            </DialogContent>
        </Dialog>
    )
}
