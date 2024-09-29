export const getCity = (city_id) => {
  switch (city_id) {
    case 0:
      return "Viloyat kiritilmagan!";
    case 1:
      return "Toshkent";

    case 2:
      return "Samarqand";

    case 3:
      return "Qashqadaryo";

    case 4:
      return "Jizzax";

    case 5:
      return "Sirdaryo";

    case 6:
      return "Farg'ona";

    case 7:
      return "Namangan";

    case 8:
      return "Andijon";

    case 9:
      return "Surxondaryo";

    case 10:
      return "Qoraqalpog'iston";

    case 11:
      return "Buxoro";

    case 12:
      return "Navoiy";

    case 13:
      return "Toshkent viloyati";

    case 14:
      return "Xorazm";

    default:
      return "";
  }
};

export const getColor = (status) => {
  switch (status) {
    case "all":
      return "secondary";
    case "accepted":
      return "info";
    case "new":
      return "info";
    case "onway":
      return "info";
    case "ready":
      return "primary";
    case "delivered":
      return "success";
    case "waiting":
      return "secondary";
    case "fulfilled":
      return "success";
    case "canceled":
      return "error";
    case "hold":
      return "secondary";
    case "archived":
      return "warning";
    case "rejected":
      return "error";
    case "pending":
      return "warning";
    default:
      return "";
  }
};

export const orderStatuses = ["new", "ready", "onway", "delivered", "canceled", "pending", "hold", "archived"];

export const getStatusText = (val) => {
  switch (val) {
    case "new":
      return "Yangi";
    case "ready":
      return "Tayyor";
    case "onway":
      return "Yo'lda";
    case "delivered":
      return "Yetkazildi";
    case "canceled":
      return "Atkaz";
    case "archived":
      return "Arxivlangan";
    case "hold":
      return "Hold";
    case "accepted":
      return "Qabul qilindi";
    case "waiting":
      return "Kutilayotgan";
    case "pending":
      return "Keyin oladi";
    case "fulfilled":
      return "To'langan";
    case "rejected":
      return "Bekor qilingan";
    default:
      return "Nomalum";
  }
};
