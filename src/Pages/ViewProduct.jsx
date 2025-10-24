import React from "react";
import { useParams, Link } from "react-router-dom"

export const ViewProduct = ({ products }) => {
  const { id } = useParams(); // get id from URL

  // Find the product with this id
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

  return (
    <div className="h-screen flex justify-center items-center bg-base-200">
      <div className="card bg-base-100 w-[30rem] shadow-lg">
        <figure>
          <img
            className="h-80 w-full object-cover rounded-t-lg"
            src={product.imageUrl && `http://localhost:8080${product.imageUrl}`}
            alt={product.name}
          />
        </figure>
        <div className="card-body p-6">
          <h2 className="card-title text-2xl">{product.name}</h2>
          <p className="text-base">{product.description}</p>
          <p className="text-base font-semibold">Price: ${product.price}</p>
          <div className="card-actions justify-end mt-3">
            <Link to={"/"} className="btn bg-red-600 hover:bg-red-500 btn-md">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
