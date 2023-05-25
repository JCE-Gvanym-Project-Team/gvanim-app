import { Button } from "@mui/material";
import { Candidate } from "../../Firebase/FirebaseFunctions/Candidate";
import { useEffect } from "react";
import ViewCandidatesPage from "./ViewCandidatesPage/ViewCandidatesPage";

export default function ManageCandidatesPage(props: { setHomeActive: any, setReportsActive: any, setCandidatesActive: any, setJobsActive: any })
{
    const { setHomeActive, setReportsActive, setCandidatesActive, setJobsActive } = props;
    useEffect(() =>
    {
        // Code inside this effect will run after the component has rendered
        setHomeActive(false);
        setCandidatesActive(true);
        setReportsActive(false);
        setJobsActive(false);
    }, []);
    // // for the navigation bar
    // setHomeActive(false); setCandidatesActive(true);
    // setReportsActive(false); setJobsActive(false);
    // // ----------------------------

    return (
        <>
            <ViewCandidatesPage />
            <div>hi</div>
            <Button onClick={addCandidate}>asdasdasdsa</Button>
        </>
    )
}

const addCandidate = () =>
{
    let newCandidate: Candidate = new Candidate("example Candidate", "exmaple lastname", "055555555", "example@gmail.com", 4);
    newCandidate.add();
}
