import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const HOST_URL = "http://localhost:8000";
const HOST_URL = "https://django-final-proj-products.onrender.com";

function Register() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    phone_number: null,
    address: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(`Handling change for ${name}:`, value);  // view changes at console
    // Convert single space to null
    const normalizedValue = value.trim() === "" ? null : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: normalizedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      console.log("formData", formData);
  
      const response = await axios.post(`${HOST_URL}/register/`, formData);
  
      console.log(response.data);
      
      alert("Registration successful!"); // Display a success message
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again."); // Display an error message
    }
  };

  return (
    <div className="cart-container">
      <h1
      className="text-center mb-3"
      style={{ color: "white", fontStyle: "italic" }}
      >Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {/* <input
          type="number"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        /> */}

        <button className="btn btn-success" type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
