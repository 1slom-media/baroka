import axios from "axios";
import { toast } from "react-toastify";
import { getAllCategoryAction } from "redux-store/category/getAllCategory.slice";

//Product related requests
export async function getProductsPagination({ page, query }) {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product?page=${page}`,
  });
  return res.data;
}

export async function getProductsByCategory(id) {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${id}`,
  });

  return res.data;
}

export async function getTopProducts() {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product?page=1`,
  });
  return res.data;
}

export async function getMostSoldProducts() {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product?page=2`,
  });
  return res.data;
}

export async function getSingleProduct(payload) {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${payload}`,
  });
  return res.data;
}

export async function searchProduct(payload) {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product?filter=${payload}&&limit=7`,
  });

  return res.data;
}

export async function getMarketAll(params) {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/market`,
    params: params,
  });

  return res.data;
}

export async function getProductByStreamId(id) {
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/stream/${id}`
  );

  return product.data;
}

//Product releated requests end

// Category related requests start

export async function getAllCategories() {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
  });

  return res.data;
}

// Category related requests end

// Profile related requests start

export async function checkConfirmCodeFunc(payload) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/check/phone`,
      method: "post",
      data: payload.data,
    });
    payload.callBack(res.data.isAdmin);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
}

export async function getConfirmCodeFunc(payload) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/sign/phone`,
      method: "post",
      data: payload.data,
    });
    payload.callBack(res.data.message);
    toast.success(res.data.message);
    return {
      phone: payload.data.phone,
      message: res.data.message,
    };
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
}

export async function registerUser(payload) {
  const data = { ...payload.data };
  const phone = data["phone"];
  data["phone"] = `+${phone.replace(/\D/g, "")}`;
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
      data,
    });

    payload.callBack(res.data.isAdmin);

    return res.data;
  } catch (error) {
    return error.response;
  }
}

export async function authLoginByPhone(payload) {
  const data = { ...payload.data };
  const phone = data["phone"];
  data["phone"] = `+${phone.replace(/\D/g, "")}`;
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/phone`,
      data: payload.data,
    });
  } catch (error) {}
}

export async function authinticateUser(payload) {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
      data: payload.data,
    });
    payload.callBack(res.data.isAdmin);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return error.response;
  }
}

export async function getUserProfile(payload) {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
    headers: {
      auth: payload,
    },
  });

  let data = { token: payload, data: res.data };

  return data;
}

export async function editUserProfile(props) {
  try {
    const res = await axios({
      method: "put",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`,
      headers: {
        auth: props.token,
      },
      data: props.data,
    });
    toast.success("O'zgarishlar saqlandi");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// Profile related requests ends

// profile streams requests start
export async function createStream({ token, data, callback }) {
  const res = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/stream`,
    data: data,
    headers: {
      auth: token,
    },
  });
  callback();
  return res.data;
}

export async function deleteStream(payload) {
  try {
    const res = await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/stream/${payload._id}`,
      headers: {
        auth: payload.token,
      },
    });

    toast.success(res.data.message);
    payload.callBack();
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export async function getAllUserStreams({ token, limit, filter, page }) {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/stream`,
    headers: {
      auth: token,
    },
    params: {
      limit,
      filter,
      page,
    },
  });

  return res.data;
}
// profile streams requests end
// user statistics start

export async function getUserStatistics(props) {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/stream?page=${props.page}&limit=${
      props.limit
    }&filter=${props.filter ? props.filter : ""}`,
    headers: {
      auth: props.token,
    },
  });
  return res.data;
}

export async function getStreamDetails({ id, token, params }) {
  try {
    const streamDetail = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/stream/details/${id}`,
      method: "GET",
      headers: {
        auth: token,
      },
      params
    });
    return streamDetail.data;
  } catch (error) {}
}

// User requests

export async function getUserRequestsAsync({ token, page, limit, filter }) {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/request`,
    headers: {
      auth: token,
    },
    params: {
      limit,
      page,
      filter,
    },
  });
  return res.data;
}

// konkurs uchun start

export async function getUserGame(token) {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/konkurs`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}
// konkurs uchun start

export async function getUserGameNyId({ token, id }) {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/konkurs/${id}`,
    headers: {
      auth: token,
    },
  });
  return res.data;
}

//Konkurs end

//Payment start

export async function getUserPayments({ token, limit, page, filter }) {
  const res = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/user-payment`,
    headers: {
      auth: token,
    },
    params: {
      limit,
      page,
      filter,
    },
  });
  return res.data;
}

export async function addUserPayment(payload) {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/add`,
      headers: {
        auth: payload.token,
      },
      data: payload.values,
    });
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

//Payment end

// User orders request start

export async function getUserOrders(token) {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/all`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function getOneUserOrder({ id, token }) {
  const res = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/${id}`,
    headers: {
      auth: token,
    },
  });

  return res.data;
}

