import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Box,
  Typography,
} from "@mui/material";
import { useState } from "react";

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
}) {
  const { phoneNumber, setPhoneNumber, error, setError } = props;
  const [prefix, setPrefix] = useState("");
  const [number, setNumber] = useState("");

  const handlePrefixChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setPrefix(value);
    if (value?.length > 0 && error) {
      setError(false);
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setNumber(newValue);
    if (newValue?.length === 7 && !error && prefix?.length === 3) {
      setError(false);
      setPhoneNumber(prefix + newValue);
    } else {
      setError(true);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
      <Box sx={{ width: "11ch", mr: 1 }}>
        <FormControl variant="outlined" fullWidth>
          <OutlinedInput
            id="phone-number"
            value={number}
            placeholder="1234567"
            onChange={handleNumberChange}
            error={error}
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
                borderColor: "#4A90E2", // <-- Noticeable blue color when focused
                borderWidth: "2px", // <-- Increase border width when focused
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
            "& .muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.muirtl-jedpe8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
              {
                font: "small-caption",
              },
            "& .muirtl-1d3z3hw-MuiOutlinedInput-notchedOutline": {
              borderRadius: "0.375rem !important",
            },

            "& .muirtl-hfutr2-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#7795f8 !important",
            },
            "& .muirtl-bpeome-MuiSvgIcon-root-MuiSelect-icon": {
              color: "#7795f8 !important",
            },
          }}
          size="small"
          value={prefix}
          onChange={handlePrefixChange}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.toString()}
          error={error}
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
