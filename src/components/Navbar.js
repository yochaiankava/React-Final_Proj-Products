import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import "../carousel.css";
import Carousel from "./Carousel";
import { BsEnvelopeHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function Navbar({
  categories,
  clickButton,
  searchProduct,
  fetchCartItemsCount,
  cartItemsCount,
}) {
  const [searchText, setSearchText] = useState(""); // this is the value of the search field
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    if (storedUserId) {
      fetchCartItemsCount();
    }
  }, [fetchCartItemsCount]);

  const handleLogout = () => {
    // Clear all data from local storage
    localStorage.clear();
    // Redirect to the login page or any other desired page after logout
    navigate("/");
    // Reload the page
    window.location.reload();
  };

  return (
    <>
      <div className="nav">
        <ul className="nav">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-item-text"
              aria-current="page"
              onClick={() => clickButton("")}
            >
              All Products
            </Link>
          </li>

          {categories.map((category) => (
            <li key={category.id} className="nav-item">
              <Link
                to="/"
                className="nav-item-text"
                aria-current="page"
                onClick={() => clickButton(category.id, category.name)}
              >
                {category.name}
              </Link>
            </li>
          ))}
          <div>
            <li className="nav-item">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />

              <Link
                to="/"
                className="btn btn-outline-success"
                onClick={() => searchProduct(searchText)}
              >
                Search
              </Link>
            </li>
          </div>

          <div className="nav" style={{ marginLeft: "auto" }}>
            {location.pathname !== "/gift_carts" && (
              <li className="nav-item">
                <Link className="nav-item-text" to="/gift_carts">
                  <BsEnvelopeHeart
                    style={{ fontSize: "2em", color: "violet", margin: "2px;" }}
                  />
                </Link>
              </li>
            )}

            {userId === 1 && location.pathname !== "/add_product" && (
              <li className="nav-item">
                <Link className="nav-item-text" to="/add_product">
                  Add Product
                </Link>
              </li>
            )}

            {userId === null && location.pathname !== "/login" && (
              <li className="nav-item">
                <Link className="nav-item-text" to="/login">
                  Login
                </Link>
              </li>
            )}

            {userId === null && location.pathname !== "/register" && (
              <li className="nav-item">
                <Link className="nav-item-text" to="/register">
                  Register
                </Link>
              </li>
            )}

            {userId !== null && (
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-item-text">
                  Logout
                </button>
              </li>
            )}

            
              <div className="nav-item cart-icon-container">
                {userId !== null && location.pathname !== "/cart" && (
                <li className="nav-item">
                  <Link to="/cart" className="cart-icon">
                    <BsCart4 />
                    {cartItemsCount > 0 && (
                      <span className="cart-item-count">{cartItemsCount}</span>
                    )}
                  </Link>
                </li>
                 )}
              </div>
        

            <li className="nav-item">
              <img
                className="card-img-top product-image"
                src="https://www.ankava.co.il/wp-content/uploads/lodo-text.png"
                alt="Card cap"
                style={{ maxWidth: "200px" }}
              />
            </li>
          </div>
          <div>
            <br></br>
            <Carousel className=".custom-carousel" />
          </div>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
