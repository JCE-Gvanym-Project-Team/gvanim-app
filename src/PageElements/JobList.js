import React from "react";
import Job from "./Job";

export default function JobList({ jobs }) {
    return (
        <div id="jobListContainer">
            {jobs.map(job => {
                return <Job job={job} key={job.id} />
            })}
        </div>
    );
}
