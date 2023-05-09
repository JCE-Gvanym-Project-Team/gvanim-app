import firebase from "firebase/app";
import "firebase/database";
import { dataref } from "../FirebaseConfig/firebase";
import { Job, generateJobNumber } from "./Job";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFilteredCandidates, Candidate } from "./Candidate";
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { Recomendation } from "./Recomendation";
const database = dataref;
/**
 * Prints the data located at the given path in the Firebase Realtime Database.
 * @param {string} path - The path to the data in the database.
 * @returns None
 */
export async function getObjectAtPath(path: string): Promise<any> {
	const snapshot = await database.ref(path).once('value');
	return snapshot.val();
}
export async function removeObjectAtPath(path: string) {
	try {
		const ref = database.ref(path);
		await ref.remove();
	} catch (error) {
		console.error("Error removing object:", error);
	}
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
export function replaceData(path: string, data: any) {
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
export async function appendToDatabase(obj: any, path: string) {
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
export async function getFirebaseIdsAtPath(path: string): Promise<string[]> {
	const snapshot = await database.ref(path).once("value");
	const values = snapshot.val();
	return values ? Object.keys(values) : [];
}
export async function main() {	//for debugging dont use
	let job1 = new Job((await generateJobNumber()),"title1", "role", [50, 100], "tel-aviv", "tel-aviv-meguorim", "desc", "req", true, false);
	let job2 = new Job((await generateJobNumber()),"title2", "role", [50, 100], "tel-aviv", "tel-aviv-meguorim", "desc", "req", true, false);
	job1.add();
	job2.add();
	job1.remove();
}