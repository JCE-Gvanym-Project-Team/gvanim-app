import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,signOut } from "firebase/auth";
const auth = getAuth();
export function registerRecruiter(email: string, password: string){
    createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
		});
}
export function loginRecruiter(email: string, password: string){
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
export function loguotRecruiter(){
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('loged out');
      }).catch((error) => {
        // An error happened.
      });
}