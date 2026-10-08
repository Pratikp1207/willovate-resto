import api from "./api";

const API_URL = "/categories";


// =========================
// GET ALL CATEGORIES
// =========================

export const getCategories = async () => {

  const response =
    await api.get(API_URL);

  return response.data;

};


// =========================
// CREATE CATEGORY
// =========================

export const createCategory = async (
  name
) => {

  const response =
    await api.post(
      API_URL,
      { name }
    );

  return response.data;

};


// =========================
// UPDATE CATEGORY
// =========================

export const updateCategory = async (
  id,
  name
) => {

  const response =
    await api.put(
      `${API_URL}/${id}`,
      { name }
    );

  return response.data;

};


// =========================
// DELETE CATEGORY
// =========================

export const deleteCategory = async (
  id
) => {

  const response =
    await api.delete(
      `${API_URL}/${id}`
    );

  return response.data;

};
