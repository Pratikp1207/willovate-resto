const express = require("express");

const Table = require("../models/Table");

const protect =
  require("../middleware/authMiddleware");

const router = express.Router();


// =========================
// GET ALL TABLES
// =========================

router.get(
  "/",
  protect,
  async (req, res) => {

    try {

      const tables =
        await Table.find().sort({
          tableNumber: 1
        });

      res.json(tables);

    } catch (error) {

      console.error(
        "Failed to fetch tables:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch tables"
      });

    }

  }
);


// =========================
// CREATE TABLE
// =========================

router.post(
  "/",
  protect,
  async (req, res) => {

    try {

      const {
        tableNumber,
        seats
      } = req.body;


      if (
        !tableNumber ||
        !seats
      ) {

        return res.status(400).json({
          message:
            "Table number and seats are required"
        });

      }


      const table =
        await Table.create({

          tableNumber,

          seats,

          status:
            "Available"

        });


      res.status(201).json(
        table
      );

    } catch (error) {

      console.error(
        "Failed to create table:",
        error
      );

      res.status(500).json({
        message:
          "Failed to create table"
      });

    }

  }
);


// =========================
// UPDATE TABLE
// =========================

router.put(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const {
        tableNumber,
        seats,
        status
      } = req.body;


      const table =
        await Table.findByIdAndUpdate(

          req.params.id,

          {
            tableNumber,
            seats,
            status
          },

          {
            new: true,
            runValidators: true
          }

        );


      if (!table) {

        return res.status(404).json({
          message:
            "Table not found"
        });

      }


      res.json(table);

    } catch (error) {

      console.error(
        "Failed to update table:",
        error
      );

      res.status(500).json({
        message:
          "Failed to update table"
      });

    }

  }
);


// =========================
// DELETE TABLE
// =========================

router.delete(
  "/:id",
  protect,
  async (req, res) => {

    try {

      const table =
        await Table.findByIdAndDelete(
          req.params.id
        );


      if (!table) {

        return res.status(404).json({
          message:
            "Table not found"
        });

      }


      res.json({
        message:
          "Table deleted successfully"
      });

    } catch (error) {

      console.error(
        "Failed to delete table:",
        error
      );

      res.status(500).json({
        message:
          "Failed to delete table"
      });

    }

  }
);


module.exports = router;
