import { Search } from "@mui/icons-material";
import { InputBase, styled, IconButton } from "@mui/material";
import React from "react"; // styled component
import CircularProgress from "@mui/material/CircularProgress";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 37,
  fontSize: 14,
  width: "100%",
  fontWeight: 500,
  padding: 0,
  paddingRight: "10px",
  borderRadius: "10px",
  backgroundColor: theme.palette.background.dark,
  caretColor: "#FFFFFF",
  boxShadow: "0 0 0 1px rgb(0 0 0 / 8%)",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
  "&::placeholder": {
    color: "#fff",
  },
  color: theme.palette.text.whiteOff,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "2px",
  height: "100%",
  paddingInline: "15px",
  background: theme.palette.background.lightGray,
  "&:hover": {
    background: theme.palette.background.lightGray,
  },
}));

const MobileSearchInput = (props) => {
  return (
    <StyledInputBase
      startAdornment={
        <StyledIconButton>
          <Search
            sx={{
              fontSize: 20,
              marginInline: "auto",
            }}
            color="#a0a2a7"
          />
        </StyledIconButton>
      }
      endAdornment={
        props?.loading ? <CircularProgress color="disabled" size={20} /> : null
      }
      {...props}
    />
  );
};

MobileSearchInput.propTypes = {};
MobileSearchInput.defaultProps = {};

export default MobileSearchInput;
