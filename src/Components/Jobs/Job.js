import React from "react";
import './Jobs.css'

export default function Job({ job }) {
    return (
        <div class="job">
            <a class="jobTextContainer" href="/#">
                <a class="jobText" href="/#">
                    {job.description}.
                </a>
            </a>
            <p class="jobID">
                משרה מס' {job.id}
            </p>
            <div class="viewJobButtonContainer">
                <a class="viewJobButton" href="/#">לצפייה</a>
            </div>
        </div>
    );
}
