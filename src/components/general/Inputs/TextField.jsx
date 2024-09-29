import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";

const TextInput = ({ label, input, classes, meta, type, sx, ...custom }) => {
  return (
    <TextField
      error={meta.touched ? meta.invalid : null}
      fullWidth
      helperText={meta.touched ? meta.error : null}
      label={label}
      placeholder={label}
      {...input}
      {...custom}
      sx={sx}
      type={type}
    />
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object,
};

TextInput.defaultProps = {
  label: "",
  placeholder: "Enter your text",
  classes: {},
  meta: {},
  input: {},
  custom: {},
  sx: {},
};

export default TextInput;
