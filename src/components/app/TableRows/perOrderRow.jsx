import { Chip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import React from "react";
import { getColor, getStatusText } from "utils/functions";

const PerOrderRow = ({ data }) => {
  const price =
    data?.orderItems[0]?.quantity * data?.orderItems[0]?.productId?.price;
  const count = data?.orderItems?.reduce((acc, curr) => acc + curr.quantity, 0);
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="text.primary">
          {data?.number}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Chip
          size="small"
          label={getStatusText(data?.status)}
          sx={{
            p: "0.25rem 0.5rem",
            fontSize: 12,
            color: !!getColor(data?.status)
              ? `${getColor(data?.status)}.900`
              : "inherit",
            backgroundColor: `${!!getColor(data?.status)}.200`
              ? `${getColor(data?.status)}.200`
              : "none",
          }}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.primary">
          {format(new Date(data?.createdAt), "dd-MMMM yyyy", { locale: uz })}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        {price?.toLocaleString() || "0"} so&apos;m
      </StyledTableCell>
      <StyledTableCell align="center">{count}</StyledTableCell>
    </StyledTableRow>
  );
};

export default PerOrderRow;
