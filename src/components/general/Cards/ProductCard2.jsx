import {
  Box,
  Card,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import StreamCreateModal from "components/app/Modals/StreamCreateModal";
import Link from "next/link";
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  margin: 0,
  background: "#1b2530e0",
  "&:hover": {
    boxShadow: "0px 5px 26px rgba(0, 0, 0, 0.14)",
  },
  "& p": {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "100%",
  },
  "& img": {
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
  },
}));
const StyledIconBox = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.blue,
  padding: "5px 7px 5px 5px",
  borderRadius: "6px",
  "&:hover": {
    background: theme.palette.background.blue,
  },
}));

const ProductCard = ({ image, name, purchasePrice, uid, postLink, referalPrice }) => {
  return (
    <StyledCard width="100%">
      <Stack
        position="relative"
        width="100%"
        height={{ xs: "150px", md: "200px" }}
      >
        <Box
          component="img"
          alt={name}
          src={image}
          width="100%"
          height="100%"
        />
      </Stack>
      <Stack p={1}>
        <Typography my={1} variant="body2" color="text.white">
          {name}
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography variant="subtitle1" color="text.whiteOff">
            Narxi:
          </Typography>
          <Typography ml={1} variant="body1" color="text.white">
            {purchasePrice?.toLocaleString()} so&apos;m
          </Typography>
        </Stack>
        <Stack my={1} direction="row" alignItems="center">
          <Typography variant="subtitle1" color="text.whiteOff">
            Foyda:
          </Typography>
          <Typography ml={1} variant="body1" color="text.whiteOff">
            {referalPrice?.toLocaleString()} so&apos;m
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <StreamCreateModal product={uid} />
          <Link href={`http://t.me/barokaBot?start=productId=${uid}`}>
            <StyledIconBox>
              <TelegramIcon style={{ fill: "#FFF" }} />
            </StyledIconBox>
          </Link>
        </Stack>
      </Stack>
    </StyledCard>
  );
};

export default ProductCard;
