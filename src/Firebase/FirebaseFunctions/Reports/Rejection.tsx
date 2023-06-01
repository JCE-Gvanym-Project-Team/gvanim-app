import { Candidate } from "../Candidate";
import { CandidateJobStatus } from "../CandidateJobStatus";
import { filterByDates } from "./GlobalFunctions";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";




export default async function rejection(rejectionCause: string, region:string, role: string, startDate: Date, endDate: Date): Promise<CandidateJobStatus[]> {
  // Get filtered candidate job statuses with the specified status
  const _candidatesJobStatuses = await getFilteredCandidateJobStatuses(['status'], ['reject']);

  // Create an array to store candidates with the specified rejection cause
  const resultCandidate: CandidateJobStatus[] = [];

  for (let i = 0; i < _candidatesJobStatuses.length; i++) {
    let candidate = _candidatesJobStatuses[i];

    // Check if the candidate's rejection cause matches the specified choice
    if ((candidate._rejectCause === rejectionCause) && (candidate._applyDate >=startDate && candidate._lastUpdate)) {
          //  const jobCurrent = new Job(candidate._jobNumber);
          //  jobCurrent.getCandidates();
          resultCandidate.push(candidate);
    }
  }

  // Filter candidates by the specified dates and return the result
  return resultCandidate;
}
