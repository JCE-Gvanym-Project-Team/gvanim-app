import firebase from "firebase/app";
import "firebase/database";
import { dataref } from "../FirebaseConfig/firebase";
import { getFilteredJobs } from "./Job";
import { getFilteredCandidates, Candidate } from "./Candidate";
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { Recomendation } from "./Recomendation";
const database = dataref;
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
/**
 * Submits a job application for a candidate with the given information.
 * @param {string} firstName - The first name of the candidate.
 * @param {string} lastName - The last name of the candidate.
 * @param {string} phone - The phone number of the candidate.
 * @param {string} eMail - The email address of the candidate.
 * @param {string} about - A brief description of the candidate's qualifications.
 * @param {number} jobNumber - The job number of the job the candidate is applying for.
 * @returns {Promise<CandidateJobStatus>} - A promise that resolves to the CandidateJobStatus object representing the application.
 * you can use addRecomendation() on returned value to add a new recomendation.
 * If the candidate has already applied to the job,
 */
export async function applyToJob(firstName: string, lastName: string, phone: string, eMail: string, about: string, jobNumber: number) {
	let candidate = new Candidate(firstName, lastName, phone, eMail);
	if ((await getFilteredCandidateJobStatuses(["candidateId", "jobNumber"], [candidate._id, jobNumber.toString()])).length !== 0) {
		alert("כבר הוגשה מועמדותך למשרה זו");
		return;
	}
	if ((await getFilteredCandidates(["id"], [candidate._id])).length === 0)
		appendToDatabase(candidate, "/Candidates");
	let c = new CandidateJobStatus(jobNumber, candidate._id, "הוגשה מועמדות", about, 0, new Date(), new Date(), [], []);
	appendToDatabase(c, "/CandidateJobStatus");
	return c;
}

export async function getFirebaseIdsAtPath(path: string): Promise<string[]> {
	const snapshot = await database.ref(path).once("value");
	const values = snapshot.val();
	return values ? Object.keys(values) : [];
}
export async function main() {	//for debugging dont use
	/*
	const j1 = new Job("title", "role", [0, 0], "region", "sector", "description", "req", true, false, 0, 23);
	const c1 = new Candidate("is", "ra", "000000000", "example@gamil.com", 0);
	const cjs1 = new CandidateJobStatus();
	cjs1.link_job_candidate(j1, c1);
	const r1 = new Recruiter("user123", "israel", "israeli", ["jerusalem"]);
	*/
	//let res = await getFilteredJobs(["title"], ["title"], "title");
	//console.log(await getFirebaseIdsAtPath("/Candidates"));
}