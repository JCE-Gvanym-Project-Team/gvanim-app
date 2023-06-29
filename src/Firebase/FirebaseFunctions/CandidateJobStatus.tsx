import { dataref } from "../FirebaseConfig/firebase";
import { Candidate, getFilteredCandidates } from "./Candidate";
import { appendToDatabase, getFirebaseIdsAtPath, getObjectAtPath, removeObjectAtPath, replaceData } from "./DBfuncs";
import { Job } from "./Job";
import { Recomendation } from './Recomendation';
import { Recruiter } from "./Recruiter";
import { deleteFile, fileExists, getDownloadUrlFromFirestorePath, getFileExtensionsInFolder, uploadFileToFirestore } from "./firestoreFunc";
import axios from "axios";
const database = dataref;
export const allStatus = [
    "הוגשה מועמדות",
    "זומן לראיון ראשון",
    "עבר ראיון ראשון",
    "זומן לראיון שני",
    "עבר ראיון שני",
    "התקבל",
    "הועבר למשרה אחרת",
    "נדחה",
    "אינו מעוניין במשרה"];

export class CandidateJobStatus {
    public _jobNumber: number;
    public _candidateId: string;
    public _status: string;
    public _about: string;
    public _matchingRate: number;
    public _applyDate: string;
    public _lastUpdate: string;
    public _interviewDate: string;
    public _interviewsSummery: Array<string>;
    public _recomendations: Array<Recomendation>;
    public _rejectCause: string;

    constructor(
        jobNumber: number,
        candidateId: string,
        status: string = allStatus[0],
        about: string = "",
        matchingRate: number = -1,
        applyDate: Date = new Date(),
        lastUpdate: Date = new Date(0, 0, 0),
        interviewDate: Date = new Date(0, 0, 0),
        interviewsSummery: Array<string> = ["", ""],
        recomendations: Array<Recomendation> = new Array<Recomendation>(),
        rejectCause = "") {
        this._jobNumber = jobNumber;
        this._candidateId = candidateId;
        this._status = status;
        this._matchingRate = matchingRate;
        this._applyDate = applyDate.toString();
        this._lastUpdate = lastUpdate.toString();
        this._interviewDate = interviewDate.toString();
        this._interviewsSummery = interviewsSummery;
        this._about = about;
        this._recomendations = recomendations;
        this._rejectCause = rejectCause;
    }
    /**
     * Adds a recommendation to the candidate's application.
     * @param {string} fullName - The full name of the person providing the recommendation.
     * @param {string} phone - The phone number of the person providing the recommendation.
     * @param {string} eMail - The email address of the person providing the recommendation.
     * @param {File} recomendation - The file containing the recommendation.
     * @returns None
     */
    public async addRecomendation(fullName: string, phone: string, eMail: string, recomendation: File ) {
        if (this._recomendations.length >= 3)
            return -1;
        if (this._recomendations.map((rec) => rec._phone).includes(phone))
            return -1;
        this._recomendations.push(new Recomendation(fullName, phone, eMail));
        const extension = recomendation.name.split('.')[recomendation.name.split('.').length - 1];
        uploadFileToFirestore(recomendation, `CandidatesFiles/${this._candidateId}/rec`, `${phone}_${this._jobNumber}_REC.${extension}`);
        replaceData((await this.getPath()), this);
        return 0;
    }
    public async updateAbout(about: string) {
        if (await this.exists()) {
            this._about = about;
            replaceData((await this.getPath()), this);
            return 0;
        }
        return -1;
    }
    public async updateMatchingRate(matchingRate: number) {
        if (await this.exists()) {
            this._matchingRate = matchingRate;
            replaceData((await this.getPath()), this);
             return 0;
        }
        return -1;
    }

    public async updateInterviewDate(interviewDate: Date) {
        if (await this.exists()) {
            this._interviewDate = interviewDate.toString();
            replaceData((await this.getPath()), this);
             return 0;
        }
        return -1;
    }

    public async updateInterviewsSummery(interviewsSummery: Array<string>) {
        if (await this.exists()) {
            this._interviewsSummery = interviewsSummery;
            replaceData((await this.getPath()), this);
             return 0;
        }
        return -1;
    }

