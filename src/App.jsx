import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./Components/NavBar";
import ProductCard from "./Components/ProductCard";
import EditProduct from "./Pages/EditProduct";
import AddProduct from "./Pages/AddProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Router>
      <NavBar />

      <div className="pt-24 ml-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.name}
                    description ={product.description}
                    price={product.price}
                    imageUrl={product.imageUrl}
                    id={product.id} // pass ID
                    setProducts={setProducts} // pass setter
                    products={products}
                  />
                ))}
              </>
            }
          />

          {/* Add product page */}
          <Route
            path="/addproduct"
            element={<AddProduct fetchProducts={fetchProducts} />}
          />

          {/* Edit page */}
          <Route path="/editpage" element={<EditProduct />} />
          {/* <Route path="/viewpage" element={<ViewProduct />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
