import api from "./api";

const API_URL = "/tables";


// =========================
// GET ALL TABLES
// =========================

export const getTables = async () => {

  const response =
    await api.get(API_URL);

  return response.data;

};


// =========================
// CREATE TABLE
// =========================

export const createTable = async (
  tableData
) => {

  const response =
    await api.post(
      API_URL,
      tableData
    );

  return response.data;

};


// =========================
// UPDATE TABLE
// =========================

export const updateTable = async (
  id,
  tableData
) => {

  const response =
    await api.put(
      `${API_URL}/${id}`,
      tableData
    );

  return response.data;

};


// =========================
// DELETE TABLE
// =========================

export const deleteTable = async (
  id
) => {

  const response =
    await api.delete(
      `${API_URL}/${id}`
    );

  return response.data;

};
