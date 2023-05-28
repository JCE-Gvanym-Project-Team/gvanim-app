import { Candidate } from "../Candidate";
import { Job, loginAdmin, getFilteredCandidateJobStatuses, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";



export async function filterByRegion(region: string): Promise <Candidate[]> {
    const jobs = await getFilteredJobs(['region'], [region]);
    let candidates: Array<Candidate> = [];
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];
        let cands = await job.getCandidates();
        for (let j = 0; j < candidates.length; j++) {
            candidates.push(cands[j]);
        }
    }
    return candidates;
}



export async function main(filters: any[]): Promise <any[]> {
    // loginAdmin().then(async () => {
        // let job1 = new Job(await generateJobNumber(), '  דרוש עובד סוציאלי', 'עובד סוציאלי', [40, 80], 'חיפה', '1');
        // await job1.add();
        // console.log((await getFilteredJobs()));
    // });

    const cnadidateStation = await filterByStation(filters[0])  
    //const candidate = await getFilteredCandidateJobStatuses([], filters[0]);

}



export async function filterByStation (choice: string): Promise<Candidate[]>{
  let candidates: Array<Candidate> = [];
 
  if(choice == "not_received_yet"){
    candidates = await getFilteredCandidateJobStatuses(["status"], [choice]);
  }
  else if (choice == "accepted_for_position"){

  }
  else{ // choice == "all_candidates"
   
  }

} 