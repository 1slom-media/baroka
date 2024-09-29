import { Typography } from "@mui/material";
import AppLayout from "components/app/AppLayout";
import Card1 from "components/general/Cards/Card1";
import React from "react";

const Page = () => {
  return (
    <AppLayout>
      <Card1 sx={{ my: { xs: 7, md: 7 } }}>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", fontWeight: "bold" }}
        >
          OMMAVIY OFFERTA
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", fontWeight: "bold", mt: 3 }}
        >
          Dozen.uz - sayti orqali mahsulotlar, tovarlar sotish va xizmat
          ko&apos;rsatish bo&apos;yicha.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#7A7A7A",
            fontWeight: "bold",
            mt: 3,
            mb: 3,
            textAlign: "center",
          }}
        >
          1. Terminlar va ta&apos;riflar
        </Typography>
        <Typography variant="body2" sx={{ color: "#000" }} component="p">
          <Typography
            variant="body2"
            component="strong"
            sx={{ color: "#7A7A7A", fontWeight: "bold" }}
          >
            Sotuvchi - {process.env.NEXT_PUBLIC_APP_NAME} mazkur korxona
            tinglovchilarning buyurtmasi asosida masofadan, ya&apos;ni internet
            orqali xizmatlar ko&apos;rsatuvchi.
          </Typography>
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Xaridor - jismoniy shaxslar.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Oferta - sotuvchining nomuayyan shaxslar doirasiga chakana savdo-sotiq
          qilish yo&apos;li bilan internet orqali masofadan turib xizmatni sotib
          olish bo&apos;yicha sotuvchining shartlari doirasida shartnoma
          tuzishga yo&apos;llangan taklifdir.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Aksept - xaridor tomonidan ofertani to&apos;liq va shartlarsiz qabul
          qilish va shartnomani tuzilgan deb hisoblash.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Shartnoma (matnda - shartnoma) - internet orqali masofadan turib
          xizmatni sotib olish bo&apos;yicha sotuvchining shartlari bilan
          xaridorning tanishishi va roziligi asosida hamda belgilangan katalog
          yoki ro&apos;yhat doirasida taklif etilayotgan xizmatni sotib olish
          bo&apos;yicha kelishuv.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Tomon (lar) - xaridor va/yoki sotuvchi.
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Buyurtma - elektron hujjat, unda xaridorni tanlagan xizmat turi, uning
          narxi (belgilangan hollarda esa tanlangan bonus(lar), xizmatni va/yoki
          uning natijasini eltib berish maqsadida talab etiladigan xaridorga
          tegishli ma&apos;lumotlar: FISH yoki nomi, (elektron) manzil, qayta
          aloqaga kirishish uchun telefon raqami yoki elektron manzili (kontakt)
          va saytning tegishli shaklida belgilangan boshqa ma&apos;lumotlar
          bo&apos;lishi talab etiladi. Buyurtmani to&apos;ldirish jarayonida
          xaridor pulni to&apos;lov usuli, to&apos;lov kodi, yetkazib berish
          xarajatlari haqida to&apos;liq ma&apos;lumotni oladi.
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          To&apos;lov kodi - yagona va qaytarilmas raqam ko&apos;rinishidagi,
          har bir xaridorga va uning buyurtmasiga bir marta avtomatik tarzda
          beriladigan va uning imzosi sifatida baholanadigan raqam (kod) belgi.
          To&apos;lov kodi buyurtmaga bir marta berilishi munosabati bilan
          hisob-kitob hujjati (invoys) o&apos;rnini bosadi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Sayt - baroka.uz nomli veb-sayt bo&apos;lib, unda katalogda,
          ro&apos;yhatda belgilangan xizmatlar taklif etiladi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Kuryer - Sotuvchi tomonidan Xizmatlarni, uning moddiy natijalarini,
          Bonuslarni, xatlarni va boshqa korrespondensiyalarni Xaridorga
          yetkazib berish uchun yollangan yuridik yoki jismoniy shaxs, asosan
          ushbu o&apos;rinda “O&apos;zbekiston pochtasi” OAJ xizmatidan
          foydalaniladi. Boshqa hollarda Kuryerlik Xaridor bilan kelishiladi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          To&apos;lov usuli -xaridor tomonidan tanlangan, buyurtmaning shaklida
          nomi ko&apos;rsatilgan, xizmatlar bo&apos;yicha xaridorlarning pul
          to&apos;lovlarini qabul qilib olishga vakolatli tashkilotlar -
          operator tomonidan taklif etilayotgan to&apos;lov usullari.
          To&apos;lov usulini amalga oshirayotgan operator xaridor oldida faqat
          pulni qabul qilish va uni sotuvchiga yetkazib berishga javobgardir.
          Xizmatning (moddiy va nomoddiy) natijalari, bonuslar (soni, sifati,
          muddati, narxi va boshqalar) bo&apos;yicha bunday tashkilot - Operator
          hech qanday javobgarlikni o&apos;z zimmasiga olmasligi oldindan tan
          olinadi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Operator - aholidan pul o&apos;tkazish yo&apos;li va unga
          tenglashtirilgan pul to&apos;lovlarini qabul qilib olishga davlat
          tomonidan vakolatlangan va sotuvchi bilan tegishli shartnomasi mavjud
          bo&apos;lgan tashkilotlar.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Elektron hujjatlar - buyurtmalar, to&apos;lov hujjatlari, hisob-kitob
          hujjati (invoys), reklamatsiyalar, e&apos;torozlar va tomonlar
          o&apos;z majburiyatlarini bajarishlariga tegishli boshqa hujjatlar.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#7A7A7A",
            fontWeight: "bold",
            mt: 3,
            mb: 3,
            textAlign: "center",
          }}
        >
          2. Umumiy shartlar
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.1. Ushbu shartnoma hamda saytdagi taklif etilayotgan xizmatlar
          ommaviy oferta hisoblanadi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.2. Xaridor saytda buyurtmani shakllantirishda mazkur shartnoma
          shartlariga rozi va ularni to&apos;liq qabul qilishini bildiradi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.3. Xizmatlarni sotish hududi - O&apos;zbekiston Respublikasi hududi
          hamda dunyo miqyosida sotish hisoblanadi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.4. Sotuvchi shartnoma shartlariga har qanday vaqtda o&apos;z
          tomonidan o&apos;zgartirish kiritish huquqiga ega.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.5. Sotuvchi xizmatlarni sotish jarayoniga xaridorning roziligisiz
          uchinchi tomonni jalb etish huquqiga ega
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.6. Xizmatdan foydalanish jarayonida xizmat yuzasidan qo&apos;shimcha
          savolga, maslahatga ehtiyoj paydo bo&apos;lganda xaridor birinchi
          bo&apos;lib sotuvchiga murojaat qilishi lozim. Ushbu talabni qondirish
          uchun xaridor saytda ko&apos;rsatilgan: “Aloqa” tugmasi yoki maxsus
          ajratilgan telefon raqami orqali yoki ko&apos;rsatilgan elektron
          manzilga murojaat qilishi yetarlidir.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.7. Xaridor saytdan olingan xizmat va uning natijalarini, bonuslar va
          boshqa moddiy va nomoddiy mulkiy huquqlarni tijorat maqsadlarida
          ishlatmasligi, sotuvchining roziligini oldindan olmay turib uchinchi
          shaxslarga foydalanish uchun tarqatmaslik majburiyatini o&apos;z
          zimmasiga oladi. Bunday hatti harakatlar qonun buzilishiga olib
          kelishini to&apos;liq idrok etadi. Bunday holat aniqlangan taqdirda
          sotuvchi xaridorni kursdan chetlatadi va qonuniy chora ko&apos;rilishi
          uchun tegishli sud organlariga murojaat etishga xaqli. Bundan tashqari
          sotuvchiga yetkazilgan zarar to&apos;liq xajmda xaridor tomonidan
          qoplanadi..
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          2.8. Moddiy eltmalarni Xaridorga yetkazib berish uchun uchinchi tomon
          jalb etilishini inobatga olgan holda eltib berish xizmatlari uchun
          alohida to&apos;lov belgilanishi xaridorda e&apos;tiroz
          tug&apos;dirmaydi, bu holat idrok etiladi.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#7A7A7A",
            fontWeight: "bold",
            mt: 3,
            mb: 3,
            textAlign: "center",
          }}
        >
          3. Buyurtmani shakllantirish tartibi
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          3.1. Xizmat(lar)ni sotib olish niyatida xaridor saytda
          ko&apos;rsatilgan shaklni - Buyurtmani rasmiylashtiradi. Birinchi
          marta buyurtmani rasmiylashtirayotgan xaridor “Saytda ro&apos;yhatdan
          o&apos;tish” jarayonidan o&apos;tadi, keyingi holatlarda
          “Avtorizatsiyadan o&apos;tish” jarayonidan o&apos;tadi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          3.1.1. Ro&apos;yhatdan o&apos;tish - xizmatlar natijalarini va/yoki
          moddiy eltmalarni xaridorga yetkazishni amalga oshirish uchun zarur
          bo&apos;lgan ma&apos;lumotlarni Saytda keltirilgan shakl - “Mening
          sozlashlarim” shaklidagi ko&apos;rsatilgan forma asosida Xaridor
          tomonidan to&apos;ldirilishidir. Ro&apos;yxatdan o&apos;tish Xaridor
          uchun shaxsiy kabinet ochish imkoniyatini beradi. “Mening
          sozlashlarim” shaklidagi barcha ma&apos;lumotlarni Xaridor o&apos;z
          shaxsiy kabinetiga kirgandan so&apos;ng mustaqil o&apos;zgartirishi
          mumkin.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          3.1.2. Faqat ro&apos;yhatdan o&apos;tgandan so&apos;ng yoki
          Avtorizatsiyadan o&apos;tgandan so&apos;ng buyurtma uchun
          to&apos;lovni amalga oshirish imkoniyati paydo bo&apos;ladi. “Mening
          sozlashlarim” shaklida ko&apos;rsatilishi majburiy bo&apos;lgan
          ma&apos;lumotlar majmui mavjud. Bunday ma&apos;lumotlarni
          to&apos;ldirmaslik buyurtmani rasmiylashtirish imkonini chegaralab
          qo&apos;yadi yoki bermaydi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          3.4. Xizmat natijalarini taqdim etish xaridor tomonidan to&apos;lovni
          to&apos;liq amalga oshirgandan so&apos;ng sotuvchi tomonidan amalga
          oshiriladi.
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "#7A7A7A", my: 3, fontWeight: "bold" }}
        >
          Email: info@baroka.uz
        </Typography>
      </Card1>
    </AppLayout>
  );
};

export default Page;
