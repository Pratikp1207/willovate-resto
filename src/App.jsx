import { useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


import {
  getFoods,
  createFood,
  updateFood,
  deleteFood as deleteFoodApi
} from "./services/foodService";

import {
  getOrders,
  updateOrder
} from "./services/orderService";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import AddFood from "./pages/AddFood";
import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import Categories from "./pages/Categories";
import Tables from "./pages/Tables";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {

  // =========================
  // FOOD STATE
  // =========================

  const [foods, setFoods] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true" &&
      Boolean(localStorage.getItem("token"))
  );


  // =========================
  // ORDER STATE
  // =========================

  const [orders, setOrders] = useState([]);


  // =========================
  // GET FOODS
  // =========================

  useEffect(() => {

    if (!isAuthenticated) {
      return;
    }

    const fetchFoods = async () => {

      try {

        setLoading(true);
        setError("");

        const data = await getFoods();

        setFoods(data);

      } catch (error) {

        console.error(
          "Failed to fetch foods:",
          error
        );

        setError(
          "Failed to load foods"
        );

      } finally {

        setLoading(false);

      }

    };

    fetchFoods();

  }, [isAuthenticated]);


  // =========================
  // GET ORDERS
  // =========================

  useEffect(() => {

    if (!isAuthenticated) {
      return;
    }

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

      }

    };

    fetchOrders();

  }, [isAuthenticated]);

  // =========================
  // ADD ORDER
  // =========================


  // =========================
  // ADD FOOD
  // =========================

  const addFood = async (newFood) => {

    try {

      const food = await createFood(newFood);

      setFoods((prevFoods) => [
        ...prevFoods,
        food
      ]);

    } catch (error) {

      console.error(
        "Failed to add food:",
        error
      );

    }

  };


  // =========================
  // DELETE FOOD
  // =========================

  const deleteFood = async (id) => {

    try {

      await deleteFoodApi(id);

      setFoods((prevFoods) =>
        prevFoods.filter(
          (food) =>
            (food._id || food.id) !== id
        )
      );

    } catch (error) {

      console.error(
        "Failed to delete food:",
        error
      );

    }

  };


  // =========================
  // UPDATE FOOD
  // =========================

  const editFood = async (
    id,
    updatedData
  ) => {

    try {

      const updatedFood =
        await updateFood(
          id,
          updatedData
        );

      setFoods((prevFoods) =>
        prevFoods.map((item) =>
          item._id === id
            ? updatedFood
            : item
        )
      );

    } catch (error) {

      console.error(
        "Failed to update food:",
        error
      );

    }

  };


  // =========================
  // UPDATE ORDER STATUS
  // =========================

  const editOrder = async (
    id,
    status
  ) => {

    try {

      const updatedOrder =
        await updateOrder(
          id,
          status
        );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? updatedOrder
            : order
        )
      );

    } catch (error) {

      console.error(
        "Failed to update order:",
        error
      );

    }

  };


  // =========================
  // DELETE ORDER FROM STATE
  // =========================

  const removeOrder = (id) => {

    setOrders((prevOrders) =>
      prevOrders.filter(
        (order) =>
          order._id !== id
      )
    );

  };


  // =========================
  // Add ORDER FUNCTION
  // =========================
  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      newOrder
    ]);
  };

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setFoods([]);
    setOrders([]);
    setLoading(false);
    setError("");
  }, []);

  useEffect(() => {
    window.addEventListener("willovate:unauthorized", handleLogout);

    return () => {
      window.removeEventListener("willovate:unauthorized", handleLogout);
    };
  }, [handleLogout]);


  // =========================
  // ROUTES
  // =========================

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={
            <Login onLogin={() => setIsAuthenticated(true)} />
          }
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onLogout={handleLogout}
                />

                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <Dashboard
                  foods={foods}
                  orders={orders}
                />
              </>
            </ProtectedRoute>
          }
        />


        {/* MENU */}

        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onLogout={handleLogout}
                />

                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <Menu
                  foods={foods}
                  deleteFood={deleteFood}
                  editFood={editFood}
                  loading={loading}
                  error={error}
                />
              </>
            </ProtectedRoute>
          }
        />


        {/* ADD FOOD */}

        <Route
          path="/add-food"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onLogout={handleLogout}
                />

                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <AddFood
                  addFood={addFood}
                />
              </>
            </ProtectedRoute>
          }
        />


        {/* ORDERS */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onLogout={handleLogout}
                />

                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <Orders
                  orders={orders}
                  editOrder={editOrder}
                  removeOrder={removeOrder}
                />
              </>
            </ProtectedRoute>
          }
        />

        {/* CREATE-ORDERS */}
        <Route
          path="/create-order"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onLogout={handleLogout}
                />

                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <CreateOrder
                  foods={foods}
                  addOrder={addOrder}
                />
              </>
            </ProtectedRoute>
          }
        />
        {/* CATEGORIES-ORDERS */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onLogout={handleLogout}
                />

                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <Categories />
              </>
            </ProtectedRoute>
          }

        />
        <Route
          path="/tables"
          element={
            <ProtectedRoute>
              <>
                <Navbar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                  onLogout={handleLogout}
                />

                <Sidebar
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />

                <Tables />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}


export default App;
