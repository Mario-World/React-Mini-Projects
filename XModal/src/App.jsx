import React, { useState } from "react";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    setFormData({
      username: "",
      email: "",
      phone: "",
      dob: ""
    });
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  const handleSubmit = () => {
    const { username, email, phone, dob } = formData;

    // Validate Username
    if (!username) {
      alert("Please enter Username.");
      return;
    }

    // Validate Email
    if (!email) {
      alert("Please enter Email.");
      return;
    }
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Validate Phone
    if (!phone) {
      alert("Please enter Phone Number.");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Validate Date of Birth
    if (!dob) {
      alert("Please enter Date of Birth.");
      return;
    }
    const today = new Date();
    const entered = new Date(dob);

    if (entered > today) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // Success → reset UI
    closeModal();
  };

  return (
    <div className="app">
     <h1>User Details Modal</h1>
      {!open && (
        <button className ="modal-open" onClick={openModal}>Open Form</button>
      )}

      {open && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2>Form</h2>

            <form>
              <label>Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <label>Email:</label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label>Phone Number:</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <label>Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />
            </form>

            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
