import React, { useEffect, useState } from "react";
import axios from "axios";

function Product({ product, fetchCartItemsCount }) {
  // const HOST_URL = "http://localhost:8000";
  const HOST_URL = "https://django-final-proj-products.onrender.com";

  // State to track the quantity in the cart
  const [quantity, setQuantity] = useState(1);
  const [cartId, setCartId] = useState(null);
  const [showStockMessage, setShowStockMessage] = useState(false);
  

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
  
      // Fetch the existing cart items
      const existingCartItemsResponse = await axios.get(`${HOST_URL}/cart/${cartId}`);
      const existingCartItems = existingCartItemsResponse.data.cartitems;
  
      // Check if the product is already in the cart items
      const existingCartItem = existingCartItems.find((cartItem) => cartItem.product === product.id);
  
      if (existingCartItem) {
        // If the product is already in the cart, update the quantity
        const updatedQuantity = existingCartItem.quantity + quantity;
  
        // Check if the updated quantity exceeds the available stock
        if (updatedQuantity > product.stock) {
          // Display an error message
          console.log("Not enough stock for the product");
          setShowStockMessage(true); 
          // console.log("showStockMessage is now:", showStockMessage);  
          await new Promise((resolve) => setTimeout(resolve, 2000));    
          setShowStockMessage(false); 
          // console.log("showStockMessage is now:", showStockMessage); 
        } else {
          // If there is enough stock, update the quantity
          await axios.put(`${HOST_URL}/cartitem/${existingCartItem.id}/`, {
            quantity: updatedQuantity,
          });
  
          console.log("Product quantity updated successfully");
        }
      } else {
        // If the product is not in the cart, add a new cart item
        // Check if the initial quantity exceeds the available stock
        if (quantity > product.stock) {
          // Display an error message
          console.error("Not enough stock for the product");          
          setShowStockMessage(true); 
          console.log("showStockMessage is now:", showStockMessage);
          await new Promise((resolve) => setTimeout(resolve, 2000));    
          setShowStockMessage(false); 
          console.log("showStockMessage is now:", showStockMessage);              
          
                          
        } else {
          const response = await axios.post(`${HOST_URL}/cartitem/`, formData);
  
          if (response.status === 201) {
            console.log("Product added successfully");
          } else {
            console.error("Failed to add product");
          }
        }
      }
  
      // Refresh the cart items count
      fetchCartItemsCount();
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
          <p className="card-text">stock: {product.stock}</p>
          <p className="card-text">$: {product.price}</p>
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
        {showStockMessage && (
        <div className="alert alert-danger" role="alert">
          Not enough stock for the product
        </div>
      )}        
      </div> 
    </>
  );
}

export default Product;
