import { Box, Button } from "@mui/material";
import { BoxGradientSx } from "../PageStyles";
import { Candidate, generateCandidateId, getFilteredCandidates } from "../../Firebase/FirebaseFunctions/Candidate";
import { loginAdmin } from "../../Firebase/FirebaseFunctions/Authentication";
import { getFilteredCandidateJobStatuses } from "../../Firebase/FirebaseFunctions/CandidateJobStatus";
import { useState } from "react";

export default function ManageCandidatesPage()
{
    const handleFileUpload = async (event) =>
    {
        const file = event.target.files[0];
        let johanson = (await getFilteredCandidateJobStatuses(["jobNumber", "candidateId"], ["32", "53"]))[0];
        await johanson.addRecomendation("Pog", "0444444", "mail@gail.com", file);
    };

    const handleCVUpload = async (event) => {
        const file = event.target.files[0];
        let johanson = (await getFilteredCandidates(["id"], ["53"]))[0];
        johanson.uploadCv(file);
    }

    const addCandidate = async () =>
    {
        await loginAdmin();
        let id = await generateCandidateId()
        let newCandidate: Candidate = new Candidate(id, "דוג", "מה", "05123456", "dogma@gmail.com", 1, "notes");
        let dogma = (await getFilteredCandidates(["id"], ["53"]))[0];
        dogma.apply(32,"abu");
        // await newCandidate.add();
        // newCandidate.apply(49, "ABOUT");
        // let newCandidate2 = await getFilteredCandidates(["id"],["53"]);
        // // await newCandidate2[0].add();
        // await newCandidate2[0].apply(49, "abouttt");

    }

    

    return (
        <>
            <Box sx={BoxGradientSx} />
            <div>hi</div>
            <Button onClick={addCandidate}>asdasdasdsa</Button>
            <Button
                variant="contained"
                component="label"
            >
                הוסף ממליץ
                <input
                    type="file"
                    hidden
                    onChange={handleFileUpload}
                />
            </Button>

            <Button
                variant="contained"
                component="label"
            >
                הוסף קו"ח
                <input
                    type="file"
                    hidden
                    onChange={handleCVUpload}
                />
            </Button>
        </>
    )
}

