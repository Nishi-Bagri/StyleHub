import "./ChangePassword.css";
import { useState } from "react";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New Password and Confirm Password do not match.");
      return;
    }

    console.log(passwords);

    alert("Password changed successfully.");
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

          <button
            type="submit"
            className="change-password-btn"
          >
            Update Password
          </button>

        </form>

      </div>
    </div>
  );
};

export default ChangePassword;