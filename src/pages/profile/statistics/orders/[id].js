import { Breadcrumbs, Chip, Grid, Stack, Typography } from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import React, { useEffect, useState } from "react";
import OrderLeftCard from "components/general/Cards/OrderLeftCard";
import { getColor, getStatusText } from "utils/helpers";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import { getOneUserOrder } from "api/requests";
import OrderCard from "components/general/Cards/OrderInnerCard";
import { StyledBorderBox } from "components/app/User-profile/StyledComponents";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Page = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const price = data?.orderItems?.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);

  const handleGetOrder = async () => {
    if (router?.query?.id) {
      const res = await getOneUserOrder({ id: router?.query?.id, token });
      if (res) {
        setData(res);
      }
    }
  };

  useEffect(() => {
    if (token) {
      handleGetOrder();
    } else {
      router.push("/auth");
    }
  }, [router?.query?.id]);

  return (
    <AdminLayout>
      <Stack
        direction="row"
        justifyContent="flex-start"
        my={2}
        alignItems="center"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="error" href="/profile/orders">
            Buyurtmalar
          </Link>
          <Typography color="text.primary">{data.number}</Typography>
        </Breadcrumbs>
      </Stack>
      <Stack mb={2}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <StyledBorderBox>
              <OrderLeftCard>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={12}>
                    <Typography
                      variant="body1"
                      color="text.light"
                      sx={{ opacity: 0.6 }}
                    >
                      ID
                    </Typography>
                    <Typography variant="body2" color="text.light">
                      {data?.number}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={12}>
                    <Typography
                      variant="body1"
                      color="text.light"
                      sx={{ opacity: 0.6 }}
                    >
                      Holati
                    </Typography>
                    <Chip
                      size="small"
                      label={getStatusText(data?.status)}
                      sx={{
                        p: "0.25rem 0.5rem",
                        fontSize: 12,
                        color: !!getColor(data?.status)
                          ? `${getColor(data?.status)}.900`
                          : "inherit",
                        backgroundColor: `${!!getColor(data?.status)}.200`
                          ? `${getColor(data?.status)}.200`
                          : "none",
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} md={12}>
                    <Typography
                      variant="body1"
                      color="text.light"
                      sx={{ opacity: 0.6 }}
                    >
                      Yaratilgan vaqti
                    </Typography>
                    <Typography variant="body2" color="text.light">
                      {data?.createdAt
                        ? format(
                            new Date(data?.createdAt),
                            "dd-MMMM, HH:mm, yyyy",
                            {
                              locale: uz,
                            }
                          )
                        : ""}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={12}>
                    <Typography
                      variant="body1"
                      color="text.light"
                      sx={{ opacity: 0.6 }}
                    >
                      Umumiy summa
                    </Typography>
                    <Typography variant="body2" color="text.light">
                      {price?.toLocaleString()} so&apos;m
                    </Typography>
                  </Grid>
                </Grid>
              </OrderLeftCard>
            </StyledBorderBox>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container>
              {data?.orderItems?.map((item) => (
                <Grid item lg={4} xs={12} key={item._id}>
                  <OrderCard {...item} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
