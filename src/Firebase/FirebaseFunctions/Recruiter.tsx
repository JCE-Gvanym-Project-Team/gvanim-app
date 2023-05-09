import { dataref } from "../FirebaseConfig/firebase";
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath, appendToDatabase, replaceData } from "./DBfuncs";
const database = dataref;

export class Recruiter {
	public _userName: string;
	public _firstName: string;
	public _lastName: string;
	public _sectors: Array<string>;

	constructor(userName: string = "", firstName: string = "", lastName: string = "", sectors: Array<string> = []) {
		this._userName = userName;
		this._firstName = firstName;
		this._lastName = lastName;
		this._sectors = sectors;
	}
	public async getPath() {
		let firebaseId = "";
		let jobIds = await getFirebaseIdsAtPath("/Recruiters");
		jobIds.forEach(async (id) => {
			if (((await getObjectAtPath("/Recruiters/" + id))._userName === this._userName))
				firebaseId = id;
		});
		return "/Recruiters/" + firebaseId;
	}
	public async remove() {
		let recruitersIds = await getFirebaseIdsAtPath("/Recruiters");
		recruitersIds.forEach(async (id) => {
			if ((await getObjectAtPath("/Recruiters/" + id))._userName === this._userName) removeObjectAtPath("/Recruiters/" + id);
		});
	}
	public async add() {
		if ((await this.getPath()) === "/Recruiters/")
			appendToDatabase(this, "/Recruiters");
		else
			console.log("this user name already exists choose another");
	}
	public async edit(userName: string = "", firstName: string = "", lastName: string = "") {
		if (firstName.length > 0)
			this._firstName = firstName;
		if (firstName.length > 0)
			this._lastName = lastName;
		if (userName.length > 0) {
			let tmp = new Recruiter(userName);
			if ((await tmp.getPath()) === "/Recruiters/")
				this._userName = userName;
			else
				console.log("this user name already exists choose another");
		}
		replaceData((await this.getPath()),this);
	}
	public async addSector(sector: string){
		if(!this._sectors.includes(sector))
			this._sectors.push(sector);
		replaceData((await this.getPath()),this);
	}
	public async removeSector(sector: string){
		if(this._sectors.includes(sector))
			this._sectors.filter((val)=>val!==sector);
		replaceData((await this.getPath()),this);
	}
}

async function getRecruitersFromDatabase(): Promise<Recruiter[]> {
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