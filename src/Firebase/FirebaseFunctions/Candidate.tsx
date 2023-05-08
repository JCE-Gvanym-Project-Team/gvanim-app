import { dataref } from "../FirebaseConfig/firebase";
const database = dataref;
export class Candidate {
	public _id: string;
	public _firstName: string;
	public _lastName: string;
	public _phone: string;
	public _eMail: string;
	public _generalRating: number;

	constructor(firstName: string = "", lastName: string = "", phone: string = "", eMail: string = "", generalRating: number = -1) {
		this._id = eMail + phone;
		this._firstName = firstName;
		this._lastName = lastName;
		this._phone = phone;
		this._eMail = eMail;
		this._generalRating = generalRating;
	}
}
async function getCandidatesFromDatabase(): Promise<Candidate[]> {
	const database = dataref;
	try {
		const snapshot = await database.ref("/Candidates").once("value");
		const candidatesData = snapshot.val();
		const candidates: Candidate[] = [];
		for (const candidateId in candidatesData) {
			const candidate = candidatesData[candidateId];
			candidates.push(candidate);
		}
		return candidates;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch candidates from database.");
	}
}