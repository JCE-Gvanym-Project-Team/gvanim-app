import "firebase/database";
import { realtimeDB } from "../FirebaseConfig/firebase";
import { loginAdmin, loginRecruiter } from "./Authentication";
import { Job, generateJobNumber } from "./Job";
import { Candidate } from "./Candidate";
import { getFilteredCandidateJobStatuses } from "./CandidateJobStatus";

const database = realtimeDB;
/**
 * get the data located at the given path in the Firebase Realtime Database.
 * @param {string} path - The path to the data in the database.
 * @returns None
 */
export async function getObjectAtPath(path: string): Promise<any> {
	const snapshot = await database.ref(path).once('value');
	return snapshot.val();
}
/**
 * Removes an object from the Firebase Realtime Database at the specified path.
 * @param {string} path - The path to the object to be removed.
 * @returns None
 * @throws {Error} If there is an error removing the object from the database.
 */
export async function removeObjectAtPath(path: string) {
	try {
		const ref = database.ref(path);
		await ref.remove();
		console.log(`${path} romoved from DB`);
	} catch (error) {
		console.error("Error removing object:", error);
	}
}
/**
 * Deletes data from the Firebase Realtime Database at the specified path.
 * @param {string} path - The path to the data to be deleted.
 * @returns None
 */
export function deleteData(path: string) {
	const database = realtimeDB;
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
export async function appendToDatabase(obj: any, path: string, id: string = "") {
	const databaseRef = realtimeDB.ref(`${path}/${id}`);
	// Store the object at the database reference
	if (id.length === 0) {
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
/**
 * Retrieves the Firebase IDs at the specified path in the database.
 * @param {string} path - The path to the desired location in the database.
 * @returns {Promise<string[]>} - A promise that resolves to an array of Firebase IDs at the specified path.
 */
export async function getFirebaseIdsAtPath(path: string): Promise<string[]> {
	const snapshot = await database.ref(path).once("value");
	const values = snapshot.val();
	return values ? Object.keys(values) : [];
}
/**
 * Retrieves an array of sector names from the Firebase database.
 * @returns {Promise<string[]>} - A promise that resolves to an array of sector names.
 */
export async function getSectors(): Promise<string[]> {
	return getFirebaseIdsAtPath("/Sectors");
}

export async function main() {	//for debugging dont use

}	
