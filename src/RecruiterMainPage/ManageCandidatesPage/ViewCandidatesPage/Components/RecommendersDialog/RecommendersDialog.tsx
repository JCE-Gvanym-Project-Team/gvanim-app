import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useEffect, useState } from 'react'
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './RecommendersDialogStyle';
import { CandidateJobStatus } from '../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';

export default function RecommendersDialog(props: { open, onClose, jobId: string })
{
    const { open, onClose, jobId } = props;

    const [recommenders, setRecommenders] = useState<string[] | undefined>();

    const getRecommendationsURLs = async function () {
        // TODO: use getfilteredcandidatejobstatus and then use
        // this commented code because it actually works, but firebase code needs fixing
        // const a = await candidateJobStatus?.getRecomendationsUrl();
        // console.log("asd: " + a);
    }

    useEffect(() =>
    {
        console.log('use effect');
        getRecommendationsURLs();
    }, [jobId, open])

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
                <Button>
                    {recommenders}
                </Button>
            </DialogContent>
        </Dialog>
    )
}