export async function createOrder({ data, callback }) {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/add`,
      data,
    });
    callback(res.data.number);
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error.response.data.message
        : "Nomalum xatolik yuz berdi"
    );
  }
}
// User orders request end

// admin page requests

export async function getStatusCount(token, setData) {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/admin-status`,
      headers: {
        auth: token,
      },
    });
    setData(result.data?.statusOrderCount);
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function getRecentPurchase(token) {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/delivered`,
      headers: {
        auth: token,
      },
    });
    const filterFirst = result?.data?.products?.filter(
      (item) => item.length !== 0
    );
    const filter = filterFirst?.map((doc) => {
      return {
        qty: doc.total,
        name: doc?.product?.name,
        image: doc?.product?.image,
        price: doc?.product?.price,
        id: doc?.product?._id,
      };
    });

    return filter;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function getWeeklyOrder(token) {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/admin/week`,
      headers: {
        auth: token,
      },
    });

    return result.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function createNewCategory(
  token,
  values,
  setLoading,
  setCat,
  dispatch
) {
  const formData = new FormData();
  formData.append("avatar", values.file);
  formData.append("label", values.label);
  setLoading(true);
  try {
    await axios({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/add`,
      headers: {
        auth: token,
      },
      data: formData,
    });
    setLoading(false);
    setCat(false);
    toast.success("Kategoriya muvaffaqiyatli qo'shildi");
    dispatch(getCategoryList());
    values.setFieldValue("avatar", "");
    values.setFieldValue("label", "");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    setLoading(false);
  }
}

export async function editCategoryHandler(
  token,
  values,
  setModal,
  uid,
  dispatch
) {
  const formData = new FormData();
  formData.append("label", values.label);
  formData.append("avatar", values.file);
  try {
    setModal(false);
    const res = await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${uid}`,
      headers: {
        auth: token,
      },
      data: formData,
    });
    toast.success(res.data.message);
    dispatch(getAllCategoryAction());
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function deleteCategoryHandler(token, setModal, uid, dispatch) {
  try {
    setModal(false);
    await axios({
      method: "delete",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/category/${uid}`,
      headers: {
        auth: token,
      },
    });
    dispatch(getAllCategoryAction());
    toast.success("Kategoriya muvaffaqiyatli o'chirildi");
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function createNewProduct(
  token,
  values,
  id,
  setLoading,
  resetForm
) {
  setLoading(true);
  const forms = new FormData();
  forms.append("category", values.category);
  forms.append("referal_price", values.referal_price);
  forms.append("name", values.name);
  forms.append("postLink", values.postLink);
  forms.append("price", values.price);
  forms.append("description", values.description);
  values?.files?.forEach((file) => {
    forms?.append("files", file);
  });
  forms.append("files", values.files);

  await axios({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/product`,
    method: "post",
    headers: {
      auth: token,
    },
    data: forms,
  })
    .then(() => {
      setLoading(false);
      toast.success("Mahsulot muvaffaqiyatli qo'shildi");
      resetForm();
    })
    .catch(() => {
      setLoading(false);
      toast.error("Xatolik yuz berdi qaytadan urininb ko'ring");
    });
}

export async function editProductDetails(token, values, id, setLoading) {
  setLoading(true);
  const data = new FormData();
  data.append("category", values.category);
  data.append("referal_price", values.referal_price);
  data.append("name", values.name);
  data.append("postLink", values.postLink);
  data.append("price", values.price);
  data.append("description", values.description);
  data.append("files", values.files);
  values?.files?.forEach((file) => {
    data?.append("files", file);
  });
  data.append("image", JSON.stringify(values.image));

  try {
    setLoading(false);
    await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`,
      method: "put",
      headers: {
        auth: token,
      },
      data: data,
    });
    toast.success("Product successfully edited!");
    window.location.href = "/admin/admin/products";
  } catch (error) {
    setLoading(false);
    toast.error(
      error.response?.data?.message
        ? error.response.data.message
        : "Nomalum Xatolik!"
    );
  }
}

export async function getOneProduct(id) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/${id}`,
      method: "get",
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function getDataForPrinter(token, setPrintLoader) {
  setPrintLoader(true);
  try {
    const result = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/admin/getall?status=delivered`,
      method: "get",
      headers: {
        auth: token,
      },
    });
    setPrintLoader(false);

    return result.data;
  } catch (error) {
    setPrintLoader(false);
  }
}

export async function getSettings() {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/setting`,
      method: "get",
    });
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function saveSettings(data, token) {
  try {
    await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/setting/admin`,
      method: "POST",
      headers: {
        auth: token,
      },
      data: data,
    });
    toast.success("O'zgarishlar saqlandi!");
  } catch (error) {
    toast.error(error.data.message);
  }
}

export async function getAdminData(userId, token) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/statistics?userId=${userId}&type=info`,
      method: "get",
      headers: {
        auth: token,
      },
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}

export async function getSiteSettingsInfo() {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/setting`,
      method: "GET",
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getBotSettingsInfo(token) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/botsettings`,
      method: "GET",
      headers: {
        auth: token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBotSettingsInfo({ token, data }) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/botsettings`,
      method: "PUT",
      headers: {
        auth: token,
      },
      data,
    });
    toast.success("Sozlamalar saqlandi");
    return res.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik"
    );
  }
}

export async function getSoldProductsMost(token) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/delivered`,
      method: "GET",
      headers: {
        auth: token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSellersTop(token) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/best-sellers`,
      method: "GET",
      headers: {
        auth: token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateStreamRegionAsync({
  token,
  isRegionOn,
  id,
  callBack,
}) {
  try {
    const res = await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/stream/${id}`,
      headers: {
        auth: token,
      },
      data: { isRegionOn },
    });
    callBack();
    toast.success(
      res?.data?.isRegionOn
        ? "Viloyat tanlash yoqildi!"
        : "Viloyat tanlash o'chirildi!"
    );
    return res.data;
  } catch (error) {

    toast.error(
      error?.response?.data?.message
        ? error?.response?.data?.message
        : "Nomalum xatolik!"
    );
  }
}

export async function getMarketingOrders({ token, params }) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/stream/statistics`,
      method: "GET",
      headers: {
        auth: token,
      },
      params,
    });

    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
}
