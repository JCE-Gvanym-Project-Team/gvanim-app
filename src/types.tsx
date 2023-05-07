import { getJobsFromDatabase } from "./DBfuncs";

export class Job {
	private _title: string;
	private _jobNumber: number;
	private _role: string;
	private _scope: Array<number>;
	private _region: string;
	private _sector: string;
	private _description: string;
	private _requirements: string;
	private _open: boolean;
	private _highPriority: boolean;
	private _views: number;

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
		this._jobNumber = jobNumber;
		if (jobNumber === -1)
			this.get_job_number().then((num) => this._jobNumber = num);
	}

	// Getters
	get title(): string {
		return this._title;
	}

	get jobNumber(): number {
		return this._jobNumber;
	}

	get role(): string {
		return this._role;
	}

	get scope(): Array<number> {
		return this._scope;
	}

	get region(): string {
		return this._region;
	}

	get sector(): string {
		return this._sector;
	}

	get description(): string {
		return this._description;
	}

	get requirements(): string {
		return this._requirements;
	}

	get open(): boolean {
		return this._open;
	}

	get high_priority(): boolean {
		return this._highPriority;
	}

	get views(): number {
		return this._views;
	}

	// Setters
	set title(value: string) {
		this._title = value;
	}

	set role(value: string) {
		this._role = value;
	}

	set scope(value: Array<number>) {
		this._scope = value;
	}

	set region(value: string) {
		this._region = value;
	}

	set sector(value: string) {
		this._sector = value;
	}

	set description(value: string) {
		this._description = value;
	}

	set requirements(value: string) {
		this._requirements = value;
	}

	set open(value: boolean) {
		this._open = value;
	}

	set high_priority(value: boolean) {
		this._highPriority = value;
	}

	set jobNumber(value: number) {
		this._jobNumber = value;
	}

	set views(value: number) {
		this._views = value;
	}

	private async get_job_number(): Promise<number> {
		const jobs = await getJobsFromDatabase();
		const len = jobs.length;
		const jobNumber: number[] = jobs.map((job) => job.jobNumber);
		const min = 10; // minimum number in range
		const max = len + 100; // maximum number in range
		let num = Math.floor(Math.random() * (max - min + 1)) + min; // generates a random number between 1 and 10
		while (jobs.some(job => job.jobNumber === num)) {
			num = Math.floor(Math.random() * (max - min + 1)) + min;
		}
		return num;
	}
}
export class Candidate {
	private _id: string;
	private _firstName: string;
	private _lastName: string;
	private _phone: string;
	private _eMail: string;
	private _generalRating: number;

	constructor(firstName: string = "", lastName: string = "", phone: string = "", eMail: string = "", generalRating: number = -1) {
		this._id = eMail + phone;
		this._firstName = firstName;
		this._lastName = lastName;
		this._phone = phone;
		this._eMail = eMail;
		this._generalRating = generalRating;
	}

	get id(): string {
		return this._id;
	}

	get firstName(): string {
		return this._firstName;
	}

	set firstName(value: string) {
		this._firstName = value;
	}

	get lastName(): string {
		return this._lastName;
	}

	set lastName(value: string) {
		this._lastName = value;
	}

	get phone(): string {
		return this._phone;
	}

	set phone(value: string) {
		this._phone = value;
		this._id = this._eMail + this._phone;
	}

	get eMail(): string {
		return this._eMail;
	}

	set eMail(value: string) {
		this._eMail = value;
		this._id = this._eMail + this._phone;
	}

	get generalRating(): number {
		return this._generalRating;
	}

	set generalRating(value: number) {
		this._generalRating = value;
	}
}
export class CandidateJobStatus {
	private _jobNumber: number;
	private _candidateId: string;
	private _status: string;
	private _matchingRate: number;
	private _applyDate: Date;
	private _lastUpdate: Date;
	private _interviewsSummery: Array<string>;

	constructor(
		jobNumber: number = -1,
		candidateId: string = "",
		status: string = "",
		matchingRate: number = -1,
		applyDate: Date = new Date(0, 0, 0),
		lastUpdate: Date = new Date(0, 0, 0),
		interviewsSummery: Array<string> = ["", ""]
	) {
		this._jobNumber = jobNumber;
		this._candidateId = candidateId;
		this._status = status;
		this._matchingRate = matchingRate;
		this._applyDate = applyDate;
		this._lastUpdate = lastUpdate;
		this._interviewsSummery = interviewsSummery;
	}

	get jobNumber(): number {
		return this._jobNumber;
	}

	set jobNumber(value: number) {
		this._jobNumber = value;
	}

	get candidateId(): string {
		return this._candidateId;
	}

	set candidateId(value: string) {
		this._candidateId = value;
	}

	get status(): string {
		return this._status;
	}

	set status(value: string) {
		this._status = value;
	}

	get matchingRate(): number {
		return this._matchingRate;
	}

	set matchingRate(value: number) {
		this._matchingRate = value;
	}

	get applyDate(): Date {
		return this._applyDate;
	}

	set applyDate(value: Date) {
		this._applyDate = value;
	}

	get lastUpdate(): Date {
		return this._lastUpdate;
	}

	set lastUpdate(value: Date) {
		this._lastUpdate = value;
	}

	get interviewsSummery(): Array<string> {
		return this._interviewsSummery;
	}

	set interviewsSummery(value: Array<string>) {
		this._interviewsSummery = value;
	}
	public link_job_candidate(job: Job, candidate: Candidate) {
		this._jobNumber = job.jobNumber;
		this.candidateId = candidate.id;
		this._status = 'הוגשה  מועמדות';
		this._applyDate = new Date();
		this._lastUpdate = new Date();
	}
}
export class Recruiter {
	private _userName: string;
	private _firstName: string;
	private _lastName: string;
	private _sectors: Array<string>;

	constructor(userName: string = "", firstName: string = "", lastName: string = "", sectors: Array<string> = []) {
		this._userName = userName;
		this._firstName = firstName;
		this._lastName = lastName;
		this._sectors = sectors;
	}

	get userName(): string {
		return this._userName;
	}

	set userName(value: string) {
		this._userName = value;
	}

	get firstName(): string {
		return this._firstName;
	}

	set firstName(value: string) {
		this._firstName = value;
	}

	get lastName(): string {
		return this._lastName;
	}

	set lastName(value: string) {
		this._lastName = value;
	}

	get sectors(): Array<string> {
		return this._sectors;
	}

	set sectors(value: Array<string>) {
		this._sectors = value;
	}
}