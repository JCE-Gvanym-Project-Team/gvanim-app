import { Box, Button } from "@mui/material";
import { BoxGradientSx } from "../PageStyles";
import { Candidate, generateCandidateId, getFilteredCandidates } from "../../Firebase/FirebaseFunctions/Candidate";
import { loginAdmin } from "../../Firebase/FirebaseFunctions/Authentication";

export default function ManageCandidatesPage()
{

    return (
        <>
        <Box sx={BoxGradientSx} />
            <div>hi</div>
            <Button onClick={addCandidate}>asdasdasdsa</Button>
        </>
    )
}

const addCandidate = async () =>
{
    await loginAdmin();
    let id = await generateCandidateId()
    let newCandidate: Candidate = new Candidate(id, "דוג", "מה", "05123456", "dogma@gmail.com",1,"notes");
    await newCandidate.add();
    newCandidate.apply(49,"ABOUT");
    // let newCandidate2 = await getFilteredCandidates(["id"],["53"]);
    // // await newCandidate2[0].add();
    // await newCandidate2[0].apply(49, "abouttt");
    
}
