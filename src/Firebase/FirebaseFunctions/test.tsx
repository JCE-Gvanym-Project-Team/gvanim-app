import { auth } from "firebase-functions/v1";
import { isConnected, loginAdmin, loginRecruiter, loguotRecruiter } from "./Authentication";
import { Candidate, generateCandidateId, getFilteredCandidates } from "./Candidate";
import { Job, generateJobNumber, getFilteredJobs } from "./Job";
import { Recruiter, generateRandomString } from "./Recruiter";
import { getFileExtensionsInFolder, uploadFileToFirestore } from "./firestoreFunc";
import { Sector } from "./Sector";
import { CandidateJobStatus, getMessage, allStatus, getFilteredCandidateJobStatuses } from "./CandidateJobStatus";
import { convertTypeAcquisitionFromJson } from "typescript";
export function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function createTextFile(name: string, content: string): File {
    const textFile = new File([content], name + ".txt", { type: "text/plain" });
    return textFile;
}

async function testSingleJobAddNoConfilct(): Promise<boolean> {
    const jobNumber = await generateJobNumber();
    const title = generateRandomString();
    const role = generateRandomString();
    const scope = [50, 100];
    const region = generateRandomString();
    const sector: string = generateRandomString();
    const description = [generateRandomString()];
    const requirements = generateRandomString();
    const open = true;
    const highPriority = false;
    const job = new Job(jobNumber, title, role, scope, region, sector, description, requirements, open, highPriority);
    job.add();
    await sleep(1000);
    const status = await job.exists();
    job.remove();
    return status;
}
async function testSingleJobAddConfilct(): Promise<boolean> {
    const jobNumber = await generateJobNumber();
    const title = generateRandomString();
    const role = generateRandomString();
    const scope = [50, 100];
    const region = generateRandomString();
    const sector: string = generateRandomString();
    const description = [generateRandomString()];
    const requirements = generateRandomString();
    const open = true;
    const highPriority = false;
    const job1 = new Job(jobNumber, title, role, scope, region, sector, description, requirements, open, highPriority);
    const job2 = new Job(jobNumber, title, role, scope, region, sector, description, requirements, open, highPriority);
    job1.add();
    job2.add();
    await sleep(1000);
    const status = (await getFilteredJobs()).length === 1;
    job1.remove();
    job2.remove();
    return status;
}
async function testGenerateJobNumber() {
    let ids: Array<number> = [];
    for (let i = 0; i < 100; i++) {
        let jobNumber = await generateJobNumber();
        let title = generateRandomString();
        let role = generateRandomString();
        let scope = [50, 100];
        let region = generateRandomString();
        let sector: string = generateRandomString();
        let description = [generateRandomString()];
        let requirements = generateRandomString();
        let open = true;
        let highPriority = false;
        let job = new Job(jobNumber, title, role, scope, region, sector, description, requirements, open, highPriority);
        job.add();
        ids.push(jobNumber);
        await sleep(100);
    }
    const status = (ids.length === Array.from(new Set(ids)).length)
    for (let i = 0; i < ids.length; i++) {
        let job = new Job(ids[i])
        job.remove()
    }
    return status;
}
async function testJobEditNoConflict() {
    const jobNumber = await generateJobNumber();
    const title = 'lastTitle';
    const role = generateRandomString();
    const scope = [50, 100];
    const region = generateRandomString();
    const sector: string = generateRandomString();
    const description = [generateRandomString()];
    const requirements = generateRandomString();
    const open = true;
    const highPriority = false;
    const job = new Job(jobNumber, title, role, scope, region, sector, description, requirements, open, highPriority);
    job.add();
    await sleep(100);
    const newTitle = "newTitle";
    let titleTest;
    let editedJob;
    job.edit(newTitle);
    while (newTitle !== titleTest) {
        editedJob = (await getFilteredJobs(["jobNumber"], [job._jobNumber.toString()])).at(0);
        titleTest = editedJob?._title;
    }
    const status = editedJob._title === newTitle;
    job.remove()
    return status;
}
async function testJobRemove() {
    let cands = Array<Candidate>;
    for (let i = 0; i < 10; i++) {

    }
}
async function testAddSingleCandidateNoConflict() {
    let firstName = generateRandomString();
    let lastName = generateRandomString();
    let phone = "0501234567";
    let email = "aaaaa@gmail.com";
    let newCand = new Candidate(firstName, lastName, phone, email);
    newCand.add();
    await sleep(1000);
    const status = await newCand.exists();
    await sleep(1000);
    newCand.remove()
    return status;
}
async function testEditCandidate() {
    const firstName = "el";
    const lastName = "ta";
    const mail = "cand@gmail.com";
    const phone = "0501234567";
    const rating = -1;
    const note = "note content";
    const cand = new Candidate("28", firstName, lastName, phone, mail, rating, note);
    //const CV = createTextFile("test","this is test file");
    //uploadFileToFirestore(CV,"keep/it","newName.txt");
    //await cand.uploadCv(CV);
    //console.log(await cand.getCvUrl());
    //await loginAdmin();
    //await cand.edit("newName");
    let d = new Date();
   // console.log(d.getDate());
}
async function testAddRecruiterNoSectors() {
    await loginAdmin();
    let rec = new Recruiter("ex@gmail.com", "el", "ta");
    await rec.add('123456');
    const status = await rec.exists();
    await rec.remove();
    return status;
}
async function testLoginRecruiter() {
    await loginAdmin();
    let rec = new Recruiter("ex@gmail.com", "el", "ta");
    await rec.add('123456');
    await loguotRecruiter();
    await loginRecruiter("ex@gmail.com", "123456");
    const status = await isConnected();
    await loguotRecruiter();
    await rec.remove();
    return status;
}
async function testEditRecruiter() {
    await loginAdmin();
    let rec = new Recruiter("ex@gmail.com", "el", "ta");
    await rec.add('123456');
    rec.edit("new","name");
}
async function testMessgaeFormat() {
    let cand = new Candidate("73645","דוג","מה");
    let job = new Job(45,"כותרת");
    let rec = new Recruiter("re@gmil.com","גברת","גוונים");
    console.log(getMessage(cand, job, rec, allStatus[6],new Date(),"מיקום כלשהו"));
}
async function testGetRecomendationsUrl() {
    await loginAdmin();
    let lastCand = new Candidate("44");
    let lastJob = new Job(105);
    await lastCand.remove();
    await lastJob.remove();
    const candId = await generateCandidateId();
    const jobId = await generateJobNumber();
    let cand = new Candidate(candId,"","",generateRandomString(),generateRandomString());
    let job = new Job(jobId);
    await cand.add();
    await job.add();
    await cand.apply(jobId,"");
    let sLocal = new CandidateJobStatus(jobId, candId);
    while(!(await sLocal.exists()));
    let s = (await getFilteredCandidateJobStatuses(["candidateId","jobNumber"],[candId,jobId.toString()]))[0];
    console.log(s); 
    let f = new File([],"uevwuv.pdf");
    await sleep(5000);
    if(s===undefined){
        await cand.remove();
        await job.remove();
        console.log('s is undefined');
        return;
    }
    await s.addRecomendation("aziz","0501234567","ex@gmail.com", f);
    console.log(s); 
    s = (await getFilteredCandidateJobStatuses(["candidateId","jobNumber"],[candId,jobId.toString()]))[0];
    console.log(s);
    console.log(await s.getRecomendationsUrl());
    cand.remove();
    job.remove();
}
async function testGetCvUrl() {
    await loginAdmin();
    let cand = new Candidate("53");
    console.log((await cand.getCvUrl()));
}
export async function main() {
    //console.log(`testSingleJobAddNoConfilct(): ${await testSingleJobAddNoConfilct()}`);
    //console.log(`testSingleJobAddConfilct(): ${await testSingleJobAddConfilct()}`);
    //console.log(`testGenerateJobNumber(): ${await testGenerateJobNumber()}`);
    //console.log(`testJobEditNoConfilct(): ${await testJobEditNoConflict()}`);
    //console.log(`testAddSingleCandidateNoConflict(): ${await testAddSingleCandidateNoConflict()}`);
    //console.log(`testAddRecruiterNoSectors(): ${await testAddRecruiterNoSectors()}`);
    //console.log(`testLoginRecruiter(): ${await testLoginRecruiter()}`);
    //testEditRecruiter();
    //testMessgaeFormat();
    //testGetRecomendationsUrl();
    //testGetCvUrl();
}