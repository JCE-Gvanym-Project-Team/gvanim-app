import React, { useState } from "react";
import { HomePage, JobsSection, Navbar, Search } from './Components'
import DBs from './tempJobsDB'
import Filters from "./Components/Filters/Filters";


let App = function () {
    const [databases] = useState(DBs);
    const jobs = databases['jobsDB'];
    const locations = databases['locationsDB'];
    return (
        <>
            <Navbar />
            <main>
                <HomePage />
                <Search num_of_jobs={jobs.length} />
                <Filters />
                {/* <JobsSection jobs={jobs} locations={locations} /> */}
            </main>
        </>
    );
};

export default App;
