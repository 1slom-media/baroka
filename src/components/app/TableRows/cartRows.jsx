import { Add, Remove } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import { StyledIconButton, StyledStack } from "../ProductCards/CartCard";
import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal";
import { useDispatch } from "react-redux";
import {
  removeFromBasket,
  increaseQuantity,
  decreaseQuantity,
} from "redux-store/cart/cart.slice";

const UseCartRows = ({ image, name, price, quantity, _id }) => {
  const dispatch = useDispatch();

  const deleteTheItemFromBasket = () => {
    dispatch(removeFromBasket(_id));
  };

  const increase = () => {
    dispatch(increaseQuantity(_id));
  };

  const decrease = () => {
    dispatch(decreaseQuantity(_id));
  };
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack direction="row" alignItems="center" gap="10px">
          <Box
            component="img"
            src={image}
            alt={name}
            width={90}
            height={90}
            borderRadius={2}
          />
          <Box width="50%">
            <Typography variant="body1" color="text.secondary">
              {name}
            </Typography>
          </Box>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body1" color="secondary.main">
          {(price * quantity)?.toLocaleString()} so&apos;m
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Stack direction="row" alignItems="center" gap="20px">
          <StyledStack direction="row" alignItems="center">
            <StyledIconButton onClick={increase}>
              <Add />
            </StyledIconButton>
            <Typography variant="body2" color="text.primary" mx={2}>
              {quantity}
            </Typography>
            <StyledIconButton disabled={quantity === 1} onClick={decrease}>
              <Remove />
            </StyledIconButton>
          </StyledStack>
          <ConfirmDeleteModal
            error="Savatchadan olinmoqda. Tasdiqlaysizmi?"
            handleDelete={deleteTheItemFromBasket}
          />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default UseCartRows;
