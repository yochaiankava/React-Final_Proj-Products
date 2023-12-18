import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const Login = ({ onLoginSuccess }) => {
  // const HOST_URL = "http://localhost:8000";
  const HOST_URL = "https://django-final-proj-products.onrender.com";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCart = async (userId) => {
    try {
      const cartformData = new FormData();
      cartformData.append("customer", userId);
  
      const response = await axios.post(`${HOST_URL}/cart/`, cartformData);
      
      if (response.status === 201) {
        // Cart created successfully
        const newCartId = response.data.id;
        
        // Save the new cart ID to local storage
        localStorage.setItem('pendingCart.id', newCartId);  
        console.log("Cart created successfully");
      } else {
        console.error("Failed to create cart");
      }
    } catch (error) {
      console.error("Error creating cart", error.response?.data);
    }
  };
  

  const hasPendingCarts = (carts) => {
    // Check if there are carts and at least one of them has 'Pending' status

    return carts.some((cart) => cart.status === "Pending");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${HOST_URL}/token/`, formData);

      if (response) {
        const token = response.data.access;

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        // save token to local storage
        localStorage.setItem("token", token);
        let decoded = jwtDecode(token);

        const userId = decoded.user_id;
        console.log("Login userId:", userId);
        // save userId to local storage
        localStorage.setItem("userId", userId);

        const cartResponse = await axios.get(`${HOST_URL}/cart/`, {
          params: { user_id: userId },
        });        

        if (!hasPendingCarts(cartResponse.data)) {
          // If the user doesn't have a cart with status 'Pending', create a new one
          await handleCreateCart(userId);
        }

        // Set pendingCart.id in localStorage
        const pendingCart = cartResponse.data.find(
          (cart) => cart.status === "Pending"
        );
        localStorage.setItem("pendingCart", pendingCart);
        console.log("pendingCart", pendingCart);
        if (pendingCart) {
          // Save the pendingCart object directly to local storage
          
          const pendingCartId = pendingCart.id;
          localStorage.setItem("pendingCart.id", pendingCartId);
          console.log("pendingCartId", pendingCartId);
        }

        // Handle successful login, e.g., redirect to a new page
        console.log("Login successful", response.data);
        onLoginSuccess(userId);
        alert("Login successful");       
        navigate("/");
        // Reload the page
        window.location.reload();
      } else {
        // If the response is undefined or null
        console.error("Login failed: Unexpected response structure");
        onLoginSuccess(null);
        alert("Login failed");
      }
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error("Login failed", error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
