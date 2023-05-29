import { dataref } from "../FirebaseConfig/firebase";
import { Recomendation } from './Recomendation';
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath, replaceData, appendToDatabase } from "./DBfuncs";
import { uploadFileToFirestore, getDownloadUrlFromFirestorePath, getFileExtensionsInFolder, deleteFile, fileExists } from "./firestoreFunc";
import { Candidate, getFilteredCandidates } from "./Candidate";
import { Recruiter } from "./Recruiter";
import { Job, getFilteredJobs } from "./Job";
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
    "הפסיק את התהליך"];

export class CandidateJobStatus
{
    public _jobNumber: number;
    public _candidateId: string;
    public _status: string;
    public _about: string;
    public _matchingRate: number;
    public _applyDate: Date;
    public _lastUpdate: Date;
    public _interviewDate: Date;
    public _interviewsSummery: Array<string>;
    public _recomendations: Array<Recomendation>;
    public _rejectCause: string;

    constructor(
        jobNumber: number = -1,
        candidateId: string = "",
        status: string = "",
        about: string = "",
        matchingRate: number = -1,
        applyDate: Date = new Date(0, 0, 0),
        lastUpdate: Date = new Date(0, 0, 0),
        interviewsSummery: Array<string> = ["", ""],
        recomendations: Array<Recomendation> = [],
        rejectCause = ""
    )
    {
        this._jobNumber = jobNumber;
        this._candidateId = candidateId;
        this._status = status;
        this._matchingRate = matchingRate;
        this._applyDate = applyDate;
        this._lastUpdate = lastUpdate;
        this._interviewDate = new Date();
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
    public async addRecomendation(fullName: string, phone: string, eMail: string, recomendation: File)
    {
        if (this._recomendations.length >= 3)
            return;
        if (this._recomendations.map((rec) => rec._phone).includes(phone))
            return;
        this._recomendations.push(new Recomendation(fullName, phone, eMail));
        const extension = recomendation.name.split('.')[recomendation.name.split('.').length - 1];
        await uploadFileToFirestore(recomendation, `CandidatesFiles/${this._candidateId}/rec`, `${phone}_REC.${extension}`);
        replaceData((await this.getPath()), this);
    }
    /**
     * Retrieves the URLs of the recommendation files for the current candidate.
     * @returns {Promise<string[]>} - An array of URLs for the recommendation files.
     */
    public async getRecomendationsUrl(): Promise<string[]>
    {
        let urls: string[] = [];
        const extentions = await getFileExtensionsInFolder(`CandidatesFiles/${this._candidateId}/rec`);
        const phones = this._recomendations.map((rec) => rec._phone);
        for (let i = 0; i < phones.length; i++)
            for (let j = 0; j < extentions.length; j++)
                if ((await fileExists(`CandidatesFiles/${this._candidateId}/rec/${phones[i]}_${this._jobNumber}_REC.${extentions[j]}`))) {
                    let url = await getDownloadUrlFromFirestorePath(`CandidatesFiles/${this._candidateId}/rec/${phones[i]}_${this._jobNumber}_REC.${extentions[j]}`);
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
    public getNumOfInterviews()
    {
        return this._interviewsSummery.length;
    }
    /**
     * Edits the interview summary at the given index. If the index is greater than the number of interviews,
     * the summary is added to the end of the list.
     * @param {string} summery - The new summary to replace the old one.
     * @param {number} index - The index of the summary to replace.
     * @returns None
     */
    public editInterviewSummery(summery: string, index: number)
    {
        if (index > this.getNumOfInterviews())
            this._interviewsSummery.push(summery);
        else
            this._interviewsSummery[index] = summery;
    }

    /**
     * Edits the current object's properties and updates the data in the database.
     * @param {number} [matchingRate=this._matchingRate] - The new matching rate to set.
     * @param {string} [about=this._about] - The new about information to set.
     * @param {string} [candidateId=this._candidateId] - The new candidate ID to set, dont use this paarmeter.
     * @returns None
     */
    public async edit(matchingRate: number = this._matchingRate, about: string = this._about, candidateId: string = this._candidateId)
    {
        if (candidateId.length > 0)
            this._candidateId = candidateId;
        if (about.length > 0)
            this._about = about;
        if (matchingRate >= 0)
            this._matchingRate = matchingRate;
        replaceData((await this.getPath()), this);
    }
    /**
     * Retrieves the path of the realtime DB object that corresponds to the
     * current candidate and job number.
     * @returns {Promise<string>} - A promise that resolves to the path of the object.
     */
    private async getPath()
    {
        let firebaseId = "";
        let ids = await getFirebaseIdsAtPath("/CandidatesJobStatus");
        for (let i = 0; i < ids.length; i++)
        {
            let stat = await getObjectAtPath("/CandidatesJobStatus/" + ids[i]);
            if (stat._candidateId === this._candidateId && stat._jobNumber === this._jobNumber)
            {
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
    public async exists()
    {
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
    public async remove()
    {
        this.deleteAllRecomendations();
        let candidateIds = await getFirebaseIdsAtPath("/CandidatesJobStatus");
        candidateIds.forEach(async (id) =>
        {
            if (((await getObjectAtPath("/CandidatesJobStatus/" + id))._candidateId === this._candidateId) &&
                ((await getObjectAtPath("/CandidatesJobStatus/" + id))._jobNumber === this._jobNumber))
                removeObjectAtPath("/CandidatesJobStatus/" + id);
        });
    }
    /**
     * Adds the current object to the realtime DB. 
     * @returns None
     */
    public async add()
    {
        if (!(await this.exists()))
            appendToDatabase(this, "/CandidatesJobStatus");
        else
            console.log("the CandidatesJobStatus already exists");
    }
    /**
     * Updates the status of the candidate job application and replaces the data in the realtime DB.
     * @param {string} newStatus - The new status to update the candidate job application to.
     * @param {Date} [interviewDate=this._interviewDate] - The interview date for the candidate job application leave empty if the new satatus not require interview.
     * @returns url link to notify the candidate via whatsapp
     */
    public async updateStatus(newStatus: string, interviewDate: Date = this._interviewDate): Promise<void> {
        if (!(await this.exists())) {
            console.log("candidate job status not found in the database");
            return;
        }
        this._status = newStatus;
        replaceData((await this.getPath()), this);
    }
    public async getWhatsappUrl(recruiter: Recruiter, interviewDate: Date = new Date(0, 0, 0), place: string = ""): Promise<string>
    {
        const cand = (await getFilteredCandidates(["candidateId"], [this._candidateId])).at(0);
        const job = (await getFilteredJobs(["jobNumber"], [this._jobNumber.toString()])).at(0);
        if (cand && job)
        {
            const text = getMessage(cand, job, recruiter, this._status, interviewDate, place);
            if (text.length > 0)
                return `https://api.whatsapp.com/send?phone=972${cand._phone}&text=${text}`;
        }
        return "";
    }
}
/**
 * Retrieves candidate job statuses from the Firebase Realtime Database.
 * @returns {Promise<CandidateJobStatus[]>} - A promise that resolves to an array of candidate job statuses.
 * @throws {Error} - If there is an error fetching the data from the database.
 */
async function getCandidateJobStatusFromDatabase(): Promise<CandidateJobStatus[]>
{
    try
    {
        const snapshot = await database.ref("/CandidatesJobStatus").once("value");
        const candidateJobStatusData = snapshot.val();
        const candidateJobStatuses: CandidateJobStatus[] = [];
        for (const candidateJobStatusId in candidateJobStatusData)
        {
            const candidateJobStatus = candidateJobStatusData[candidateJobStatusId];
            candidateJobStatuses.push(candidateJobStatus);
        }
        return candidateJobStatuses;
    } catch (error)
    {
        console.error(error);
        throw new Error("Failed to fetch candidate job statuses from database.");
    }
}
//["הוגשה מועמדות","זומן לראיון ראשון","עבר ראיון ראשון","זומן לראיון שני","עבר ראיון שני","התקבל","הועבר למשרה אחרת","נדחה","הפסיק את התהליך"];
//       8               7                  6         5          4                      3                  2                  1                  0
function getMessage(cand: Candidate, job: Job, rec: Recruiter, status: string, interviewDate: Date = new Date(0, 0, 0), place: string = "")
{
    if (status === allStatus[0] || status === allStatus[2] || status === allStatus[4] || status === allStatus[8])
        return "";
    let message = `${cand._firstName}`;
    message += '\nשלום';
    message += 'שמי ';
    message += `${rec._firstName},`;
    message += "\nמעמותת גוונים.";
    message += "ברצוני לעדכן אותך על מועמדותך למשרה: ";
    message += `${job._title}\n`;
    if (interviewDate !== (new Date(0, 0, 0)) && (status === allStatus[1] || status === allStatus[3]))
    {
        message += " :נשמח לקבוע עמך ראיון בתאריך";
        message += `${interviewDate.getDate()}/${interviewDate.getMonth() + 1}\n`;
        message += "בשעה: ";
        message += `${interviewDate.getHours()}:${interviewDate.getMinutes()}\n`
        message += "שייתקיים ב";
        message += `${place}.\n`;
        message += `אנא אשר הגעתך לראיון`;
    }
    if (status === allStatus[5])
    {
        message += "עמותת גוונים שמחה להודיע לך על קבלתך למשרה"
    }
    if (status === allStatus[7])
    {
        message += "לצערנו לא נמשיך עמך בתהליך הגיוס";
    }
    if (message === allStatus[6])
    {
        message += "לאחר בחינת קורות החיים שלך ואת תהליך הגיוס שעברת הוחלט לנתב אותך למשרה אחרת, נשלח פרטים נוספים בקרוב.";
    }
    else
        return "";
    return message.replace('\n', '%0A').replace(' ', '%20');
}

/**
 * Retrieves candidate job statuses from the database and filters them based on the given attributes and values.
 * @param {string[]} [attributes=[]] - An array of attributes to filter by.
 * @param {string[]} [values=[]] - An array of values to filter by.
 * @param {string} [sortBy=""] - The attribute to sort the results by.
 * @returns {Promise<CandidateJobStatus[]>} - A promise that resolves to an array of filtered candidate job statuses.
 */
export async function getFilteredCandidateJobStatuses(attributes: string[] = [], values: string[] = [], sortBy: string = "")
{
    if (attributes.length !== values.length)
    {
        console.log("the attributes length not match to values length");
        return [];
    }

    let candidateJobStatuses = await getCandidateJobStatusFromDatabase();

    // filtering
    let i = attributes.indexOf("jobNumber");
    if (i >= 0)
    {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._jobNumber === Number(values[i])
        );
    }
    i = attributes.indexOf("candidateId");
    if (i >= 0)
    {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._candidateId === values[i]
        );
    }
    i = attributes.indexOf("status");
    if (i >= 0)
    {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._status === values[i]
        );
    }
    i = attributes.indexOf("matchingRate");
    if (i >= 0)
    {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._matchingRate === Number(values[i])
        );
    }
    i = attributes.indexOf("applyDate");
    if (i >= 0)
    {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._applyDate.toISOString() === values[i]
        );
    }
    i = attributes.indexOf("lastUpdate");
    if (i >= 0)
    {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._lastUpdate.toISOString() === values[i]
        );
    }
    i = attributes.indexOf("rejectCause");
    if (i >= 0)
    {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._rejectCause === values[i]
        );
    }
    if (sortBy === "jobNumber")
        return candidateJobStatuses.sort(sortByJobNumber);
    if (sortBy === "candidateId")
        return candidateJobStatuses.sort(sortByCandidateId);
    if (sortBy === "status")
        return candidateJobStatuses.sort(sortByStatus);
    if (sortBy === "matchingRate")
        return candidateJobStatuses.sort(sortByMatchingRate);
    if (sortBy === "applyDate")
        return candidateJobStatuses.sort(sortByApplyDate);
    if (sortBy === "lastUpdate")
        return candidateJobStatuses.sort(sortByLastUpdate);
    return candidateJobStatuses.map((s) => new CandidateJobStatus(s._jobNumber, s._candidateId,
        s._status, s._about, s._matchingRate, s._applyDate,
        s._lastUpdate, s._interviewsSummery, s._recomendations,
        s._rejectCause));
}
function sortByJobNumber(a: CandidateJobStatus, b: CandidateJobStatus): number
{
    return a._jobNumber - b._jobNumber;
}

function sortByCandidateId(a: CandidateJobStatus, b: CandidateJobStatus): number
{
    if (a._candidateId.toLowerCase() < b._candidateId.toLowerCase())
    {
        return -1;
    }
    if (a._candidateId.toLowerCase() > b._candidateId.toLowerCase())
    {
        return 1;
    }
    return 0;
}

function sortByStatus(a: CandidateJobStatus, b: CandidateJobStatus): number
{
    if (a._status.toLowerCase() < b._status.toLowerCase())
    {
        return -1;
    }
    if (a._status.toLowerCase() > b._status.toLowerCase())
    {
        return 1;
    }
    return 0;
}

function sortByMatchingRate(a: CandidateJobStatus, b: CandidateJobStatus): number
{
    return b._matchingRate - a._matchingRate;
}

function sortByApplyDate(a: CandidateJobStatus, b: CandidateJobStatus): number
{
    return a._applyDate.getTime() - b._applyDate.getTime();
}

function sortByLastUpdate(a: CandidateJobStatus, b: CandidateJobStatus): number
{
    return a._lastUpdate.getTime() - b._lastUpdate.getTime();
}