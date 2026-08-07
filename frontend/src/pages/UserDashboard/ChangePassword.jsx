import "./ChangePassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/changePasswordService";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await changePassword({
        current_password: passwords.currentPassword,
        new_password: passwords.newPassword,
        confirm_password: passwords.confirmPassword,
      });

      setMessage(response.message);

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Logout user
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response?.data?.current_password) {
        setError(err.response.data.current_password);
      } else if (err.response?.data?.new_password) {
        setError(err.response.data.new_password);
      } else if (err.response?.data?.confirm_password) {
        setError(err.response.data.confirm_password);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <h2>Change Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>

            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
          </div>

          <div className="form-group">
            <label>New Password</label>

            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>

          <button type="submit" className="change-password-btn">
            Update Password
          </button>

          {message && <div className="profile-message">{message}</div>}

          {error && <div className="error-message">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
