import { call, takeLatest, put } from "redux-saga/effects";
import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setProducts,
  setCustomers,
  setOrders,
  setOperators,
  setFilteredOrders,
  setAdminAllPayments,
} from "./admin.slice";
import { setOrder } from "./order.slice";

async function getProducts(payload) {
  try {
    const result = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/product/admin/all`,
      headers: {
        auth: `12345${payload?.token}`,
      },
    });

    return result.data;
  } catch (error) {
  }
}

async function getCustomers(token) {
  const result = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/user`,
    headers: {
      auth: `12345${token}`,
    },
  });

  return result?.data;
}

async function getOrders(token) {
  const result = await axios({
    method: "GET",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/admin/getall`,
    headers: {
      auth: `12345${token}`,
    },
  });

  return result?.data;
}

async function getOneOrder(id) {
  const result = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/${id}`,
  });

  return result?.data;
}

async function getOrdersByStatus(status, token, setLoading) {
  setLoading(true);
  try {
    const result = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/order/admin/getall?status=${status}`,
      method: "get",
      headers: {
        auth: `12345${token}`,
      },
    });
    setLoading(false);

    return result.data;
  } catch (error) {
    setLoading(false);
  }
}

async function getOperators(token) {
  const res = await axios({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/operator`,
    method: "get",
    headers: {
      auth: `12345${token}`,
    },
  });

  return res?.data;
}

async function getAdminPayments(token) {
  try {
    const res = await axios({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/admin-payment`,
      method: "get",
      headers: {
        auth: `12345${token}`,
      },
    });

    return res.data;
  } catch (error) {}
}

// =====================================================================

// admin products saga

export const getAdminProducts = createAction("getProducts/getAsync");

function* adminProductsSaga({ payload }) {
  try {
    const products = yield call(getProducts, payload);
    yield put(setProducts(products));
  } catch (error) {}
}

export function* productsSaga() {
  yield takeLatest(getAdminProducts, adminProductsSaga);
}

// =======================================================================

// operators saga
export const getOperatorList = createAction("getOperators/getAsync");

function* operatorListSaga({ payload }) {
  try {
    const operators = yield call(getOperators, payload.token);
    yield put(setOperators(operators));
  } catch (error) {}
}

export function* operatorsSaga() {
  yield takeLatest(getOperatorList, operatorListSaga);
}

// =======================================================================

// customers saga

export const getCustomersList = createAction("getCustomers/getAsync");

function* customersListSaga({ payload }) {
  try {
    const customers = yield call(getCustomers, payload?.token);
    yield put(setCustomers(customers));
  } catch (error) {}
}

export function* customersSaga() {
  yield takeLatest(getCustomersList, customersListSaga);
}
// ======================================================================
// orders saga

export const getOrdersList = createAction("getOrders/getAsync");

function* ordersListSaga({ payload }) {
  try {
    const orders = yield call(getOrders, payload?.token);
    yield put(setOrders(orders));
  } catch (error) {}
}

export function* ordersSaga() {
  yield takeLatest(getOrdersList, ordersListSaga);
}

// ======================================================================
// one order saga

export const getOneOrderObj = createAction("getOrder/getAsync");

function* oneOrder({ payload }) {
  try {
    const order = yield call(getOneOrder, payload?.orderID);
    yield put(setOrder(order));
  } catch (err) {
  }
}

export function* orderSaga() {
  yield takeLatest(getOneOrderObj, oneOrder);
}

// ======================================================================

export const getOrdersByStatusAction = createAction("getStatusOrder/getAsync");

function* ordersByStatus({ payload }) {
  try {
    const orders = yield call(
      getOrdersByStatus,
      payload?.status,
      payload?.token,
      payload?.setLoading
    );
    yield put(setFilteredOrders(orders));
  } catch (error) {}
}

export function* filteredOrderSaga() {
  yield takeLatest(getOrdersByStatusAction, ordersByStatus);
}

// ====================================================================

export const getAdminAllPaymentAction = createAction(
  "getAllPaymentAdmin/getAsync"
);

function* paymentsForAdmin({ payload }) {
  try {
    const payments = yield call(getAdminPayments, payload);
    yield put(setAdminAllPayments(payments));
  } catch (error) {}
}

export function* adminPaymentSaga() {
  yield takeLatest(getAdminAllPaymentAction, paymentsForAdmin);
}
