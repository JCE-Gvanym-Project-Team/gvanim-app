import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Job, candidate} from "./interfaces";


admin.initializeApp(); // Initialize the Firebase Admin SDK

// Your getFilteredJobs function code goes here

// Export the Cloud Function
// ========================== Job =================================== //
export const getFilteredJobsCloudFunction = functions
  .region("europe-west1")
  .https
  .onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
      // Handle the preflight OPTIONS request
      response.status(204).send("");
      return;
    }
    try {
      const {attributes, values, sortBy} = request.body;
      const filteredJobs = await getFilteredJobs(attributes, values, sortBy);
      response.json(filteredJobs);
    } catch (error) {
      console.error("Error executing getFilteredJobs:", error);
      response.status(500).send("error occurred while executing the function.");
    }
  });
/**
 * Filters the list of jobs based on the given attributes and values,
 *  and sorts the result
 * @param {string[]} [attributes=[]] -
 * An array of attributes name to filter by.
 * @param {string[]} [values=[]] -
 * An array of values to filter by,
 * make sure the order of the values is correspond
 * to the order of attributes array.
 * sendd all values as string for boolean value use "true"
 * or "false" number as "123" and scope "50,100"
 * @param {string} [sortBy=""] - The attribute to sort the jobs by.
 * @return {Promise<Job[]>} -
 * A promise that resolves to an array of Job objects that match the
 * filter criteria and sorted by desired attribute.
 */
