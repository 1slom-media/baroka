import { Chip, Typography, Avatar } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import IconButton from "@mui/material/IconButton";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { getColor, getStatusText } from "utils/functions";
import { useRouter } from "next/router";

const UserRequestsRow = ({
  status,
  orderItems,
  _id,
  createdAt,
  number,
  ...rest
}) => {
  const img = orderItems[0].productId?.image;
  const price = orderItems[0].quantity * orderItems[0].price;
  const router = useRouter();
  return (
    <StyledTableRow>
      <StyledTableCell align="left" style={{ width: 70, height: 100 }}>
        <Avatar src={img} alt="order-img" />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.primary">
          No-{number}
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
        <Typography variant="subtitle1" color="text.primary">
          {format(new Date(createdAt), "dd-MMMM yyyy", { locale: uz })}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        {price?.toLocaleString() || "0"} so&apos;m
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton onClick={() => router.push(`/profile/orders/${_id}`)}>
          <ArrowRightAltIcon color="secondary" />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default UserRequestsRow;
