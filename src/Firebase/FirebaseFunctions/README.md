you can read this page in html format also (open README.html in your browser)
Database Function Information
=============================

Importing Classes and Functions
-------------------------------

All the functions and classes you can use are exported from the file `src/Firebase/FirebaseFunctions/functionIndex.tsx`. To import the `Job` class and the `getOpenRoles()` function, add the following import statement at the top of your component file:

import { Job, getOpenRoles } from "path-from-your-file-to-functionIndex";
  

Make sure to replace `"path-from-your-file-to-functionIndex"` with the actual path to the file, without the `.tsx` extension.

Object Classes in the Database
------------------------------

The database stores the following four classes of objects:

*   Job
*   Candidate
*   CandidatesJobStatus
*   Recruiter

Class Functions
---------------

All the classes have the following functions:

*   `add()`: Add a new object to the database. Make sure to pass the required arguments in the required order.
*   `remove()`: Remove the object from the database.
*   `edit()`: Pass arguments only to the attributes you want to change. Leave empty for no change.
*   `exists()`: check if object is stored in database

### Example Usage

Here's an example of how to create and manipulate objects of the `Job` class:

// Create objects
let job1 = new Job(await generateJobNumber(), "title1", "role1", \[50, 100\], "tel-aviv", "tel-aviv-meguorim", "desc1", "req1", true, false);
let job2 = new Job(await generateJobNumber(), "title2", "role2", \[25, 50\], "jerusalem", "jerusalem-soldier", "desc2", "req2", false, false);

// Add to the database
job1.add();
job2.add();

// Remove from the database
job1.remove();
  

Getting Objects from the Database
---------------------------------

You can retrieve an array of objects of a specific class from the database using the `getFiltered<type>s(string[], string[], attributes)` syntax.

### Argument Guidelines

*   First argument (optional): An array of strings representing attribute names for filtering.
*   Second argument (optional): An array of strings representing the values for filtering. Ensure the values are in the same order as the attribute names.
*   Third argument (optional): Choose an attribute to sort the results by.

### Example Usage

Here are some examples of retrieving filtered objects from the database:

  // Get an array of all jobs in the database
  let allJobs = await getFilteredJobs();
  
  // Apply a filter and sort the results
  let openJobs = await getFilteredJobs(\["open"\], \["true"\], "creationDate");
  
  // Apply multiple filters and sort the results
  let openAndPsycholog = await getFilteredJobs(\["role", "open"\], \["Psycholog", "true"\], "creationDate");