async function getFilteredJobs(
  attributes: string[] = [], values: string[] = [], sortBy = "")
  : Promise<Job[]> {
  if (attributes.length !== values.length) {
    console.log("the attributes length not match to values length");
    return [];
  }
  const jobsSnapshot = await admin.database().ref("Jobs/").once("value");
  const jobsData = jobsSnapshot.val();

  let jobs: Job[] = Object.values(jobsData).map((job: any) => ({
    _title: job._title,
    _jobNumber: job._jobNumber,
    _role: job._role,
    _scope: job._scope,
    _region: job._region,
    _sector: job._sector,
    _description: job._description,
    _requirements: job._requirements,
    _open: job._open,
    _highPriority: job._highPriority,
    _viewsPerPlatform: job._viewsPerPlatform,
    _applyPerPlatform: job._applyPerPlatform,
    _creationDate: job._creationDate,
    _startOn: job._startOn,
  }));
  // filtering
  let i = attributes.indexOf("jobNumber");
  if (i >= 0) {
    jobs = jobs.filter((job) => job._jobNumber.toString() === values.at(i));
  }
  i = attributes.indexOf("title");
  if (i >= 0) {
    jobs = jobs.filter((job) => job._title === values.at(i));
  }
  i = attributes.indexOf("role");
  if (i >= 0) {
    jobs = jobs.filter((job) => job._role === values.at(i));
  }
  i = attributes.indexOf("scope");
  if (i >= 0) {
    const scope = values[i].split(",").map((num) => parseInt(num));
    jobs = jobs.
      filter((job) =>
        parseInt(job._scope[0]) <= scope[0] ||
        scope[1] <= parseInt(job._scope[1]));
  }
  i = attributes.indexOf("description");
  if (i >= 0) {
    jobs = jobs.filter((job) => job._description.includes(values[i]));
  }
  i = attributes.indexOf("open");
  if (i >= 0) {
    jobs = jobs.filter((job) => job._open.toString() === values.at(i));
  }
  i = attributes.indexOf("highPriority");
  if (i >= 0) {
    jobs = jobs.filter((job) => job._highPriority.toString() === values.at(i));
  }
  i = attributes.indexOf("sector");
  if (i >= 0) {
    jobs = jobs.filter((job) => job._sector === values.at(i));
  }
  // sorting
  if (sortBy === "title") {
    return jobs.sort(compareByTitle);
  }
  if (sortBy === "jobNumber") {
    return jobs.sort(compareByJobNumber);
  }
  if (sortBy === "role") {
    return jobs.sort(compareByRole);
  }
  if (sortBy === "scope") {
    return jobs.sort(compareByScope);
  }
  if (sortBy === "region") {
    return jobs.sort(compareByRegion);
  }
  if (sortBy === "sector") {
    return jobs.sort(compareBySector);
  }
  if (sortBy === "open") {
    return jobs.sort(compareByOpen);
  }
  if (sortBy === "hightPriority") {
    return jobs.sort(compareByHighPriority);
  }
  if (sortBy === "creationDate") {
    return jobs.sort(compareByCreationDate);
  }
  if (sortBy === "views") {
    return jobs.sort(compareByViews);
  }
  return jobs;
}
/**
 * compare the candidate by title
 * @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByTitle(a: Job, b: Job): number {
  return a._title.localeCompare(b._title);
}
/**
 * compare the candidate by jobNumber
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByJobNumber(a: Job, b: Job): number {
  return a._jobNumber - b._jobNumber;
}
/**
 * compare the candidate by role
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByRole(a: Job, b: Job): number {
  return a._role.localeCompare(b._role);
}
/**
 * compare the candidate by scope(the max limit)
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByScope(a: Job, b: Job): number {
  return parseInt(a._scope[1]) - parseInt(b._scope[1]);
}
/**
 * compare the candidate by region
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByRegion(a: Job, b: Job): number {
  return a._region.localeCompare(b._region);
}
/**
 * compare the candidate by sector
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareBySector(a: Job, b: Job): number {
  return a._sector.localeCompare(b._sector);
}
/**
 * compare the candidate by open
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByOpen(a: Job, b: Job): number {
  if (b._open === a._open) {
    return 0;
  }
  if (b._open === true) {
    return 1;
  }
  return -1;
}
/**
 * compare the candidate by highPriority
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByHighPriority(a: Job, b: Job): number {
  if (b._highPriority === a._highPriority) {
    return 0;
  }
  if (b._highPriority === true) {
    return 1;
  }
  return -1;
}
/**
 * compare the candidate by total views
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByViews(a: Job, b: Job): number {
  let asum = 0;
  let bsum = 0;
  for (const [, value] of Array.from(a._viewsPerPlatform)) {
    asum += value;
  }
  for (const [, value] of Array.from(b._viewsPerPlatform)) {
    bsum += value;
  }
  return bsum - asum;
}
/**
 * compare the candidate by creation date
* @param {Job} [a] - the first job
 * @param {Job} [b] - the second job
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByCreationDate(a: Job, b: Job): number {
  if (b._creationDate > a._creationDate) {
    return 1;
  }
  if (b._creationDate < a._creationDate) {
    return -1;
  }
  return 0;
}
// ========================== Candidate =================================== //
export const getFilteredCandidatesCloudFunction = functions
  .region("europe-west1")
  .https
  .onRequest(async (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.set("Access-Control-Allow-Methods", "GET, POST");
    response.set("Access-Control-Allow-Headers", "Content-Type");
    if (request.method === "OPTIONS") {
      // Handle the preflight OPTIONS request
      response.status(204).send("");
      return;
    }
    try {
      const {attributes, values, sortBy} = request.body;
      const filteredCandidates = await getFilteredCandidates(attributes, values, sortBy);
      response.json(filteredCandidates);
    } catch (error) {
      console.error("Error executing getFilteredcandidates:", error);
      response.status(500).send("error occurred while executing the function.");
    }
  });
  async function getFilteredCandidates(
    attributes: string[] = [], values: string[] = [], sortBy = "")
    : Promise<candidate[]> {
    if (attributes.length !== values.length) {
      console.log("the attributes length not match to values length");
      return [];
    }
    const candidatesSnapshot = await admin.database().ref("Candidates/").once("value");
    const candsData = candidatesSnapshot.val();
  
    let candidates: candidate[] = Object.values(candsData).map((cand: any) => ({
      _id: cand._id,
      _firstName: cand._firstName,
      _lastName: cand._lastName,
      _phone: cand._phone,
      _eMail: cand._eMail,
      _generalRating: cand._generalRating,
      _note: cand._note
    }));
    // filtering
    let i = attributes.indexOf("id");
    if (i >= 0) {
      candidates = candidates.filter((cand) => cand._id === values.at(i));
    }
    i = attributes.indexOf("firstName");
    if (i >= 0) {
      candidates = candidates.filter((cand) => cand._firstName === values.at(i));
    }
    i = attributes.indexOf("lastName");
    if (i >= 0) {
      candidates = candidates.filter((cand) => cand._lastName === values.at(i));
    }
    i = attributes.indexOf("phone");
    if (i >= 0) {
      candidates = candidates.filter((cand) => cand._phone === values.at(i));
    }
    i = attributes.indexOf("eMail");
    if (i >= 0) {
      candidates = candidates.filter((cand) => cand._eMail === values.at(i));
    }
    i = attributes.indexOf("generalRating");
    if (i >= 0) {
      candidates = candidates.filter((cand) => cand._generalRating.toString() === values.at(i));
    }
    // sorting
    if (sortBy === "id") {
      return candidates.sort(compareById);
    }
    if (sortBy === "firstName") {
      return candidates.sort(compareByFirstName);
    }
    if (sortBy === "lastName") {
      return candidates.sort(compareByLastName);
    }
    if (sortBy === "phone") {
      return candidates.sort(compareByPhone);
    }
    if (sortBy === "eMail") {
      return candidates.sort(compareByEmail);
    }
    if (sortBy === "generalRating") {
      return candidates.sort(compareByGeneralRating);
    }
    return candidates;
  }

/**
 * compare the candidate by id
* @param {Candidate} [a] - the first candidate
 * @param {candidate} [b] - the second candidate
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareById(a: candidate, b: candidate): number {
  return parseInt(a._id)-parseInt(b._id);
}
/**
 * compare the candidate by first name
* @param {Candidate} [a] - the first candidate
 * @param {candidate} [b] - the second candidate
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByFirstName(a: candidate, b: candidate): number {
  return a._firstName.localeCompare(b._firstName);
}
/**
 * compare the candidate by last name
* @param {Candidate} [a] - the first candidate
 * @param {candidate} [b] - the second candidate
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByLastName(a: candidate, b: candidate): number {
  return a._lastName.localeCompare(b._lastName);
}
/**
 * compare the candidate by phone
* @param {Candidate} [a] - the first candidate
 * @param {candidate} [b] - the second candidate
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByPhone(a: candidate, b: candidate): number {
  return a._phone.localeCompare(b._phone);
}
/**
 * compare the candidate by eMail
* @param {Candidate} [a] - the first candidate
 * @param {candidate} [b] - the second candidate
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByEmail(a: candidate, b: candidate): number {
  return a._eMail.localeCompare(b._eMail);
}
/**
 * compare the candidate by general rating
* @param {Candidate} [a] - the first candidate
 * @param {candidate} [b] - the second candidate
 * @return {number} - positive if a>b negative if b>a else 0
 */
function compareByGeneralRating(a: candidate, b: candidate): number {
  return a._lastName.localeCompare(b._lastName);
}