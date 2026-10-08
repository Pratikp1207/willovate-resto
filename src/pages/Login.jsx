import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import "../styles/Login.css";

function Login({ onLogin }) {

  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const registrationSuccess = location.state?.registrationSuccess;

  // =========================
  // LOGIN
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    // Validation

    if (!email || !password) {

      setError(
        "Please enter email and password"
      );

      return;
    }

    try {

      setLoading(true);

      // Backend login

      const data = await loginUser(
        email,
        password
      );

      console.log(
        "Login response:",
        data
      );

      // Save login state

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      // Save JWT

      localStorage.setItem(
        "token",
        data.token
      );

      // Save user

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      onLogin();

      // Dashboard

      navigate("/dashboard");

    } catch (error) {

      console.error(
        "Login failed:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="login-page">

      {/* =========================
          BACKGROUND DECORATION
      ========================= */}

      <div className="login-circle circle-one"></div>
      <div className="login-circle circle-two"></div>
      <div className="login-circle circle-three"></div>


      {/* =========================
          FOOD ICONS
      ========================= */}

      <div className="floating-food food-one">
        🍕
      </div>

      <div className="floating-food food-two">
        🍔
      </div>

      <div className="floating-food food-three">
        🍜
      </div>

      <div className="floating-food food-four">
        🥗
      </div>


      {/* =========================
          LOGIN CARD
      ========================= */}

      <div className="login-card">

        {/* Logo */}

        <div className="restaurant-logo">

          <div className="logo-icon">
            🍽️
          </div>

          <div>
            <h1>
              Willovate
            </h1>

            <span>
              RESTO
            </span>
          </div>

        </div>


        {/* Heading */}

        <div className="login-heading">

          <h2>
            Welcome Back!
          </h2>

          <p>
            Login to manage your restaurant
          </p>

        </div>

        {registrationSuccess && (
          <div className="login-success" role="status">
            Your account has been created. Please log in.
          </div>
        )}


        {/* Error */}

        {error && (

          <div className="login-error">

            <span>
              ⚠
            </span>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* =========================
            FORM
        ========================= */}

        <form
          onSubmit={handleSubmit}
          className="login-form"
        >

          {/* EMAIL */}

          <div className="input-group">

            <label>
              Email Address
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                ✉
              </span>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div className="input-group">

            <label>
              Password
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                autoComplete="current-password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >

                {showPassword
                  ? "🙈"
                  : "👁️"}

              </button>

            </div>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >

            {loading ? (

              <>

                <span className="spinner"></span>

                Logging in...

              </>

            ) : (

              <>
                Login to Dashboard
                <span>→</span>
              </>

            )}

          </button>

          <Link
            to="/register"
            className="register-button"
          >
            Create Account / Register
          </Link>

        </form>


        {/* FOOTER */}

        <div className="login-footer">

          <span>
            🍴
          </span>

          <p>
            Restaurant Management System
          </p>

        </div>

      </div>

    </div>

  );
}

export default Login;
