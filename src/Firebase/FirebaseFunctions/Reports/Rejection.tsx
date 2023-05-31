import { Candidate } from "../Candidate";
import { CandidateJobStatus } from "../CandidateJobStatus";
import { filterByDates } from "./GlobalFunctions";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";


export default async function rejection(choice: string, dates: Date[]): Promise<CandidateJobStatus[]> {
    // Get filtered candidate job statuses with the specified status
    let _candidatesJobStatuses = await getFilteredCandidateJobStatuses(['status'], ['reject']);
  
    // Create an array to store candidates with the specified rejection cause
    let candidatesWithCauseReject: Array<CandidateJobStatus> = [];
  
    for (let i = 0; i < _candidatesJobStatuses.length; i++) {
      let candidate = _candidatesJobStatuses[i];
      
      // Check if the candidate's rejection cause matches the specified choice
      if (candidate._rejectCause === choice) {
        candidatesWithCauseReject.push(candidate);
      }
    }
    
   // console.log(filterByDates(candidatesWithCauseReject, [dates[0], dates[1]]));
    // Filter candidates by the specified dates and return the result
    return filterByDates(candidatesWithCauseReject, [dates[0], dates[1]]);
  }
  