    public async updateRejectCause(rejectCause: string) {
        if (await this.exists()) {
            this._rejectCause = rejectCause;
            replaceData((await this.getPath()), this);
             return 0;
        }
        return -1;
    }
    /**
     * Retrieves the URLs of the recommendation files for the current candidate.
     * @returns {Promise<string[]>} - An array of URLs for the recommendation files.
     */
    public async getRecomendationsUrl(): Promise<string[]> {
        let urls: string[] = [];
        const extentions = await getFileExtensionsInFolder(`CandidatesFiles/${this._candidateId}/rec`);
        const phones = this._recomendations.map((rec) => rec._phone);
        for (let i = 0; i < phones.length; i++)
            for (let j = 0; j < extentions.length; j++)
                if ((await fileExists(`CandidatesFiles/${this._candidateId}/rec/${phones[i]}_${this._jobNumber}_REC.${extentions[j]}`))) {
                    let url = await getDownloadUrlFromFirestorePath(`CandidatesFiles/${this._candidateId}/rec/${phones[i]}_${this._jobNumber}_REC.${extentions[j]}`);
                    if(!urls.includes(url))
                        urls.push(url);
                }
        return urls;
    }
    /**
     * Deletes all recommendations files for the current CandidateJobStatus.
     * @returns None
     */
    private async deleteAllRecomendations() {
        const extentions = await getFileExtensionsInFolder(`CandidatesFiles/rec/${this._candidateId}`);
        const phones = this._recomendations.map((rec) => rec._phone);
        for (let i = 0; i < phones.length; i++)
            for (let j = 0; j < extentions.length; j++)
                if ((await fileExists(`CandidatesFiles/${this._candidateId}/rec/${phones[i]}_${this._jobNumber}_REC.${extentions[j]}`))) {
                    let path = await getDownloadUrlFromFirestorePath(`CandidatesFiles/${this._candidateId}/rec/${phones[i]}_${this._jobNumber}_REC.${extentions[j]}`);
                    deleteFile(path);
                }
    }
    /**
     * Returns the number of interviews in the interviews summary array.
     * @returns {number} - The number of interviews in the interviews summary array.
     */
    public getNumOfInterviews() {
        return this._interviewsSummery.length;
    }
    /**
     * Edits the interview summary at the given index. If the index is greater than the number of interviews,
     * the summary is added to the end of the list.
     * @param {string} summery - The new summary to replace the old one.
     * @param {number} index - The index of the summary to replace.
     * @returns None
     */
    public editInterviewSummery(summery: string, index: number) {
        if (index > this.getNumOfInterviews())
            this._interviewsSummery.push(summery);
        else
            this._interviewsSummery[index] = summery;
        this.edit();
    }

    /**
     * Edits the current object's properties and updates the data in the database.
     * @param {number} [matchingRate=this._matchingRate] - The new matching rate to set.
     * @param {string} [about=this._about] - The new about information to set.
     * @param {string} [candidateId=this._candidateId] - The new candidate ID to set, dont use this paarmeter.
     * @returns None
     */
    public async edit(matchingRate: number = this._matchingRate, about: string = this._about, interviewDate: Date = new Date(this._interviewDate), rejectCause: string = this._rejectCause) {
        if(!(await this.exists()))
            return -1;
        this._matchingRate = matchingRate;
        this._interviewDate = interviewDate.toString();
        this._about = about;
        this._rejectCause = rejectCause;
        replaceData((await this.getPath()), this);
        return 0;
    }
    /**
     * Retrieves the path of the realtime DB object that corresponds to the
     * current candidate and job number.
     * @returns {Promise<string>} - A promise that resolves to the path of the object.
     */
    private async getPath() {
        let firebaseId = "";
        let ids = await getFirebaseIdsAtPath("/CandidatesJobStatus");
        for (let i = 0; i < ids.length; i++) {
            let stat = await getObjectAtPath("/CandidatesJobStatus/" + ids[i]);
            if (stat._candidateId === this._candidateId && stat._jobNumber === this._jobNumber) {
                firebaseId = ids[i];
                break;
            }
        }
        if (firebaseId.length > 0)
            return "/CandidatesJobStatus/" + firebaseId;
        return "";
    }
    /**
     * Checks if the object exists in realtime DB.
     * @returns {Promise<boolean>} - A promise that resolves to true if the object exists, false otherwise.
     */
    public async exists() {
        if ((await this.getPath()).length > 0)
            return true;
        return false;
    }
    /**
     * Removes the current instance of the CandidateJobStatus object from the realtime DB.
     * Deletes all recommendations associated with this object and removes the object from the
     * realtime DB.
     * @returns None
     */
    public async remove() {
        this.deleteAllRecomendations();
        let candidateIds = await getFirebaseIdsAtPath("/CandidatesJobStatus");
        candidateIds.forEach(async (id) => {
            if (((await getObjectAtPath("/CandidatesJobStatus/" + id))._candidateId === this._candidateId) &&
                ((await getObjectAtPath("/CandidatesJobStatus/" + id))._jobNumber === this._jobNumber))
                removeObjectAtPath("/CandidatesJobStatus/" + id);
        });
        return 0;
    }
    /**
     * Adds the current object to the realtime DB. 
     * @returns None
     */
    public async add() {
        if (!(await this.exists())){
            await appendToDatabase(this, "/CandidatesJobStatus");
            return 0;
        }
        else{
            return 1;

        }
    }
    /**
     * Updates the status of the candidate job application and replaces the data in the realtime DB.
     * @param {string} newStatus - The new status to update the candidate job application to.
     * @param {Date} [interviewDate=this._interviewDate] - The interview date for the candidate job application leave empty if the new satatus not require interview.
     */
    public async updateStatus(newStatus: string, interviewDate: Date = new Date(this._interviewDate)): Promise<number> {
        if (!(await this.exists())) {
            return -1;
        }
        this._status = newStatus;
        this._interviewDate = interviewDate.toString();
        this._lastUpdate = (new Date()).toString();
        replaceData((await this.getPath()), this);
            return 0;
    }
    public async getWhatsappUrl(text: string): Promise<string> {
        const cand = (await getFilteredCandidates(["id"], [this._candidateId])).at(0);
        if (cand) {
            if (text.length > 0)
                return `https://api.whatsapp.com/send?phone=972${cand._phone}&text=${text.replace(' ','%20').replace('\n','%0A')}`;
        }
        return "";
    }
}

