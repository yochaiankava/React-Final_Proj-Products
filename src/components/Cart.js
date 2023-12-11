import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart({ userId, fetchCartItemsCount }) {
  const HOST_URL = "http://localhost:8000";
  // const HOST_URL = "https://django-final-proj-products.onrender.com";

  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modifiedQuantities, setModifiedQuantities] = useState({});
  const [cartItemsTotalPrices, setCartItemsTotalPrices] = useState({});

  const calculateTotalCartPrice = () => {
    let totalCartPrice = 0;
    for (const cartItem of cart.cartitems) {
      totalCartPrice += cartItemsTotalPrices[cartItem.id] || 0;
    }
    return totalCartPrice;
  };
  

  // const [token, settoken] = useState(null);

  useEffect(() => {
    getCart(userId);
  }, [userId]);

  async function getCart(userId) {

    // const storedtoken = localStorage.getItem("token");
    // settoken(storedtoken)
    // console.log('Cart token:', storedtoken)

    try {
      console.log("Cart userid:", userId);
      // Check if userId is not null before making the request
      if (userId !== null) {
        const response = await axios.get(`${HOST_URL}/cart/`, {
          params: { user_id: userId },
        });

        console.log("API Response:", response.data);

        // Find the cart with 'Pending' status
        const pendingCart = response.data.find(
          (cart) => cart.status === "Pending"
        );

        if (pendingCart) {
          console.log("Pending Cart:", pendingCart);

          setCart(pendingCart);

          const totalPrices = {};
          pendingCart.cartitems.forEach((cartItem) => {
            const totalPrice = cartItem.product_price * cartItem.quantity;
            totalPrices[cartItem.id] = totalPrice;
          });
          setCartItemsTotalPrices(totalPrices);
    
        } else {
          console.log("No pending cart found.");
        }

        setIsLoading(false);
      } else {
        console.log("User ID is null. Skipping cart request.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setIsLoading(false);
    }
  }

  // Function to handle deleting a cart item
  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(
        `${HOST_URL}/cartitem/${cartItemId}/`
      );

      if (response.status === 204) {
        console.log("Cart item deleted successfully");
        // Refresh the cart after deletion
        fetchCartItemsCount();
        getCart(userId);
      } else {
        console.error("Failed to delete cart item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle modifying the quantity of a cart item
  const modifyCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        // If the new quantity is zero, delete the cart item
        await deleteCartItem(cartItemId);
      } else {
        // If the new quantity is not zero, update the quantity
        const response = await axios.put(
          `${HOST_URL}/cartitem/${cartItemId}/`,
          {
            quantity: newQuantity,
          }
        );

        if (response.status === 200) {
          console.log("Cart item quantity modified successfully");
          // Refresh the cart items count and get the updated cart
          fetchCartItemsCount();
          getCart(userId);
        } else {
          console.error("Failed to modify cart item quantity");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQuantityChange = (cartItemId, event) => {
    const newQuantities = {
      ...modifiedQuantities,
      [cartItemId]: event.target.value,
    };
    setModifiedQuantities(newQuantities);
  };

  if (isLoading) {
    return <p>Loading cart items...</p>;
  }

  if (!cart) {
    return <p>Cart is empty or data is invalid.</p>;
  }

  // Function to handle the checkout process
  const checkout = async () => {
    try {
      console.log("Cart:", cart);
      // Iterate over each cart item
      for (const cartItem of cart.cartitems) {
        console.log("CartItem:", cartItem);

        // Check if product_id is defined
        if (cartItem.product) {
          const newStock = Math.max(
            0,
            cartItem.product_stock - cartItem.quantity
          );
          const productId = cartItem.product;

          console.log("newStock:", newStock);
          console.log("productId:", productId);

          // Update the product stock
          await axios.put(`${HOST_URL}/product/${productId}/`, {
            stock: newStock,
          });
        } else {
          console.error("Invalid product_id:", cartItem.product);
        }
      }

      // Change the cart status to 'Completed'
      await axios.put(`${HOST_URL}/cart/${cart.id}/`, {
        status: "Closed",
      });

      console.log("Checkout successful");
      // Refresh the cart items count and get the updated cart
      fetchCartItemsCount();
      getCart(userId);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div>
      <div>
        <Link className="btn btn-success" to="/carts_history">
          Carts History
        </Link>

        <h3>Cart Details:</h3>
        {/* <p>Open Date: {cart.date}</p> */}
        <p>Open Date:{" "}
                {cart.date && new Date(cart.date).toLocaleDateString("en-GB")}</p>
        <p>Customer: {cart.customer_name}</p>
        <p>Status: {cart.status}</p>
        <p>Total Cart Price: {calculateTotalCartPrice()}</p>
      </div>
      <h4>Cart Items:</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>            
            <th>Total Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartitems &&
            cart.cartitems.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>{cartItem.product_name}</td>
                <td>
                  <input
                    type="number"
                    value={modifiedQuantities[cartItem.id] || cartItem.quantity}
                    onChange={(event) => handleQuantityChange(cartItem.id, event)}
                    min="0"
                  />
                </td>                
                <td>{cartItemsTotalPrices[cartItem.id]}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      modifyCartItemQuantity(
                        cartItem.id,
                        modifiedQuantities[cartItem.id] || cartItem.quantity
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCartItem(cartItem.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* Display the total cart price */}
      
      <button className="btn btn-success" onClick={checkout}>
        Checkout
      </button>
    </div>
  );
}

export default Cart;
