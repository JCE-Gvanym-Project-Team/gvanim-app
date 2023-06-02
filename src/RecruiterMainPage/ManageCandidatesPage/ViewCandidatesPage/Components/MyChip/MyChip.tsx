import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from '../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { Candidate } from '../../../../../Firebase/FirebaseFunctions/Candidate';

export default function MyChip(props: { jobId: string, candidate: Candidate | null })
{
    const { jobId, candidate } = props;
    const [candidateJobStatus, setCandidateJobStatus] = useState<CandidateJobStatus | null>();
    const getCandidateJobStatus = async function ()
    {
        setCandidateJobStatus((await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [jobId, candidate ? candidate._id : ""]))[0])
    }

    const getChipStyle = function(matchingRate) {
        if (matchingRate === 5){
            return {backgroundColor: "#00EE00", color: "black"}
        }
        if (matchingRate === 4){
            return {backgroundColor: "#00D800", color: "black"}
        }
        if (matchingRate === 3){
            return {backgroundColor: "#EEEE00", color: "black"}
        }
        if (matchingRate === 2){
            return {backgroundColor: "#FFA500", color: "black"}
        }
        if (matchingRate === 1){
            return {backgroundColor: "#FF0000", color: "black"}
        }
    }

    useEffect(() =>
    {
        getCandidateJobStatus();
    }, [jobId]);
    return (
        <Chip
            label={candidateJobStatus?._matchingRate === -1 ? "לא דורג" : candidateJobStatus?._matchingRate}
            sx={getChipStyle(candidateJobStatus?._matchingRate)}
        />
    )
}
