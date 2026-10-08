const Order = require("../models/Order");
const Table = require("../models/Table");


// =========================
// GET ALL ORDERS
// =========================

const getOrders = async (req, res) => {

  try {

    const orders =
      await Order.find().sort({
        createdAt: -1
      });

    res.status(200).json(orders);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message
    });

  }

};


// =========================
// CREATE ORDER
// =========================

const createOrder = async (req, res) => {

  try {

    const {
      customer,
      food,
      quantity,
      amount,
      table,
      status
    } = req.body;


    // Check table

    if (!table) {

      return res.status(400).json({
        message: "Table is required"
      });

    }


    // Find selected table

    const selectedTable =
      await Table.findOne({
        tableNumber: table
      });


    if (!selectedTable) {

      return res.status(404).json({
        message: "Table not found"
      });

    }


    // Check table availability

    if (
      selectedTable.status === "Occupied"
    ) {

      return res.status(400).json({
        message: "Table is already occupied"
      });

    }


    // Create order

    const order =
      await Order.create({

        customer,

        food,

        quantity,

        amount,

        table,

        status: status || "Pending"

      });


    // Make table occupied

    await Table.findByIdAndUpdate(
      selectedTable._id,
      {
        status: "Occupied"
      }
    );


    res.status(201).json(order);

  } catch (error) {

    console.error(
      "Failed to create order:",
      error
    );

    res.status(500).json({
      message: "Failed to create order",
      error: error.message
    });

  }

};


// =========================
// UPDATE ORDER STATUS
// =========================

const updateOrder = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;


    // Find existing order

    const existingOrder =
      await Order.findById(id);


    if (!existingOrder) {

      return res.status(404).json({
        message: "Order not found"
      });

    }


    // Update order

    const order =
      await Order.findByIdAndUpdate(

        id,

        { status },

        {
          returnDocument: "after",
          runValidators: true
        }

      );


    // Completed / Cancelled
    // → Table becomes Available

    if (
      status === "Completed" ||
      status === "Cancelled"
    ) {

      await Table.findOneAndUpdate(

        {
          tableNumber:
            existingOrder.table
        },

        {
          status: "Available"
        }

      );

    }


    // Pending / Preparing
    // → Table becomes Occupied

    if (
      status === "Pending" ||
      status === "Preparing"
    ) {

      await Table.findOneAndUpdate(

        {
          tableNumber:
            existingOrder.table
        },

        {
          status: "Occupied"
        }

      );

    }


    res.status(200).json(order);

  } catch (error) {

    console.error(
      "Failed to update order:",
      error
    );

    res.status(500).json({
      message: "Failed to update order",
      error: error.message
    });

  }

};


// =========================
// DELETE ORDER
// =========================

const deleteOrder = async (req, res) => {

  try {

    const { id } = req.params;


    // Find order first

    const order =
      await Order.findById(id);


    if (!order) {

      return res.status(404).json({
        message: "Order not found"
      });

    }


    // Delete order

    await Order.findByIdAndDelete(id);


    // Make table available

    if (order.table) {

      await Table.findOneAndUpdate(

        {
          tableNumber: order.table
        },

        {
          status: "Available"
        }

      );

    }


    res.status(200).json({

      message:
        "Order deleted successfully",

      order

    });

  } catch (error) {

    console.error(
      "Failed to delete order:",
      error
    );

    res.status(500).json({
      message: "Failed to delete order",
      error: error.message
    });

  }

};


module.exports = {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder
};
