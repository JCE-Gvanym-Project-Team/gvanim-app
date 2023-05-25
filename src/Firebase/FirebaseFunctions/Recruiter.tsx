import { realtimeDB } from "../FirebaseConfig/firebase";
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath, appendToDatabase } from "./DBfuncs";
import { registerRecruiter } from "./Authentication";


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
		if (await this.exists())
			removeObjectAtPath("/Recruiters/" + this._id);
	}
 /**
  * Adds the recruiter to the realtime DB if they do not already exist.
  * @returns {Promise<string>} A randomly generated password for the new recruiter.
  * If the recruiter already exists, logs a message to the console and returns nothing.
  */
	public async add() {
		if (!(await this.exists())) {
			const pass = generateRandomString();
			registerRecruiter(this, pass);
			console.log(`the uid of ${this._email} is ${(await this.getUid)}`);
			return pass;
			//todo notify by mail the recruiter that their account was created and send the password for first login
		}
		else
			console.log("this email already exists in the database");
	}
	public async edit(email: string = this._email, firstName: string = this._firstName, lastName: string = this._lastName) {
		this._firstName = firstName;
		this._lastName = lastName;
		this.remove();
		this.add();
	}
 /**
  * Add permissions to a sector. 
  * @param {string} sector - The sector to add.
  * @returns None
  */
	public async addSector(sector: string) {
		if (!this._sectors.includes(sector))
			this._sectors.push(sector);
		this.remove();
		appendToDatabase(this, "/Recruiters", this._id);
		const uid = await this.getUid();
		appendToDatabase(this._email,`/Sectors/${sector}`,uid);
	}
 /**
  * Remove editing permissions to the recruiter to the sector
  * @param {string} sector - The sector to remove.
  * @returns None
  */
	public async removeSector(sector: string) {
		if (this._sectors.includes(sector))
			this._sectors.filter((val) => val !== sector);
		this.remove();
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
		return recruiters;
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