import { realtimeDB } from "../FirebaseConfig/firebase";
import { removeObjectAtPath, getFirebaseIdsAtPath, replaceData, appendToDatabase } from "./DBfuncs";
import { getRecruitersFromDatabase, Recruiter } from "./Recruiter";
export class Sector {
    public _name: string;
    public _open: boolean;
    public _recruitersUid: string[];
    constructor(name: string, open: boolean, recruiterUid: string[]) {
        this._name = name;
        this._open = open;
        this._recruitersUid = recruiterUid;
    }
    /**
     * Gets the path of the current stage in the realtime DB.
     * @returns {Promise<string>} - The path of the current stage in the Firebase database.
     */
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Sectors')).includes(this._name))
            return "/Sectors/" + this._name;
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
     * Removes the Sector from the realtime DB, and from the Recruiters.
     * @async
     * @returns None
     */
    public async remove() {
        if (!(await this.exists()))
            return;
        else {
            let recs = await getRecruitersFromDatabase();
            recs.filter((rec) => rec._sectors.includes(this._name));
            for (let i = 0; i < recs.length; i++)
                recs.at(i)?.removeSector(this._name);
            removeObjectAtPath("/Sectors/" + this._name);
        }
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
        if ((await this.exists()))
            replaceData((await this.getPath()), this);
    }
    /**
     * Adds the current Sector to the realtime DB if it does not already exist.
     * @returns None
     */
    public async add() {
        if ((await this.exists()))
            appendToDatabase(this, "/Sectors", this._name);
        else
            console.log("the Stage already exists");
    }
    public async addRecruiter(recruiter: Recruiter) {
        if (await this.exists()) {
            this._recruitersUid.push(await recruiter.getUid());
            this.remove();
            this.add();
        }
        else
            console.log(`Sector ${this._name} not exist add it before edit`);
    }
    public async removeRecruiter(recruiter: Recruiter) {
        if (await this.exists()) {
            this._recruitersUid.filter(async (uid) => uid !== (await recruiter.getUid()))
            this.remove();
            this.add();
        }
        else
            console.log(`Sector ${this._name} not exist add it before edit`);
    }
}
/**
 * Retrieves all stages from the Firebase Realtime Database.
 * @returns {Promise<Stage[]>} A promise that resolves with an array of Stage objects.
 * @throws {Error} If there is an error fetching the stages from the database.
 */
export async function getAllSectors(): Promise<Sector[]> {
    const database = realtimeDB;
    try {
        const snapshot = await database.ref("/Sectors").once("value");
        const recruitersData = snapshot.val();
        const recruiters: Sector[] = [];
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
 * Retrieves all open sectors from the realtime DB.
 * @returns {Promise<Array>} - A promise that resolves to an array of open stages.
 */
export async function getOpenSectors() {
    let sectors = await getAllSectors();
    return sectors.filter((sector) => sector._open === true);
}
/**
 * Retrieves all closed sectors from the realtime DB.
 * @returns {Promise<Array>} - A promise that resolves to an array of closed stages.
 */
export async function getClosedSectors() {
    let sectors = await getAllSectors();
    return sectors.filter((sector) => sector._open === false);
}