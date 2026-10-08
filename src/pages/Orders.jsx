import { useEffect, useState } from "react";

import {
  getOrders,
  updateOrder,
  deleteOrder
} from "../services/orderService";

import "../styles/orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  // =========================
  // GET ORDERS
  // =========================

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        const data = await getOrders();

        console.log(
          "Orders from backend:",
          data
        );

        setOrders(data);

      } catch (error) {

        console.error(
          "Failed to fetch orders:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);


  // =========================
  // UPDATE STATUS
  // =========================

  const handleStatusChange = async (
    id,
    status
  ) => {

    try {

      const updatedOrder =
        await updateOrder(
          id,
          status
        );


      setOrders(
        (prevOrders) =>
          prevOrders.map(
            (order) =>
              order._id === id
                ? updatedOrder
                : order
          )
      );


    } catch (error) {

      console.error(
        "Failed to update order status:",
        error
      );

    }

  };


  // =========================
  // DELETE ORDER
  // =========================

  const handleDeleteOrder = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      await deleteOrder(id);


      setOrders(
        (prevOrders) =>
          prevOrders.filter(
            (order) =>
              order._id !== id
          )
      );


    } catch (error) {

      console.error(
        "Failed to delete order:",
        error
      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="orders-page">

        <div className="orders-loading">
          Loading orders...
        </div>

      </div>
    );

  }


  return (

    <div className="orders-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="orders-header">

        <div>

          <h1>
            Orders
          </h1>

          <p>
            Manage and track restaurant orders.
          </p>

        </div>


        <div className="orders-count">

          <span>
            {orders.length}
          </span>

          <small>
            Total Orders
          </small>

        </div>

      </div>


      {/* =========================
          NO ORDERS
      ========================= */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <div className="empty-order-icon">
            🛒
          </div>

          <h2>
            No orders found
          </h2>

          <p>
            New customer orders will appear here.
          </p>

        </div>

      ) : (

        <div className="orders-container">

          {orders.map(
            (order) => (

              <div
                className="order-card"
                key={order._id}
              >

                {/* =========================
                    HEADER
                ========================= */}

                <div className="order-header">

                  <div>

                    <span className="order-label">
                      ORDER
                    </span>

                    <h3>
                      #{order._id.slice(-6)}
                    </h3>

                  </div>

                  <span
                    className={`order-status ${order.status
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {order.status}
                  </span>

                </div>


                {/* =========================
                    CUSTOMER
                ========================= */}

                <div className="order-detail">

                  <span>
                    Customer
                  </span>

                  <strong>
                    {order.customer}
                  </strong>

                </div>


                {/* =========================
                    FOOD
                ========================= */}

                <div className="order-detail">

                  <span>
                    Food
                  </span>

                  <strong>
                    {order.food}
                  </strong>

                </div>


                {/* =========================
                    TABLE
                ========================= */}

                <div className="order-detail">

                  <span>
                    Table
                  </span>

                  <strong>
                    {order.table
                      ? `Table ${order.table}`
                      : "Not assigned"}
                  </strong>

                </div>


                {/* =========================
                    QUANTITY
                ========================= */}

                <div className="order-detail">

                  <span>
                    Quantity
                  </span>

                  <strong>
                    {order.quantity}
                  </strong>

                </div>


                {/* =========================
                    AMOUNT
                ========================= */}

                <div className="order-amount">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{order.amount}
                  </strong>

                </div>


                {/* =========================
                    STATUS CONTROL
                ========================= */}

                <div className="order-status-control">

                  <label>
                    Update Status
                  </label>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                  >

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Preparing">
                      Preparing
                    </option>

                    <option value="Completed">
                      Completed
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>

                  </select>

                </div>


                {/* =========================
                    DELETE
                ========================= */}

                <button
                  className="delete-order-btn"
                  onClick={() =>
                    handleDeleteOrder(
                      order._id
                    )
                  }
                >
                  🗑 Delete Order
                </button>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );

}

export default Orders;
