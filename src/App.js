import React, { useState } from "react";
import JobList from "./JobList";
import jobsDB from './tempJobsDB'

let App = function () {
    const [jobs] = useState(jobsDB);
    return (
        <JobList jobs={jobs} />
    );
};

export default App;
