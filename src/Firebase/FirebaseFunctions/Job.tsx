import { realtimeDB } from "../FirebaseConfig/firebase";
import { Candidate, getFilteredCandidates, getCandidatesByIds } from "./Candidate";
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { appendToDatabase, getFirebaseIdsAtPath, removeObjectAtPath, replaceData } from "./DBfuncs";
import { getOpenRoles } from "./Role";
import { getOpenSectors } from "./Sector";
import axios from 'axios';

const database = realtimeDB;

export class Job {
    public _title: string;
    public _jobNumber: number;
    public _role: string;
    public _scope: Array<number>;//first is the the smallest
    public _region: string;
    public _sector: string;
    public _description: string[];
    public _requirements: string;
    public _open: boolean;
    public _highPriority: boolean;
    public _viewsPerPlatform: {[key :string]: number};
    public _applyPerPlatform: {[key :string]: number};
    public _creationDate: string;
    public _startOn: string;

    constructor(
        jobNumber: number,
        title: string = "",
        role: string = "",
        scope: Array<number> = [0, 0],
        region: string = "",
        sector: string = "",
        description: string[] = [],
        requirements: string = "",
        open: boolean = true,
        highPriority: boolean = false,
        viewsPerPlatform: {[key :string]: number} = {},
        applyPerPlatform: {[key :string]: number} = {},
        creationDate = new Date(0, 0, 0),
        startOn = 'מיידי'
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
        this._viewsPerPlatform = viewsPerPlatform;
        this._applyPerPlatform = applyPerPlatform;
        const defaultDate = new Date(0, 0, 0);
        if (creationDate === defaultDate)
            this._creationDate = (new Date()).toString();
        else
            this._creationDate = creationDate.toString();
        this._jobNumber = jobNumber;
        this._startOn = startOn;
    }
    /**
     * Retrieves the candidate job statuses for the current job.
     * @returns {Promise<CandidateJobStatus[]>} - A promise that resolves to an array of candidate job statuses.
     */
    public async getCandidatures(): Promise<CandidateJobStatus[]> {
        return (await getFilteredCandidateJobStatuses(["jobNumber"], [this._jobNumber.toString()]));
    }
    /**
     * Retrieves a list of candidates for current Job.
     * @async
     * @returns {Promise<Candidate[]>} - A promise that resolves to an array of Candidate objects.
     */
    public async getCandidates(): Promise<Candidate[]> {
        let candidates;
        let ids = (await this.getCandidatures()).map((obj) => obj._candidateId);
        ids = Array.from(new Set(ids));
        return getCandidatesByIds(ids);
    }
    public async updateTitle(title: string) {
        if (await this.exists()) {
            this._title = title;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateRole(role: string) {
        if (await this.exists() && ((await getOpenRoles()).map((r) => r._name)).includes(role)) {
            this._role = role;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateScope(scope: Array<number>) {
        if (await this.exists() && scope.length === 2) {
            if (scope[0] < scope[1])
                this._scope = scope;
            else {
                this._scope[0] = scope[1];
                this._scope[1] = scope[0];
            }
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateRegion(region: string) {
        if (await this.exists()) {
            this._region = region;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateSector(sector: string) {
        if (await this.exists() && ((await getOpenSectors()).map((s) => s._name)).includes(sector)) {
            this._sector = sector;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateDescription(description: string[]) {
        if (await this.exists()) {
            this._description = description;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateRequirements(requirements: string) {
        if (await this.exists()) {
            this._requirements = requirements;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateOpen(open: boolean) {
        if (await this.exists()) {
            this._open = open;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateHighPriority(highPriority: boolean) {
        if (await this.exists()) {
            this._highPriority = highPriority;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }
    public async updateStartOn(startOn: string) {
        if (await this.exists()) {
            this._startOn = startOn;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }
    /**
     * Removes the current job from the realtime DB and all associated candidatures.
     * @returns None
     */
    public async remove() {
        const candidatures = await getFilteredCandidateJobStatuses(["jobNumber"], [this._jobNumber.toString()]);
        candidatures.forEach((c) => c.remove());
        if ((await this.exists())){
            removeObjectAtPath("/Jobs/" + this._jobNumber);
            return 0;
        }
        return -1;
    }
    /**
     * Gets the path of the current job in the realtime DB.
     * @returns {Promise<string>} - The path of the current job in the Firebase database.
     */
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Jobs')).includes(this._jobNumber.toString()))
            return `/Jobs/${this._jobNumber}`;
        return "";
    }
    /**
     * Checks if the job exists in the realtime DB.
     * @returns {Promise<boolean>} - A promise that resolves to true if the path exists, false otherwise.
     */
    public async exists() {
        if ((await this.getPath()).length > 0)
            return true;
        return false;
    }

    /**
     * Edits the job with the given parameters and updates the realtime DB.
     * @param {string} [title=this._title] - The title of the job posting.
     * @param {string} [role=this._role] - The role of the job posting.
     * @param {Array<number>} [scope=this._scope] - The scope of the job posting.
     * @param {string} [region=this._region] - The region of the job posting.
     * @param {string} [sector=this._sector] - The sector of the job posting.
     * @param {string} [description=this._description] - The description of the job posting.
     * @param {string} [requirements=this._requirements] - The requirments of the job posting.
     */
    public async edit(title: string = this._title,
        role: string = this._role,
        scope: Array<number> = this._scope,
        region: string = this._region,
        sector: string = this._sector,
        description: string[] = this._description,
        requirements: string = this._requirements,
        open: boolean = this._open,
        highPriority: boolean = this._highPriority
    ) {
        this._title = title;
        this._role = role;
        this._sector = sector;
        this._description = description;
        this._requirements = requirements;
        this._open = open;
        this._highPriority = highPriority;

        if (!(await this.exists()))
            return -1;
        replaceData((await this.getPath()), this);
        return 0;
    }
    /**
     * Adds the current job to the database if it does not already exist.
     * @returns None
     */
    public async add() {
        if (await this.exists())
            return 1;
        appendToDatabase(this, "/Jobs", this._jobNumber.toString());
        return 0;
    }
    public async incrementViews(platform: string) {
        if (platform in this._viewsPerPlatform)
            this._viewsPerPlatform[platform] +=1 ;
        else{
            this._viewsPerPlatform[platform] = 1
        }
        if (!(await this.exists()))
            return -1;
        replaceData((await this.getPath()), this);
        return 0;
    }
    public async incrementApply(platform: string) {
        if (platform in this._applyPerPlatform)
            this._applyPerPlatform[platform] +=1 ;
        else{
            this._applyPerPlatform[platform] = 1
        }
        if (!(await this.exists()))
            return -1;
        replaceData((await this.getPath()), this);
        return 0;
    }
}
/* Jobs functions */
/**
 * Generates a unique job number for a new job by selecting a random number within a range
 * and checking if it already exists in the list of jobs. If it does, it generates a new number
 * until a unique one is found.
 * @returns {Promise<number>} - A promise that resolves to the generated job number.
 */
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

export async function getFilteredJobs(attributes: string[] = [], values: string[] = [], sortBy: string = ""): Promise<Job[]> {
    return new Promise<Job[]>((resolve, reject) => {
        axios.post('https://europe-west1-gvanim-app.cloudfunctions.net/getFilteredJobsCloudFunction', {
            attributes: attributes,
            values: values,
            sortBy: sortBy
        })
            .then(response => {
                const jobs = response.data;
                resolve(jobs.map(job => new Job(
                    job._jobNumber,
                    job._title,
                    job._role,
                    job._scope,
                    job._region,
                    job._sector,
                    job._description,
                    job._requirements,
                    job._open,
                    job._highPriority,
                    job._viewsPerPlatform,
                    job._applyPerPlatform,
                    job._creationDate,
                    job._startOn
                )));
            })
            .catch(error => {
                console.error('Error calling the Cloud Function:', error);
                reject(error);
            });
    });

}