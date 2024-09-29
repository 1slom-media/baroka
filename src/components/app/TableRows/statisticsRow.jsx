import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { useRouter } from "next/router";

const styledText = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "160px",
  whiteSpace: "nowrap",
};

const UserStatsRow = ({
  archived,
  canceled,
  delivered,
  ready,
  hold,
  pending,
  onway,
  name,
  visits_count,
  number,
  product,
  ...rest
}) => {
  const router = useRouter();
  return (
    <StyledTableRow
      onClick={() => router.push(`/profile/statistics/${number}`)}
    >
      <StyledTableCell align="left">#{number}</StyledTableCell>
      <StyledTableCell align="left" sx={styledText}>
        {name}
      </StyledTableCell>
      <StyledTableCell align="left" sx={styledText}>
        {product?.name}
      </StyledTableCell>
      <StyledTableCell align="left">{visits_count}</StyledTableCell>
      <StyledTableCell align="center">{rest.new}</StyledTableCell>
      <StyledTableCell align="center">{ready}</StyledTableCell>
      <StyledTableCell align="center">{onway}</StyledTableCell>
      <StyledTableCell align="center">{delivered}</StyledTableCell>
      <StyledTableCell align="center">{pending}</StyledTableCell>
      <StyledTableCell align="center">{hold}</StyledTableCell>
      <StyledTableCell align="center">{canceled}</StyledTableCell>
      <StyledTableCell align="center">{archived}</StyledTableCell>
    </StyledTableRow>
  );
};

export default UserStatsRow;
