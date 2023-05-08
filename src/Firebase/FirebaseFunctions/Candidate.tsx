import { dataref } from "../FirebaseConfig/firebase";
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { getFilteredJobs, Job } from "./Job";
const database = dataref;
export class Candidate {
    public _id: string;
    public _firstName: string;
    public _lastName: string;
    public _phone: string;
    public _eMail: string;
    public _generalRating: number;
    public _firebaseId: string;

    constructor(firstName: string = "", lastName: string = "", phone: string = "", eMail: string = "", generalRating: number = -1, firebaseId: string="") {
        this._id = eMail + phone;
        this._firstName = firstName;
        this._lastName = lastName;
        this._phone = phone;
        this._eMail = eMail;
        this._firebaseId=firebaseId;
        this._generalRating = generalRating;
    }
    public async getAppliedJobs(): Promise<Job[]>{
        let jobs;
        let statArr = await this.getCandidatures();
        let jobIds = statArr.map((stat)=>stat._jobNumber);
        jobIds.forEach((id)=>jobs.push(getFilteredJobs(["jobNumber"],[id.toString()])));
        return jobs;
    }
    public async getCandidatures(): Promise<CandidateJobStatus[]>{
        let candidatures;
        candidatures = await getFilteredCandidateJobStatuses(["candidateID"],[this._id]);
        return candidatures;
    }
}
async function getCandidatesFromDatabase(): Promise<Candidate[]> {
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
export async function getFilteredCandidates(attributes: string[] = [], values: string[] = [], sortBy: string = ""): Promise<Candidate[]>{
    if (attributes.length !== values.length) {
        console.log("the attributes length not match to values length")
        return [];
    }
    let candidates = await getCandidatesFromDatabase();
    //filtering
    let i = attributes.indexOf("id");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._id === values[i])
    }
    i = attributes.indexOf("firstName");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._firstName === values[i])
    }
    i = attributes.indexOf("lastName");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._lastName === values[i])
    }
    i = attributes.indexOf("phone");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._phone === values[i])
    }
    i = attributes.indexOf("eMail");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._eMail === values[i])
    }
    i = attributes.indexOf("generalRating");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._generalRating.toString() === values[i])
    }
    if (sortBy === 'firstName')
        return candidates.sort(sortByFirstName);
    if (sortBy === 'lastName')
        return candidates.sort(sortByLastName);
    if (sortBy === 'phone')
        return candidates.sort(sortByPhone);
    if (sortBy === 'eMail')
        return candidates.sort(sortByEmail);
    if (sortBy === 'generalRating')
        return candidates.sort(sortByGeneralRating);
    return candidates;
}
/* compare function for sort */
function sortByFirstName(a: Candidate, b: Candidate): number {
    if (a._firstName.toLowerCase() < b._firstName.toLowerCase()) {
        return -1;
    }
    if (a._firstName.toLowerCase() > b._firstName.toLowerCase()) {
        return 1;
    }
    return 0;
}

function sortByLastName(a: Candidate, b: Candidate): number {
    if (a._lastName.toLowerCase() < b._lastName.toLowerCase()) {
        return -1;
    }
    if (a._lastName.toLowerCase() > b._lastName.toLowerCase()) {
        return 1;
    }
    return 0;
}

function sortByPhone(a: Candidate, b: Candidate): number {
    if (a._phone < b._phone) {
        return -1;
    }
    if (a._phone > b._phone) {
        return 1;
    }
    return 0;
}

function sortByEmail(a: Candidate, b: Candidate): number {
    if (a._eMail.toLowerCase() < b._eMail.toLowerCase()) {
        return -1;
    }
    if (a._eMail.toLowerCase() > b._eMail.toLowerCase()) {
        return 1;
    }
    return 0;
}

function sortByGeneralRating(a: Candidate, b: Candidate): number {
    return b._generalRating - a._generalRating;
}
