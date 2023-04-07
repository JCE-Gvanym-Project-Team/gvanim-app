import React from "react";
import Job from "./Job";
import JobTwo from './JobTwo';
import './Jobs.css'

export default function JobList({ jobs }) {
    return (
        <div id="jobListContainer">
            {jobs.map(job => {
                return <Job job={job} key={job.id} />
            })}
        </div>
    );
}
