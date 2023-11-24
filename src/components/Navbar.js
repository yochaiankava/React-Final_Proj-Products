import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { BsCart4 } from "react-icons/bs";


import "../carousel.css";
import Carousel from "./Carousel";
import { BsEnvelopeHeart } from "react-icons/bs";

function Navbar({ categories, clickButton, searchProduct }) {
  const [searchText, setSearchText] = useState(""); // this is the value of the search field
  const location = useLocation();

  // const images = [
  //   'https://picsum.photos/1200/300',
  //   'https://picsum.photos/1200/300',
  //   'https://picsum.photos/1200/300',
  // ];

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
          
          {location.pathname !== "/add_product" && (
            <li className="nav-item">
              <Link className="nav-item-text" to="/add_product">
                Add Product
              </Link>
            </li>
          )}
          
            {location.pathname !== "/login" && (
              <li className="nav-item">
                <Link className="nav-item-text" to="login">
                  Login
                </Link>
              </li>
            )}

            {location.pathname !== "/register" && (
              <li className="nav-item">
                <Link className="nav-item-text" to="/register">
                  Register
                </Link>
              </li>
            )}

            <div className="nav-item cart-icon-container">
              {location.pathname !== "/cart" && (
                <li className="nav-item">
                  <Link to="/cart" className="cart-icon">
                    <BsCart4 />
                  </Link>
                </li>
              )}
            </div>

            <li className="nav-item">
              <img
                className="card-img-top product-image"
                src="https://www.ankava.co.il/wp-content/uploads/lodo-text.png"
                alt="Card cap"
                style={{ maxWidth: "150px" }}
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
