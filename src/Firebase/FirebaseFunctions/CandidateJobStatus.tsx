import { dataref } from "../FirebaseConfig/firebase";
import { Recomendation } from './Recomendation';
import { getObjectAtPath, removeObjectAtPath, getFirebaseIdsAtPath, replaceData } from "./DBfuncs";
import { Candidate } from './Candidate';
import { Job } from './Job';
const database = dataref;
export class CandidateJobStatus{
    public _jobNumber: number;
    public _candidateId: string;
    public _status: string;
    public _about: string;
    public _matchingRate: number;
    public _applyDate: Date;
    public _lastUpdate: Date;
    public _interviewsSummery: Array<string>;
    public _recomendations: Array<Recomendation>;

    constructor(
        jobNumber: number = -1,
        candidateId: string = "",
        status: string = "",
        about:string="",
        matchingRate: number = -1,
        applyDate: Date = new Date(0, 0, 0),
        lastUpdate: Date = new Date(0, 0, 0),
        interviewsSummery: Array<string> = ["", ""],
        recomendations: Array<Recomendation> = []
    ) {
        this._jobNumber = jobNumber;
        this._candidateId = candidateId;
        this._status = status;
        this._matchingRate = matchingRate;
        this._applyDate = applyDate;
        this._lastUpdate = lastUpdate;
        this._interviewsSummery = interviewsSummery;
        this._about=about;
        this._recomendations = recomendations;
    }
    public async addRecomendation(fullName: string, phone: string, eMail: string, recomendation: string){
        if(this._recomendations.length>=10)
            return;
        if(this._recomendations.map((rec)=>rec._phone).includes(phone))
            return;
        this._recomendations.push(new Recomendation(fullName, phone, eMail, recomendation));
        replaceData((await getCandidateJobStatusPath(this._candidateId,this._jobNumber)),this);
    }
    public getNumOfInterviews(){
        return this._interviewsSummery.length;
    }
    public editInterviewSummery(summery: string, index: number){
        if(index>this.getNumOfInterviews())
            this._interviewsSummery.push(summery);
        else
            this._interviewsSummery[index]=summery;
    }
}
async function getCandidateJobStatusFromDatabase(): Promise<CandidateJobStatus[]> {
    try {
        const snapshot = await database.ref("/CandidatesJobStatus").once("value");
        const candidateJobStatusData = snapshot.val();
        const candidateJobStatuses: CandidateJobStatus[] = [];
        for (const candidateJobStatusId in candidateJobStatusData) {
            const candidateJobStatus = candidateJobStatusData[candidateJobStatusId];
            candidateJobStatuses.push(candidateJobStatus);
        }
        return candidateJobStatuses;
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch candidate job statuses from database.");
    }
}
export async function getCandidateJobStatusPath(candId: string, jobNumber: number){
    let firebaseId = "";
    let candidateIds = await getFirebaseIdsAtPath("/CandidatesJobStatus");
    candidateIds.forEach(async (id)=>{
        if(((await getObjectAtPath("/CandidatesJobStatus/"+id))._candidateId===candId)&& 
        ((await getObjectAtPath("/CandidatesJobStatus/"+id))._jobNumber===jobNumber)) 
            firebaseId = id;
    });
    return "/CandidatesJobStatus/"+firebaseId;
}
export async function removeCandidateJobStatus(candId: string="",jobNumber: number = -1){
    let candidateIds = await getFirebaseIdsAtPath("/CandidatesJobStatus");
    candidateIds.forEach(async (id)=>{
        if(((await getObjectAtPath("/CandidatesJobStatus/"+id))._candidateId===candId || candId==="")&& 
        ((await getObjectAtPath("/CandidatesJobStatus/"+id))._jobNumber===jobNumber || jobNumber===-1)) 
        removeObjectAtPath("/CandidatesJobStatus/"+id);
    });
}
export async function getFilteredCandidateJobStatuses(attributes: string[] = [], values: string[] = [], sortBy: string = "") {
    if (attributes.length !== values.length) {
        console.log("the attributes length not match to values length");
        return [];
    }

    let candidateJobStatuses = await getCandidateJobStatusFromDatabase();

    // filtering
    let i = attributes.indexOf("jobNumber");
    if (i >= 0) {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._jobNumber === Number(values[i])
        );
    }
    i = attributes.indexOf("candidateId");
    if (i >= 0) {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._candidateId === values[i]
        );
    }
    i = attributes.indexOf("status");
    if (i >= 0) {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._status === values[i]
        );
    }
    i = attributes.indexOf("matchingRate");
    if (i >= 0) {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._matchingRate === Number(values[i])
        );
    }
    i = attributes.indexOf("applyDate");
    if (i >= 0) {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._applyDate.toISOString() === values[i]
        );
    }
    i = attributes.indexOf("lastUpdate");
    if (i >= 0) {
        candidateJobStatuses = candidateJobStatuses.filter(
            (status) => status._lastUpdate.toISOString() === values[i]
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
    return candidateJobStatuses;
}
function sortByJobNumber(a: CandidateJobStatus, b: CandidateJobStatus): number {
    return a._jobNumber - b._jobNumber;
  }
  
  function sortByCandidateId(a: CandidateJobStatus, b: CandidateJobStatus): number {
    if (a._candidateId.toLowerCase() < b._candidateId.toLowerCase()) {
      return -1;
    }
    if (a._candidateId.toLowerCase() > b._candidateId.toLowerCase()) {
      return 1;
    }
    return 0;
  }
  
  function sortByStatus(a: CandidateJobStatus, b: CandidateJobStatus): number {
    if (a._status.toLowerCase() < b._status.toLowerCase()) {
      return -1;
    }
    if (a._status.toLowerCase() > b._status.toLowerCase()) {
      return 1;
    }
    return 0;
  }
  
  function sortByMatchingRate(a: CandidateJobStatus, b: CandidateJobStatus): number {
    return b._matchingRate - a._matchingRate;
  }
  
  function sortByApplyDate(a: CandidateJobStatus, b: CandidateJobStatus): number {
    return a._applyDate.getTime() - b._applyDate.getTime();
  }
  
  function sortByLastUpdate(a: CandidateJobStatus, b: CandidateJobStatus): number {
    return a._lastUpdate.getTime() - b._lastUpdate.getTime();
  }