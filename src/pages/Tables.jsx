import { useEffect, useState } from "react";

import {
  getTables,
  createTable,
  updateTable,
  deleteTable
} from "../services/tableService";

import "../styles/tables.css";

function Tables() {

  const [tables, setTables] = useState([]);

  const [tableNumber, setTableNumber] = useState("");

  const [seats, setSeats] = useState("");

  const [editingId, setEditingId] = useState(null);


  // =========================
  // GET TABLES
  // =========================

  useEffect(() => {

    const fetchTables = async () => {

      try {

        const data = await getTables();

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
  // ADD / UPDATE
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!tableNumber || !seats) {

      alert(
        "Please enter table number and seats"
      );

      return;

    }


    try {

      const tableData = {

        tableNumber: Number(tableNumber),

        seats: Number(seats)

      };


      if (editingId) {

        const updatedTable =
          await updateTable(
            editingId,
            tableData
          );


        setTables(
          (prevTables) =>
            prevTables.map(
              (table) =>
                table._id === editingId
                  ? updatedTable
                  : table
            )
        );


        setEditingId(null);

      } else {

        const newTable =
          await createTable(tableData);


        setTables(
          (prevTables) => [
            ...prevTables,
            newTable
          ]
        );

      }


      setTableNumber("");

      setSeats("");


    } catch (error) {

      console.error(
        "Failed to save table:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to save table"
      );

    }

  };


  // =========================
  // EDIT
  // =========================

  const handleEdit = (table) => {

    setTableNumber(
      table.tableNumber
    );

    setSeats(
      table.seats
    );

    setEditingId(
      table._id
    );

  };


  // =========================
  // STATUS CHANGE
  // =========================

  const handleStatusChange = async (table) => {

    try {

      const newStatus =
        table.status === "Available"
          ? "Occupied"
          : "Available";


      const updatedTable =
        await updateTable(
          table._id,
          {
            tableNumber:
              table.tableNumber,

            seats:
              table.seats,

            status:
              newStatus
          }
        );


      setTables(
        (prevTables) =>
          prevTables.map(
            (item) =>
              item._id === table._id
                ? updatedTable
                : item
          )
      );


    } catch (error) {

      console.error(
        "Failed to update table status:",
        error
      );

    }

  };


  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this table?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      await deleteTable(id);


      setTables(
        (prevTables) =>
          prevTables.filter(
            (table) =>
              table._id !== id
          )
      );


    } catch (error) {

      console.error(
        "Failed to delete table:",
        error
      );

    }

  };


  // =========================
  // CALCULATIONS
  // =========================

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


  return (

    <div className="tables-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="tables-header">

        <div>

          <h1>
            Tables
          </h1>

          <p>
            Manage restaurant tables and seating.
          </p>

        </div>

      </div>


      {/* =========================
          STATISTICS
      ========================= */}

      <div className="table-stats">


        <div className="table-stat-card">

          <div className="stat-icon">
            🪑
          </div>

          <div>

            <span>
              Total Tables
            </span>

            <strong>
              {tables.length}
            </strong>

          </div>

        </div>


        <div className="table-stat-card available">

          <div className="stat-icon">
            ✓
          </div>

          <div>

            <span>
              Available
            </span>

            <strong>
              {availableTables}
            </strong>

          </div>

        </div>


        <div className="table-stat-card occupied">

          <div className="stat-icon">
            ●
          </div>

          <div>

            <span>
              Occupied
            </span>

            <strong>
              {occupiedTables}
            </strong>

          </div>

        </div>


      </div>


      {/* =========================
          ADD / EDIT FORM
      ========================= */}

      <div className="table-form-card">

        <div className="form-title">

          <h2>
            {editingId
              ? "Edit Table"
              : "Add New Table"}
          </h2>

          <p>
            {editingId
              ? "Update table information"
              : "Create a new restaurant table"}
          </p>

        </div>


        <form
          className="table-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label>
              Table Number
            </label>

            <input
              type="number"
              min="1"
              placeholder="e.g. 1"
              value={tableNumber}
              onChange={(e) =>
                setTableNumber(
                  e.target.value
                )
              }
            />

          </div>


          <div className="form-group">

            <label>
              Number of Seats
            </label>

            <input
              type="number"
              min="1"
              placeholder="e.g. 4"
              value={seats}
              onChange={(e) =>
                setSeats(
                  e.target.value
                )
              }
            />

          </div>


          <div className="form-buttons">

            <button
              className="add-table-btn"
              type="submit"
            >

              {editingId
                ? "Update Table"
                : "+ Add Table"}

            </button>


            {editingId && (

              <button
                className="cancel-table-btn"
                type="button"
                onClick={() => {

                  setEditingId(null);

                  setTableNumber("");

                  setSeats("");

                }}
              >

                Cancel

              </button>

            )}

          </div>

        </form>

      </div>


      {/* =========================
          TABLE LIST
      ========================= */}

      <div className="tables-section">

        <div className="section-header">

          <div>

            <h2>
              Restaurant Tables
            </h2>

            <p>
              {tables.length} tables configured
            </p>

          </div>

        </div>


        {tables.length === 0 ? (

          <div className="no-tables">

            <div className="empty-table-icon">
              🪑
            </div>

            <h3>
              No tables found
            </h3>

            <p>
              Add your first restaurant table above.
            </p>

          </div>

        ) : (

          <div className="tables-grid">

            {tables.map(
              (table) => (

                <div
                  className={`table-card ${
                    table.status === "Available"
                      ? "table-available"
                      : "table-occupied"
                  }`}
                  key={table._id}
                >

                  {/* CARD HEADER */}

                  <div className="table-card-header">

                    <div className="table-number">

                      <span>
                        TABLE
                      </span>

                      <strong>
                        #{table.tableNumber}
                      </strong>

                    </div>


                    <span
                      className={`table-status ${
                        table.status === "Available"
                          ? "available-status"
                          : "occupied-status"
                      }`}
                    >

                      {table.status}

                    </span>

                  </div>


                  {/* SEATS */}

                  <div className="table-seats">

                    <span className="seat-icon">
                      👥
                    </span>

                    <div>

                      <small>
                        Seating Capacity
                      </small>

                      <strong>
                        {table.seats} Seats
                      </strong>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="table-actions">

                    <button
                      className={
                        table.status === "Available"
                          ? "occupy-btn"
                          : "available-btn"
                      }
                      onClick={() =>
                        handleStatusChange(
                          table
                        )
                      }
                    >

                      {table.status === "Available"
                        ? "Occupy Table"
                        : "Make Available"}

                    </button>


                    <div className="secondary-actions">

                      <button
                        className="edit-table-btn"
                        onClick={() =>
                          handleEdit(table)
                        }
                      >
                        Edit
                      </button>


                      <button
                        className="delete-table-btn"
                        onClick={() =>
                          handleDelete(
                            table._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default Tables;