//["הוגשה מועמדות","זומן לראיון ראשון","עבר ראיון ראשון","זומן לראיון שני","עבר ראיון שני","התקבל","הועבר למשרה אחרת","נדחה","הפסיק את התהליך"];
//       8               7                  6         5          4                      3                  2                  1                  0
export function getMessage(cand: Candidate, job: Job, rec: Recruiter, status: string, interviewDate: Date = new Date(0, 0, 0), place: string = "") {
    if (!allStatus.includes(status) || status === allStatus[0] || status === allStatus[2] || status === allStatus[4] || status === allStatus[8])
        return "";
    let message = `${cand._firstName} `;
    message += 'שלום';
    message += '\n';
    message += 'שמי';
    message += ' ';
    message += `${rec._firstName}`;
    message += ", ";
    message += "מעמותת גוונים";
    message += "."
    message += '\n';
    message += "ברצוני לעדכן אותך על מועמדותך למשרה: ";
    message += `${job._title}\n`;
    if (interviewDate !== (new Date(0, 0, 0)) && (status === allStatus[1] || status === allStatus[3])) {
        message += "נשמח לקבוע עמך ראיון בתאריך ";
        message += `${interviewDate.getDate()}/${interviewDate.getMonth() + 1}\n`;
        message += "בשעה:";
        message += ' ';
        message += `${interviewDate.getHours()}:${interviewDate.getMinutes()}\n`
        message += "שייתקיים ב";
        message += `${place}.\n`;
        message += `אנא אשר הגעתך לראיון`;
    }
    if (status === allStatus[5]) {
        message += "עמותת גוונים שמחה להודיע לך על קבלתך למשרה"
    }
    if (status === allStatus[7]) {
        message += "לצערנו לא נמשיך עמך בתהליך הגיוס";
    }
    if (status === allStatus[6]) {
        message += "לאחר בחינת קורות החיים שלך ואת תהליך הגיוס שעברת הוחלט לנתב אותך למשרה אחרת, נשלח פרטים נוספים בקרוב.";
    }
    return message;
}
export async function getAllRejectCause() {
    return Array.from(new Set((await getFilteredCandidateJobStatuses()).map((s)=>s._rejectCause)));
}
/**
 * Retrieves candidate job statuses from the database and filters them based on the given attributes and values.
 * @param {string[]} [attributes=[]] - An array of attributes to filter by.
 * @param {string[]} [values=[]] - An array of values to filter by.
 * @param {string} [sortBy=""] - The attribute to sort the results by.
 * @returns {Promise<CandidateJobStatus[]>} - A promise that resolves to an array of filtered candidate job statuses.
 */
export async function getFilteredCandidateJobStatuses(attributes: string[] = [], values: string[] = [], sortBy: string = "") {
    return new Promise<CandidateJobStatus[]>((resolve, reject) => {
        axios.post('https://europe-west1-gvanim-app.cloudfunctions.net/getFilteredCandidatesJobStatusCloudFunction', {
            attributes: attributes,
            values: values,
            sortBy: sortBy
        })
            .then(response => {
                const cjs = response.data;
                resolve(cjs.map(s => new CandidateJobStatus(
                    s._jobNumber,
                    s._candidateId,
                    s._status,
                    s._about,
                    s._matchingRate,
                    s._applyDate,
                    s._lastUpdate,
                    s._interviewDate,
                    s._interviewsSummery,
                    s._recomendations,
                    s._rejectCause
                )));
            })
            .catch(error => {
                console.error('Error calling the Cloud Function:', error);
                reject(error);
            });
    });
}
