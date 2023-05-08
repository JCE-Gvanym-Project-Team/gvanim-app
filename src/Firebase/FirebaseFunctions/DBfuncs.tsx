import firebase from "firebase/app";
import "firebase/database";
import { dataref } from "../FirebaseConfig/firebase";
import { getFilteredJobs } from "./Job";

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
export async function applyToJob(firstName: string, lastName: string, )
export async function main() {	//for debugging dont use
	/*
	const j1 = new Job("title", "role", [0, 0], "region", "sector", "description", "req", true, false, 0, 23);
	const c1 = new Candidate("is", "ra", "000000000", "example@gamil.com", 0);
	const cjs1 = new CandidateJobStatus();
	cjs1.link_job_candidate(j1, c1);
	const r1 = new Recruiter("user123", "israel", "israeli", ["jerusalem"]);
	*/
	let res = await getFilteredJobs(["title"],["title"],"title");
	console.log(res);
}