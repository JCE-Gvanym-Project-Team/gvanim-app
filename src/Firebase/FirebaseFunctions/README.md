information about database function:<br />
all the function and class you can use is exported from:<br />
"src/Firebase/FirebaseFunctions/functionIndex.tsx"<br />
so if you need the class "Job" and the function "getOpenRoles()" write at top of your component file:<br /> import { Job, getOpenRoles } from "path-from-your-file-to-functionIndex";//without '.tsx'  <br />
the databases store 4 class of object:<br />
Job, Candidate, CandidatesJobStatus and Recruiter.<br />
all the class have the function:<br />
    add() - add a new object to database, make sure to pass the required arguments at required order<br />
    remove() - remove the object from database<br />
    edit() - pass argument only to attributes you want to change leave empty for no change<br />
    example of use:<br />
        // create objects<br />
        let job1 = new Job((await generateJobNumber()),"title1", "role1", [50, 100], "tel-aviv", "tel-aviv-meguorim", "desc1", "req1", true, false);<br />
	    let job2 = new Job((await generateJobNumber()),"title2", "role2", [25, 50], "jerusalem", "jerusalem-soldier", "desc2", "req2", false, false);<br />
	    //add to DB<br />
        job1.add();<br />
	    job2.add();<br />
        // remove from DB<br />
	    job1.remove();<br />
        <br />
you can get an Array of Job, Candidate, CandidatesJobStatus and Recruiter.<br />
    syntax: getFiltered<type>s(string[], string[], attributes);<br />
    how to pass arguments?<br />
        first argument(optionally):<br />
            array of strings, send attributes name you want to filter by<br />
        second arguments(optionally):<br />
            array of strings, send the value you want to filter by, make sure to send the value at <br />the same order of attributes name was passed<br />
        third argument(optionally):<br />
            choose an attribute to sort by<br />
<br />
    example of use:<br />
        // get an array of all jobs in data base<br />
        let allJobs = await getFilteredJobs(); <br />
        // apply filter and sort<br />
        let openJobs = await getFilteredJobs(["open"],["true"], "creationDate");<br />
        // apply multiple filters and sort<br />
        let openAndPsycholog = await getFilteredJobs(["role","open"],["Psycholog","true"], "creationDate");