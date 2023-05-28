import { Candidate } from "../Candidate";
import { Job, loginAdmin, generateJobNumber, getFilteredJobs, loginRecruiter } from "../functionIndex";


async function generateFilteredReports(reports: any[], filters: any[]): Promise<any[]> {
    let filteredData = reports;
  
    for (const filter of filters) {
      if (filter.type === 'category') {
        filteredData = await filterByCategory(filteredData, filter.value);
      } else if (filter.type === 'date') {
        filteredData = await filterByDate(filteredData, filter.startDate, filter.endDate);
      }
    }
  
    return filteredData;
  }



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






export async function main() {
    loginAdmin().then(async () => {
        // let job1 = new Job(await generateJobNumber(), '  דרוש עובד סוציאלי', 'עובד סוציאלי', [40, 80], 'חיפה', '1');
        // await job1.add();
        console.log((await getFilteredJobs()));
    });
}