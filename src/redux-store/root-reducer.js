import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { reducer as formReducer } from "redux-form";
import productsPaginationReducer from "./products/pagination.slice";
import marketPaginationReducer from "./products/marketPagination.slice";
import getSingleProductReducer from "./products/singleGet.slice";
import topProductsReducer from "./products/top.slice";
import mostSoldProductsReducer from "./products/most.slice";
import getByCategoryReducer from "./products/byCategory.slice";
import getAllCategorySlice from "./category/getAllCategory.slice";
import authReducer from "./user/auth.slice";
import userProfileReducer from "./user/user.slice";
import getUserStatsReducer from "./statistics/get.slice";
import userRequestsReducer from "./requests/get.slice";
import getUserStreamsReducer from "./stream/get.slice";
import gameReducer from "./game/game.slice";
import userPaymentsReducer from "./payment/payment.slice";
import cartReducer from "./cart/cart.slice";
import createUserStreams from "./stream/create.slice";
import addUserPaymentSlice from "./payment/addPayment.slice";
import getUserOrdersSlice from "./orders/orders.slice";
import createUserOrderSlice from "./orders/create.slice";
import searchProductSlice from "./products/search.slice";
import streamDetailsSlice from "./statistics/details.slice";
import notifySlice from "./admin/notify/notify.slice";
import adminSlice from "./admin/admin.slice";
import checkboxSlice from "./admin/checkbox/order.slice";
import adminCustomerSlice from "./admin/admin.customer.slice";
import deleteUserStreams from "./stream/delete.slice";
import siteSettingsReducer from "./settings/site.settings.slice";
import streamRegionReducer from "./stream/region.slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "auth", "cart"],
};

const rootReducer = combineReducers({
  form: formReducer,
  streamRegion: streamRegionReducer,
  admin: adminSlice,
  productPagination: productsPaginationReducer,
  marketPagination: marketPaginationReducer,
  productGet: getSingleProductReducer,
  topProducts: topProductsReducer,
  mostSoldProducts: mostSoldProductsReducer,
  productsByCategory: getByCategoryReducer,
  categories: getAllCategorySlice,
  auth: authReducer,
  user: userProfileReducer,
  userStats: getUserStatsReducer,
  userReqs: userRequestsReducer,
  streamsGet: getUserStreamsReducer,
  game: gameReducer,
  userPayments: userPaymentsReducer,
  userCreatePayments: addUserPaymentSlice,
  cart: cartReducer,
  createdStream: createUserStreams,
  userOrders: getUserOrdersSlice,
  orderCreate: createUserOrderSlice,
  searchProduct: searchProductSlice,
  streamDetails: streamDetailsSlice,
  notify: notifySlice,
  orderCheck: checkboxSlice,
  adminCustomer: adminCustomerSlice,
  deleteStream: deleteUserStreams,
  settings: siteSettingsReducer,
});

export default persistReducer(persistConfig, rootReducer);
