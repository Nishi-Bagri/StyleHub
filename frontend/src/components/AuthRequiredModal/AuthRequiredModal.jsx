import "./AuthRequiredModal.css";
import { useNavigate } from "react-router-dom";
import { HiLockClosed, HiXMark } from "react-icons/hi2";

const AuthRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  return (
    <div className="modal-overlay">
      <div className="login-modal">
        <button
          className="close-modal-btn"
          onClick={onClose}
          aria-label="Close"
        >
          <HiXMark />
        </button>

        <div className="lock-icon">
          <HiLockClosed />
        </div>

        <h2>Authentication Required</h2>

        <p className="modal-description">
          Please sign in to continue.
          <br />
          Log in to access this feature and enjoy a personalized shopping
          experience.
        </p>

        <div className="modal-buttons">
          <button className="login-btn" onClick={handleLogin}>
            Login
          </button>

          {/* <button
            className="cancel-btn"
            onClick={onClose}
          >
            Not Now
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AuthRequiredModal;
