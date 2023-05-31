import { realtimeDB } from "../FirebaseConfig/firebase";
import { CandidateJobStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { removeObjectAtPath, getFirebaseIdsAtPath, replaceData, appendToDatabase } from "./DBfuncs";
import { getFilteredJobs, Job } from "./Job";
import { uploadFileToFirestore, getDownloadUrlFromFirestorePath, getFileExtensionsInFolder, deleteFile, fileExists, renameFirestorePath } from "./firestoreFunc";
const database = realtimeDB;
export class Candidate {
    public _id: string;
    public _firstName: string;
    public _lastName: string;
    public _phone: string;
    public _eMail: string;
    public _generalRating: number;
    public _note: string;

    constructor(id: string, firstName: string = "", lastName: string = "", phone: string = "", eMail: string = "", generalRating: number = -1, note: string = "") {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._phone = phone;
        this._eMail = eMail;
        this._generalRating = generalRating;
        this._note = note;
    }
    /**
     * Retrieves all the jobs that the user has applied to.
     * @async
     * @returns {Promise<Job[]>} - A promise that resolves to an array of Job objects.
     */
    public async getAppliedJobs(): Promise<Job[]> {
        let jobs;
        let statArr = await this.getCandidatures();
        let jobIds = statArr.map((stat) => stat._jobNumber);
        jobIds.forEach((id) => jobs.push(getFilteredJobs(["jobNumber"], [id.toString()])));
        return jobs;
    }
    /**
     * Retrieves the candidate job statuses for the current candidate.
     * @returns {Promise<CandidateJobStatus[]>} - A promise that resolves to an array of CandidateJobStatus objects.
     */
    public async getCandidatures(): Promise<CandidateJobStatus[]> {
        let candidatures;
        candidatures = await getFilteredCandidateJobStatuses(["candidateID"], [this._id]);
        return candidatures;
    }
    /**
     * Gets the path of the current job in the realtime DB.
     * @returns {Promise<string>} - The path of the current job.
     */
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Candidates')).includes(this._id.toString()))
            return "/Candidates/" + this._id;
        return "";
    }
    /**
     * Checks if the current Candidate exists in the realtime DB.
     * @returns {Promise<boolean>} - A promise that resolves to true if the path exists, false otherwise.
     */
    public async exists() {
        if ((await this.getPath()).length > 0)
            return true;
        return false;
    }
    /**
     * Removes the current candidate from the realtime DB if it exists. 
     * Also removes any candidatures associated with the candidate from the realtime DB.
     * @returns None
     */
    public async remove() {
        if (!(await this.exists()))
            return;
        const candidatures = await getFilteredCandidateJobStatuses(["candidateId"], [this._id]);
        candidatures.forEach((c) => c.remove());
        this.deleteCv();
        removeObjectAtPath("/Candidates/" + this._id);
    }
    /**
     * Edits the candidate's information and updates the database.
     * @param {string} [firstName=this._firstName] - The candidate's first name.
     * @param {string} [lastName=this._lastName] - The candidate's last name.
     * @param {string} [phone=this._phone] - The candidate's phone number.
     * @param {string} [eMail=this._eMail] - The candidate's email address.
     * @param {number} [generalRating=this._generalRating] - The candidate's general rating.
     * @returns None
     */
    public async edit(firstName: string = this._firstName, lastName: string = this._lastName, phone: string = this._phone, eMail: string = this._eMail, generalRating: number = this._generalRating, note: string = this._note) {
        if (!(await this.exists())) {
            console.log(`you must add() candidate before call edit()`);
            return;
        }
        if (this._firstName !== firstName || this._lastName !== lastName) {
            const extensions = await getFileExtensionsInFolder(`/CandidatesFiles/${this._id}/cv`);
            for (let i = 0; i < extensions.length; i++)
                if (await fileExists(`/CandidatesFiles/${this._id}/cv/${this._firstName}_${this._lastName}_CV.${extensions.at(i)}`)) {
                    renameFirestorePath(`/CandidatesFiles/${this._id}/cv/${this._firstName}_${this._lastName}_CV.${extensions.at(i)}`, `${firstName}_${lastName}_CV.${extensions.at(i)}`);
                    break;
                }
        }
        this._firstName = firstName;
        this._lastName = lastName;
        this._generalRating = generalRating;
        this._note = note;
        if(this._phone!==phone || this._eMail!==eMail){
            if((await getFilteredCandidates(["eMail","phone"],[eMail,phone])).length===0){
                this._eMail=eMail;
                this._phone=phone;
            }
            else{
                console.log(`a candidate alredy exist with the same mail and phone, othe field was chenged`);
            }
        }
        replaceData((await this.getPath()), this);
    }
    /**
     * Adds the current candidate to the realtime DB if they do not already exist.
     * @returns None
     */
    public async add() {
        if (!(await this.exists())
            && (await getFilteredCandidates(["eMail","phone"],[this._eMail,this._phone])).length===0)
            appendToDatabase(this, "/Candidates", this._id);
        else
            console.log("the candidate already exists");
    }
    /**
     * link betwwen Candidate and Job.
     * add CandidatesJobStatus to the realtime DB
     * @param {number} jobNumber - the job number to apply to the candidate
     * @param {string} about - the free text the candidate write when apply
     * @returns None
     */
    public async apply(jobNumber: number, about: string) {
        if (!(await this.exists())) {
            console.log(`you need to add() candidate before call apply()`);
            return;
        }
        let candidatuers = new CandidateJobStatus(jobNumber, this._id, "הוגשה מועמדות", about, -1, new Date(), new Date());
        candidatuers.add();
    }
    /**
     * Uploads a candidate's CV file to Firestore.
     * @param {File} cv - The candidate's CV file.
     * @returns None
     */
    public async uploadCv(cv: File) {
        const extension = cv.name.split('.')[cv.name.split('.').length - 1];
        await uploadFileToFirestore(cv, `CandidatesFiles/${this._id}/cv`, `${this._firstName}_${this._lastName}_CV.${extension}`);
    }
    /**
     * Deletes the CV file of the candidate from the firestore.
     * @returns None
     */
    public async deleteCv() {
        const extensions = await getFileExtensionsInFolder(`CandidatesFiles/${this._id}/cv`);
        for (let i = 0; i < extensions.length; i++)
            if ((await fileExists(`CandidatesFiles/${this._id}/cv/${this._firstName}_${this._lastName}_CV.${extensions.at(i)}`))) {
                await deleteFile(`CandidatesFiles/${this._id}/cv/${this._firstName}_${this._lastName}_CV.${extensions.at(i)}`);
                return;
            }
    }

    /**
     * Retrieves the URL of the candidate's CV file from the Firebase storage.
     * @returns {Promise<string>} - A promise that resolves with the URL of the CV file.
     */
    public async getCvUrl(): Promise<string> {
        const extensions = await getFileExtensionsInFolder(`CandidatesFiles/${this._id}/cv`);
        for (let i = 0; i < extensions.length; i++) {
            if ((await fileExists(`CandidatesFiles/${this._id}/cv/${this._firstName}_${this._lastName}_CV.${extensions.at(i)}`))) {
                const url = await getDownloadUrlFromFirestorePath(`CandidatesFiles/${this._id}/cv/${this._firstName}_${this._lastName}_CV.${extensions.at(i)}`);
                return url;
            }
        }
        return extensions.length.toString();
    }
}

