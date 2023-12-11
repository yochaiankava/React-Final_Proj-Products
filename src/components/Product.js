import React, { useEffect, useState } from "react";
import axios from "axios";

function Product({ product, fetchCartItemsCount }) {
  const HOST_URL = "http://localhost:8000";
  // const HOST_URL = "https://django-final-proj-products.onrender.com";

  // State to track the quantity in the cart
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {
    // Retrieve cartId from local storage
    const storedCartId = localStorage.getItem("pendingCart.id");
    setCartId(storedCartId);
  }, []);

  // Function to handle quantity change
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10) || 1);
  };

  // Function to handle "Add to Cart" button click
  const addToCart = async () => {
    try {
      const formData = new FormData();
      formData.append("cart", cartId);
      formData.append("product", product.id);
      formData.append("quantity", quantity);

      // axios.defaults.headers.common['Authorization'] = `Bearer ${decodedToken}`;
      const response = await axios.post(`${HOST_URL}/cartitem/`, formData);

      if (response.status === 201) {
        fetchCartItemsCount();
        console.log("Product added successfully");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="card" style={{ maxWidth: "600px", maxHeight: "400px" }}>
        <img
          src={
            product.image
              ? HOST_URL + `/${product.image}`
              : `https://picsum.photos/268/180?random=${Math.random()}`
          }
          alt="Product"
          style={{ maxWidth: "300px", maxHeight: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
          <div className="form-group">
            {/* <label htmlFor="quantity">Quantity:</label> */}
            <input
              style={{ display: "none" }} // This will hide the input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <button className="btn btn-primary" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;
