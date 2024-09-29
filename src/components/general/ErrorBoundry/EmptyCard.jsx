import { Box, Button, Stack, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import PropTypes from "prop-types";

const StyledEmptyComponent = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const EmptyCard = ({
  btn = false,
  img = "",
  txt = "Hozircha hech qanday mahsulot mavjud emas!",
  btnText = "Ortga qaytish",
  path = "/",
  isDark,
}) => {
  const router = useRouter();

  return (
    <Stack
      height="100%"
      alignItems="center"
      justifyContent="center"
      borderRadius="10px"
      p={2}
      minWidth="270px"
      maxWidth="100%"
    >
      <Stack>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <StyledEmptyComponent>
            <Box component="img" alt="cart" src={img} />
          </StyledEmptyComponent>
        </Stack>
        <Typography
          variant="string"
          color={isDark ? "text.white" : "text.main"}
          textAlign="center"
          mt={3}
          mb={2}
        >
          {txt}
        </Typography>
        <Stack maxWidth="190px" mx="auto">
          {btn ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push(path)}
            >
              {btnText}
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default EmptyCard;

EmptyCard.propTypes = {
  btn: PropTypes.bool,
  txt: PropTypes.string,
  img: PropTypes.string,
  path: PropTypes.string,
  btnText: PropTypes.string,
  isDark: PropTypes.bool,
};

EmptyCard.defaultProps = {
  btn: false,
  txt: "",
  img: "",
  path: "",
  btnText: "",
  isDark: false,
};
