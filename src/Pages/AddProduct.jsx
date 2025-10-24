import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddProduct({ fetchProducts }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // for image file

  const handleSave = async () => {
    if (!name || !description || !price) {
      alert("Please fill all the details before saving");
      return;
    }

    try {
      // 1️⃣ Save product details
      const response = await axios.post("http://localhost:8080/product", {
        name,
        description,
        price,
      });

      const productId = response.data.id;

      // 2️⃣ Upload image if selected
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await axios.post(
          `http://localhost:8080/product/${productId}/upload`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // 3️⃣ Refresh product list in App
      if (fetchProducts) fetchProducts();

      // 4️⃣ Go back home
      navigate("/");
    } catch (error) {
      console.error("Error saving product", error);
      alert("Failed to save product. Try again!");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Product Name</h2>
          <input
            type="text"
            placeholder="Type here"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h2 className="card-title">Description</h2>
          <textarea
            className="textarea"
            placeholder="Type here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h2 className="card-title">Price</h2>
          <input
            type="text"
            placeholder="Type here"
            className="input"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <h2 className="card-title">Image</h2>
          <input
            type="file"
            accept="image/*"
            className="input"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="card-actions justify-end mt-2">
            <button className="btn btn-primary" onClick={handleSave}>
              Save Product
            </button>
            <Link to="/">
              <button className="btn bg-red-800 text-white hover:bg-red-900">
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
