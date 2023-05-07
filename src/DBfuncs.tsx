import firebase from "firebase/app";
import "firebase/database";
import { dataref } from "./FirebaseConfig/firebase";
import { Job, Candidate, CandidateJobStatus, Recruiter } from "./types";

export function printData(path: string) {
	//console.log("path: " + path);
	const database = dataref;
	const ref = database.ref(path);
	ref.on("value", (snapshot) => {
		const data = snapshot.val();
		console.log(data);
		//return data;
	});
}

function deleteData(path: string) {
	const database = dataref;
	const deleteRef = database.ref(path);
	deleteRef.remove();
}

function replaceData(path: string, data: any) {
	const database = dataref;
	const addRef = database.ref(path);
	addRef.set(data);
}
async function appendToDatabase(obj: any, path: string) {
	const database = dataref;
	try {
		await database.ref(path).push(obj);
	} catch (error) {
		console.error('Error adding object to database:', error);
	}
}
export async function getJobsFromDatabase(): Promise<Job[]> {
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
export async function getCandidatesFromDatabase(): Promise<Candidate[]> {
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
export async function getCandidateJobStatusFromDatabase(): Promise<CandidateJobStatus[]> {
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
export async function getRecruitersFromDatabase(): Promise<Recruiter[]> {
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

export async function main() {
	const j1 = new Job("title", "role", [0, 0], "region", "sector", "description", "req", true, false, 0, 23);
	const c1 = new Candidate("is", "ra", "000000000", "example@gamil.com", 0);
	const cjs1 = new CandidateJobStatus();
	cjs1.link_job_candidate(j1, c1);
	const r1 = new Recruiter("user123", "israel", "israeli", ["jerusalem"]);
	//appendToDatabase(j1,"/Jobs");
	//appendToDatabase(c1,"/Candidates");
	//appendToDatabase(cjs1,"/CandidatesJobStatus");
	//appendToDatabase(r1,"/Recruiters");
	let res1 = await getJobsFromDatabase();
	console.log(res1);
	let res2 = await getCandidatesFromDatabase();
	console.log(res2);
	let res3 = await getCandidateJobStatusFromDatabase();
	console.log(res3);
	let res4 = await getRecruitersFromDatabase();
	console.log(res4);
	//printData("/CandidatesJobStatus");
}