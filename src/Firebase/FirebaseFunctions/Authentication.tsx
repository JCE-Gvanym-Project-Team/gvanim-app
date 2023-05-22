import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";


import { Recruiter } from "./Recruiter";
import { appendToDatabase } from "./DBfuncs";
const auth = getAuth();
/**
 * Registers a recruiter with the given credentials and adds them to the database.
 * @param {Recruiter} recruiter - The recruiter object to register.
 * @param {string} password - The password for the recruiter's account.
 * @returns None
 */
export async function registerRecruiter(recruiter: Recruiter, password: string) {
	if ((await recruiter.exists())) {
		console.log(`${recruiter._email} already in use`);
		return;
	}
	let uid;
	const userCredential = await createUserWithEmailAndPassword(auth, recruiter._email, password);
	const user = userCredential.user;
	uid = user.uid;
	auth.signOut().then(async () => {
		//console.log(`1)null] in registerRecruiter(): ${auth.currentUser?.uid}`);
		const user = process.env.REACT_APP_SENDER_MAIL;
		const pass = process.env.REACT_APP_SENDER_PASS;
		if (user != null && pass != null)
			signInWithEmailAndPassword(auth, user, pass).then(async () => {
				//console.log(`3)admin] in registerRecruiter(): ${auth.currentUser?.uid}`);
				//console.log(uid);
				for (let i = 0; i < recruiter._sectors.length; i++)
					await appendToDatabase(recruiter._email, `Sectors/${recruiter._sectors[i]}`, uid);
				//await loguotRecruiter();
				await appendToDatabase(uid, "/RecUid", recruiter._id);
				await appendToDatabase(recruiter, "/Recruiters", recruiter._id);
			});
	});
}
/**
 * Logs in a recruiter with the given email and password.
 * @param {string} email - The email of the recruiter.
 * @param {string} password - The password of the recruiter.
 * @returns None
 * @throws {FirebaseError} If there is an error with the Firebase authentication.
 */
export async function loginRecruiter( email: string, password: string, props: { setAlertHidden: any }) {
	const { setAlertHidden } = props;

	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			//console.log(user.email);
		})
		.catch((error) => {
			setAlertHidden(false);
			const errorCode = error.code;
			const errorMessage = error.message;
		});
}
/**
 * Logs out the current recruiter user.
 * @returns None
 */
export async function loguotRecruiter() {
	//await signOut(auth);
	auth.signOut().then(() => {
		// Log the uid of the current user (should be null)
		console.log(`2) in logout(): ${auth.currentUser?.uid}`);
	}).catch((error) => {
		// Handle error logging out the current user
	});
}
/**
 * Logs in as an admin using the credentials stored in the environment variables.
 * use while devlopment only
 * @returns None
 */
export async function loginAdmin(props: { setAlertHidden: any }) {
	const { setAlertHidden } = props;
	const user = process.env.REACT_APP_ADMIN_MAIL;
	const pass = process.env.REACT_APP_ADMIN_PASS;
	if (user != null && pass != null) {
		loginRecruiter(user, pass, setAlertHidden);
		console.log("loged as admin");
	}
	else
		console.log("login admin fail(chek your env file)");
}
