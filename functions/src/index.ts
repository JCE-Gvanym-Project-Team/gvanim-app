import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(); // Initialize the Firebase Admin SDK

// Your getFilteredJobs function code goes here

// Export the Cloud Function
export const getFilteredJobsCloudFunction = functions
  .region('europe-west1')
  .https
  .onRequest(async (request, response) => {
    try {
      const { attributes, values, sortBy } = request.body;
      const filteredJobs = await getFilteredJobs(attributes, values, sortBy);
      response.json(filteredJobs);
    } catch (error) {
      console.error('Error executing getFilteredJobs:', error);
      response.status(500).send('An error occurred while executing the function.');
    }
  });
/**
 * Filters the list of jobs based on the given attributes and values, and sorts the result
 * @param {string[]} [attributes=[]] - An array of attributes name to filter by.
 * @param {string[]} [values=[]] - An array of values to filter by,
 *  make sure the order of the values is correspond to the order of attributes array.
 * 	sendd all values as string for boolean value use 'true' or 'false' number as '123' and scope '50,100'
 * @param {string} [sortBy=""] - The attribute to sort the jobs by.
 * @returns {Promise<Job[]>} - A promise that resolves to an array of Job objects that match the filter criteria and sorted by desired attribute.
 */
export async function getFilteredJobs(attributes: string[] = [], values: string[] = [], sortBy: string = ""): Promise<Job[]> {
    if (attributes.length !== values.length) {
        console.log("the attributes length not match to values length")
        return [];
    }
    let jobs = ;
    //filtering
    let i = attributes.indexOf("jobNumber");
    if (i >= 0) {
        jobs = jobs.filter(job => job._jobNumber.toString() === values.at(i))
    }
    i = attributes.indexOf("title");
    if (i >= 0) {
        jobs = jobs.filter(job => job._title === values.at(i))
    }
    i = attributes.indexOf("role");
    if (i >= 0) {
        jobs = jobs.filter(job => job._role === values.at(i))
    }
    i = attributes.indexOf("scope");
    if (i >= 0) {
        let scope = values[i].split(",").map(num => parseInt(num))
        jobs = jobs.filter((job) => job._scope[0] <= scope[0] || scope[1] <= job._scope[1]);
    }
    i = attributes.indexOf("description");
    if (i >= 0) {
        jobs = jobs.filter(job => job._description.includes(values[i]));
    }
    i = attributes.indexOf("open");
    if (i >= 0) {
        jobs = jobs.filter(job => job._open.toString() === values.at(i))
    }
    i = attributes.indexOf("highPriority");
    if (i >= 0) {
        jobs = jobs.filter(job => job._highPriority.toString() === values.at(i))
    }
    i = attributes.indexOf("sector");
    if (i >= 0) {
        jobs = jobs.filter(job => job._sector === values.at(i))
    }
    //sorting
    if (sortBy === "title")
        return jobs.sort(compareByTitle);
    if (sortBy === "jobNumber")
        return jobs.sort(compareByJobNumber);
    if (sortBy === "role")
        return jobs.sort(compareByRole);
    if (sortBy === "scope")
        return jobs.sort(compareByScope);
    if (sortBy === "region")
        return jobs.sort(compareByRegion);
    if (sortBy === "sector")
        return jobs.sort(compareBySector);
    if (sortBy === "open")
        return jobs.sort(compareByOpen);
    if (sortBy === "hightPriority")
        return jobs.sort(compareByHighPriority);
    if (sortBy === "creationDate")
        return jobs.sort(compareByCreationDate);
    if (sortBy === "views")
        return jobs.sort(compareByViews);
    return jobs.map((job) => new Job(job._jobNumber, job._title, job._role, job._scope
        , job._region, job._sector, job._description, job._requirements,
        job._open, job._highPriority, job._viewsPerPlatform, job._applyPerPlatform, job._creationDate, job._startOn));
}
/* compare function for sort */
function compareByTitle(a: Job, b: Job): number {
    return a._title.localeCompare(b._title);
}

function compareByJobNumber(a: Job, b: Job): number {
    return a._jobNumber - b._jobNumber;
}

function compareByRole(a: Job, b: Job): number {
    return a._role.localeCompare(b._role);
}

function compareByScope(a: Job, b: Job): number {
    return a._scope[1] - b._scope[1];
}

function compareByRegion(a: Job, b: Job): number {
    return a._region.localeCompare(b._region);
}

function compareBySector(a: Job, b: Job): number {
    return a._sector.localeCompare(b._sector);
}

function compareByOpen(a: Job, b: Job): number {
    if (b._open === a._open)
        return 0;
    if (b._open === true)
        return 1;
    return -1;
}

function compareByHighPriority(a: Job, b: Job): number {
    if (b._highPriority === a._highPriority)
        return 0;
    if (b._highPriority === true)
        return 1;
    return -1;
}

function compareByViews(a: Job, b: Job): number {
    let asum = 0;
    let bsum = 0;
    for (const [key, value] of Array.from(a._viewsPerPlatform))
        asum += value;
    for (const [key, value] of Array.from(b._viewsPerPlatform))
        bsum += value;
    return bsum - asum;
}
function compareByCreationDate(a: Job, b: Job): number {
    if (b._creationDate > a._creationDate)
        return 1;
    if (b._creationDate < a._creationDate)
        return -1;
    return 0;
}
