import React, { useState } from "react";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";

const DatePicer = () => {
  const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        minDate={new Date("2012-03-01")}
        maxDate={new Date("2023-06-01")}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        color="primary"
        sx={{ color: "text.white" }}
        renderInput={(props) => (
          <TextField
            {...props}
            size="small"
            sx={{ color: "#fff !important" }}
            helperText={null}
            fullWidth
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicer;
