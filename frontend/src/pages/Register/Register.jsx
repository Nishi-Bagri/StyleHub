import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authService";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    gender: "",
    password: "",
    confirm_password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (formData.password !== formData.confirm_password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await register(formData);

      console.log(response);

      setSuccessMessage(
        "🎉 Account created successfully! Redirecting to login...",
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);

      if (error.response?.data) {
        console.log(error.response.data);

        // Show backend validation errors
        const errors = error.response.data;

        if (typeof errors === "object") {
          const firstError = Object.values(errors)[0];
          setErrorMessage(
            Array.isArray(firstError) ? firstError[0] : firstError,
          );
        } else {
          setErrorMessage("Registration failed.");
        }
      } else {
        setErrorMessage("Unable to connect to the server.");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1>StyleHub</h1>

          <h2>
            Welcome <span className="wave">👋</span>
          </h2>

          <p>Let's create your StyleHub account.</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group">
              <label>First Name</label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer Not To Say">Prefer Not To Say</option>
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}

          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>

        <div className="register-footer">
          Already have an account?
          <button
            type="button"
            className="login-link"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
