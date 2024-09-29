import { Chip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { getCity, getColor, getStatusText } from "utils/helpers";

const StatsOrderRow = ({
  number,
  name,
  status,
  takenById,
  isTaken,
  city_id,
  phone
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">{number}</StyledTableCell>
      <StyledTableCell align="center">{name}</StyledTableCell>
      <StyledTableCell align="left">{phone}</StyledTableCell>
      <StyledTableCell align="center">{getCity(city_id)}</StyledTableCell>
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
        {isTaken ? (
          takenById.name
        ) : (
          <Typography variant="body1" color="error.main">
            Operator olmagan
          </Typography>
        )}
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default StatsOrderRow;
