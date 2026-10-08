const express = require("express");

const {
  getFoods,
  createFood,
  updateFood,
  deleteFood
} = require("../controllers/foodController");

const protect =
  require("../middleware/authMiddleware");


const router = express.Router();


// =========================
// PROTECTED FOOD ROUTES
// =========================


// GET ALL FOODS
router.get(
  "/",
  protect,
  getFoods
);


// CREATE FOOD
router.post(
  "/",
  protect,
  createFood
);


// UPDATE FOOD
router.put(
  "/:id",
  protect,
  updateFood
);


// DELETE FOOD
router.delete(
  "/:id",
  protect,
  deleteFood
);


module.exports = router;
