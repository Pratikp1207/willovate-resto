import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './Navbar.css'

function Navbar({ sidebarOpen, setSidebarOpen, onLogout }) {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );

  const handleLogout = () => {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* HAMBURGER */}

      <button
        className="hamburger-btn"
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>


      {/* LOGO */}

      <div className="navbar-logo">

        <h2>
          Willovate Resto
        </h2>

      </div>


      {/* USER */}

      {user && (
        <div className="navbar-user">

          Welcome,
          <strong>
            {user.name}
          </strong>

        </div>
      )}


      {/* NAVIGATION */}

      <div className="navbar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/menu">
          Menu
        </Link>

        <Link to="/orders">
          Orders
        </Link>

        <Link to="/tables">
          Tables
        </Link>

      </div>


      {/* LOGOUT */}

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;