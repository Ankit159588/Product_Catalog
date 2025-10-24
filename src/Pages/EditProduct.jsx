import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProduct({ products, fetchProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id.toString() === id);

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-xl">Product not found!</p>
        <Link to={"/"} className="ml-4 btn bg-red-600 hover:bg-red-500 btn-md">
          Go Back
        </Link>
      </div>
    );
  }

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [file, setFile] = useState(null); // new image file

  const handleUpdate = async () => {
    try {
      // 1️⃣ Update product info
      await axios.put(`http://localhost:8080/product/${id}`, {
        name,
        description,
        price: parseFloat(price),
        imageUrl, // keep old image if not changed
      });

      // 2️⃣ Upload new image if selected
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        await axios.post(
          `http://localhost:8080/product/${id}/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      alert("Product updated successfully!");
      fetchProducts();
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error.response || error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-base-200">
      <div className="card bg-base-100 w-[28rem] shadow-lg">
        <figure>
          <img
            className="h-64 w-full object-cover rounded-t-lg"
            src={imageUrl && `http://localhost:8080${imageUrl}`}
            alt={name}
          />
        </figure>

        <div className="card-body p-6">
          <h2 className="card-title text-xl">Product Name</h2>
          <input
            type="text"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <h2 className="card-title text-xl mt-2">Product Description</h2>
          <textarea
            className="textarea textarea-bordered w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h2 className="card-title text-xl mt-2">Price</h2>
          <input
            type="text"
            className="input input-bordered w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <h2 className="card-title text-xl mt-2">Change Image</h2>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="card-actions justify-between mt-4">
            <button onClick={handleUpdate} className="btn btn-primary">
              Update
            </button>

            <Link
              to={`/viewpage/${id}`}
              className="btn bg-green-800 text-white hover:bg-green-900"
            >
              View
            </Link>

            <Link
              to={"/"}
              className="btn bg-red-800 text-white hover:bg-red-900"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
