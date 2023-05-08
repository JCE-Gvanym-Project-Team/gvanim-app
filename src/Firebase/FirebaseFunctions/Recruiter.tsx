import { dataref } from "../FirebaseConfig/firebase";
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