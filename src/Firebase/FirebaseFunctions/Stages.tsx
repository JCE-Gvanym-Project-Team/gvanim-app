import { realtimeDB } from "../FirebaseConfig/firebase";
import { removeObjectAtPath, getFirebaseIdsAtPath, replaceData, appendToDatabase } from "./DBfuncs";
 export class Satges{
    public _name: string;
    public _open: boolean;
    constructor(name: string, open: boolean){
        this._name=name;
        this._open=open;
    }
    public async getPath() {
        if ((await getFirebaseIdsAtPath('/Stages')).includes(this._name))
            return "/Stages/" + this._name;
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
        removeObjectAtPath("/Stages/" + this._name);
    }
    public async edit(name: string = this._name, open: boolean = this._open) {
        this._name =name;
        this._open = open;
        if((await this.exists()))
            replaceData((await this.getPath()), this);
    }
    public async add() {
        if ((await this.exists()))
            appendToDatabase(this, "/Stages", this._name);
        else
            console.log("the Stage already exists");
    }
 }