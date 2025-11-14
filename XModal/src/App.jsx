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
    // Do NOT reset form here (Cypress error fix)
    setOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === "modal") {
      closeModal();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // USERNAME
    if (!username.trim()) {
      alert("Please enter Username.");
      return;
    }

    // EMAIL
    if (!email.trim()) {
      alert("Please enter Email.");
      return;
    }

    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // PHONE NUMBER
    if (!phone.trim()) {
      alert("Please enter Phone Number.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DATE OF BIRTH
    if (!dob.trim()) {
      alert("Please enter Date of Birth.");
      return;
    }

    const today = new Date();
    const entered = new Date(dob);

    if (entered > today) {
      alert("Invalid date of birth.");
      return;
    }

    // SUCCESS — Reset form ONLY after submit
    setFormData({ username: "", email: "", phone: "", dob: "" });
    closeModal();
  };

  return (
    <div className="app">

      <h2>User Details Modal</h2>

      {!open && (
        <button className="modal-open" onClick={openModal}>
          Open Form
        </button>
      )}

      {open && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">

            <h2>Fill Details</h2>

            <form onSubmit={handleSubmit}>

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

              <button type="submit" className="submit-button" style={{ marginTop: "15px" }}>
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
