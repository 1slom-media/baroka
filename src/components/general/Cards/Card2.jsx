import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const Card2 = styled(Card)({
  position: "relative",
  padding: "1.5rem 1.75rem",
  height: "100%",
  boxShadow: "0px -0px 20px -23px rgba(34, 60, 80, 0.2)",
  ["@media only screen and (max-width: 678px)"]: {
    padding: "1rem",
    width: "100%",
  },
});

export default Card2;
