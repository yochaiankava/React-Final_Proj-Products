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



function App() {
  const [products, setProducts] = useState([]);
  const [cateogries, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentCategoryName, setCurrentCategoryName] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(getProducts, [currentCategory, currentSearch]); // when loading the page for the first time - getProducts()
  useEffect(getCategories, []);

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
      .get("http://127.0.0.1:8000/category/")
      .then((response) => {
        console.log("categories", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function getProducts() {
    let url = "http://127.0.0.1:8000/product/?category=" + currentCategory;

    if (currentSearch) {
      url = "http://127.0.0.1:8000/product/?search=" + currentSearch;
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
        <Navbar
          categories={cateogries}
          searchProduct={searchProduct}
          clickButton={clickButton}
        />
       
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="app">
                       
                <img src="https://www.ankava.co.il/wp-content/uploads/lodo-text.png"
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
                  <div className="row row-cols-1 row-cols-md-6 row-cols-lg-6 g-4" >
                    {products.map((product) => (
                      <div key={product.id} >
                        <Product product={product} />
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
              </>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/add_product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart/>}  />
          <Route path="/gift_carts" element={<GiftCarts/>}  />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
