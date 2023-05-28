import { Candidate } from "../Candidate";
import { CandidateJobStatus } from "../CandidateJobStatus";
import { filterByDates } from "./GlobalFunctions";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";


export async function rejection(choise: string,  dates: Date[]) : Promise <CandidateJobStatus[]> {
   let _candidatesJobStatuses = await getFilteredCandidateJobStatuses(['status'] , ['reject']);
   let candidatesWithCasueReject: Array<CandidateJobStatus> = [];

   for( let i = 0 ; i < _candidatesJobStatuses.length ; i ++){
            let candidate = _candidatesJobStatuses[i];
            if(candidate._rejectCause == choise)
                  candidatesWithCasueReject.push(candidate);  
    }
    
    return filterByDates(candidatesWithCasueReject, [ Date[0],  Date[1]]);
}


