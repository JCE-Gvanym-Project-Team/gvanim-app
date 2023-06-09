import { realtimeDB } from "../FirebaseConfig/firebase";
import { appendToDatabase, getFirebaseIdsAtPath, removeObjectAtPath, replaceData } from "./DBfuncs";
import { Recruiter, getRecruitersFromDatabase } from "./Recruiter";
export class Sector {
    public _name: string;
    public _open: boolean;
    public _recruitersUid: string[];
    constructor(name: string, open: boolean = true, recruitersUid: string[] = []) {
        this._name = name;
        this._open = open;
        this._recruitersUid = recruitersUid;
    }
    /**
     * Gets the path of the current stage in the realtime DB.
     * @returns {Promise<string>} - The path of the current stage in the Firebase database.
     */
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Sectors')).includes(this._name.replace('/', '_')))
            return "/Sectors/" + this._name.replace('/', '_');
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
            return 1;
        let recs = await getRecruitersFromDatabase();
        recs = recs.filter((rec) => rec._sectors.includes(this._name));
        for (let i = 0; i < recs.length; i++)
            recs.at(i)?.removeSector(this._name);
        removeObjectAtPath(await this.getPath());
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
        if ((await this.exists())) {
            replaceData(`${await this.getPath()}/_name`, this._name);
            replaceData(`${await this.getPath()}/_open`, this._open);
            return 0;
        }
        return -1;
    }
    /**
     * Adds the current Sector to the realtime DB if it does not already exist.
     * @returns None
     */
    public async add() {
        if (!(await this.exists())) {
            appendToDatabase(this, "/Sectors", this._name.replace('/', '_'));
            return 0;
        }
        return 1;
    }
    public async addRecruiter(recruiter: Recruiter) {
        if (await this.exists()) {
            this._recruitersUid.push(await recruiter.getUid());
            replaceData(`${await this.getPath()}/_recruitersUid`, this._recruitersUid);
            await appendToDatabase(recruiter._email, await this.getPath(), await recruiter.getUid());
            return 0;
        }
        return -1;
    }
    public async removeRecruiter(recruiter: Recruiter, recUid: string) {
        if (await this.exists()) {
            const i = this._recruitersUid.indexOf(recUid);
            if(i>=0)
                this._recruitersUid = this._recruitersUid.splice(i,i);
            replaceData(`${await this.getPath()}/_recruitersUid`, this._recruitersUid);
            if (recUid.length > 0)
                await removeObjectAtPath(await this.getPath() + '/' + recUid);
            return 0;
        }
        return -1;
    }
}
/**
 * Retrieves all sectors from the Firebase Realtime Database.
 * @returns {Promise<Sector[]>} A promise that resolves with an array of Stage objects.
 * @throws {Error} If there is an error fetching the stages from the database.
 */
export async function getAllSectors(): Promise<Sector[]> {
    const database = realtimeDB;
    try {
        const snapshot = await database.ref("/Sectors").once("value");
        const sectorsData = snapshot.val();
        const sectors: Sector[] = [];
        for (const name in sectorsData) {
            let sec = sectorsData[name];
            sectors.push(new Sector(sec._name, sec._open, sec._recruitersUid));
        }
        return sectors;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch sectors from database.");
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