import { Candidate } from "../Candidate";
import { CandidateJobStatus } from "../CandidateJobStatus";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";



export async function filterByDates(listCandidates: CandidateJobStatus[] , dates: Date[]): Promise<CandidateJobStatus[]>{
    let candidatesWithCasueReject: Array<CandidateJobStatus> = [];
    
    for(let i = 0 ; i < listCandidates.length ; i ++){
        let candidate = listCandidates[i];
        if(candidate._applyDate >= dates[0] && candidate._lastUpdate <= dates[1])
           candidatesWithCasueReject.push(candidate);
    }

    return candidatesWithCasueReject;
}