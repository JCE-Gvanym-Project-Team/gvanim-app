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
    useEffect(() =>
    {
        getCandidateJobStatus();
    }, [jobId]);
    return (
        <Chip label={candidateJobStatus?._matchingRate === -1 ? "לא דורג" : candidateJobStatus?._matchingRate} />
    )
}
