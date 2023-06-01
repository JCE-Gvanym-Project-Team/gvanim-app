import { Candidate } from "../Candidate";
import { CandidateJobStatus } from "../CandidateJobStatus";
import { filterByDates } from "./GlobalFunctions";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import * as XLSX from 'xlsx';




export default async function rejection(rejectionCause: string, sector: string, role: string, startDate: Date, endDate: Date): Promise<CandidateJobStatus[]> {
  const _candidatesJobStatuses = await getFilteredCandidateJobStatuses(['status'], ['נדחה']);

  // Create an array to store candidates with the specified rejection cause
  const resultCandidate: CandidateJobStatus[] = [];

  for (let i = 0; i < _candidatesJobStatuses.length; i++) {
    let candidate = _candidatesJobStatuses[i];

    if (dayjs(candidate._applyDate).isBetween(dayjs(startDate), dayjs(endDate), null, '[]')) {
      let job = (await getFilteredJobs(["jobNumber"], [candidate._jobNumber.toString()])).at(0);
      if (job != undefined && (candidate._rejectCause == rejectionCause || rejectionCause == 'כל הסיבות') &&
        (job._role == role || role == "כל התפקידים") && (job._sector == sector || sector == 'כל הארץ')) {
        resultCandidate.push(candidate);
      }
    }
  }

  // Create a workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(resultCandidate);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");

  // Write the workbook to a file
  XLSX.writeFile(workbook, "candidates.xlsx");

  return resultCandidate;
}
