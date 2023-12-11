import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import "../addproduct.css"

function AddProduct() {
  
  const HOST_URL ="http://localhost:8000"
  // const HOST_URL = "https://django-final-proj-products.onrender.com";

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); 
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(null);
  const navigate = useNavigate();

  async function sendAddRequest() {

    
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("image", image); 
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);

      const response = await axios.post(`${HOST_URL}/product/`, formData);
      
    //   const response = await fetch("http://127.0.0.1:8000/product/", {
    //     method: "POST",
    //     body: formData, // Use FormData for file uploads
    //   });

      if (response.status === 201) {
        console.log("Product added successfully");
        // Reset the form fields here
        setName("");
        setDescription("");
        setImage(null);
        setPrice(0);
        setStock(0);
        setCategory(null);

        navigate("/");

      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
  <div className="add-product-container">
      {/* Name input */}
      <div className="input-field">
        Name:
        <br />
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {/* Description input */}
      <div className="input-field">
        Description:
        <br />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Image File input */}
      <div className="file-input">
        Image File:
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* Price input */}
      <div className="input-field">
        Price:
        <br />
        <input
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {/* Stock input */}
      <div className="input-field">
        Stock:
        <br />
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
      </div>

      {/* Category input */}
      <div className="input-field">
        Category:
        <br />
        <input
          type="number"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      {/* Add Product button */}
      <button className="add-product-button" onClick={sendAddRequest}>
        Add Product
      </button>
      <br></br>
    </div>
  

    </>
  );
}

export default AddProduct;