/**
 * Retrieves a list of candidates from the Firebase Realtime Database.
 * @returns {Promise<Candidate[]>} A promise that resolves to an array of Candidate objects.
 * @throws {Error} If there is an error fetching the candidates from the database.
 */
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
export async function generateCandidateId(): Promise<string> {
    const candidates = await getFilteredCandidates();
    const len = candidates.length;
    const candIds: string[] = candidates.map((cand) => cand._id);
    const min = 10; // minimum number in range
    const max = len + 100; // maximum number in range
    let num = Math.floor(Math.random() * (max - min + 1)) + min; // generates a random number between 1 and 10
    while (candIds.some((id) => id === num.toString())) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    return num.toString();
}
/**
 * Retrieves a list of candidates from the database that match the given attributes and values.
 * @param {string[]} [attributes=[]] - An array of attributes to filter the candidates by.
 * @param {string[]} [values=[]] - An array of values to filter the candidates by.
 * @param {string} [sortBy=""] - The attribute to sort the candidates by.
 * @returns {Promise<Candidate[]>} - A promise that resolves to an array of Candidate objects.
 * @throws None
 */
export async function getFilteredCandidates(attributes: string[] = [], values: string[] = [], sortBy: string = ""): Promise<Candidate[]> {
    if (attributes.length !== values.length) {
        console.log("the attributes length not match to values length")
        return [];
    }
    let candidates = await getCandidatesFromDatabase();
    //filtering
    let i = attributes.indexOf("id");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._id === values.at(i))
    }
    i = attributes.indexOf("firstName");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._firstName === values.at(i))
    }
    i = attributes.indexOf("lastName");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._lastName === values.at(i))
    }
    i = attributes.indexOf("phone");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._phone === values.at(i))
    }
    i = attributes.indexOf("eMail");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._eMail === values.at(i))
    }
    i = attributes.indexOf("generalRating");
    if (i >= 0) {
        candidates = candidates.filter(candidate => candidate._generalRating.toString() === values.at(i))
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
    return candidates.map((cand) => new Candidate(cand._id, cand._firstName, cand._lastName, cand._phone,
        cand._eMail, cand._generalRating, cand._note));
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
