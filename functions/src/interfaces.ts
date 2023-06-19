export interface Job {
  _title: string;
  _jobNumber: number;
  _role: string;
  _scope: string;
  _region: string;
  _sector: string;
  _description: string;
  _requirements: string;
  _open: boolean;
  _highPriority: boolean;
  _viewsPerPlatform: Map<string, number>;
  _applyPerPlatform: Map<string, number>;
  _creationDate: string;
  _startOn: string;
}
export interface candidate{
  _id: string;
  _firstName: string;
  _lastName: string;
  _phone: string;
  _eMail: string;
  _generalRating: number;
  _note: string;
}
export interface CandidateJobStatus {
  _jobNumber: number;
  _candidateId: string;
  _status: string;
  _about: string;
  _matchingRate: number;
  _applyDate: Date;
  _lastUpdate: Date;
  _interviewDate: Date;
  _interviewsSummery: Array<string>;
  _recomendations: Array<Recomendation>;
  _rejectCause: string;
}
interface Recomendation{
	_fullName: string;
	_phone: string;
	_eMail: string;
}
