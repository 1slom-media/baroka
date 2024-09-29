import { Chip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import format from "date-fns/format";
import PropTypes from "prop-types";
import { getColor, getStatusText } from "utils/helpers";

const styledRow = {
  borderRadius: "10px",
  marginTop: "8px",
};

const UserPaymentsRow = ({
  status,
  _id,
  createdAt,
  card,
  amount,
  uid,
  message,
}) => {
  return (
    <StyledTableRow sx={styledRow}>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="text.white">
          #{uid}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.white">
          {createdAt ? format(new Date(createdAt), "dd.MM.yyyy") : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.white">
          {card}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.white">
          {amount?.toLocaleString()} so&apos;m
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Chip
          size="small"
          label={getStatusText(status)}
          color={getColor(status)}
          variant="outlined"
        />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Typography variant="subtitle1" color="text.white">
          {message || "Xabar kritilmagan !"}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

UserPaymentsRow.propTypes = {
  message: PropTypes.string,
  card: PropTypes.number,
  amount: PropTypes.number,
  status: PropTypes.string,
};

UserPaymentsRow.defaultProps = {
  message: "",
  card: 0,
  amount: 0,
  status: "",
};

export default UserPaymentsRow;
