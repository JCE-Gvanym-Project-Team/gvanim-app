import { CandidateJobStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { dataref } from "../FirebaseConfig/firebase";
import { Candidate, getFilteredCandidates } from "./Candidate";
import { appendToDatabase, getFirebaseIdsAtPath, getObjectAtPath, removeObjectAtPath, replaceData } from "./DBfuncs";
const database = dataref;

export class Job {
    public _title: string;
    public _jobNumber: number;
    public _role: string;
    public _scope: Array<number>;//first is the the smallest
    public _region: string;
    public _sector: string;
    public _description: string;// todo make arrays of strings[]
    public _requirements: string;
    public _open: boolean;
    public _highPriority: boolean;
    public _views: number;
    public _creationDate: Date

    constructor(
        jobNumber: number,
        title: string = "",
        role: string = "",
        scope: Array<number> = [0, 0],
        region: string = "",
        sector: string = "",
        description: string = "",
        requirements: string = "",
        open: boolean = true,
        highPriority: boolean = false,
        views: number = 0,
    ) {
        this._title = title;
        this._role = role;
        this._scope = scope;
        this._region = region;
        this._sector = sector;
        this._description = description;
        this._requirements = requirements;
        this._open = open;
        this._highPriority = highPriority;
        this._views = views;
        this._creationDate = new Date();
        this._jobNumber = jobNumber;
    }
    public async getCandidatures(): Promise<CandidateJobStatus[]> {
        return (await getFilteredCandidateJobStatuses(["jobNumber"], [this._jobNumber.toString()]));
    }
    public async getCandidates(): Promise<Candidate[]> {
        let candidates;
        let ids = (await this.getCandidatures()).map((obj) => obj._candidateId);
        ids = Array.from(new Set(ids));
        //candidtesId.forEach((id) => candidates.push(getFilteredCandidates(["id"], [id])[0]))
        for(let i=0;i<ids.length;i++)
            candidates.push((await getFilteredCandidates(["id"],[ids[i]])));
        return candidates;
    }
    public async remove() {
        const candidatures = await getFilteredCandidateJobStatuses(["jobNumber"],[this._jobNumber.toString()]);
        candidatures.forEach((c)=>c.remove());
        if((await this.exists()))
            removeObjectAtPath("/Jobs/" + this._jobNumber);
        
    }
    public async getPath() {
        if((await getFirebaseIdsAtPath('/Jobs')).includes(this._jobNumber.toString()))
            return "/Jobs/"+this._jobNumber;
        return "";
    }
    public async exists(){
        if((await this.getPath()).length>0)
            return true;
        return false;
    }
    public async edit(title: string = this._title,
        role: string = this._role,
        scope: Array<number> = this._scope,
        region: string = this._region,
        sector: string = this._sector,
        description: string = this._description,
        requirements: string = this._requirements,
        open: boolean = this._open,
        highPriority: boolean = this._highPriority) {
        this._title = title;
        this._role = role;
        this._sector = sector;
        this._description = description;
        this._requirements = requirements;
        this._open = open;
        this._highPriority = highPriority;
        if (!(await this.exists()))
            this.add();
        replaceData((await this.getPath()), this);
    }
    public async add() {
        if (!(await this.exists()))
            appendToDatabase(this, "/Jobs", this._jobNumber.toString());
    }
}
/* Jobs functions */
/**
 * Retrieves a list of all jobs from the Firebase Realtime Database.
 * @async
 * @function getJobsFromDatabase
 * @returns {Promise<Job[]>} A promise that resolves to an array of Job objects.
 * @throws {Error} If there is an error fetching the jobs from the database.
 */
async function getJobsFromDatabase(): Promise<Job[]> {
    try {
        const snapshot = await database.ref("/Jobs").once("value");
        const jobsData = snapshot.val();
        const jobs: Job[] = [];
        for (const i in jobsData) {
            const job = jobsData[i];
            jobs.push(job);
        }
        return jobs;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch jobs from database.");
    }
}
export async function generateJobNumber(): Promise<number> {
    const jobs = await getFilteredJobs();
    const len = jobs.length;
    const jobNumber: number[] = jobs.map((job) => job._jobNumber);
    const min = 10; // minimum number in range
    const max = len + 100; // maximum number in range
    let num = Math.floor(Math.random() * (max - min + 1)) + min; // generates a random number between 1 and 10
    while (jobs.some(job => job._jobNumber === num)) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num;
}
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
    let jobs = await getJobsFromDatabase();
    //filtering
    let i = attributes.indexOf("jobNumber");
    if (i >= 0) {
        jobs = jobs.filter(job => job._jobNumber.toString() === values[i])
    }
    i = attributes.indexOf("title");
    if (i >= 0) {
        jobs = jobs.filter(job => job._title === values[i])
    }
    i = attributes.indexOf("role");
    if (i >= 0) {
        jobs = jobs.filter(job => job._role === values[i])
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
        jobs = jobs.filter(job => job._open.toString() === values[i])
    }
    i = attributes.indexOf("highPriority");
    if (i >= 0) {
        jobs = jobs.filter(job => job._highPriority.toString() === values[i])
    }
    i = attributes.indexOf("sector");
    if (i >= 0) {
        jobs = jobs.filter(job => job._sector === values[i])
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
        job._open, job._highPriority, job._views));
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
    return b._views - a._views;
}
function compareByCreationDate(a: Job, b: Job): number {
    if (b._creationDate > a._creationDate)
        return 1;
    if (b._creationDate < a._creationDate)
        return -1;
    return 0;
}
