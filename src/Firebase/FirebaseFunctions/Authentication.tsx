import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { sleep } from "./test";

import { Recruiter } from "./Recruiter";
import { appendToDatabase } from "./DBfuncs";
import { Sector } from './Sector';
const auth = getAuth();

/**
 * Logs in a recruiter with the given email and password.
 * @param {string} email - The email of the recruiter.
 * @param {string} password - The password of the recruiter.
 * @returns None
 * @throws {FirebaseError} If there is an error with the Firebase authentication.
 */
export async function loginRecruiter(email: string, password: string): Promise<object> {
	if (await isConnected()) {
		console.log('alrady connected');
	}
	else {
		return await signInWithEmailAndPassword(auth, email, password);
	}
	return {};
}
/**
 * Logs out the current recruiter user.
 * @returns None
 */
export async function loguotRecruiter() {
	//await signOut(auth);
	await auth.signOut();
}
/**
 * Logs in as an admin using the credentials stored in the environment variables.
 * use while devlopment only
 * @returns None
 */
export async function loginAdmin(): Promise<object> {
	const user = process.env.REACT_APP_ADMIN_MAIL;
	const pass = process.env.REACT_APP_ADMIN_PASS;
	let connectedUser;
	if (user != null && pass != null && !(await isConnected())) {
		return await loginRecruiter(user, pass);
	}
	return {};
}
export async function isConnected(): Promise<boolean> {
	const user = getAuth().currentUser;
	if (user)
		return true;
	else
		return false;
}
export async function main() {
	await loginAdmin();
	let rec = new Recruiter('ex@gmail.com',"el","ta");
	//await rec.add();
	console.log(await rec.getUid());
	let sec = new Sector('sec1', true);
	sec.add();
	rec.addSector('sec1');
}