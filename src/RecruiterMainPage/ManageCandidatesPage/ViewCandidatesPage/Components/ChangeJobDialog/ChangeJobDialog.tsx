import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Typography, Box, IconButton, FormControl, InputLabel, Select, MenuItem, Autocomplete, Icon } from '@mui/material';
import { dialogActionsSx, dialogContentStyle, dialogContentSx, dialogSx, dialogTitleSx, dialogTopAreaSx } from './ChangeJobDialogStyle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from '../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { Candidate } from '../../../../../Firebase/FirebaseFunctions/Candidate';
import { useNavigate } from 'react-router-dom';

export default function ChangeJobDialog(props: { open, onClose, candidateAppliedJobs, allJobs, candidate: Candidate | null })
{
    const { open, onClose, candidateAppliedJobs, allJobs, candidate } = props;
    const [fromJobValue, setFromJobValue] = useState('');
    const [toJobValue, setToJobValue] = useState('');
    const [fromJobError, setFromJobError] = useState(false);
    const [toJobError, setToJobError] = useState(true);
    const navigate = useNavigate();

    const handleFromJobChange = (event, value) =>
    {
        setFromJobValue(value);
    };

    const handleToJobChange = (event, value) =>
    {
        setToJobError(false);
        setFromJobError(false);
        setToJobValue(value);
    };

    useEffect(() => {
        setToJobError(false);
        setFromJobError(false);
    }, [])

    const handleSubmit = async () =>
    {
        if (!candidate)
        {
            setFromJobValue('');
            setToJobValue('');
            onClose();
        }
        // TODO: Perform submit logic here
        const fromJobNumberString = fromJobValue?.match(/\d+/)?.[0];
        const fromJobNumber = fromJobNumberString ? parseInt(fromJobNumberString) : NaN;

        const toJobNumberString = toJobValue?.match(/\d+/)?.[0];
        const toJobNumber = toJobNumberString ? parseInt(toJobNumberString) : NaN;

        // set error if user forgot to enter one
        if (Number.isNaN(fromJobNumber))
        {
            setFromJobError(true);
            setFromJobValue('');
            setToJobValue('');
            return;
        }

        if (Number.isNaN(toJobNumber))
        {
            setToJobError(true);
            setFromJobValue('');
            setToJobValue('');
            return;
        }

        // remove from chosen "from" job
        const fromCandidateJobStatus = await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [fromJobNumber.toString(), candidate ? candidate._id : ""]);
        const temp: CandidateJobStatus = new CandidateJobStatus(
            fromCandidateJobStatus[0]._jobNumber,
            fromCandidateJobStatus[0]._candidateId,
            fromCandidateJobStatus[0]._status,
            fromCandidateJobStatus[0]._about,
            fromCandidateJobStatus[0]._matchingRate,
            fromCandidateJobStatus[0]._applyDate,
            fromCandidateJobStatus[0]._lastUpdate,
            fromCandidateJobStatus[0]._interviewsSummery,
            fromCandidateJobStatus[0]._recomendations);
        await temp.remove();

        const tempCandidate: Candidate = new Candidate(
            !candidate?._id ? "" : candidate?._id,
            candidate?._firstName,
            candidate?._lastName,
            candidate?._phone,
            candidate?._eMail,
            candidate?._generalRating);

        await candidate?.apply(toJobNumber, "don't know what to put in about pls send help");


        // reset values
        setFromJobValue('');
        setToJobValue('');
        navigate("/manageCandidates/" + candidate?._id, { state: candidate?._id });
        onClose();
    };


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
                        onClick={(event) => { onClose(event, undefined); setFromJobValue(''); setToJobValue(''); }}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>


            {/* Job Picking Area */}
            <DialogContent sx={dialogContentSx} style={dialogContentStyle}>
                <Autocomplete
                    disablePortal
                    options={candidateAppliedJobs}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="ממשרה" />}
                    onChange={handleFromJobChange}
                    onInputChange={(event, value) =>
                    {
                        setFromJobValue(value);
                    }}
                />

                <ArrowBackIcon sx={{ display: { xs: "none", md: "block" } }} />
                <ArrowDownwardIcon sx={{ display: { xs: "block", md: "none" } }} />

                <Autocomplete
                    disablePortal
                    options={allJobs}
                    sx={{ width: 300 , borderBottom: toJobError ? "1px solid red" : "0px"}}
                    renderInput={(params) => <TextField {...params} label="למשרה" />}
                    onClick={() => setToJobError(false)}
                    onChange={handleToJobChange}
                    onInputChange={(event, value) =>
                    {
                        setToJobValue(value);
                    }}
                />
            </DialogContent>

            {/* Action Button */}
            <DialogActions sx={dialogActionsSx}>
                <Button onClick={handleSubmit}>העבר</Button>
            </DialogActions>
        </Dialog>
    );
}
