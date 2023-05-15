information about database function:
all the function and class you can use is exported from:
"src/Firebase/FirebaseFunctions/functionIndex.tsx"
so if you need the class "Job" and the function "getOpenRoles()" write at top of your component file: import { Job, getOpenRoles } from "path-from-your-file-to-functionIndex";//without '.tsx'  
the databases store 4 class of object:
Job, Candidate, CandidatesJobStatus and Recruiter.
all the class have the function:
    add() - add a new object to database, make sure to pass the required arguments at required order
    remove() - remove the object from database
    edit() - pass argument only to attributes you want to change leave empty for no change
    example of use:
        // create objects
        let job1 = new Job((await generateJobNumber()),"title1", "role1", [50, 100], "tel-aviv", "tel-aviv-meguorim", "desc1", "req1", true, false);
	    let job2 = new Job((await generateJobNumber()),"title2", "role2", [25, 50], "jerusalem", "jerusalem-soldier", "desc2", "req2", false, false);
	    //add to DB
        job1.add();
	    job2.add();
        // remove from DB
	    job1.remove();
        
you can get an Array of Job, Candidate, CandidatesJobStatus and Recruiter.
    syntax: getFiltered<type>s(string[], string[], attributes);
    how to pass arguments?
        first argument(optionally):
            array of strings, send attributes name you want to filter by
        second arguments(optionally):
            array of strings, send the value you want to filter by, make sure to send the value at the same order of attributes name was passed
        third argument(optionally):
            choose an attribute to sort by

    example of use:
        // get an array of all jobs in data base
        let allJobs = await getFilteredJobs(); 
        // apply filter and sort
        let openJobs = await getFilteredJobs(["open"],["true"], "creationDate");
        // apply multiple filters and sort
        let openAndPsycholog = await getFilteredJobs(["role","open"],["Psycholog","true"], "creationDate");