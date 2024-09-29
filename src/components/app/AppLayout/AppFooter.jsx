import {
  Box,
  Stack,
  Container,
  styled,
  Typography,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import Link from "next/link";
import PhoneOutlined from "components/icons/PhoneOutlined";
import EmailOutlined from "components/icons/EmailOutlined";
import { useSelector } from "react-redux";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

const MainContainer = styled(Box)(({ theme, primary }) => ({
  background: primary
    ? theme.palette.background.primary
    : theme.palette.background.paper,
  padding: "20px 0",
  ...(primary && {
    padding: 3,
  }),
  ...(!primary && {
    boxShadow: theme.shadows[5],
  }),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.main,
  borderRadius: "50%",
  "&:hover": {
    background: theme.palette.background.main,
  },
}));

const AppFooter = () => {
  const categories = useSelector((state) => state.categories.list);
  const settings = useSelector((state) => state.settings.site);
  return (
    <Stack>
      <MainContainer>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Stack gap={2}>
                <Link href="/">
                  <Box
                    width={100}
                    height={70}
                    src="/assets/logo.png"
                    component="img"
                  />
                </Link>
                <Typography variant="string" color="text.lightDark">
                  Sizning ishonchli hamkoringiz
                </Typography>
                <Stack direction="row" alignItems="center" gap={2}>
                  <Link href={settings?.instaLink ? settings.instaLink : "/"}>
                    <StyledIconButton color="background">
                      <InstagramIcon sx={{ color: "#fff", opacity: 0.6 }} />
                    </StyledIconButton>
                  </Link>
                  <Link href={settings?.tgLink ? settings.tgLink : "/"}>
                    <StyledIconButton>
                      <TelegramIcon sx={{ color: "#fff", opacity: 0.6 }} />
                    </StyledIconButton>
                  </Link>
                  <Link href={settings?.fbLink ? settings.fbLink : "/"}>
                    <StyledIconButton>
                      <FacebookIcon sx={{ color: "#fff", opacity: 0.6 }} />
                    </StyledIconButton>
                  </Link>
                </Stack>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box component="ul">
                <Box component="li">
                  <Typography variant="body2" color="text.main">
                    Aloqa
                  </Typography>
                </Box>
                <Box component="li" mt={1}>
                  <Box component="a">
                    <Link href="/">
                      <Stack direction="row">
                        <EmailOutlined />
                        <Link href="mailto::crm@gmail.com" target="_blank">
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            ml={1}
                          >
                            info@baroka.uz
                          </Typography>
                        </Link>
                      </Stack>
                    </Link>
                  </Box>
                </Box>
                <Box component="li" mt={1}>
                  <Box component="a">
                    <Link href="/">
                      <Stack direction="row">
                        <PhoneOutlined />
                        <Link href="tel: +99899 106 6729" target="_blank">
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            ml={1}
                          >
                            {settings?.sitePhone}
                          </Typography>
                        </Link>
                      </Stack>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box component="ul">
                <Box component="li">
                  <Typography variant="body2" color="text.main">
                    Mijozlarga xizmat ko`rsatish
                  </Typography>
                </Box>
                <Box component="li" mt={1}>
                  <Box component="a">
                    <Link href="/">
                      <Typography variant="string" color="text.secondary">
                        Yetkazib berish xizmati
                      </Typography>
                    </Link>
                  </Box>
                </Box>
                <Box component="li" mt={1}>
                  <Box component="a">
                    <Link href="/privacy-policy">
                      <Typography variant="string" color="text.secondary">
                        Buyurtmani qaytarib olish
                      </Typography>
                    </Link>
                  </Box>
                </Box>
                <Box component="li" mt={1}>
                  <Box component="a">
                    <Link href="/privacy-policy">
                      <Typography variant="string" color="text.secondary">
                        Maxfiylik siyosati
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Box component="ul">
                <Box component="li">
                  <Typography variant="body2" color="text.main">
                    Top kategoriyalar
                  </Typography>
                </Box>
                {categories.slice(0, 3).map((item) => (
                  <Box component="li" mt={1} key={item._id}>
                    <Box component="a">
                      <Link href={`/category/${item.uid}`}>
                        <Typography variant="string" color="text.secondary">
                          {item.label}
                        </Typography>
                      </Link>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MainContainer>
      <Divider />
      <MainContainer primary>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Typography
              variant="body1"
              color="text.light"
              align="center"
              py={1}
            >
              © vipitstudio.uz - All Rights reserved
            </Typography>
          </Stack>
        </Container>
      </MainContainer>
    </Stack>
  );
};

export default AppFooter;
