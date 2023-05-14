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