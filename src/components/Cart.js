import React, { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCart();
  }, []);

  function getCart() {
    let url = "http://127.0.0.1:8000/cart/1"; // Replace with your cart endpoint
    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setCart(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        setIsLoading(false);
      });
  }

  

  if (isLoading) {
    return <p>Loading cart items...</p>;
  }

  if (!cart) {
    return <p>Cart is empty or data is invalid.</p>;
  }

  return (
    <div>
      <h3>Cart</h3>
      <p>Date: {cart.date}</p>
      <p>Customer: {cart.customer_name}</p>
      <p>Status: {cart.status}</p>
      
      <h4>Cart Items</h4>
      <ul>
        {cart.cartitems.map((cartItem) => (
          <li key={cartItem.id}>
            Product Name: {cartItem.product_name} - Quantity: {cartItem.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
