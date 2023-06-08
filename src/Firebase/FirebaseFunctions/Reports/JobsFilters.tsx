

import { CandidateJobStatus } from "../CandidateJobStatus";
import { Job, getFilteredCandidateJobStatuses, getFilteredJobs } from "../functionIndex";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';


export default async function JobsByFilters(role: string, scope: string, sector: string, openJobs: boolean, highPriority: boolean, viewsAndApplyPerPlatform: string, startDate: Date, endDate: Date): Promise<CandidateJobStatus[]> {
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

    const jobs = await getFilteredJobs(attributes,values);
    console.log(jobs)

    // Create an array to store candidates with the specified rejection cause
    const promises: Promise<any>[] = [];

    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];
        console.log(job._creationDate);
        if (dayjs(job._creationDate).isBetween(dayjs(startDate), dayjs(endDate), null, '[]')) {
            console.log("hi");
            let promise = helperJobFilter(job, role, scope, sector, openJobs, highPriority, viewsAndApplyPerPlatform);
            console.log(promise);
            promises.push(promise);
        }
    }

    const resultJobs = await Promise.all(promises);
    console.log(resultJobs);
    return resultJobs;
}



export async function helperJobFilter(job: Job, role: string, scope: string, sector: string, openJobs: boolean, highPriority: boolean, viewsAndApplyPerPlatform: string) {
    let filteredJob: any = {
        "מספר משרה": job._jobNumber,
        "תפקיד": job._role,
        // "אחוז משרה": job._scope,
        "אשכול": job._sector,
        "אזור": job._region,
        // "משרה פתוחה" :job._open,
        "משרה בעדיפות גבוהה": job._highPriority
    };

    //if(viewsAndApplyPerPlatform != "אל תכלול")
    //

    return filteredJob;
}
