import { realtimeDB } from "../FirebaseConfig/firebase";
import { appendToDatabase, getFirebaseIdsAtPath, removeObjectAtPath, replaceData } from "./DBfuncs";
 export class Role{
    public _name: string;
    public _open: boolean;
    constructor(name: string, open: boolean){
        this._name=name;
        this._open=open;
    }
    /**
     * Gets the path of the current role in the realtime DB.
     * @returns {Promise<string>} - The path of the current job in the Firebase database.
     */
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Roles')).includes(this._name.replace('/','_')))
            return "/Roles/" + this._name.replace('/', '_');
        return "";
    }
    /**
     * Checks if the role exists in the realtime DB.
     * @returns {Promise<boolean>} - A promise that resolves to true if the path exists, false otherwise.
     */
    public async exists() {
        if ((await this.getPath()).length > 0)
            return true;
        return false;
    }
    /**
     * Removes the current role from the realtime DB and all associated candidatures.
     * @returns None
     */
    public async remove() {
        if (!(await this.exists()))
            return 1;
        removeObjectAtPath(await this.getPath());
        return 0;
    }
    /**
     * Edits the name and open status of the current Role object.
     * @param {string} [name=this._name] - The new name for the Role object.
     * @param {boolean} [open=this._open] - The new open status for the Role object.
     * @returns None
     */
    public async edit(open: boolean = this._open) {
        if(!(await this.exists()))
            return -1;
        this._open = open;
        replaceData((await this.getPath()), this);
        return 0;
    }
    /**
     * Adds the current Role object to the database if it does not already exist.
     * @returns None
     */
    public async add() {
        if (!(await this.exists())){
            appendToDatabase(this, "/Roles", this._name.replace('/', '_'));
            return 0;
        }
        return 1;
    }
 }
 /**
  * Retrieves all roles from the Firebase Realtime Database.
  * @returns {Promise<Role[]>} A promise that resolves to an array of Role objects.
  * @throws {Error} If there is an error fetching the roles from the database.
  */
 export async function getAllRoles(): Promise<Role[]> {
	const database = realtimeDB;
	try {
		const snapshot = await database.ref("/Roles").once("value");
		const rolesData = snapshot.val();
		const roles: Role[] = [];
		for (const roleId in rolesData) {
			const role = rolesData[roleId];
			roles.push(role);
		}
		return roles.map((r)=>new Role(r._name,r._open));
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch roles from database.");
	}
}
/**
 * Retrieves all open roles from the database.
 * @returns {Promise<Array<Role>>} - A promise that resolves to an array of Role objects that are open.
 */
export async function getOpenRoles() {
    let roles = await getAllRoles();
    return roles.filter((role)=> role._open===true);
}
/**
 * retrieves all closed roles from the database.
 * @returns {Promise<Array<Role>>} - A promise that resolves to an array of closed roles.
 */
export async function getClosedRoles() {
    let roles = await getAllRoles();
    return roles.filter((role)=> role._open===false);
}