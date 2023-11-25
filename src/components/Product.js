import React, { useState } from 'react';
import axios from 'axios';

function Product({ product }) {
  // State to track the quantity in the cart
  const [quantity, setQuantity] = useState(1);

  // Function to handle quantity change
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value, 10) || 1);
  };

  // Function to handle "Add to Cart" button click
  const addToCart = async () => {
    try {
      const formData = new FormData();
      formData.append("cart", 1); // Assuming cart ID is 1
      formData.append("product", product.id);
      formData.append("quantity", quantity);

      const response = await axios.post("http://127.0.0.1:8000/cartitem/", formData);

      if (response.status === 201) {
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
              ? `http://localhost:8000/${product.image}`
              : `https://picsum.photos/268/180?random=${Math.random()}`
          }
          alt="Product"
          style={{ maxWidth: "300px", maxHeight: "200px"}}
        />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
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
