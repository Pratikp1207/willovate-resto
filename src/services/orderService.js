import api from "./api";

const API_URL = "/orders";


// =========================
// GET ALL ORDERS
// =========================

export const getOrders = async () => {

  const response =
    await api.get(API_URL);

  return response.data;

};


// =========================
// CREATE ORDER
// =========================

export const createOrder = async (
  orderData
) => {

  const response =
    await api.post(
      API_URL,
      orderData
    );

  return response.data;

};


// =========================
// UPDATE ORDER STATUS
// =========================

export const updateOrder = async (
  id,
  status
) => {

  const response =
    await api.put(
      `${API_URL}/${id}`,
      { status }
    );

  return response.data;

};


// =========================
// DELETE ORDER
// =========================

export const deleteOrder = async (
  id
) => {

  const response =
    await api.delete(
      `${API_URL}/${id}`
    );

  return response.data;

};
