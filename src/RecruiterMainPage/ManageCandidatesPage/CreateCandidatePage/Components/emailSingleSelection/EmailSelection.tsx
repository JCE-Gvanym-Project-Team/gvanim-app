import
  {
    FormControl,
    FormHelperText,
    OutlinedInput,
    Stack,
  } from "@mui/material";
import * as React from "react";

interface EmailInputProps {
  email: string;
  setEmail: (email: string) => void;
  error: boolean;
  setError: (error: boolean) => void;
  formSubmitted: boolean;
}

export default function EmailInput(props: EmailInputProps) {
  const { email, setEmail, error, setError, formSubmitted } = props;

  // useState to keep track of the local part and domain
  const [localPart, setLocalPart] = React.useState("");
  const [domainPart, setDomainPart] = React.useState("");

  const handleLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalPart(newValue);
  };

  const handleDomainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setDomainPart(newValue);
  };

  React.useEffect(() => {
    if (localPart && domainPart) {
      setEmail(localPart + "@" + domainPart);
      setError(false);
    } else {
      setError(true);
    }
  }, [localPart, domainPart]);

  return (
    <div>
      <FormControl variant="outlined">
        <Stack direction="row" spacing={1}>
          <OutlinedInput
            sx={{
              width: "50%",
              "& .MuiOutlinedInput-input": {
                font: "small-caption",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "0.375rem",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7795f8",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4A90E2",
                borderWidth: "2px",
              },
            }}
            size="small"
            value={domainPart}
            placeholder="Gmail.com"
            error={formSubmitted && !domainPart}
            onChange={handleDomainChange}
          />
          <span>@</span>
          <OutlinedInput
            value={localPart}
            onChange={handleLocalChange}
            error={formSubmitted && !localPart}
            placeholder="username"
            sx={{
              width: "50%",
              "& .MuiOutlinedInput-input": {
                font: "small-caption",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "0.375rem",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#7795f8",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#4A90E2",
                borderWidth: "2px",
              },
            }}
            size="small"
          />
        </Stack>
        <FormHelperText
          hidden={!formSubmitted || !error}
          error={error}
          style={{
            color: "#ef5350",
            marginRight: 0,
            marginTop: 0,
          }}
        >
          זהו שדה חובה.
        </FormHelperText>
      </FormControl>
    </div>
  );
}
