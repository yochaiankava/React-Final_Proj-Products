import axios from "axios";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import NoPage from "./components/NoPage";

function App() {
  const [products, setProducts] = useState([]);
  const [cateogries, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSearch, setCurrentSearch] = useState("");

  useEffect(getProducts, [currentCategory, currentSearch]); // when loading the page for the first time - getProducts()
  useEffect(getCategories, []);

  function clickButton(id) {
    console.log("click", id);
    setCurrentCategory(id);
  }

  function clickSubmit(formData, event) {
    console.log("clickSubmit", formData);
    setCurrentSearch(formData);
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
    axios
    .get(
      `http://127.0.0.1:8000/product/?category=${currentCategory}&search=${currentSearch.name}`
    )
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
          clickSubmit={clickSubmit}
          clickButton={clickButton}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-6 g-4">
                  {products.map((product) => (
                    <div key={product.id} className="col">
                      <Product product={product} />
                    </div>
                  ))}
                </div>
                <br />
              </>
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
