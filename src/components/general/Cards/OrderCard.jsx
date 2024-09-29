import {
  Box,
  Button,
  Stack,
  Typography,
  styled,
  IconButton,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromBasket,
} from "redux-store/cart/cart.slice";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";

const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  maxWidth: "25px",
  minHeight: "25px",
  maxHeight: "25px",
  minWidth: "25px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&.minus": {
    color: theme.palette.error[700],
    backgroundColor: theme.palette.error[200],
  },
  "&.plus": {
    color: theme.palette.success[700],
    backgroundColor: theme.palette.success[200],
  },
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: "1px 8px",
  borderRadius: "19px",
  border: `1px solid ${theme.palette.background.lightGrey}`,
  maxWidth: "auto",
}));

const OrderCard = ({ name, image, quantity, price, _id }) => {
  const dispatch = useDispatch();
  const deleteTheItemFromBasket = () => {
    dispatch(removeFromBasket(_id));
  };

  const addOneToCount = () => {
    dispatch(increaseQuantity(_id));
  };
  const removeOneFromCount = () => {
    dispatch(decreaseQuantity(_id));
  };

  return (
    <Box
      width="100%"
      borderRadius="10px"
      overflow="hidden"
      display="flex"
      justifyContent="space-between"
      gap="10px"
    >
      <Stack direction="row" gap="10px">
        <Box
          component="img"
          src={image}
          alt={name}
          width={{ xs: "70px", md: "90px" }}
          height={{ xs: "70px", md: "90px" }}
          sx={{ objectFit: "cover", borderRadius: "10px" }}
        />
        <Stack direction="column" justifyContent="space-between" height="80px">
          <Typography
            variant="body1"
            width={{ xs: "60px", md: "auto" }}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </Typography>
          <Stack direction="row" justifyContent="space-between" gap="10px">
            <Button
              variant="outlined"
              color="error"
              sx={{ maxWidth: "max-content" }}
              size="small"
              onClick={deleteTheItemFromBasket}
            >
              O`chirish
            </Button>
            <StyledStack direction="row" alignItems="center" gap="10px">
              <StyledIconBtn
                className="minus"
                color="primary"
                onClick={removeOneFromCount}
              >
                <RemoveIcon />
              </StyledIconBtn>
              {quantity}
              <StyledIconBtn
                className="plus"
                color="primary"
                onClick={addOneToCount}
              >
                <AddIcon />
              </StyledIconBtn>
            </StyledStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack direction="column">
        <Typography variant="body1">
          {quantity} x {price?.toLocaleString()} so&apos;m
        </Typography>
      </Stack>
    </Box>
  );
};

export default OrderCard;
