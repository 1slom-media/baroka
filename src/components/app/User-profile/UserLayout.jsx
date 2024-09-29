import { Box, Divider, Grid, Stack, styled, Typography } from "@mui/material";
import React from "react";
import InfoCard from "./InfoCard";
import { StyledBorderBox, StyledInfoChild } from "./StyledComponents";
import BoxOutlined from "components/icons/BoxOutlined";
import CancelOutlined from "components/icons/CancelOutlined";
import CheckOutlined from "components/icons/CheckOutlined";
import ClockOutlined from "components/icons/ClockOutlined";
import ListingOutlined from "components/icons/ListingOutlined";
import TruckOutlined from "components/icons/TruckOutlined";
import WarningIcon from "@mui/icons-material/Warning";
import Link from "next/link";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import FormatListNumberedOutlinedIcon from "@mui/icons-material/FormatListNumberedOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import GroupsIcon from "@mui/icons-material/Groups";

const WarnginBox = styled(Box)(({ theme }) => ({
  background: theme.palette.warning[100],
  padding: "20px 25px",
  border: `2px solid ${theme.palette.warning["light"]}`,
  borderRadius: "10px",
}));

const UserLayout = ({ user, shadow, children }) => {
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        {children}
      </Grid>
      <Grid item xs={12} md={9}>
        <Grid container>
          <Grid item xs={6} md={4}>
            <Link href="/profile/requests">
              <StyledBorderBox p={2} height="100%">
                <Stack direction="column" justifyContent="center">
                  <InfoCard color="info">
                    <FormatListNumberedOutlinedIcon />
                  </InfoCard>
                  <Typography
                    variant="string"
                    color="text.white"
                    textAlign="center"
                    mb={1}
                    mt={1}
                  >
                    So&apos;rovlar
                  </Typography>
                </Stack>
              </StyledBorderBox>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link href="/profile/game">
              <StyledBorderBox p={2} height="100%">
                <Stack direction="column" justifyContent="center">
                  <InfoCard color="info">
                    <CardGiftcardOutlinedIcon />
                  </InfoCard>
                  <Typography
                    variant="string"
                    color="text.white"
                    textAlign="center"
                    mb={1}
                    mt={1}
                  >
                    Konkurs
                  </Typography>
                </Stack>
              </StyledBorderBox>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link href="http://t.me/barokaBot">
              <StyledBorderBox p={2} height="100%">
                <Stack direction="column" justifyContent="center">
                  <InfoCard color="info">
                    <GroupsIcon />
                  </InfoCard>
                  <Typography
                    variant="string"
                    color="text.white"
                    textAlign="center"
                    mb={1}
                    mt={1}
                  >
                    Telegram guruh
                  </Typography>
                </Stack>
              </StyledBorderBox>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link href="/profile/api">
              <StyledBorderBox p={2} height="100%">
                <Stack direction="column" justifyContent="center">
                  <InfoCard color="info">
                    <CodeOutlinedIcon />
                  </InfoCard>
                  <Typography
                    variant="string"
                    color="text.white"
                    textAlign="center"
                    mb={1}
                    mt={1}
                  >
                    API
                  </Typography>
                </Stack>
              </StyledBorderBox>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link href="/profile/settings">
              <StyledBorderBox p={2} height="100%">
                <Stack direction="column" justifyContent="center">
                  <InfoCard color="info">
                    <SmartToyOutlinedIcon />
                  </InfoCard>
                  <Typography
                    variant="string"
                    color="text.white"
                    textAlign="center"
                    mb={1}
                    mt={1}
                  >
                    BOT sozlamalari
                  </Typography>
                </Stack>
              </StyledBorderBox>
            </Link>
          </Grid>
          <Grid item xs={6} md={4}>
            <Link href="/privacy-policy">
              <StyledBorderBox p={2} height="100%">
                <Stack direction="column" justifyContent="center">
                  <InfoCard color="info">
                    <ErrorOutlineOutlinedIcon />
                  </InfoCard>
                  <Typography
                    variant="string"
                    color="text.white"
                    textAlign="center"
                    mb={1}
                    mt={1}
                  >
                    Sayt haqida
                  </Typography>
                </Stack>
              </StyledBorderBox>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <StyledBorderBox p={2} height="100%">
              <WarnginBox>
                <Box display="flex" alignItems="center" gap="15px" mb={2}>
                  <Box
                    borderRadius="50%"
                    bgcolor="primary.200"
                    width="48px"
                    height="48px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <WarningIcon sx={{ color: "text.primary.100" }} />
                  </Box>
                  <Typography variant="body2" color="warning">
                    Eslatma!
                  </Typography>
                </Box>

                <Typography variant="string" color="text.main">
                  Ba&apos;zi holatlarda xaridor mahsulotni qaytaradi va mijozga
                  mahsulot puli qaytarib beriladi. Shunday holatlarda tizim
                  avtomatik tarzda admin hisobidan oldin qaytib kelgan mahsulot
                  uchun to&apos;lab berilgan pulni yechib oladi. Hisobingizda
                  mablag&apos; bo&apos;lmagan holatda hisobingiz manfiy balansga
                  almashtiriladi.
                </Typography>
              </WarnginBox>
            </StyledBorderBox>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserLayout;
