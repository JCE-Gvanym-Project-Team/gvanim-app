import 'firebase/auth';
import { User, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, confirmPasswordReset } from "firebase/auth";
import axios from 'axios';
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

export async function getConnectedUser(): Promise<User | null> {
	return getAuth().currentUser;
}
export async function sendResetMail(mail: string) {
	sendPasswordResetEmail(auth, mail);
}
export async function updateLinkRecruiterPassword(newPass: string, oobCode: string) {
	confirmPasswordReset(auth, oobCode, newPass)
		.then(() => {
			return true;
		})
		.catch((error) => {
			return false;
		});
}
export async function updateConnectedRecruiterPassword(newPass: string) {
	const user = await getConnectedUser();
	if (user)
		updatePassword(user, newPass);
	else
		console.log('error while updating password');
}
export async function deleteUserAccount(mail: string) {
	return new Promise<Boolean>((resolve, reject) => {
		axios.post('https://europe-west1-gvanim-app.cloudfunctions.net/deleteRecruiter', {
			mail: mail,
		})
			.then(response => {
				const status = response.data;
				resolve(status);
			})
			.catch(error => {
				console.error('Error calling the Cloud Function:', error);
				reject(error);
			});
	});
}

/*
export async function main() {
	await loginAdmin();
	let rec = new Recruiter('ex@gmail.com',"el","ta");
	await rec.add('123456');
	let sec = new Sector('sec1', true);
	await sec.add();
	await rec.addSector('sec1');
	console.log(`4)exist?(t) ${await rec.exists()}`);
	await sleep(5000);
	console.log(`5)exist?(t) ${await rec.exists()}`);
}
*/