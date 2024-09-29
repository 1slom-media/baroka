import { Box, Stack, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import { useSelector } from "react-redux";

const ProductRow = ({ name, category, image, _id, count }) => {
  const categories = useSelector((state) => state.categories.list);
  const cat = categories.find((item) => item.uid == category);
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack direction="row" justifyContent="flex-start" gap="10px">
          <Box
            component="img"
            alt={name}
            src={image ? image[0] : image}
            width="50px"
            height="50px"
            borderRadius="50%"
          />
          <Stack direction="column" justifyContent="space-between">
            <Typography variant="body2" color="text.whiteOff">
              {name}
            </Typography>
            <Typography variant="body1" color="text.whiteOff">
              {_id}
            </Typography>
          </Stack>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body1" color="text.whiteOff">
          {cat?.label}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">{count}</StyledTableCell>
    </StyledTableRow>
  );
};

export default ProductRow;
