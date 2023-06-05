import { CandidateJobStatus } from "../CandidateJobStatus";
import { getFilteredCandidateJobStatuses, getFilteredJobs } from "../functionIndex";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';


//         const result = CandidateByFilters(status, timeOnStatus ,sector, role, formattedStartDate, formattedEndDate)


export default async function CandidateByFilters(status: string, timeOnStatus:string, sector: string, role: string, startDate: Date, endDate: Date): Promise<CandidateJobStatus[]> {
    const _candidatesJobStatuses = await getFilteredCandidateJobStatuses(['status'], ['נדחה']);
    
    // Create an array to store candidates with the specified rejection cause
    const resultCandidate: CandidateJobStatus[] = [];
  
    for (let i = 0; i < _candidatesJobStatuses.length; i++) {
      let candidate = _candidatesJobStatuses[i]
      
      if (dayjs(candidate._applyDate).isBetween(dayjs(startDate), dayjs(endDate), null, '[]')) {
        let job = (await getFilteredJobs(["jobNumber"], [candidate._jobNumber.toString()])).at(0);
        
        // if (job != undefined && (candidate._rejectCause == rejectionCause || rejectionCause == 'כל הסיבות') &&
            // (job._role == role || role == "כל התפקידים") && (job._sector == sector || sector == 'כל הארץ')) {
        //   resultCandidate.push(candidate);
        // }
      }
    }
  
    console.log(resultCandidate);
    return resultCandidate;
  }
  




















// export async function filterByRegion(region: string): Promise <Candidate[]> {
//     const jobs = await getFilteredJobs(['region'], [region]);
//     let candidates: Array<Candidate> = [];
//     for (let i = 0; i < jobs.length; i++) {
//         let job = jobs[i];
//         let cands = await job.getCandidates();
//         for (let j = 0; j < candidates.length; j++) {
//             candidates.push(cands[j]);
//         }
//     }
//     return candidates;
// }



//export async function main(filters: any[]): Promise <any[]> {
    // loginAdmin().then(async () => {
        // let job1 = new Job(await generateJobNumber(), '  דרוש עובד סוציאלי', 'עובד סוציאלי', [40, 80], 'חיפה', '1');
        // await job1.add();
        // console.log((await getFilteredJobs()));
    // });

    //const cnadidateStation = await filterByStation(filters[0])  
    //const candidate = await getFilteredCandidateJobStatuses([], filters[0]);

//}



// export async function filterByStation (choice: string): Promise<Candidate[]>{
//   let candidates: Array<Candidate> = [];
//  
//   if(choice == "not_received_yet"){
    // candidates = await getFilteredCandidateJobStatuses(["status"], [choice]);
//   }
//   else if (choice == "accepted_for_position"){
// 
//   }
//   else{ // choice == "all_candidates"
//    
//   }
// 
// } 