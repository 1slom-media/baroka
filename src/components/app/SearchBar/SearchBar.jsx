import React from "react";
import { Search } from "@mui/icons-material";
import { Stack, styled } from "@mui/material";
import SearchInput from "components/general/Inputs/SearchInput";

const StyledStackInput = styled(Stack)(({ theme }) => ({
  gap: "10px",
  boxShadow: "0px 4px 34px rgba(0, 0, 0, 0.05)",
  borderRadius: "5px",
  backgroundColor: theme.palette.primary.contrastText,
  marginTop: "20px",
  "& button": {
    borderRadius: "15px",
  },
}));

const SearchBar = ({ onSearch, query }) => {
  return (
    <StyledStackInput
      direction="row"
      alignItems="center"
      p={1}
      bgcolor="#fff"
      mb={3}
    >
      <SearchInput
        id="outlined-basic"
        variant="outlined"
        size="medium"
        fullWidth
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Qidirish..."
        endAdornment={<Search sx={{ marginRight: "8px" }} />}
        sx={{ padding: "10px 15px" }}
      />
    </StyledStackInput>
  );
};

export default SearchBar;
