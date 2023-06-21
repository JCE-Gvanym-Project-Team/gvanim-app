import
  {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Typography,
  } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const PHONE_PREFIXES = ["050", "052", "053", "054", "057", "058"];

export default function PhoneNumberSelection(props: {
  phoneNumber: any;
  setPhoneNumber: any;
  error: any;
  setError: any;
  formSubmitted: boolean;
}) {
  const { phoneNumber, setPhoneNumber, error, setError, formSubmitted } = props;
  const [prefix, setPrefix] = useState("050");
  const [number, setNumber] = useState("");

  const handlePrefixChange = (event: SelectChangeEvent<string>) => {
    setPrefix(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNumber(newValue);
    if (newValue?.length !== 7) {
      setError(true);
    } else {
      setError(false);
      setPhoneNumber(prefix + newValue);
    }
  };

  useEffect(() => {
    if (formSubmitted && !number) {
      setError(true);
    }
  }, [formSubmitted, number, setError]);

  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      <Box sx={{ width: "11ch", mr: 1 }}>
        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            id="phone-number"
            value={number}
            placeholder="1234567"
            onChange={handleNumberChange}
            error={formSubmitted && error}
            sx={{
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
        </FormControl>
      </Box>
      <Typography variant="body1" component="span" sx={{ mx: 1 }}>
        -
      </Typography>
      <FormControl sx={{ width: "9ch" }}>
        <InputLabel id="phone-prefix-label"></InputLabel>
        <Select
          sx={{
            "& .MuiSelect-select": {
              font: "small-caption",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "0.375rem !important",
            },
            "& .MuiSvgIcon-root": {
              color: "#7795f8 !important",
            },
          }}
          size="small"
          value={prefix}
          onChange={handlePrefixChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
        >
          {PHONE_PREFIXES.map((prefix) => (
            <MenuItem key={prefix} value={prefix}>
              {prefix}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
