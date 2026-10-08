const express = require("express");

const router = express.Router();

const {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const protect =
  require("../middleware/authMiddleware");


// =========================
// PROTECTED ORDER ROUTES
// =========================


// GET ALL ORDERS
router.get(
  "/",
  protect,
  getOrders
);


// CREATE ORDER
router.post(
  "/",
  protect,
  createOrder
);


// UPDATE ORDER
router.put(
  "/:id",
  protect,
  updateOrder
);


// DELETE ORDER
router.delete(
  "/:id",
  protect,
  deleteOrder
);


module.exports = router;
