const express = require("express");

const Category = require("../models/Category");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);

// GET ALL CATEGORIES

router.get("/", async (req, res) => {

  try {

    const categories =
      await Category.find().sort({
        createdAt: -1
      });

    res.json(categories);

  } catch (error) {

    console.error(
      "Failed to fetch categories:",
      error
    );

    res.status(500).json({
      message: "Failed to fetch categories"
    });

  }

});


// CREATE CATEGORY

router.post("/", async (req, res) => {

  try {

    const { name } = req.body;

    if (!name) {

      return res.status(400).json({
        message: "Category name is required"
      });

    }

    const category =
      await Category.create({
        name
      });

    res.status(201).json(category);

  } catch (error) {

    console.error(
      "Failed to create category:",
      error
    );

    res.status(500).json({
      message: "Failed to create category"
    });

  }

});


// UPDATE CATEGORY

router.put("/:id", async (req, res) => {

  try {

    const { name } = req.body;

    const category =
      await Category.findByIdAndUpdate(
        req.params.id,
        { name },
        {
          new: true,
          runValidators: true
        }
      );

    if (!category) {

      return res.status(404).json({
        message: "Category not found"
      });

    }

    res.json(category);

  } catch (error) {

    console.error(
      "Failed to update category:",
      error
    );

    res.status(500).json({
      message: "Failed to update category"
    });

  }

});


// DELETE CATEGORY

router.delete("/:id", async (req, res) => {

  try {

    const category =
      await Category.findByIdAndDelete(
        req.params.id
      );

    if (!category) {

      return res.status(404).json({
        message: "Category not found"
      });

    }

    res.json({
      message: "Category deleted successfully"
    });

  } catch (error) {

    console.error(
      "Failed to delete category:",
      error
    );

    res.status(500).json({
      message: "Failed to delete category"
    });

  }

});


module.exports = router;
