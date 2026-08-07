import "./Profile.css";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/profileService";

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    address: "",
  });

  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const data = await getProfile();

      setProfile({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone_number: data.phone_number || "",
        gender: data.gender || "",
        address: data.address || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending Profile:", profile);
      const response = await updateProfile(profile);

      setMessage(`${response.message}!`);

      fetchProfile();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);

      console.log("Backend Response:", error.response.data);

      setMessage("Failed to update profile.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              name="first_name"
              value={profile.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>

            <input
              type="text"
              name="last_name"
              autoComplete="family-name"
              value={profile.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>

            <input
              type="text"
              name="phone_number"
              value={profile.phone_number}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              rows="4"
              name="address"
              autoComplete="street-address"
              value={profile.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
          </div>

          <button type="submit" className="save-btn">
            Save Changes
          </button>
          {message && <div className="profile-message">{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Profile;
