import { realtimeDB } from "../FirebaseConfig/firebase";
import { appendToDatabase, getFirebaseIdsAtPath, removeObjectAtPath, replaceData } from "./DBfuncs";
export class Stage {
    public _name: string;
    public _open: boolean;
    constructor(name: string, open: boolean) {
        this._name = name;
        this._open = open;
    }
    /**
     * Gets the path of the current stage in the realtime DB.
     * @returns {Promise<string>} - The path of the current stage in the Firebase database.
     */
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Stages')).includes(this._name))
            return "/Stages/" + this._name;
        return "";
    }
    /**
     * Checks if the stage exists in the realtime DB.
     * @returns {Promise<boolean>} - A promise that resolves to true if the path exists, false otherwise.
     */
    public async exists() {
        if ((await this.getPath()).length > 0)
            return true;
        return false;
    }
    /**
     * Removes the stage from the realtime DB.
     * @async
     * @returns None
     */
    public async remove() {
        if (!(await this.exists()))
            return 1;
        removeObjectAtPath("/Stages/" + this._name);
        return 0;
    }
    /**
     * Edits the name and open status of the current stage.
     * @param {string} [name=this._name] - The new name for the stage.
     * @param {boolean} [open=this._open] - The new open status for the stage.
     * @returns None
     */
    public async edit(name: string = this._name, open: boolean = this._open) {
        this._name = name;
        this._open = open;
        if (!(await this.exists()))
            return -1;
        replaceData((await this.getPath()), this);
        return 0;
    }
    /**
     * Adds the current stage to the realtime DB if it does not already exist.
     * @returns None
     */
    public async add() {
        if ((await this.exists())){
            appendToDatabase(this, "/Stages", this._name);
            return 0;
        }
        return 1;
    }
    public async getMessages(candidateName: string, recruiterName: string, interviewDate: Date = new Date(0, 0, 0), location: string = ""): Promise<string> {
        let message = "";
        if (this._name === '')
            message = 'something'
        return message;
    }
}
/**
 * Retrieves all stages from the Firebase Realtime Database.
 * @returns {Promise<Stage[]>} A promise that resolves with an array of Stage objects.
 * @throws {Error} If there is an error fetching the stages from the database.
 */
export async function getAllStages(): Promise<Stage[]> {
    const database = realtimeDB;
    try {
        const snapshot = await database.ref("/Stages").once("value");
        const recruitersData = snapshot.val();
        const recruiters: Stage[] = [];
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
/**
 * Retrieves all open stages from the realtime DB.
 * @returns {Promise<Array>} - A promise that resolves to an array of open stages.
 */
export async function getOpenStages() {
    let roles = await getAllStages();
    return roles.filter((role) => role._open === true);
}
/**
 * Retrieves all closed stages from the realtime DB.
 * @returns {Promise<Array>} - A promise that resolves to an array of closed stages.
 */
export async function getClosedStages() {
    let roles = await getAllStages();
    return roles.filter((role) => role._open === false);
}