import { Chip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { getCity, getColor, getStatusText } from "utils/helpers";

const UserRequestsRow = ({
  status,
  name,
  number,
  msg,
  phone,
  city,
  updatedAt,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="text.whiteOff">
          #{number}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="text.whiteOff">
          {name}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="text.whiteOff">
          {phone}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.whiteOff">
          {getCity(city)}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Chip
          size="small"
          label={getStatusText(status)}
          variant="outlined"
          color={getColor(status)}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.whiteOff">
          {format(new Date(updatedAt), "dd-MMMM yyyy", { locale: uz })}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="text.whiteOff">
          {msg || "Xabar kritilmagan "}
        </Typography>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default UserRequestsRow;
