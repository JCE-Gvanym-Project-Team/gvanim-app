import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import React from 'react'
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './AboutDialogStyle';
import { Candidate } from '../../../../../Firebase/FirebaseFunctions/Candidate';

export default function AboutDialog(props: { open, onClose, candidate: Candidate | null})
{

    const { open, onClose } = props;
    return (
        <Dialog open={open} onClose={onClose} sx={dialogSx} >
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    העברת משרה
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


            {/*  */}
            <DialogContent sx={dialogContentSx} style={dialogContentStyle}>
                <Button>
                    asd
                </Button>
            </DialogContent>
        </Dialog>
    )
}
