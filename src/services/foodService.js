import api from "./api";

const API_URL = "/foods";


// =========================
// GET ALL FOODS
// =========================

export const getFoods = async () => {

  const response =
    await api.get(API_URL);

  return response.data;

};


// =========================
// CREATE FOOD
// =========================

export const createFood = async (
  foodData
) => {

  const response =
    await api.post(
      API_URL,
      foodData
    );

  return response.data;

};


// =========================
// UPDATE FOOD
// =========================

export const updateFood = async (
  id,
  foodData
) => {

  const response =
    await api.put(
      `${API_URL}/${id}`,
      foodData
    );

  return response.data;

};


// =========================
// DELETE FOOD
// =========================

export const deleteFood = async (
  id
) => {

  const response =
    await api.delete(
      `${API_URL}/${id}`
    );

  return response.data;

};
