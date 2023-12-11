import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NoPage from "./components/NoPage";
import Register from "./components/Register";
import Footer from "./components/Footer";
import AddProduct from "./components/AddProduct";
import GiftCarts from "./components/GiftCarts";
import Cart from "./components/Cart";
import CartsHistory from "./components/CartsHistory";
import CartItemsHistory from "./components/CartItemsHistory";


function App() {
  const HOST_URL = "http://127.0.0.1:8000";
  // const HOST_URL = "https://django-final-proj-products.onrender.com";

  const [products, setProducts] = useState([]);
  const [cateogries, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");
  const [userId, setUserId] = useState(null);

  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(getProducts, [currentCategory, currentSearch]); // when loading the page for the first time - getProducts()
  useEffect(getCategories, []);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const fetchCartItemsCount = async () => {
    console.log('App user id:', userId)
    try {      
      const response = await fetch(`${HOST_URL}/cartitems/count/${userId}/`);
      const data = await response.json();
      setCartItemsCount(data.count);
    } catch (error) {
      console.error("Error fetching cart items count", error);
    }
  };

  const handleLoginSuccess = (userId) => {
    console.log("Login successful! User ID:", userId);
    // Additional logic for successful login
    setUserId(userId); // Set userId in the component state
  };

  function clickButton(id, name) {
    console.log("click", id, name);
    setCurrentCategory(id);
    setCurrentCategoryName(name);
    // Clear the search when a category is selected
    setCurrentSearch("");
  }

  function searchProduct(searchText) {
    console.log("searching for product", searchText);
    setCurrentSearch(searchText);
  }

  function getCategories() {
    axios
      .get(HOST_URL + "/category/")
      .then((response) => {
        console.log("categories", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function getProducts() {
    let url = HOST_URL + "/product/?category=" + currentCategory;

    if (currentSearch) {
      url = HOST_URL + "/product/?search=" + currentSearch;
    }

    axios
      .get(url)
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  return (
    <>
      <BrowserRouter>
        {
          <Navbar
            categories={cateogries}
            searchProduct={searchProduct}
            clickButton={clickButton}
            userId={userId}
            cartItemsCount={cartItemsCount}
            fetchCartItemsCount={fetchCartItemsCount}
          />
        }

        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="app">
                  <img
                    src="https://www.ankava.co.il/wp-content/uploads/lodo-text.png"
                    //src={process.env.PUBLIC_URL + '/Meshek_ankava.png'
                    alt="logo"
                    className="logo"
                  />
                  <h1
                    className="text-center mb-3"
                    style={{ color: "white", fontStyle: "italic" }}
                  >
                    {currentCategoryName} Products:
                  </h1>
                  <br></br>
                  <div className="row row-cols-1 row-cols-md-6 row-cols-lg-6 g-4">
                    {products.map((product) => (
                      <div key={product.id}>
                        <Product
                          product={product}
                          fetchCartItemsCount={fetchCartItemsCount}
                        />
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
              </>
            }
          />
          <Route
            path="/Login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/Register" element={<Register />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/add_product" element={<AddProduct />} />          
          <Route path="/gift_carts" element={<GiftCarts />} />
          <Route path="/carts_history" element={<CartsHistory userId={userId} />} />
          <Route path="/cart_items_history/:cartId" element={<CartItemsHistory />} />
          <Route
            path="/cart"
            element={
              <Cart
                userId={userId}
                fetchCartItemsCount={fetchCartItemsCount}
                products={products}
              />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
