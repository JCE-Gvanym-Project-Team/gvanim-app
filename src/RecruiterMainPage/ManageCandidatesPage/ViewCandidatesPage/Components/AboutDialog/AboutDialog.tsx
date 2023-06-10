import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './AboutDialogStyle';
import { Candidate } from '../../../../../Firebase/FirebaseFunctions/Candidate';
import { ManageCandidatesPageGlobalStyle } from '../../../../PageStyles';
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from '../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';

export default function AboutDialog(props: { open, onClose, candidate: Candidate | null, jobId: string })
{
    const { open, onClose, candidate, jobId } = props;
    const [candidateJobStatus, setCandidateJobStatus] = useState<CandidateJobStatus | null>(null);

    const fetchCandidateJobStatus = async () =>
    {
        setCandidateJobStatus((await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [jobId, candidate?._id!]))[0]);
    }

    useEffect(() =>
    {
        fetchCandidateJobStatus();
    }, [jobId]);

    return (
        <Dialog open={open} onClose={onClose} sx={dialogSx} >
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    ספר עליך
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
                <Typography sx={{ fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily, alignSelf: "center", maxWidth: "100%", overflowWrap: "break-word"}}>
                    {candidateJobStatus?._about}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}
