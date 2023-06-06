import { CandidateJobStatus } from "../CandidateJobStatus";
import { Job, getFilteredCandidateJobStatuses, getFilteredCandidates, getFilteredJobs } from "../functionIndex";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

export default async function CandidatesByFilters(status: string, timeOnStatus: string,
  sector: string, role: string, selectGarde: string, selectInterviewDate: string, startDate: Date, endDate: Date): Promise<any[]> {

  let _candidatesJobStatuses;

  if (status == 'בחר כל הסטטוסים') {
    _candidatesJobStatuses = await getFilteredCandidateJobStatuses();
  } else {
    _candidatesJobStatuses = await getFilteredCandidateJobStatuses(['status'], [status]);
  }

  // Create an array to store candidates with the specified rejection cause
  const promises: Promise<any>[] = [];

  for (let i = 0; i < _candidatesJobStatuses.length; i++) {
    let candidate_job_status = _candidatesJobStatuses[i];
    if (
      dayjs(candidate_job_status._applyDate).isBetween(dayjs(startDate), dayjs(endDate), null, '[]')
    ) {
      let job = (
        await getFilteredJobs(['jobNumber'], [candidate_job_status._jobNumber.toString()])
      ).at(0);

      if (
        job != undefined &&
        (job._role === role || role === 'כל התפקידים') &&
        (job._sector === sector || sector === 'כל הארץ')
      ) {
        const lastUpdate = new Date(candidate_job_status._lastUpdate); // המניע יהיה אינדקס בסדרת המועמדים
        const currentTimestamp = new Date(2023, 6, 5); // תאריך הנוכחי
        const differenceInMilliseconds = Math.abs(
          currentTimestamp.getTime() - lastUpdate.getTime()
        );

        const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000; // מילישניות בשבוע
        const millisecondsInMonth = 30 * 24 * 60 * 60 * 1000; // מילישניות בחודש

        let promise = helperFilteredCandidate(candidate_job_status, job, role, sector, status, differenceInMilliseconds, selectGarde, selectInterviewDate);

        if (timeOnStatus === 'שבוע' && differenceInMilliseconds <= millisecondsInWeek)
          promises.push(promise);
        else if (timeOnStatus === 'חודש' && differenceInMilliseconds <= millisecondsInMonth)
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
  timeOnStatus:number, selectGarde: string, selectInterviewDate: string) {
  
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
    filteredCandidate["זמן שעבר משינוי הסטטוס"] = timeOnStatus/(24 * 60 * 60 * 1000); // Convert milliseconds to days

  if (selectGarde === "yes")
    filteredCandidate["ציון המועמד"] = candidate_job_status._matchingRate;

  if (selectInterviewDate === "yes" ){
    const interviewDate = new Date(candidate_job_status._interviewDate);
    if (interviewDate instanceof Date && !isNaN(interviewDate.getTime()) && interviewDate.getTime() !== new Date().getTime()) 
      filteredCandidate["תאריך הראיון"] = interviewDate;
    else 
        filteredCandidate["תאריך הראיון"] = "לא נקבע";
  }

  return filteredCandidate;
}






