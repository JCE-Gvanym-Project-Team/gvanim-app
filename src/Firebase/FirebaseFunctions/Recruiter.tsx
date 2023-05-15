import { realtimeDB } from "../FirebaseConfig/firebase";
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath, appendToDatabase, replaceData } from "./DBfuncs";
import { registerRecruiter } from "./Authentication";
const database = realtimeDB;

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
	public async remove() {
		if (await this.exists())
			removeObjectAtPath("/Recruiters/" + this._id);
	}
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
		if (email !== this._email) {
			let tmp = new Recruiter(email);
			if (!(await tmp.exists())) {
				this._email = email;
				this._id = email.replace('.', '_');
			}
			else
				console.log("this username already exists choose another");
		}
		this.remove();
		this.add();
	}
	public async addSector(sector: string) {
		if (!this._sectors.includes(sector))
			this._sectors.push(sector);
		this.remove();
		appendToDatabase(this, "/Recruiters", this._id);
		const uid = await this.getUid();
		appendToDatabase(this._email,`/Sectors/${sector}`,uid);
	}
	public async removeSector(sector: string) {
		if (this._sectors.includes(sector))
			this._sectors.filter((val) => val !== sector);
		this.remove();
		appendToDatabase(this, "/Recruiters", this._id);
		const uid = await this.getUid();
		removeObjectAtPath(`Sectors/${sector}/${uid}`);
	}
	public async getUid(): Promise<string> {
		if (!(await this.exists()))
			return "";
		return (await getObjectAtPath(`/RecUid/${this._id}`));
	}
}

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
function generateRandomString(): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?';
	let result = '';
	for (let i = 0; i < 12; i++) {
		result += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return result;
}