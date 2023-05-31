import { Button } from "@mui/material";
import { Candidate, generateCandidateId, getFilteredCandidates } from "../../Firebase/FirebaseFunctions/Candidate";
import { useEffect } from "react";
import ViewCandidatesPage from "./ViewCandidatesPage/ViewCandidatesPage";
import { loginAdmin } from "../../Firebase/FirebaseFunctions/Authentication";

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

    return (
        <>
            <div>ManageCandidatesPage</div>
            <Button onClick={addCandidate}>asdasdasdsa</Button>
        </>
    )
}

const addCandidate = async () =>
{
    await loginAdmin();
    let id = await generateCandidateId()
    let newCandidate: Candidate = new Candidate(id, "דוג", "מה", "05123456", "dogma@gmail.com",1,"notes");
    let newCandidate2 = await getFilteredCandidates(["id"],["53"]);
    // await newCandidate2[0].add();
    await newCandidate2[0].apply(76, "abouttt");
    
}
