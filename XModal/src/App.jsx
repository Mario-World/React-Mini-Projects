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
    setFormData({ username: "", email: "", phone: "", dob: "" });
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // USERNAME VALIDATION
    if (!username.trim()) {
      alert("Please enter Username.");
      return;
    }

    // EMAIL VALIDATION
    if (!email.trim()) {
      alert("Please enter Email.");
      return;
    }

    // custom validation, no browser validation allowed
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // PHONE VALIDATION
    if (!phone.trim()) {
      alert("Please enter Phone Number.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DATE VALIDATION
    if (!dob.trim()) {
      alert("Please enter Date of Birth.");
      return;
    }

    const today = new Date();
    const entered = new Date(dob);

    if (entered > today) {
      alert("Invalid date of birth. Date cannot be in the future.");
      return;
    }

    // SUCCESS → reset & close modal
    closeModal();
  };

  return (
    <div className="app">
      <h1>User Details Modal</h1>

      {!open && (
        <button className="modal-open" onClick={openModal}>
          Open Form
        </button>
      )}

      {open && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2>Fill Details</h2>

            {/* Disable native HTML validation */}
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <label htmlFor="email">Email Address:</label>
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <label htmlFor="phone">Phone Number:</label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <label htmlFor="dob">Date of Birth:</label>
              <input
                id="dob"
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
              />

              <button className="submit-button" type="submit">
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
