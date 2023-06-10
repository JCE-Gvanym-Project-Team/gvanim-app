

import { CandidateJobStatus } from "../CandidateJobStatus";
import { Job, getFilteredCandidateJobStatuses, getFilteredJobs } from "../functionIndex";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';


export default async function JobsByFilters(role: string, scope: number, sector: string, openJobs: boolean, highPriority: boolean, viewsAndApplyPerPlatform: string, startDate: Date, endDate: Date): Promise<CandidateJobStatus[]> {
    let attributes: string[] = [];
    let values: string[] = [];

    if (role != "כל התפקידים") {
        attributes.push("role");
        values.push(role);
    }

    if (openJobs === true) {
        attributes.push("open");
        values.push("true");
    }

    if (highPriority === true) {
        attributes.push("highPriority");
        values.push("true");
    }

    if (sector != "כל הארץ") {
        attributes.push("sector");
        values.push(sector);
    }

    const jobs = await getFilteredJobs();

    const promises: Promise<any>[] = [];

    
    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];
        // if (dayjs(job._creationDate).isBetween(dayjs(startDate), dayjs(endDate), null, '[]')) {
        if((job._scope[1] <= scope && job._scope[0] >= scope - 24) || scope == 1) {  
            let promise = helperJobFilter(job, role, job._scope, sector, openJobs, highPriority, viewsAndApplyPerPlatform);
            promises.push(promise);
        }
        // }
    }

    const resultJobs = await Promise.all(promises);
    return resultJobs;
}



export async function helperJobFilter(job: Job, role: string, scope: number[], sector: string, openJobs: boolean, highPriority: boolean, viewsAndApplyPerPlatform: string) {
    let filteredJob: any = {
        "מספר משרה": job._jobNumber,
        "תפקיד": job._role,
        "אשכול": job._sector,
        "אזור": job._region,
        "אחוז משרה": job._scope.toString(),
    };

    if (highPriority === false) {
        filteredJob["משרה בעדיפות רגילה/גבוהה"] = job._highPriority === true ? "כן" : "לא";
    }

    if (openJobs === false) {
        filteredJob["משרה פתוחה/סגורה"] = job._open === true ? "פתוחה" : "סגורה";
    }

    //if(viewsAndApplyPerPlatform != "אל תכלול")
    //

    return filteredJob;
}
