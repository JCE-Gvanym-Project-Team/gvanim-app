import { realtimeDB } from "../FirebaseConfig/firebase";
import { CandidateJobStatus, getFilteredCandidateJobStatuses, allStatus } from "./CandidateJobStatus";
import { appendToDatabase, getFirebaseIdsAtPath, removeObjectAtPath, replaceData } from "./DBfuncs";
import { Job, getFilteredJobs } from "./Job";
import { deleteFile, fileExists, getDownloadUrlFromFirestorePath, getFileExtensionsInFolder, uploadFileToFirestore } from "./firestoreFunc";
import { Recomendation } from "./Recomendation";
import axios from "axios";
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
    public async updateFirstName(firstName: string) {
        if (await this.exists()) {
            this._firstName = firstName;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateLastName(lastName: string) {
        if (await this.exists()) {
            this._lastName = lastName;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updatePhone(phone: string) {
        if (await this.exists() && (await getFilteredCandidates(["phone", "eMail"], [phone, this._eMail])).length === 0) {
            this._phone = phone;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateEmail(email: string) {
        if (await this.exists() && (await getFilteredCandidates(["phone", "eMail"], [this._phone, email])).length === 0) {
            this._eMail = email;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateGeneralRating(generalRating: number) {
        if (await this.exists()) {
            this._generalRating = generalRating;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }

    public async updateNote(note: string) {
        if (await this.exists()) {
            this._note = note;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
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
            return -1;
        const candidatures = await getFilteredCandidateJobStatuses(["candidateId"], [this._id]);
        candidatures.forEach((c) => c.remove());
        this.deleteCv();
        removeObjectAtPath("/Candidates/" + this._id);
        return 0;
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
            return -1;
        }
        this._firstName = firstName;
        this._lastName = lastName;
        this._generalRating = generalRating;
        this._note = note;
        if (this._phone !== phone || this._eMail !== eMail) {
            if ((await getFilteredCandidates(["eMail", "phone"], [eMail, phone])).length === 0) {
                this._eMail = eMail;
                this._phone = phone;
            }
            else {
                return 1;
            }
        }
        replaceData((await this.getPath()), this);
        return 0;
    }
    /**
     * Adds the current candidate to the realtime DB if they do not already exist.
     * @returns None
     */
    public async add() {
        if (!(await this.exists())
            && (await getFilteredCandidates(["eMail", "phone"], [this._eMail, this._phone])).length === 0) {
            await appendToDatabase(this, "/Candidates", this._id);
            return 0;
        }
        else {
            return 1;
        }
    }
    /**
     * link betwwen Candidate and Job.
     * add CandidatesJobStatus to the realtime DB
     * @param {number} jobNumber - the job number to apply to the candidate
     * @param {string} about - the free text the candidate write when apply
     * @returns None
     */
    public async apply(jobNumber: number, about: string, recomendation: Recomendation[] = [], recsFiles: File[] = []) {
        if (recomendation.length !== recsFiles.length || recomendation.length > 3 || recsFiles.length > 3)
            return -1;// bad argumnets
        if (!(await this.exists())) {
            return -1;
        }
        let candidatuers = new CandidateJobStatus(jobNumber, this._id, "הוגשה מועמדות", about, -1, new Date(), new Date());
        for (let i = 0; i < recsFiles.length; i++)
            candidatuers.addRecomendation(recomendation[i]._fullName, recomendation[i]._phone, recomendation[i]._eMail, recsFiles[i]);
        candidatuers.add();
        return 0;
    }
    /**
     * Uploads a candidate's CV file to Firestore.
     * @param {File} cv - The candidate's CV file.
     * @returns None
     */
    public async uploadCv(cv: File) {
        const extension = cv.name.split('.')[cv.name.split('.').length - 1];
        try {
            uploadFileToFirestore(cv, `CandidatesFiles/${this._id}/cv`, `CV.${extension}`);
            return 0;
        } catch {
            return -1;
        }
    }
    /**
     * Deletes the CV file of the candidate from the firestore.
     * @returns None
     */
    public async deleteCv() {
        const extensions = await getFileExtensionsInFolder(`CandidatesFiles/${this._id}/cv`);
        for (let i = 0; i < extensions.length; i++)
            if ((await fileExists(`CandidatesFiles/${this._id}/cv/CV.${extensions.at(i)}`))) {
                await deleteFile(`CandidatesFiles/${this._id}/cv/CV.${extensions.at(i)}`);
                return 0;
            }
        return 1;
    }

    /**
     * Retrieves the URL of the candidate's CV file from the Firebase storage.
     * @returns {Promise<string>} - A promise that resolves with the URL of the CV file.
     */
    public async getCvUrl(): Promise<string> {
        const extensions = await getFileExtensionsInFolder(`CandidatesFiles/${this._id}/cv`);
        for (let i = 0; i < extensions.length; i++) {
            if ((await fileExists(`CandidatesFiles/${this._id}/cv/CV.${extensions.at(i)}`))) {
                const url = await getDownloadUrlFromFirestorePath(`CandidatesFiles/${this._id}/cv/CV.${extensions.at(i)}`);
                return url;
            }
        }
        return "";
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
    return new Promise<Candidate[]>((resolve, reject) => {
        axios.post('https://europe-west1-gvanim-app.cloudfunctions.net/getFilteredCandidatesCloudFunction', {
            attributes: attributes,
            values: values,
            sortBy: sortBy
        })
            .then(response => {
                const cands = response.data;
                resolve(cands.map(cand => new Candidate(
                    cand._id,
                    cand._firstName,
                    cand._lastName,
                    cand._phone,
                    cand._eMail,
                    cand._generalRating,
                    cand._note
                )));
            })
            .catch(error => {
                console.error('Error calling the Cloud Function:', error);
                reject(error);
            });
    });
}
export async function getCandidatesByIds(ids: string[]): Promise<Candidate[]> {
    return new Promise<Candidate[]>((resolve, reject) => {
        axios.post('https://europe-west1-gvanim-app.cloudfunctions.net/getCandidatesByIdsFromCloud', {
            ids: ids
        })
            .then(response => {
                const cands = response.data;
                resolve(cands.map(cand => new Candidate(
                    cand._id,
                    cand._firstName,
                    cand._lastName,
                    cand._phone,
                    cand._eMail,
                    cand._generalRating,
                    cand._note
                )));
            })
            .catch(error => {
                console.error('Error calling the Cloud Function:', error);
                reject(error);
            });
    });
}
export async function getWaitingCandidate(): Promise<Candidate[]> {
    let jobStatus: CandidateJobStatus[] = [];
    for (let i = 0; i < allStatus.length; i++)
        if (i !== 5 && i !== 8 && i !== 7) {
            let cur = await getFilteredCandidateJobStatuses(['status'], [allStatus[i]]);
            cur.forEach(element => jobStatus.push(element));
        }
    const ids = jobStatus.map(j => j._candidateId);
    return getCandidatesByIds(ids);
}
export async function getRejectedCandidate() {
    let jobStatus: CandidateJobStatus[] = [];
    for (let i = 0; i < allStatus.length; i++)
        if (i === 5 || i === 8 || i === 7) {
            let cur = await getFilteredCandidateJobStatuses(['status'], [allStatus[i]]);
            cur.forEach(element => jobStatus.push(element));
        }
    const ids = jobStatus.map(j => j._candidateId);
    return getCandidatesByIds(ids);
}
