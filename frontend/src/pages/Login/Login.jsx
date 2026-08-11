import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { login } from "../../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setError("");

    const data = await login(username, password);

    setSuccess("Login successful! Redirecting...");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (error) {
    console.error(error);

    setSuccess("");
    setError("Invalid username or password.");
  }
};

  return (
    <div className="login-page">
      <div className="login-container">
        {/* LEFT — BRAND PANEL */}
        <div className="login-brand">
          <h1>StyleHub</h1>

          <h2>Discover Your Style</h2>

          <p>
            Explore curated fashion and find pieces that define your unique
            style.
          </p>
        </div>

        {/* RIGHT — LOGIN CARD */}
        <div className="login-card">
          <div className="login-header">
            <h1>StyleHub</h1>

            <h2>
              Welcome Back <span className="wave">👋</span>
            </h2>

            <p>Sign in to continue shopping your favorite fashion.</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" />
                Remember Me
              </label>

              <button type="button" className="forgot-password">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>

            {success && <div className="success-message">{success}</div>}

            {error && <div className="error-message">{error}</div>}
          </form>

          <div className="login-footer">
            Don't have an account?
            <button
              type="button"
              className="register-link"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
