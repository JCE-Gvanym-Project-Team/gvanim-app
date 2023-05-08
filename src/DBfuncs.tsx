import firebase from "firebase/app";
import "firebase/database";
import { dataref } from "./FirebaseConfig/firebase";
import { Job, Candidate, CandidateJobStatus, Recruiter } from "./types";

/**
 * Prints the data located at the given path in the Firebase Realtime Database.
 * @param {string} path - The path to the data in the database.
 * @returns None
 */
export function printData(path: string) {
	const database = dataref;
	const ref = database.ref(path);
	ref.on("value", (snapshot) => {
		const data = snapshot.val();
		console.log(data);
	});
}
/**
 * Deletes data from the Firebase Realtime Database at the specified path.
 * @param {string} path - The path to the data to be deleted.
 * @returns None
 */
function deleteData(path: string) {
	const database = dataref;
	const deleteRef = database.ref(path);
	deleteRef.remove();
}
/**
 * Replaces the data at the specified path in the Firebase Realtime Database with the given data.
 * @param {string} path - The path to the data in the Firebase Realtime Database.
 * @param {any} data - The data to replace the existing data with.
 * @returns None
 */
function replaceData(path: string, data: any) {
	const database = dataref;
	const addRef = database.ref(path);
	addRef.set(data);
}
/**
 * Appends the given object to the Firebase Realtime Database at the specified path.
 * @param {any} obj - The object to append to the database.
 * @param {string} path - The path to the location in the database where the object should be appended.
 * @returns None
 * @throws {Error} If there is an error adding the object to the database.
 */
async function appendToDatabase(obj: any, path: string) {
	const database = dataref;
	try {
		await database.ref(path).push(obj);
	} catch (error) {
		console.error("Error adding object to database:", error);
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
	const database = dataref;
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
/**
 * Retrieves a list of all jobs from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of job objects.
 */
async function getJobs() {
	return getJobsFromDatabase();
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
export async function getFilteredJobs(attributes: string[] = [], values: string[] = [], sortBy: string = "") {
	if (attributes.length !== values.length) {
		console.log("the attributes length not match to values length")
		return [];
	}
	let jobs = await getJobs();
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
	return jobs;
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
async function getCandidatesFromDatabase(): Promise<Candidate[]> {
	const database = dataref;
	try {
		const snapshot = await database.ref("/Candidates").once("value");
		const candidatesData = snapshot.val();
		const candidates: Candidate[] = [];
		for (const candidateId in candidatesData) {
			const candidate = candidatesData[candidateId];
			candidates.push(candidate);
		}
		return candidates;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch candidates from database.");
	}
}
async function getCandidateJobStatusFromDatabase(): Promise<CandidateJobStatus[]> {
	const database = dataref;
	try {
		const snapshot = await database.ref("/CandidatesJobStatus").once("value");
		const candidateJobStatusData = snapshot.val();
		const candidateJobStatuses: CandidateJobStatus[] = [];
		for (const candidateJobStatusId in candidateJobStatusData) {
			const candidateJobStatus = candidateJobStatusData[candidateJobStatusId];
			candidateJobStatuses.push(candidateJobStatus);
		}
		return candidateJobStatuses;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch candidate job statuses from database.");
	}
}
async function getRecruitersFromDatabase(): Promise<Recruiter[]> {
	const database = dataref;
	try {
		const snapshot = await database.ref("/Recruiters").once("value");
		const recruitersData = snapshot.val();
		const recruiters: Recruiter[] = [];
		for (const recruiterId in recruitersData) {
			const recruiter = recruitersData[recruiterId];
			recruiters.push(recruiter);
		}
		return recruiters;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch recruiters from database.");
	}
}

export async function main() {	//for debugging dont use
	/*
	const j1 = new Job("title", "role", [0, 0], "region", "sector", "description", "req", true, false, 0, 23);
	const c1 = new Candidate("is", "ra", "000000000", "example@gamil.com", 0);
	const cjs1 = new CandidateJobStatus();
	cjs1.link_job_candidate(j1, c1);
	const r1 = new Recruiter("user123", "israel", "israeli", ["jerusalem"]);
	*/
	//let res = await getFilteredJob(["title"],["title"],"title");
	//console.log(res);
}