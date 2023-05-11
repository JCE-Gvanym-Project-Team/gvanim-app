import { dataref } from "../FirebaseConfig/firebase";
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath, appendToDatabase, replaceData } from "./DBfuncs";
const database = dataref;

export class Recruiter {
	public _email: string;
	public _firstName: string;
	public _lastName: string;
	public _sectors: Array<string>;

	constructor(email: string = "", firstName: string = "", lastName: string = "", sectors: Array<string> = []) {
		this._email = email.replace('.', '_');
		this._firstName = firstName;
		this._lastName = lastName;
		this._sectors = sectors;
	}
	public async getPath() {
		if ((await getFirebaseIdsAtPath('/Recruiters')).includes(this._email))
			return "/Recruiters/" + this._email;
		return "";
	}
	public async exists() {
		if ((await this.getPath()).length > 0)
			return true;
		return false;
	}
	public async remove() {
		if (await this.exists())
			removeObjectAtPath("/Recruiters/" + this._email);
	}
	public async add() {
		if (!(await this.exists()))
			appendToDatabase(this, "/Recruiters", this._email);
		else
			console.log("this email already exists in the database");
	}
	public async edit(email: string = this._email, firstName: string = this._firstName, lastName: string = this._lastName) {
		this._firstName = firstName;
		this._lastName = lastName;
		if (email !== this._email) {
			let tmp = new Recruiter(email);
			if (!(await tmp.exists()))
				this._email = email;
			else
				console.log("this user name already exists choose another");
		}
		replaceData((await this.getPath()), this);
	}
	public async addSector(sector: string) {
		if (!this._sectors.includes(sector))
			this._sectors.push(sector);
		replaceData((await this.getPath()), this);
	}
	public async removeSector(sector: string) {
		if (this._sectors.includes(sector))
			this._sectors.filter((val) => val !== sector);
		replaceData((await this.getPath()), this);
	}
}

export async function getRecruitersFromDatabase(): Promise<Recruiter[]> {
	const database = dataref;
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