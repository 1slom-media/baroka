import { all, call } from "redux-saga/effects";
// import {
//   userSaga,
//   userStatsSaga,
//   userStreamsSaga,
//   userStreamsSagaAll,
//   userAuthSagaAll,
//   userAuthRegister,
//   userUpdateSagaAll,
// } from "./user/user.saga";
// import { categorySaga } from "./category/saga";
import {
  productsSaga,
  customersSaga,
  ordersSaga,
  orderSaga,
  operatorsSaga,
  filteredOrderSaga,
  adminPaymentSaga,
} from "./admin/admin.saga";
// import { userOrdersSaga } from "./success/success.saga";

export default function* rootSaga() {
  yield all([
    // call(userSaga),
    // call(categorySaga),
    // call(userStatsSaga),
    // call(userStreamsSaga),
    call(productsSaga),
    call(customersSaga),
    call(ordersSaga),
    call(orderSaga),
    // call(userOrdersSaga),
    call(operatorsSaga),
    call(filteredOrderSaga),
    call(adminPaymentSaga),
    // call(userStreamsSagaAll),
    // call(userAuthSagaAll),
    // call(userAuthRegister),
    // call(userUpdateSagaAll),
  ]);
}
