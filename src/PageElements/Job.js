import React from "react";

export default function Job({ job }) {
    return (
        <div class="job">
            <div class="jobTextContainer">
                <a class="jobText" href="">
                    {job.description}.
                </a>
            </div>
            <p class="jobID">
                משרה מס' {job.id}
            </p>
            <div class="viewJobButtonContainer">
                <a class="viewJobButton">לצפייה </a>
            </div>
        </div>
    );
}
