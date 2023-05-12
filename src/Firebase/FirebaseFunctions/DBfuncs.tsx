import firebase from "firebase/app";
import "firebase/database";
import { dataref } from "../FirebaseConfig/firebase";
import { Job, generateJobNumber, getFilteredJobs } from "./Job";
import { getFilteredCandidates, Candidate } from "./Candidate";
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { Recomendation } from "./Recomendation";
import { Recruiter, getRecruitersFromDatabase } from "./Recruiter";
import { registerRecruiter, loginRecruiter, loguotRecruiter } from "./Authentification";
import { Logout } from "@mui/icons-material";
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
export async function appendToDatabase(obj: any, path: string, id: string="") {
	const databaseRef = dataref.ref(`${path}/${id}`);
	// Store the object at the database reference
	if(id.length===0){
		databaseRef.push(obj);
		return;
	}
	databaseRef.set(obj)
		.then(() => {
			console.log(`Object stored successfully at path ${path}/${id}`);
		})
		.catch((error) => {
			console.error(`Error storing object at path ${path}/${id}: ${error}`);
		});
}
export async function getFirebaseIdsAtPath(path: string): Promise<string[]> {
	const snapshot = await database.ref(path).once("value");
	const values = snapshot.val();
	return values ? Object.keys(values) : [];
}
export async function main() {	//for debugging dont use
	loginRecruiter("test1@gamil.com", "123456");
	//let rec1 = new Recruiter("test1@gmail.com","is","ra",["sector1"]);
	//rec1.add();
	//registerRecruiter("test1@gmail.com","123456");
	//console.log((await getFilteredJobs()));
	let job1 = new Job((await generateJobNumber()), "title1", "role", [50, 100], "tel-aviv", "sector1", "desc", "req", true, false);
	//let job2 = new Job((await generateJobNumber()), "title2", "role", [50, 100], "tel-aviv", "sector2", "desc", "req", true, false);
	//job1.add();
	//job2.add();
	const jobs = await getFilteredJobs();// as Job[];
	if (jobs.length > 0)
		console.log(jobs[0].getPath());
		//jobs[0].edit("modified");
	console.log((await getFilteredJobs()));
}	
