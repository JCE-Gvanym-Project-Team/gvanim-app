import { dataref } from "../FirebaseConfig/firebase";
import { Recomendation } from './Recomendation';
import { Candidate } from './Candidate';
import { Job } from './Job';
const database = dataref;
export class CandidateJobStatus {
    public _jobNumber: number;
    public _candidateId: string;
    public _status: string;
    public _matchingRate: number;
    public _applyDate: Date;
    public _lastUpdate: Date;
    public _interviewsSummery: Array<string>;
    public _recomendations: Array<Recomendation>;

    constructor(
        jobNumber: number = -1,
        candidateId: string = "",
        status: string = "",
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
        this._recomendations = recomendations;
    }

    public link_job_candidate(job: Job, candidate: Candidate) {
        this._jobNumber = job._jobNumber;
        this._candidateId = candidate._id;
        this._status = 'הוגשה  מועמדות';
        this._applyDate = new Date();
        this._lastUpdate = new Date();
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