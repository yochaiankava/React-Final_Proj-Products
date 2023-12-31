import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function CartItemHistory() {
  // const HOST_URL = "http://localhost:8000";
  const HOST_URL = "https://django-final-proj-products.onrender.com";

  const { cartId } = useParams(); // Access cartId from URL parameters
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItemsTotalPrices, setCartItemsTotalPrices] = useState({});

  const calculateTotalCartPrice = () => {
    let totalCartPrice = 0;
    for (const cartItem of cart.cartitems) {
      totalCartPrice += cartItemsTotalPrices[cartItem.id] || 0;
    }
    return totalCartPrice;
  };

  useEffect(() => {
    getCart(cartId);
  }, [cartId]);

  async function getCart(cartId) {
    try {
      console.log("Cart id:", cartId);

      if (cartId !== null) {
        const response = await axios.get(`${HOST_URL}/cart/${cartId}`);

        console.log("API Response:", response.data);

        const closedCart = response.data;

        if (closedCart) {
          console.log("Pending Cart:", closedCart);

          setCart(closedCart);

          const totalPrices = {};
          closedCart.cartitems.forEach((cartItem) => {
            const totalPrice = cartItem.product_price * cartItem.quantity;
            totalPrices[cartItem.id] = totalPrice;
          });
          setCartItemsTotalPrices(totalPrices);
        } else {
          console.log("No closed cart found.");
        }

        setIsLoading(false);
      } else {
        console.log("Cart ID is null. Skipping cart request.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <p>Loading cart items...</p>;
  }

  if (!cart) {
    return <p>Cart is empty or data is invalid.</p>;
  }

  return (
    <div className="cart-container">
      <div>
        <Link className="btn btn-success" to="/carts_history">
          Carts History
        </Link>

        <h1
        className="text-center mb-3"
        style={{ color: "white", fontStyle: "italic" }}
        >Cart Details:</h1>
        <p>
          Open Date:{" "}
          {cart.date && new Date(cart.date).toLocaleDateString("en-GB")}
        </p>
        <p>Customer: {cart.customer_name}</p>
        <p>Status: {cart.status}</p>
        {/* Display the total cart price */}
        <p>Total Cart Price: {calculateTotalCartPrice()}</p>
      </div>
      <h1
      className="text-center mb-3"
      style={{ color: "white", fontStyle: "italic" }}
      >Cart Items:</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartitems &&
            cart.cartitems.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>{cartItem.product_name}</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItemsTotalPrices[cartItem.id]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartItemHistory;
