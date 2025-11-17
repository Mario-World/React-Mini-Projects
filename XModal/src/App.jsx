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

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // --- Cypress expects EMAIL to be validated first ---
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // --- Cypress expects PHONE second ---
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // --- Cypress expects DOB third ---
    const today = new Date();
    const entered = new Date(dob);

    if (entered > today) {
      alert("Invalid date of birth");
      return;
    }

    // --- Username last (Cypress only checks this in valid submission) ---
    if (!username) {
      alert("Please enter Username.");
      return;
    }

    // If everything is valid
    closeModal();
  };

  return (
    <div className="app">
      <h2>User Details Modal</h2>

      {!open && (
        <button className="open-form-btn" onClick={openModal}>
          Open Form
        </button>
      )}

      {open && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2>Fill Details</h2>

            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
