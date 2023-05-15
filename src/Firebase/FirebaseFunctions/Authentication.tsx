import firebase from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import * as admin from 'firebase-admin';
import { firebaseConfig, app } from "../FirebaseConfig/firebase";

import { Recruiter } from "./Recruiter";
import { appendToDatabase } from "./DBfuncs";
const auth = getAuth();
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
		const user = process.env.REACT_APP_ADMIN_MAIL;
		const pass = process.env.REACT_APP_ADMIN_PASS;
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
export async function loginRecruiter(email: string, password: string) {
	signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			//console.log(user.email);
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
}
export async function loguotRecruiter() {
	//await signOut(auth);
	auth.signOut().then(() => {
		// Log the uid of the current user (should be null)
		console.log(`2) in logout(): ${auth.currentUser?.uid}`);
	}).catch((error) => {
		// Handle error logging out the current user
	});
}
export async function loginAdmin() {
	const user = process.env.REACT_APP_ADMIN_MAIL;
	const pass = process.env.REACT_APP_ADMIN_PASS;
	if (user != null && pass != null) {
		loginRecruiter(user, pass);
		console.log("loged as admin");
	}
	else
		console.log("login admin fail(chek your env file)");
}
