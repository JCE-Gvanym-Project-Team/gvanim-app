import { Box, Button } from "@mui/material";
import { Candidate } from "../../Firebase/FirebaseFunctions/Candidate";
import { BoxGradientSx } from "../ManageJobsPage/ManageJobsPageStyle";

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

const addCandidate = () =>
{
    let newCandidate: Candidate = new Candidate("יוסי", "בוסי", "0566", "example2@gmail.com", 2);
    newCandidate.apply(35, "he's so good omg");
}
