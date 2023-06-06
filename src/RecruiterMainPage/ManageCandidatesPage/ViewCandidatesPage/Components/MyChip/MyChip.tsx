import { Chip } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CandidateJobStatus, allStatus, getFilteredCandidateJobStatuses } from '../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';
import { Candidate } from '../../../../../Firebase/FirebaseFunctions/Candidate';
import { Autorenew, Check, DoneAll, MoodBad, ThumbDown, ThumbUp } from '@mui/icons-material';

export default function MyChip(props: { jobId: string, candidate: Candidate | null, purpose })
{
    const { jobId, candidate, purpose } = props;
    const [candidateJobStatus, setCandidateJobStatus] = useState<CandidateJobStatus | null>();
    const [statusChipStyle, setStatusChipStyle] = useState<any>();
    const getCandidateJobStatus = async function ()
    {
        setCandidateJobStatus((await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], [jobId, candidate ? candidate._id : ""]))[0])
    }

    const getChipStyle = function (matchingRate)
    {
        if (matchingRate === 5)
        {
            return { backgroundColor: "#00EE00", color: "black" }
        }
        if (matchingRate === 4)
        {
            return { backgroundColor: "#00D800", color: "black" }
        }
        if (matchingRate === 3)
        {
            return { backgroundColor: "#EEEE00", color: "black" }
        }
        if (matchingRate === 2)
        {
            return { backgroundColor: "#FFA500", color: "black" }
        }
        if (matchingRate === 1)
        {
            return { backgroundColor: "#FF0000", color: "black" }
        }
    }

    const getStatusChipStyle = function (status)
    {
        if (status === allStatus[1] || status === allStatus[3])
        {
            return { textColor: "#6a7000", icon: <Check color='primary' sx={{ color: "#6a7000" }} /> };
        }
        if (status === allStatus[2] || status === allStatus[4])
        {
            return { textColor: "#008000", icon: <DoneAll color='primary' sx={{ color: "#008000" }} /> };
        }
        if (status === allStatus[5])
        {
            return { textColor: "#00AA00", icon: <ThumbUp color='primary' sx={{ color: "#00AA00", transform: "scaleX(-1)" }} /> };
        }
        if (status === allStatus[6])
        {
            return { textColor: "#2196F3", icon: <Autorenew color='primary' sx={{ color: "#2196F3" }} /> };
        }
        if (status === allStatus[7])
        {
            return { textColor: "#FF5733", icon: <ThumbDown color='primary' sx={{ color: "#FF5733" }} /> };
        }
        if (status === allStatus[8])
        {
            return { textColor: "#800000", icon: <MoodBad color='primary' sx={{ color: "#800000" }} /> };
        }
    }

    useEffect(() =>
    {
        getCandidateJobStatus();
    }, [jobId]);

    useEffect(() =>
    {
        setStatusChipStyle(getStatusChipStyle(candidateJobStatus?._status))
    }, [candidateJobStatus]);
    return (
        purpose === "status" ?
            <Chip
                label={candidateJobStatus?._status}
                icon={statusChipStyle?.icon}
                sx={{ color: statusChipStyle?.textColor, backgroundColor: "white" }}
                variant='outlined'
            />
            :
            <Chip
                label={candidateJobStatus?._matchingRate === -1 ? "לא דורג" : candidateJobStatus?._matchingRate}
                sx={getChipStyle(candidateJobStatus?._matchingRate)}
                variant='outlined'

            />
    )
}
