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
  