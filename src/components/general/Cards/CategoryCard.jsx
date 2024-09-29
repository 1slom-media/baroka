import { Box, styled, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import Card1 from "./Card1";
import { useRouter } from "next/router";

const StyledCard = styled(Card1)(({ theme }) => ({
  height: "90px",
  width: "90px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  "& img": { objectFit: "cover" },
  "&.active": {
    background: theme.palette.text.main,
  },
  "&:hover": {
    background: theme.palette.text.main,
  },
  [theme.breakpoints.down("sm")]: {
    height: "70px",
    width: "70px",
  },
}));

const CategoryCard = ({ title, avatar, uid, isActive }) => {
  const router = useRouter();
  return (
    <Link href={`/category/${uid}`}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <StyledCard className={isActive ? "active" : ""}>
          <Box
            component="img"
            src={avatar}
            alt={title[router?.locale]}
            width={{ xs: "60px", md: "80px" }}
            height={{ xs: "60px", md: "80px" }}
          />
        </StyledCard>
        <Typography
          className="labelCategory"
          variant="string"
          color="text.main"
          textAlign="center"
          fontWeight="600"
          mt={2}
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {title[router?.locale]}
        </Typography>
      </Box>
    </Link>
  );
};

export default CategoryCard;
