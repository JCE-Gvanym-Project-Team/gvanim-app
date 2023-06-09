import { CandidateJobStatus } from "../CandidateJobStatus";
import { Job, getFilteredCandidateJobStatuses, getFilteredCandidates, getFilteredJobs } from "../functionIndex";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';


export default async function CandidatesByFilters(status: string, timeOnStatus: string,
  sector: string, role: string, selectGarde: string, selectInterviewDate: string, startDate: Date, endDate: Date): Promise<any[]> {
  let attributes: string[] = [];
  let values: string[] = [];

  if (role != "כל התפקידים") {
    attributes.push("role");
    values.push(role);
  }

  if (sector !== "כל האשכולות") {
    attributes.push("sector");
    values.push(sector);
  }

  if (status !== 'בחר כל הסטטוסים') {
    attributes.push("status");
    values.push(status);
  }

  let _candidatesJobStatuses = await getFilteredCandidateJobStatuses(attributes, values);
  // Create an array to store candidates with the specified rejection cause
  const promises: Promise<any>[] = [];

  for (let i = 0; i < _candidatesJobStatuses.length; i++) {
    let candidate_job_status = _candidatesJobStatuses[i];

    const creationDate = new Date(candidate_job_status._applyDate);
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    const checkTimestamp = creationDate.getTime();
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (checkTimestamp >= startTimestamp && checkTimestamp <= endTimestamp + oneDayInMilliseconds) {
      let job = (await getFilteredJobs(['jobNumber'], [candidate_job_status._jobNumber.toString()])).at(0);
      if (job === undefined)
        continue;

      const isSectorMatch = (job) => job._sector === sector || sector === 'כל האשכולות';
      const isRoleMatch = (job) => job._role === role || role === 'כל התפקידים';

      if (isSectorMatch(job) && isRoleMatch(job)) {
        const lastUpdate = new Date(candidate_job_status._lastUpdate);
        const currentDay = new Date();

        const differenceInMilliseconds = currentDay.getTime() - lastUpdate.getTime();
        if(differenceInMilliseconds < 0)
          continue;
        const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
        const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000;

        console.log(differenceInMilliseconds);
        console.log(millisecondsInWeek);
        console.log(timeOnStatus);

        let promise = helperFilteredCandidate(candidate_job_status, job, role, sector, status, differenceInMilliseconds, selectGarde, selectInterviewDate);
        if (timeOnStatus === 'עד שבוע' && differenceInMilliseconds <= millisecondsInWeek)
          promises.push(promise);
        else if (timeOnStatus === 'עד חודש' && differenceInMilliseconds <= millisecondsInMonth && differenceInMilliseconds >= millisecondsInWeek)
          promises.push(promise);
        else if (timeOnStatus == 'כל זמן')
          promises.push(promise);
      }
    }
  }

  const resultCandidate = await Promise.all(promises);
  return resultCandidate;
}



export async function helperFilteredCandidate(candidate_job_status: CandidateJobStatus, job: Job, role: string, sector: string, status: string,
  timeOnStatus: number, selectGarde: string, selectInterviewDate: string) {
  let candidate = (
    await getFilteredCandidates(['id'], [candidate_job_status._candidateId.toString()])
  ).at(0);

  let filteredCandidate: any = {
    "מספר משרה": candidate_job_status._jobNumber,
    "תז": candidate_job_status._candidateId,
    "שם פרטי": candidate?._firstName,
    "שם משפחה": candidate?._lastName,
    "מייל": candidate?._eMail,
    "פלאפון": candidate?._phone,
    "אזור המשרה": job._region
  };

  if (sector === "כל הארץ")
    filteredCandidate["אשכול"] = job._sector;

  if (role === "כל התפקידים")
    filteredCandidate["תפקיד"] = job._role;

  if (status === "בחר כל הסטטוסים")
    filteredCandidate["סטטוס"] = candidate_job_status._status;

  if (status != "נדחה" && status != 'התקבל')
    filteredCandidate["זמן שעבר משינוי הסטטוס"] = Math.floor(timeOnStatus / (24 * 60 * 60 * 1000)) + " יום";  // Convert milliseconds to days

  if (selectGarde === "yes") {
    if (candidate_job_status._matchingRate === -1)
      filteredCandidate["ציון המועמד"] = "עדיין לא נקבע ציון";
    else
      filteredCandidate["ציון המועמד"] = candidate_job_status._matchingRate;
  }

  if (selectInterviewDate === "yes") {
    const interviewDate = new Date(candidate_job_status._interviewDate);
    if (interviewDate instanceof Date && !isNaN(interviewDate.getTime()) && interviewDate.getTime() !== new Date().getTime())
      filteredCandidate["תאריך הראיון"] = interviewDate;
    else
      filteredCandidate["תאריך הראיון"] = "לא נקבע";
  }

  return filteredCandidate;
}
