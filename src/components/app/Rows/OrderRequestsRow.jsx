import { Chip, Typography, Avatar, styled } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import IconButton from "@mui/material/IconButton";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { getColor, getStatusText } from "utils/helpers";
import { useRouter } from "next/router";
import React from "react";
import ArrowRight from "components/icons/ArrowRight";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background[100],
  padding: "3px 13px !important",
}));

const OrderRequestsRow = ({ status, orderItems, _id, createdAt, number }) => {
  const price = orderItems.reduce((acc, curr) => {
    let res = acc + curr?.productId?.price || 0 * curr?.quantity || 0;
    return res;
  }, 0);
  const router = useRouter();

  return (
    <StyledTableRow>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.light">
          {number}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Chip
          size="small"
          label={getStatusText(status)}
          sx={{
            p: "0.25rem 0.5rem",
            fontSize: 12,
            color: !!getColor(status) ? `${getColor(status)}.900` : "inherit",
            backgroundColor: `${!!getColor(status)}.200`
              ? `${getColor(status)}.200`
              : "none",
          }}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.light">
          {format(new Date(createdAt), "dd-MMMM yyyy", { locale: uz })}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        {price?.toLocaleString() || "0"} so&apos;m
      </StyledTableCell>
      <StyledTableCell align="center">
        <StyledIconButton onClick={() => router.push(`/profile/orders/${_id}`)}>
          <ArrowRight />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OrderRequestsRow;
