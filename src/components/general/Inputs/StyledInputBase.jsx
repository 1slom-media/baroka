import { Button, InputBase, styled } from "@mui/material";
import CopyOutlined from "components/icons/CopyOutlined";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";

export const StyledInput = styled(InputBase)(({ theme }) => ({
  fontSize: 14,
  width: "100%",
  fontWeight: 500,
  padding: "0 0 0 1rem",
  borderRadius: "10px",
  border: "1px solid rgba(0, 0, 0, 0.05)",
  background: theme.palette.background.dark,
  color: "white",
  marginBottom: "10px",
  "::placeholder": {
    color: "white",
  },
  "&:disabled": {
    color: "white",
  },
}));

export const StyledCopyButton = styled(Button)(({ theme }) => ({
  background: theme.palette.background.dark,
  color: theme.palette.background.lightGray,
  maxWidth: "42px",
  minWidth: "42px",
  maxHeight: "42px",
  minHeight: "42px",
  borderRadius: "10px",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,
  marginBottom: "10px",

  "&:hover": {
    background: "#DCE7F2",
  },
}));

const StyledInputBase = ({ uid }) => {
  const [copy, setCopy] = React.useState({
    value: `${process.env.NEXT_PUBLIC_BASE_URL}/oqim/${uid}`,
    copied: false,
  });

  const handleCopyStream = () => {
    setCopy({ ...copy, copied: true });
    toast.success("Nusxa olindi!");
  };

  React.useEffect(() => {
    setCopy({
      ...copy,
      value: `${process.env.NEXT_PUBLIC_BASE_URL}/oqim/${uid}`,
    });
  }, [uid]);
  return (
    <StyledInput
      id="outlined-basic"
      variant="outlined"
      size="medium"
      fullWidth
      value={`https://chegirma.com/oqim/${uid}`}
      disabled
      sx={{ height: 42 }}
    />
  );
};

export default StyledInputBase;
