import React from "react";
import Job from "./Job";
import Job2 from './Job';
import './Jobs.css'

export default function JobList({ jobs }) {
    return (
        <div id="jobListContainer">
            {jobs.map(job => {
                return <Job2 job={job} key={job.id} />
            })}
        </div>
    );
}
