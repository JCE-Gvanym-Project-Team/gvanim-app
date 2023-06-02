import { Close } from '@mui/icons-material';
import { Box,  Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useEffect, useState } from 'react'
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './RecommendersDialogStyle';
import { CandidateJobStatus } from '../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';

export default function RecommendersDialog(props: {open, onClose, candidateJobStatus: CandidateJobStatus | null})
{
    const {open, onClose, candidateJobStatus} = props;

    const [recommenders, setRecommenders] = useState<any[]>();

    useEffect(() => {

    }, [])

    return (
        // popup dialog
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


            {/* */}
            <DialogContent sx={dialogContentSx} style={dialogContentStyle}>
                
            </DialogContent>
        </Dialog>
    )
}
