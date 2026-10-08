import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";
import "../styles/Login.css";
import "../styles/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await registerUser(trimmedName, trimmedEmail, password);
      navigate("/", {
        state: {
          registrationSuccess: true,
          email: trimmedEmail
        }
      });
    } catch (requestError) {
      console.error("Registration failed:", requestError);
      setError(
        requestError.response?.data?.message ||
        "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page register-page">
      <div className="login-circle circle-one" aria-hidden="true"></div>
      <div className="login-circle circle-two" aria-hidden="true"></div>
      <div className="login-circle circle-three" aria-hidden="true"></div>

      <div className="floating-food food-one" aria-hidden="true">🍕</div>
      <div className="floating-food food-two" aria-hidden="true">🍔</div>
      <div className="floating-food food-three" aria-hidden="true">🍜</div>
      <div className="floating-food food-four" aria-hidden="true">🥗</div>

      <section className="login-card register-card">
        <div className="restaurant-logo">
          <div className="logo-icon" aria-hidden="true">🍽️</div>
          <div>
            <h1>Willovate</h1>
            <span>RESTO</span>
          </div>
        </div>

        <div className="login-heading">
          <h2>Create your account</h2>
          <p>Register to manage your restaurant</p>
        </div>

        {error && (
          <div className="login-error" role="alert">
            <span aria-hidden="true">⚠</span>
            <p>{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="login-form register-form"
          noValidate
        >
          <div className="input-group">
            <label htmlFor="register-name">Name</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">👤</span>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Enter your name"
                autoComplete="name"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="register-email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">✉</span>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="register-password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">🔒</span>
              <input
                id="register-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="register-confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <span className="input-icon" aria-hidden="true">🔒</span>
              <input
                id="register-confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="Re-enter your password"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true"></span>
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <span aria-hidden="true">→</span>
              </>
            )}
          </button>
        </form>

        <p className="register-login-prompt">
          Already have an account? <Link to="/">Log in</Link>
        </p>

        <div className="login-footer">
          <span aria-hidden="true">🍴</span>
          <p>Restaurant Management System</p>
        </div>
      </section>
    </main>
  );
}

export default Register;
