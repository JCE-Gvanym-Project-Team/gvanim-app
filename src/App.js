import React, { useState } from "react";
import { HomePage, JobList, Navbar, Search } from './Components'

import jobsDB from './tempJobsDB'


let App = function () {
    const [jobs] = useState(jobsDB);
    return (
        <>
            <Navbar />
            <main>
                <HomePage />
                <Search num_of_jobs={jobs.length} />
                <JobList jobs={jobs} />
            </main>
        </>
    );
};

export default App;
