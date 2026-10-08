import { NavLink } from "react-router-dom";
import './Sidebar.css'

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const handleLinkClick = () => {
    if (window.innerWidth <= 800) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* =========================
          OVERLAY
      ========================= */}

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >

        {/* HEADER */}

        <div className="sidebar-header">

          <h3>
            Restaurant
          </h3>

          <span>
            Management Panel
          </span>

        </div>


        {/* MENU */}

        <ul className="sidebar-menu">

          {/* DASHBOARD */}

          <li>
            <NavLink
              to="/dashboard"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              <span className="menu-icon">
                📊
              </span>

              Dashboard

            </NavLink>
          </li>


          {/* MENU */}

          <li>
            <NavLink
              to="/menu"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              <span className="menu-icon">
                🍽️
              </span>

              Menu

            </NavLink>
          </li>


          {/* ADD FOOD */}

          <li>
            <NavLink
              to="/add-food"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              <span className="menu-icon">
                ➕
              </span>

              Add Food

            </NavLink>
          </li>


          {/* CATEGORIES */}

          <li>
            <NavLink
              to="/categories"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              <span className="menu-icon">
                📂
              </span>

              Categories

            </NavLink>
          </li>


          {/* ORDERS */}

          <li>
            <NavLink
              to="/orders"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              <span className="menu-icon">
                🛒
              </span>

              Orders

            </NavLink>
          </li>


          {/* TABLES */}

          <li>
            <NavLink
              to="/tables"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              <span className="menu-icon">
                🪑
              </span>

              Tables

            </NavLink>
          </li>


          {/* CREATE ORDER */}

          <li>
            <NavLink
              to="/create-order"
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >

              <span className="menu-icon">
                📝
              </span>

              Create Order

            </NavLink>
          </li>

        </ul>

      </aside>
    </>
  );
}

export default Sidebar;