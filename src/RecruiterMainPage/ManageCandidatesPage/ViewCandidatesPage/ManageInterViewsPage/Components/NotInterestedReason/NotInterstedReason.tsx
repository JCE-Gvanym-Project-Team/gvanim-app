import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { CandidateJobStatus } from '../../../../../../Firebase/FirebaseFunctions/CandidateJobStatus';


const filter = createFilterOptions<string>();

export default function NotInterestedReason(props: { reasons: string[], candidateJobStatus: CandidateJobStatus | null })
{
    const { reasons } = props;
    const [value, setValue] = React.useState<string | null>(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () =>
    {
        setDialogValue("");
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        setValue(dialogValue);
        handleClose();
    };

    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onChange={(event, newValue) =>
                {
                    if (newValue && !reasons.includes(newValue.replace("אחר: ", "")))
                    {
                        toggleOpen(true);
                    }
                    if (newValue && newValue !== "")
                    {
                        setDialogValue(newValue);
                    }
                }}
                filterOptions={(options, params) =>
                {
                    const filtered = filter(options, params);

                    if (Object.keys(filtered).length === 0)
                    {
                        filtered.push("אחר: " + params.inputValue);
                    }

                    

                    return filtered;
                }}
                options={reasons}
                renderOption={(props, option) => <li {...props}>{option}</li>}
                sx={{ width: { xs: "100%", md: "50%" } }}
                renderInput={(params) => <TextField {...params} label="" />}
            />
        </React.Fragment>
    );
}