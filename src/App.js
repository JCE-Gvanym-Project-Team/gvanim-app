import React, { useState } from "react";
import JobList from "./PageElements/JobList";
import jobsDB from './tempJobsDB'
import Navbar from "./PageElements/Navbar";

let App = function () {
    const [jobs] = useState(jobsDB);
    return (
        <>
            <Navbar />
            <JobList jobs={jobs} />
        </>
    );
};

export default App;
