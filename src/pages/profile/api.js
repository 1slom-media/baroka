import { Stack, Card } from "@mui/material";
import AdminLayout from "components/app/AppLayout/AdminLayout";
import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SyntaxHighLighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AdminLayout>
      <Stack>
        <Stack mb={2}>
          <Typography variant="string" color="text.white">
            API bo&apos;limi
          </Typography>
        </Stack>
        <Card
          sx={{
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            minHeight: "70vh",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", px: 1 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                textColor="primary"
                indicatorColor="primary"
              >
                <Tab
                  sx={{ color: "white" }}
                  label="API haqida"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{ color: "white" }}
                  label="API kerakmi?"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{ color: "white" }}
                  label="Foydalanish"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Stack>
                <Typography color="text.white" variant="h6">
                  API o&apos;zi nima?
                </Typography>
                <Stack mt={1}>
                  <Typography color="text.whiteOff">
                    API sizga tashqi manbalar orqali bizning bazamizdagi
                    maulomatlarga bevosita yoki bilvosita kirish va tahrirlash
                    imkonini beradi.
                  </Typography>
                  <Typography color="text.whiteOff" mt={1}>
                    <b>1.0</b> Agar siz dasturchi bo&apos;lsangiz yoki shu
                    sohani tushunsangiz o&apos;z sayitingizni ochishingiz va
                    buyurtmalarni osongina bizning bazamizga
                    yo&apos;naltirishingiz mumkin.
                  </Typography>
                  <Typography color="text.whiteOff" mt={1}>
                    <b>1.1</b> Agar siz marketolog yoki targetolog
                    bo&apos;lsangiz va API ni qanday ishlatish haqida
                    to&apos;liq kansultatsiyaga ega bo&apos;lsangiz API dan
                    foydalanib Instagram, facebook va hokazo boshqa lead
                    formalarga ega bo&apos;lgan platformalardan leadlarni
                    avtomatik ravishda bizning bazamizga yo&apos;naltirish uchun
                    foydalanishingiz mumkin.
                  </Typography>
                  <Typography color="text.whiteOff" mt={1}>
                    <b>1.2</b> O&apos;zingiz uchun shaxsiy bot ochishingiz va
                    API orqali buyurtmalarni bazamizga qiyinchiliklarsiz
                    jo&apos;natishingiz mumkin.
                  </Typography>
                  <Typography color="text.whiteOff" mt={1}>
                    Qisqacha qilib hulosa qiladigan bo&apos;lsak API orqali
                    bizning platformamizda erkinlikni his qilishingiz mumkin.
                  </Typography>
                </Stack>
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Stack>
                <Typography color="text.whiteOff" variant="h6">
                  API kerakmi?
                </Typography>
                <Typography color="text.whiteOff" mt={1}>
                  Agar siz <b>baroka.uz</b> sayiti bilan telegram kanallarga
                  reklama quyish orqali sheriklik qilmoqchi bo&apos;lsangiz va
                  target marketing nimaligi haqida bilimingiz bo&apos;lmasa
                  ushbu xizmat shunchaki siz uchun emas va sizga hechqanday
                  foydasi tegmaydi.
                </Typography>
                <Typography color="text.whiteOff" mt={1}>
                  Agar siz targetolog yoki marketing xizmatini telegram
                  platformasidan boshqa platformalarda ko&apos;rsatsangiz va
                  lead haqida tushunchaga ega bo&apos;lsangiz <b>API</b>
                  xizmati sizga ishingizni yengillashitirishga, vaqt tejashga va
                  eng asosiysi buyurtmalar vaqtida qabul qilinishini
                  taminlashingizga yordam beradi.
                </Typography>
                <Typography color="text.whiteOff" mt={1}>
                  Shuningdek siz, agar dasturchi bo&apos;lsangiz, <b>API</b>{" "}
                  xizmati orqali o&apos;z web saxifangizni yaratishingiz (Misol
                  uchun turli xildagi tasiri kuchliroq bo&apos;lgan{" "}
                  <b>landing</b> sahifalar) va buyurtmalarni
                  to&apos;g&apos;ridan to&apos;g&apos;ri bizning platformamizga
                  yo&apos;naltirishingiz mumkin.
                </Typography>
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <Stack>
                <Typography color="text.white" variant="h6">
                  API dan foydalanish tartibi.
                </Typography>
                <Typography
                  mt={1}
                  component="a"
                  href="https://dozen.uz/api/v4/order"
                  color="text.whiteOff"
                >
                  API orqali buyurtmalar{" "}
                  <span style={{ color: "#08cf65" }}>
                    https://dozen.uz/api/v4/order
                  </span>{" "}
                  manziliga POST so&#39;rovi orqali yuborilishi mumkin.
                </Typography>
                <Typography variant="subtitle1" mt={1} color="text.whiteOff">
                  Talab etiladigan parametrlar:
                </Typography>
                <Box component="ol" color="text.whiteOff">
                  <Box component="li">
                    <Typography mt={1} color="text.whiteOff">
                      <b>stream</b>- Market bo&#39;limidan oqim yaratganingizdan
                      so&#39;ng sizga{"   "}
                      <span style={{ color: "#08cf65" }}>
                        https://dozen.uz/oqim/450
                      </span>{" "}
                      ko&#39;rinishida link taqdim etiladi shu linkdagi{" "}
                      <b>450</b> sizga tegishli bo&#39;lgan oqim raqami
                      hisoblanadi (<b>Eslatma:</b> Ushbu{" "}
                      <b>https://dozen.uz/oqim/345</b> shunchaki misol sifatida
                      kiritilgan xar safar oqim yaratganingizda xar bir mahsulot
                      uchun alohida <b>stream</b> raqam beriladi.). Aynan shu
                      raqamni stream qismiga kiritishingiz kerak bo&#39;ladi. Bu
                      orqali biz buyurtma kimga tegishli ekanini aniqlaymiz.
                      Agar stream kiritlmasa buyurtma baroka.uz sayitiga
                      tegishli deb topiladi va kompinsatsiya qilinmaydi.
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography mt={1} color="text.whiteOff">
                      <b>phone</b> - Buyurtmachiga tegishli bo&#39;lgan telefon
                      raqam. Agar kiritlmasa buyurtma qabul qilinmaydi.
                    </Typography>
                  </Box>
                  <Box component="li">
                    <Typography mt={1} color="text.whiteOff">
                      <b>name</b> - Buyurtmachining ismi. Agar kiritlmasa
                      Vipsavdo nomi avtomatik kiritilib ketiladi. Raqamlar yoki
                      simvollar qabul qilinmaydi.
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="subtitle1" color="text.whiteOff">
                  So&#39;rov jo&#39;natish sxemasi:
                </Typography>
                <Box>
                  <SyntaxHighLighter language="javascript" style={dracula}>
                    {`curl --location 'https://dozen.uz/api/v4/order' \nMETHOD - POST \n --data '{\n  "name": "Farrux",\n  "phone": "+99895656555s",\n  "stream": 340\n}'`}
                  </SyntaxHighLighter>
                </Box>
              </Stack>
            </TabPanel>
          </Box>
        </Card>
      </Stack>
    </AdminLayout>
  );
};

export default Page;
