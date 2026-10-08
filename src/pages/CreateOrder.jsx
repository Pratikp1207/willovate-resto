import { useEffect, useState } from "react";

import { createOrder } from "../services/orderService";
import { getTables } from "../services/tableService";

import "../styles/CreateOrder.css";
function CreateOrder({ foods, addOrder }) {

  const [customer, setCustomer] = useState("");
  const [foodId, setFoodId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [tables, setTables] = useState([]);
  const [table, setTable] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // =========================
  // GET AVAILABLE TABLES
  // =========================

  useEffect(() => {

    const fetchTables = async () => {

      try {

        const data = await getTables();

        const availableTables = data.filter(
          (item) => item.status === "Available"
        );

        setTables(availableTables);

      } catch (error) {

        console.error(
          "Failed to fetch tables:",
          error
        );

        setError("Failed to load tables");

      }

    };

    fetchTables();

  }, []);


  // =========================
  // SELECTED FOOD
  // =========================

  const selectedFood = foods.find(
    (food) =>
      (food._id || food.id) === foodId
  );


  // =========================
  // PRICE
  // =========================

  const price = selectedFood
    ? Number(selectedFood.price)
    : 0;


  // =========================
  // TOTAL
  // =========================

  const amount =
    price * Number(quantity);


  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    if (!customer.trim()) {

      setError(
        "Please enter customer name"
      );

      return;

    }


    if (!foodId) {

      setError(
        "Please select a food"
      );

      return;

    }


    if (!table) {

      setError(
        "Please select a table"
      );

      return;

    }


    if (
      !quantity ||
      Number(quantity) < 1
    ) {

      setError(
        "Please enter valid quantity"
      );

      return;

    }


    try {

      setLoading(true);


      const newOrder = {

        customer:
          customer.trim(),

        food:
          selectedFood.name,

        quantity:
          Number(quantity),

        amount,

        table:
          Number(table),

        status:
          "Pending"

      };


      const order =
        await createOrder(newOrder);


      console.log(
        "Order created:",
        order
      );


      // Update App state

      addOrder(order);


      // Reset form

      setCustomer("");
      setFoodId("");
      setQuantity(1);
      setTable("");


      alert(
        "Order created successfully"
      );


    } catch (error) {

      console.error(
        "Failed to create order:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Failed to create order"
      );


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="create-order-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="create-order-header">

        <div>

          <h1>
            Create Order
          </h1>

          <p>
            Create a new restaurant order
          </p>

        </div>

        <div className="create-order-icon">
          📝
        </div>

      </div>


      {/* =========================
          ERROR
      ========================= */}

      {error && (

        <p className="create-order-error">
          {error}
        </p>

      )}


      {/* =========================
          FORM CARD
      ========================= */}

      <div className="create-order-card">

        <form
          className="create-order-form"
          onSubmit={handleSubmit}
        >

          {/* CUSTOMER */}

          <div className="create-order-form-group">

            <label>
              Customer Name
            </label>

            <input
              type="text"
              placeholder="Enter customer name"
              value={customer}
              onChange={(e) =>
                setCustomer(e.target.value)
              }
            />

          </div>


          {/* FOOD */}

          <div className="create-order-form-group">

            <label>
              Select Food
            </label>

            <select
              value={foodId}
              onChange={(e) =>
                setFoodId(e.target.value)
              }
            >

              <option value="">
                Select Food
              </option>


              {foods.map(
                (food) => (

                  <option
                    key={
                      food._id ||
                      food.id
                    }
                    value={
                      food._id ||
                      food.id
                    }
                  >

                    {food.name} - ₹
                    {food.price}

                  </option>

                )
              )}

            </select>

          </div>


          {/* TABLE */}

          <div className="create-order-form-group">

            <label>
              Select Table
            </label>

            <select
              value={table}
              onChange={(e) =>
                setTable(e.target.value)
              }
            >

              <option value="">
                Select Table
              </option>


              {tables.map(
                (item) => (

                  <option
                    key={item._id}
                    value={item.tableNumber}
                  >

                    Table{" "}
                    {item.tableNumber}
                    {" - "}
                    {item.seats}
                    {" Seats"}

                  </option>

                )
              )}

            </select>


            {tables.length === 0 && (

              <p className="no-tables-message">
                ⚠️ No available tables
              </p>

            )}

          </div>


          {/* QUANTITY */}

          <div className="create-order-form-group">

            <label>
              Quantity
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
            />

          </div>


          {/* PRICE */}

          <div className="create-order-price-box">

            <span>
              Price
            </span>

            <strong>
              ₹{price}
            </strong>

          </div>


          {/* TOTAL */}

          <div className="create-order-total">

            <span>
              Total Amount
            </span>

            <strong>
              ₹{amount}
            </strong>

          </div>


          {/* SUBMIT */}

          <button
            className="create-order-btn"
            type="submit"
            disabled={
              loading ||
              tables.length === 0
            }
          >

            {loading
              ? "Creating Order..."
              : "Create Order"}

          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateOrder;
