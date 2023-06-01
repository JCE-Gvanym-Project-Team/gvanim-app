import { Candidate } from "../Candidate";
import { CandidateJobStatus } from "../CandidateJobStatus";
import { filterByDates } from "./GlobalFunctions";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';




export default async function rejection(rejectionCause: string, sector :string, role: string, startDate: Date, endDate: Date): Promise<CandidateJobStatus[]> {
  // Get filtered candidate job statuses with the specified status
  // console.log(rejectionCause);
  // console.log(sector);
  // console.log(role);
  // console.log(startDate);
  // console.log(endDate);

  const _candidatesJobStatuses = await getFilteredCandidateJobStatuses(['status'], ['נדחה']);
  //console.log(_candidatesJobStatuses);

  // Create an array to store candidates with the specified rejection cause
  const resultCandidate: CandidateJobStatus[] = [];

  for (let i = 0; i < _candidatesJobStatuses.length; i++) {
    let candidate = _candidatesJobStatuses[i];

    // Check if the candidate's rejection cause matches the specified choice
    if (dayjs(candidate._applyDate).isBetween(dayjs(startDate), dayjs(endDate), null, '[]')) 
    {
         console.log("ho");
         let job = (await getFilteredJobs(["jobNumber"],[candidate._jobNumber.toString()])).at(0);
         if(job != undefined && (candidate._rejectCause == rejectionCause || rejectionCause == 'כל הסיבות' ) && 
              (job._role == role || role == "כל התפקידים") && (job._sector == sector || sector == 'כל הארץ') )
              {
                  resultCandidate.push(candidate);
              }
    }
  }

  // Filter candidates by the specified dates and return the result
  console.log(resultCandidate);
  return resultCandidate;
}
