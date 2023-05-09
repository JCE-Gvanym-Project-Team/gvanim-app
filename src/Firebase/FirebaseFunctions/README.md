information about database function:
the databases store 4 class of object:
Job, Candidate, CandidatesJobStatus and Recruiter.
all the class have the function:
    add() - add a new object to database, make sure to pass the required arguments at required order
    remove() - remove the object from database
    edit() - pass argument only to attributes you want to change leave empty for no change
    example of use:
        import { Job } from "src/Firebase/FirebaseFunction/Job";
        //create object
        let job = new Job("title-example","role-example",[50,100],"region-example","sector-example",
						"description-example","requirement-example",true, false);
        //add the object to the database
        job.add()
        //edit the attributes description, requuirments, open and highPriority. update the database  
        job.edit("","",[],"","","new-description","new-reqruirments",false,true); 
        //remove the object from database
        job.remove()
you can get an Array of Job, Candidate, CandidatesJobStatus and Recruiter.
    syntax: getFiltered<type>s(string[], string[], attributes);
    how to pass arguments?
        first argument(optionally):
            array of string, send attributes name you want to filter by
        second arguments(optionally):
            array of string, send the value you want to filter by, make sure to send the value at the same order of attributes name was passed
        third argument(optionally):
            choose an attribute to sort by

    example of use:
        import { getFilteredJobs } from "src/Firebase/FirebaseFunction/Job";
        // get an array of all jobs in data base
        let allJobs = await getFilteredJobs(); 
        // apply filter and sort
        let openJobs = await getFilteredJobs(["open"],["true"], "creationDate");
        // apply multiple filters and sort
        let openAndPsycholog = await getFilteredJobs(["role","open"],["Psycholog","true"], "creationDate");