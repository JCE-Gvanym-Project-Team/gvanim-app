import { dataref } from "../FirebaseConfig/firebase";
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath } from "./DBfuncs";
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
export async function removeRecruiter(userName: Number){
    let recruitersIds = await getFirebaseIdsAtPath("/Recruiters");
    recruitersIds.forEach(async (id)=>{
        if((await getObjectAtPath("/Recruiters/"+id))._userName===userName) removeObjectAtPath("/Recruiters/"+id);
    });
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