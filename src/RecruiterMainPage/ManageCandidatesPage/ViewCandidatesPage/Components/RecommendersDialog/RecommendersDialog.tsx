import { Close, FileCopy } from '@mui/icons-material';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from '../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { ManageCandidatesPageGlobalStyle } from '../../../../PageStyles';
import { dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './RecommendersDialogStyle';

export default function RecommendersDialog(props: { open, onClose, jobId: string, candidateId: string, setLoading})
{
    const { open, onClose, jobId, candidateId,setLoading } = props;

    const [recommendersLinks, setRecommendersLinks] = useState<string[] | undefined>();
    const [candidateJobStatus, setCandidateJobStatus] = useState<CandidateJobStatus | null>(null);
    

    const getRecommendationsURLs = async function ()
    {
        const candJobStatus = (await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [jobId, candidateId]))[0]
        setCandidateJobStatus(candJobStatus);
        setRecommendersLinks(await candJobStatus?.getRecomendationsUrl());
    }
    
    useEffect(() =>
    {
        getRecommendationsURLs();
    }, [open])

    return (
        // popup dialog
        <Dialog open={open} onClose={onClose} sx={dialogSx} >
            <Box sx={dialogTopAreaSx}>
                {/* Title */}
                <DialogTitle sx={dialogTitleSx}>
                    ממליצים
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


            {/* List of recommenders */}
            <DialogContent sx={dialogContentSx} style={dialogContentStyle}>

                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "100%" }}>
                    {candidateJobStatus?._recomendations.map((recommendation, index) =>
                    {
                        return (
                            <React.Fragment key={index + "Fragment"}>
                                <Box key={index + "box"} sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: "1rem",
                                    width: "100%"
                                }}>
                                    <Box sx={{ display: "flex", flexDirection: "column" }} key={index + "box2"}>
                                        <Typography
                                            sx={{
                                                fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
                                                fontWeight: "bold"
                                            }}
                                            key={index + "typography1"}
                                        >
                                            שם: {recommendation._fullName}
                                        </Typography >

                                        <Typography
                                            sx={{
                                                fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
                                                fontWeight: "bold"
                                            }}
                                            key={index + "typography2"}
                                        >
                                            טלפון: {recommendation._phone}
                                        </Typography >

                                        <Typography
                                            sx={{
                                                fontFamily: ManageCandidatesPageGlobalStyle.textFontFamily,
                                                fontWeight: "bold"
                                            }}
                                            key={index + "typography3"}
                                        >
                                            אימייל:  {recommendation._eMail}
                                        </Typography >
                                    </Box>

                                    <Button
                                    sx={{marginLeft: "1rem"}}
                                        variant='outlined'
                                        onClick={() =>
                                        {
                                            window.open(recommendersLinks ? recommendersLinks[index] : "");
                                        }}
                                        key={index + "Button"}
                                    >
                                        <FileCopy />
                                        קובץ מצורף
                                    </Button>

                                </Box>

                            </React.Fragment>
                        )
                    })}
                </Box>

            </DialogContent>
        </Dialog>
    )
}
