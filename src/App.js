import React, { useState } from "react";
import { HomePage, JobList, Navbar } from './Components'
import jobsDB from './tempJobsDB'

let App = function () {
    const [jobs] = useState(jobsDB);
    return (
        <>
            <Navbar />
            <HomePage />
            <JobList jobs={jobs} />
        </>
    );
};

export default App;
