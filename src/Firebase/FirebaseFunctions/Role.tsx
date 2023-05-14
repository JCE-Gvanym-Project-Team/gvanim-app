import { realtimeDB } from "../FirebaseConfig/firebase";
import { removeObjectAtPath, getFirebaseIdsAtPath, replaceData, appendToDatabase } from "./DBfuncs";
 export class Role{
    public _name: string;
    public _open: boolean;
    constructor(name: string, open: boolean){
        this._name=name;
        this._open=open;
    }
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Roles')).includes(this._name))
            return "/Roles/" + this._name;
        return "";
    }
    public async exists() {
        if ((await this.getPath()).length > 0)
            return true;
        return false;
    }
    public async remove() {
        if (!(await this.exists()))
            return;
        removeObjectAtPath("/Roles/" + this._name);
    }
    public async edit(name: string = this._name, open: boolean = this._open) {
        this._name =name;
        this._open = open;
        if((await this.exists()))
            replaceData((await this.getPath()), this);
    }
    public async add() {
        if ((await this.exists()))
            appendToDatabase(this, "/Roles", this._name);
        else
            console.log("the Rloe already exists");
    }
 }
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
		return roles;
	} catch (error) {
		console.error(error);
		throw new Error("Failed to fetch roles from database.");
	}
}
export async function getOpenRoles() {
    let roles = await getAllRoles();
    return roles.filter((role)=> role._open===true);
}
export async function getClosedRoles() {
    let roles = await getAllRoles();
    return roles.filter((role)=> role._open===false);
}