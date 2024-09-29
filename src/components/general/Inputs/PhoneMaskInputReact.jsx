import { Stack, Typography } from "@mui/material";
import React from "react";
import MaskedInput from "react-maskedinput";

const PhoneMaskInputReact = ({ input, meta, ...rest }) => {
  return (
    <Stack>
      <MaskedInput
        mask="+99811 111 11 11"
        name="phone"
        size="14"
        type="tel"
        style={{
          width: "100%",
          padding: "15px 10px",
          borderRadius: "4px",
          border: `1.3px solid ${
            meta?.touched && meta?.invalid ? "red" : "#000000"
          }`,
        }}
        {...input}
        {...rest}
      />
      <Stack>
        <Typography
          variant="caption"
          sx={{ fontWeight: 400 }}
          color="error.main"
        >
          {meta.touched ? meta.error : ""}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PhoneMaskInputReact;
