import React, { useState } from "react";
import { HomePage, JobsSectionGrid, JobsSectionTable, Navbar, Search } from './Components'
import DBs from './tempJobsDB'
import Filters from "./Components/Filters/Filters";
import Sort from "./Components/Filters/Sort"

let App = function () {
    const [databases] = useState(DBs);
    const jobs = databases['jobsDB'];
    const locations = databases['locationsDB'];
    let display = "Grid";
    return (
        <>
            <Navbar />
            <main>
                <HomePage />
                {/* <Filters jobs={jobs} locations={locations} /> */}
                {((display) => {
                    if (display === "Grid"){
                        return <JobsSectionGrid jobs={jobs} locations={locations} />
                    }else if (display === "Table"){
                        return <JobsSectionTable/>
                    }
                })(display)}
                
            </main>
        </>
    );
};

export default App;
