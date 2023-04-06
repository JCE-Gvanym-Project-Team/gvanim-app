import React, { useState } from "react";
import JobList from "./PageElements/JobList";
import jobsDB from './tempJobsDB'
import Navbar from "./PageElements/Navbar";
import HomePage from "./PageElements/HomePage";

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
