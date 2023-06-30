import { CandidateJobStatus } from "../CandidateJobStatus";
import { Job, getFilteredJobs } from "../functionIndex";
import dayjs from "dayjs";





export default async function JobsByFilters(role: string, scope: Array<number>, sector: string, openJobs: boolean, highPriority: boolean, startOn: boolean, platformForApply: string, platformForViews: string, startDate: Date, endDate: Date): Promise<CandidateJobStatus[]> {
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

    if (sector !== "כל האשכולות") {
        attributes.push("sector");
        values.push(sector);
    }

    let jobs;
    console.log(attributes);
    console.log(values);
    jobs = await getFilteredJobs(attributes, values);
    console.log(jobs);

    const promises: Promise<any>[] = [];

    const jobsByRegion: { [region: string]: number } = {};


    for (let i = 0; i < jobs.length; i++) {
        let job = jobs[i];

        const isScopeMatch = (job) => (job._scope[1] >= scope && job._scope[0] <= scope) || !scope.includes(1);
        const isSectorMatch = (job) => job._sector === sector || sector === 'כל האשכולות';
        const isRoleMatch = (job) => job._role === role || role === 'כל התפקידים';
        const isOpenJobsMatch = (job) => job._open === openJobs || openJobs === false;
        const isHighPriorityMatch = (job) => job._highPriority === highPriority || highPriority === false;
        const isStartOnMatch = (job) => job._startOn === highPriority || highPriority === false;

        // Check if the job matches the sector and role and StartOn conditions and scope
        if (isSectorMatch(job) && isRoleMatch(job) && isStartOnMatch(job) && isScopeMatch(job)) {
            // Check if the job matches the open jobs and high priority conditions
            if (isOpenJobsMatch(job) && isHighPriorityMatch(job)) {
                // Process the job using helperJobFilter function
                let promise = helperJobFilter(job, openJobs, highPriority, startOn, platformForApply, platformForViews);
                promises.push(promise);
            }
        }



        // if (dayjs(job._creationDate).isBetween(dayjs(startDate), dayjs(endDate), null, '[]')) {
        // if (((job._scope[1] >= scope && job._scope[0] <= scope) || scope === 1) &&
        //     (platformForApply in job._applyPerPlatform || platformForApply === 'כל הפלטפורמות' ||
        //         platformForApply === 'איני רוצה לבחור אף פלטפורמה'))              
        //     if ((job._sector === sector || sector === 'כל האשכולות') && (job._role === role || role === 'כל התפקידים'))
        //         if ((job._open === openJobs || openJobs === false) && (job._highPriority === highPriority || highPriority === false)) {
        //             let promise = helperJobFilter(job, role, job._scope, sector, openJobs, highPriority, platformForApply);
        //             promises.push(promise);
        //         }
        // }
    }

    const resultJobs = await Promise.all(promises);

    // const regions = Object.keys(jobsByRegion);
    // const quantities = Object.values(jobsByRegion);

    return resultJobs;

}



async function helperJobFilter(job: Job, openJobs: boolean, highPriority: boolean, startOn: boolean, platformForApply: string, platformForViews: string) {
    let filteredJob: any = {
        "מספר משרה": job._jobNumber,
        "תפקיד": job._role,
        "אשכול": job._sector,
        "אזור": job._region,
        "אחוז משרה": "[" + job._scope.toString() + "]"
    };

    if (highPriority === false) {
        filteredJob["משרה בעדיפות רגילה/גבוהה"] = job._highPriority === true ? "כן" : "לא";
    }
    if (openJobs === false) {
        filteredJob["משרה פתוחה/סגורה"] = job._open === true ? "פתוחה" : "סגורה";
    }
    if (startOn === false) {
        filteredJob["משרה מיידית/לא מיידית"] = job._startOn === 'מיידית' ? "מיידית" : "לא מיידית";
    }

    let sumApplys = 0;
    let sumViews = 0;

    // field apply
    if (platformForApply === 'כל הפלטפורמות') {
        const jobPlatformsForApply = Object.keys(job._applyPerPlatform) as string[];
        let strThatSavePlatAndSum: string = '[';

        for (let i = 0; i < jobPlatformsForApply.length; i++) {
            const platform = jobPlatformsForApply[i];
            const sum = job._applyPerPlatform[platform];
            if (sum > 0) {
                let platToAdd = platform + ": " + sum;
                if (i + 1 < jobPlatformsForApply.length)
                    platToAdd += ', ';
                strThatSavePlatAndSum += platToAdd;
                sumApplys += sum;
            }
        }
        if (jobPlatformsForApply.length === 0)
            strThatSavePlatAndSum = 'כרגע אין';
        else
            strThatSavePlatAndSum += ']';
        filteredJob["הגשות דרך הפלטפורמות"] = strThatSavePlatAndSum;
    }
    else if (platformForApply !== 'איני רוצה לבחור אף פלטפורמה') {
        let sum = job._applyPerPlatform[platformForApply];
        if (sum === undefined)
            sum = 0;
        filteredJob["מס הגשות דרך פלטפורמת: " + platformForApply] = sum;
        sumApplys = sum;
    }

    // Field views

    if (platformForViews === 'כל הפלטפורמות') {
        const jobPlatformsForViews = Object.keys(job._viewsPerPlatform) as string[];
        let strThatSavePlatAndSum: string = '[';

        for (let i = 0; i < jobPlatformsForViews.length; i++) {
            const platform = jobPlatformsForViews[i];
            const sum = job._viewsPerPlatform[platform];
            if (sum > 0) {
                let platToAdd = platform + ": " + sum;
                if (i + 1 < jobPlatformsForViews.length)
                    platToAdd += ', ';
                strThatSavePlatAndSum += platToAdd;
                sumViews += sum;
            }
        }
        if (jobPlatformsForViews.length === 0)
            strThatSavePlatAndSum = 'כרגע אין';
        else
            strThatSavePlatAndSum += ']';
        filteredJob["צפיות דרך הפלטפורמות"] = strThatSavePlatAndSum;
    }
    else if (platformForViews !== 'איני רוצה לבחור אף פלטפורמה') {
        let sum = job._viewsPerPlatform[platformForViews];
        if (sum === undefined)
            sum = 0;
        filteredJob["צפיות דרך פלטפורמת: " + platformForViews] = sum;
        sumViews = sum;
    }

    if (platformForViews === platformForApply && platformForViews !== 'איני רוצה לבחור אף פלטפורמה') {
        if (sumViews === 0)
            filteredJob["אחוז הגשות מול אחוז הצפיות"] = 'אין מספיק נתונים';
        else {
            let precent = sumApplys / sumViews;
            if (precent === 1)
                precent = precent * 100;
            filteredJob["אחוז הגשות מול אחוז הצפיות"] = precent.toFixed(2) + '%';
        }
    }


    return filteredJob;
}

