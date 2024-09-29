import { Search } from "@mui/icons-material";
import { InputBase, styled, IconButton } from "@mui/material";
import React from "react"; // styled component

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 44,
  fontSize: 14,
  width: "100%",
  fontWeight: 500,
  padding: 0,
  borderRadius: "20px",
  color: theme.palette.grey[600],
  backgroundColor: theme.palette.background.input,
  border: "1px solid",
  borderColor: "rgba(86, 106, 127, 0.2)",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
  "::placeholder": {
    color: theme.palette.text.disabled,
  },
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

const SearchInput = (props) => {
  return (
    <StyledInputBase
      endAdornment={
        <StyledIconButton>
          <Search
            sx={{
              fontSize: 25,
              marginInline: "auto",
            }}
            color="primary"
          />
        </StyledIconButton>
      }
      {...props}
    />
  );
};

SearchInput.propTypes = {};
SearchInput.defaultProps = {};

export default SearchInput;
