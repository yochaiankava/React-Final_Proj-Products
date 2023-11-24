import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ categories, clickButton, clickSubmit }) {
  const [formData, setFormData] = useState({ name: "" });

    clickSubmit(formData);
    // Access the form data and transfer the formData object to clickSubmit function
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior  
    clickSubmit(formData);
    console.log(formData);
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <ul className="nav">
        <li className="nav-item">
          <button
            className="nav-link active"
            aria-current="page"
            onClick={() => clickButton("")}
          >
            All Products
          </button>
        </li>
        {categories.map((category) => (
          <li key={category.id} className="nav-item">
            <button
              className="nav-link active"
              aria-current="page"
              onClick={() => clickButton(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </li>
      </ul>
    </>
  );
}

export default Navbar;
