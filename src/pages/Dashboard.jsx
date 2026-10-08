import { useEffect, useState } from "react";

import { getTables } from "../services/tableService";

import "../styles/dashboard.css";


function Dashboard({
  foods = [],
  orders = []
}) {

  const [tables, setTables] =
    useState([]);


  // =========================
  // GET TABLES
  // =========================

  useEffect(() => {

    const fetchTables = async () => {

      try {

        const data =
          await getTables();

        setTables(data);

      } catch (error) {

        console.error(
          "Failed to fetch tables:",
          error
        );

      }

    };

    fetchTables();

  }, []);


  // =========================
  // CALCULATIONS
  // =========================

  const totalFoods =
    foods.length;


  const totalOrders =
    orders.length;


  const availableTables =
    tables.filter(
      (table) =>
        table.status === "Available"
    ).length;


  const occupiedTables =
    tables.filter(
      (table) =>
        table.status === "Occupied"
    ).length;


  const revenue =
    orders.reduce(
      (total, order) =>
        total +
        Number(order.amount || 0),
      0
    );


  return (

    <div className="dashboard">

      <h1>
        Dashboard
      </h1>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-cards">


        {/* FOODS */}

        <div className="dashboard-card">

          <h3>
            Total Foods
          </h3>

          <h2>
            {totalFoods}
          </h2>

        </div>


        {/* ORDERS */}

        <div className="dashboard-card">

          <h3>
            Total Orders
          </h3>

          <h2>
            {totalOrders}
          </h2>

        </div>


        {/* AVAILABLE TABLES */}

        <div className="dashboard-card">

          <h3>
            Available Tables
          </h3>

          <h2>
            {availableTables}
          </h2>

        </div>


        {/* OCCUPIED TABLES */}

        <div className="dashboard-card">

          <h3>
            Occupied Tables
          </h3>

          <h2>
            {occupiedTables}
          </h2>

        </div>


        {/* REVENUE */}

        <div className="dashboard-card">

          <h3>
            Revenue
          </h3>

          <h2>
            ₹{revenue}
          </h2>

        </div>


      </div>


      {/* =========================
          RECENT ORDERS
      ========================= */}

      <div className="recent-orders">

        <h2>
          Recent Orders
        </h2>


        {orders.length === 0 ? (

          <p>
            No orders found
          </p>

        ) : (

          orders
            .slice(0, 5)
            .map(
              (order) => (

                <div
                  className="recent-order"
                  key={order._id}
                >

                  <div>

                    <strong>
                      {order.customer}
                    </strong>

                    <p>
                      {order.food}
                    </p>

                  </div>


                  <div>

                    <p>
                      Table{" "}
                      {order.table ||
                        "N/A"}
                    </p>

                    <strong>
                      ₹{order.amount}
                    </strong>

                  </div>


                  <span>
                    {order.status}
                  </span>

                </div>

              )
            )

        )}

      </div>

    </div>

  );

}


export default Dashboard;
