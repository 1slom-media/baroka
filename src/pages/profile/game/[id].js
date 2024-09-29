import {
  Box,
  Grid,
  Pagination,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import GameTime from "components/icons/GameTime";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSingleGame } from "redux-store/game/game.slice";
import format from "date-fns/format";
import Card1 from "components/general/Cards/Card1";
import ReactHtmlParser from "react-html-parser";
import TableHeader from "components/general/TableHead";
import GameRows from "components/app/TableRows/gameRows";
import heading from "constants/gameUserHeading";
import useWindowSize from "hooks/useWindowSize";

const StyledBanner = styled(Box)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text[200],
  padding: "15px 65px",
  borderRadius: "20px",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "16px",
  },
}));

const StyledBannerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "30px",
  marginBottom: "25px",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const StyledImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "500px",
  objectFit: "cover",
  borderRadius: "3px",
  [theme.breakpoints.down("sm")]: {
    textAlign: "center",
    width: "100%",
    height: "252px",
  },
}));

const StyledTimeWrapperBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  borderRadius: "20px",
  [theme.breakpoints.down("sm")]: {
    gap: "25px",
  },
}));

const StyledTimeBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "15px",
  paddingTop: "7px",
  paddingBottom: "7px",
  [theme.breakpoints.down("sm")]: {
    gap: "0px",
    flexDirection: "column",
  },
}));

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { data, users } = useSelector((state) => state.game);
  const screenWidth = useWindowSize();

  useEffect(() => {
    if (token && router?.query) {
      dispatch(getSingleGame({ token, id: router?.query?.id }));
    } else {
      router.push("/");
    }
  }, [token, router?.query]);
  return (
    <AdminLayout>
      <Head></Head>

      <Grid container spacing={2} pb={4}>
        <Grid item xs={12} md={6}>
          <Stack>
            <StyledImg component="img" src={data?.konkurs?.banner} />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "3px",
              height: "100%",
              width: "100%",
              p: 2,
            }}
          >
            <Typography mb={2} variant="h5" color="text.200">
              {data?.konkurs?.name}
            </Typography>
            <StyledTimeWrapperBox>
              <StyledTimeBox
                borderRight={{ lg: "1px solid rgba(0, 0, 0, 0.1)" }}
              >
                <GameTime sx={{ width: "50px", height: "50px" }} />
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle1" color="text.white" mb={0.3}>
                    Boshlanish vaqti:
                  </Typography>
                  <Typography variant="h5" color="primary">
                    {data?.konkurs?.startTime
                      ? format(new Date(data?.konkurs?.startTime), "dd.MM.yyyy HH:mm")
                      : ""}
                  </Typography>
                </Box>
              </StyledTimeBox>
              <StyledTimeBox pl={{ xs: 0, lg: 10 }}>
                <GameTime sx={{ width: "50px", height: "50px" }} />
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle1" color="text.white" mb={0.3}>
                    Tugash vaqti:
                  </Typography>
                  <Typography variant="h5" color="error.main">
                    {data?.konkurs?.endTime
                      ? format(new Date(data?.konkurs?.endTime), "dd.MM.yyyy HH:mm")
                      : ""}
                  </Typography>
                </Box>
              </StyledTimeBox>
            </StyledTimeWrapperBox>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Stack mt={2}>
            <Typography mb={2} variant="string" color="white">
              Konkurs haqida
            </Typography>
            <Box
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "3px",
                height: "100%",
                width: "100%",
                p: 2,
              }}
            >
              <Typography
                align="justify"
                variant="string"
                color="text.white"
                mb={5}
              >
                {ReactHtmlParser(data?.konkurs?.content)}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack mt={2}>
            <Typography mb={2} variant="string" color="white">
              Ishtirokchilar natijalari
            </Typography>
            <Box
              sx={{
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "3px",
                height: "100%",
                width: "100%",
              }}
            >
              <TableContainer sx={{ width: { xs: screenWidth - 70, sm: 500, md: "100%" } }}>
                <Table>
                  <TableHeader
                    hideSelectBtn
                    heading={heading}
                    rowCount={users?.length}
                  />
                  <TableBody>
                    {data?.users?.map((item, index) => (
                      <GameRows key={item._id} {...item} indx={index} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Page;
