import { realtimeDB } from "../FirebaseConfig/firebase";
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath, appendToDatabase, replaceData } from "./DBfuncs";
import { Sector, getAllSectors } from "./Sector";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
const auth = getAuth();


export class Recruiter {
	public _email: string;
	public _firstName: string;
	public _lastName: string;
	public _sectors: Array<string>;
	public _id: string;

	constructor(email: string = "", firstName: string = "", lastName: string = "", sectors: Array<string> = []) {
		this._email = email;
		this._firstName = firstName;
		this._lastName = lastName;
		this._sectors = sectors;
		this._id = email.replace('.', '_');
	}
	/**
	 * Gets the path of the current recruiter in the The realtime DB.
	 * @returns {Promise<string>} - The path of the current recruiter in the Firebase database.
	 */
	public async getPath() {
		if ((await getFirebaseIdsAtPath('/Recruiters')).includes(this._id))
			return "/Recruiters/" + this._id;
		return "";
	}
	public async exists() {
		if ((await this.getPath()).length > 0)
			return true;
		return false;
	}
	/**
	 * Removes the recruiter object from the realtime DB if it exists.
	 * @returns None
	 */
	public async remove() {
		if (await this.exists()) {
			let secs = await getAllSectors();
			secs = secs.filter((sec) => this._sectors.includes(sec._name));
			for (let i = 0; i < secs.length; i++) {
				let sec = new Sector(secs[i]._name, secs[i]._open, secs[i]._recruitersUid);
				sec.removeRecruiter(this);
			}

			await removeObjectAtPath("/Recruiters/" + this._id);
		}
	}
	/**
	 * Adds the recruiter to the realtime DB if they do not already exist.
	 * @returns {Promise<string>} A randomly generated password for the new recruiter.
	 * If the recruiter already exists, logs a message to the console and returns nothing.
	 */
	public async add(password: string = "") {
		if ((await this.exists())) {
			console.log(`${this._email} already in use`);
			return;
		}
		if (password.length > 0) {
			const userCredential = await createUserWithEmailAndPassword(auth, this._email, password);
			const userUid = userCredential.user.uid;
			await auth.signOut();
			const user = process.env.REACT_APP_ADMIN_MAIL;
			const pass = process.env.REACT_APP_ADMIN_PASS;
			if (user != null && pass != null) {
				await signInWithEmailAndPassword(auth, user, pass)
				for (let i = 0; i < this._sectors.length; i++) {
					let sec = new Sector(this._sectors[i], true);
					sec.addRecruiter(this);
				}
			}
			await appendToDatabase(userUid, "/RecUid", this._id);
			//todo notify by mail the recruiter that their account was created and send the password for first login
		}
		await appendToDatabase(this, "/Recruiters", this._id);
	}
	public async edit(firstName: string = this._firstName, lastName: string = this._lastName) {
		this._firstName = firstName;
		this._lastName = lastName;
		replaceData(`/Recruiters/${this._id}`, this);
	}
	/**
	 * Add permissions to a sector. 
	 * @param {string} sector - The sector to add.
	 * @returns None
	 */
	public async addSector(sector: string) {
		let sectObj = new Sector(sector, true);
		if (!(await sectObj.exists())) {
			console.log(`sector: ${sector} not exists in DB`);
			return;
		}
		if (!this._sectors.includes(sector))
			this._sectors.push(sector);
		else
			return;
		replaceData(`/Recruiters/${this._id}`, this);
		console.log(`2)exist?(t) ${await this.exists()}`);
		const sectors = await getAllSectors();
		for (let i = 0; i < sectors.length; i++) {
			if (sectors[i]._name === sector) {
				let sec = new Sector(sectors[i]._name, sectors[i]._open, sectors[i]._recruitersUid);
				await sec.addRecruiter(this);
				break;
			}
		}
		console.log(`3)exist?(t) ${await this.exists()}`)
	}
	/**
	 * Remove editing permissions to the recruiter to the sector
	 * @param {string} sector - The sector to remove.
	 * @returns None
	 */
	public async removeSector(sector: string) {
		if (this._sectors.includes(sector))
			this._sectors.filter((val) => val !== sector);
		replaceData(`/Recruiters/${this._id}`,this);
		appendToDatabase(this, "/Recruiters", this._id);
		const uid = await this.getUid();
		removeObjectAtPath(`Sectors/${sector}/${uid}`);
	}
	/**
	 * Gets the uid of the Recruiter, for internal use(you have no reason to call it).
	 * @async
	 * @returns {Promise<string>} A promise that resolves to the unique identifier string.
	 */
	public async getUid(): Promise<string> {
		if (!(await this.exists()))
			return "";
		return (await getObjectAtPath(`/RecUid/${this._id}`));
	}
}

/**
 * Retrieves a list of recruiters from the Firebase Realtime Database.
 * @returns {Promise<Recruiter[]>} - A promise that resolves to an array of Recruiter objects.
 * @throws {Error} - If there is an error fetching the recruiters from the database.
 */
export async function getRecruitersFromDatabase(): Promise<Recruiter[]> {
	const database = realtimeDB;
	try {
		const snapshot = await database.ref("/Recruiters").once("value");
		const recruitersData = snapshot.val();
		const recruiters: Recruiter[] = [];
		for (const recruiterId in recruitersData) {
			const recruiter = recruitersData[recruiterId];
			recruiters.push(recruiter);
		}
		const res = recruiters.map((rec) => new Recruiter(rec._email, rec._firstName, rec._lastName, rec._sectors));
		return res;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch recruiters from database.");
	}
}
/**
 * Generates a random string of 12 characters using a set of allowed characters.
 * Useful for generating random passwordsץ
 * @returns {string} A random string of 12 characters.
 */
export function generateRandomString(): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?';
	let result = '';
	for (let i = 0; i < 12; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}