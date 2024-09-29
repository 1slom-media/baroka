import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";

const GameRows = ({
  name,
  avatar,
  indx,
  soldOrderCount,
  phone,
  _id,
}) => {
  return (
    <StyledTableRow
      sx={{ "&:hover": { background: "#1b2530e0" }, cursor: "pointer" }}
    >
      <StyledTableCell align="left">#{indx + 1}</StyledTableCell>
      <StyledTableCell align="center">
        <Stack direction="row" gap="10px" alignItems="center">
          <Avatar src={avatar} alt="Foydalanuvchi vatari" />
          <Stack>
            <Typography variant="string">{name}</Typography>
          </Stack>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="center">{phone}</StyledTableCell>
      <StyledTableCell align="right">
        <Typography component="span" color="primary">
          {soldOrderCount}
        </Typography>{" "}
        dona sotilgan buyurtma
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default GameRows;
