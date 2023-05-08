import { getFilteredJobs } from "./DBfuncs";

export class Job {
	public _title: string;
	public _jobNumber: number;
	public _role: string;
	public _scope: Array<number>;
	public _region: string;
	public _sector: string;
	public _description: string;
	public _requirements: string;
	public _open: boolean;
	public _highPriority: boolean;
	public _views: number;
	public _creationDate: Date

	constructor(
		title: string = "",
		role: string = "",
		scope: Array<number> = [0, 0],
		region: string = "",
		sector: string = "",
		description: string = "",
		requirements: string = "",
		open: boolean = true,
		highPriority: boolean = false,
		views: number = 0,
		jobNumber = -1,
	) {
		this._title = title;
		this._role = role;
		this._scope = scope;
		this._region = region;
		this._sector = sector;
		this._description = description;
		this._requirements = requirements;
		this._open = open;
		this._highPriority = highPriority;
		this._views = views;
		this._creationDate = new Date();
		this._jobNumber = jobNumber;
		if (jobNumber === -1)
			this.get_job_number().then((num) => this._jobNumber = num);
	}
	private async get_job_number(): Promise<number> {
		const jobs = await getFilteredJobs();
		const len = jobs.length;
		const jobNumber: number[] = jobs.map((job) => job._jobNumber);
		const min = 10; // minimum number in range
		const max = len + 100; // maximum number in range
		let num = Math.floor(Math.random() * (max - min + 1)) + min; // generates a random number between 1 and 10
		while (jobs.some(job => job._jobNumber === num)) {
			num = Math.floor(Math.random() * (max - min + 1)) + min;
		}
		return num;
	}
}
export class Candidate {
	public _id: string;
	public _firstName: string;
	public _lastName: string;
	public _phone: string;
	public _eMail: string;
	public _generalRating: number;

	constructor(firstName: string = "", lastName: string = "", phone: string = "", eMail: string = "", generalRating: number = -1) {
		this._id = eMail + phone;
		this._firstName = firstName;
		this._lastName = lastName;
		this._phone = phone;
		this._eMail = eMail;
		this._generalRating = generalRating;
	}
}
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
		recomendations: Array<Recomendation>=[]
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
export class Recruiter {
	public _userName: string;
	public _firstName: string;
	public _lastName: string;
	public _sectors: Array<string>;

	constructor(userName: string = "", firstName: string = "", lastName: string = "", sectors: Array<string> = []) {
		this._userName = userName;
		this._firstName = firstName;
		this._lastName = lastName;
		this._sectors = sectors;
	}
}
export class Recomendation{
	public _fullName: string;
	public _phone: string;
	public _eMail: string;
	public _recomendation: string;

	constructor(fullName: string, phone: string, eMail: string, recomendation: string){
		this._fullName=fullName;
		this._phone=phone;
		this._eMail=eMail;
		this._recomendation=recomendation;
	}
}