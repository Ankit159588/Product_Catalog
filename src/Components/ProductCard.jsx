import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  setProducts,
  products,
}) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:8080/product/${id}`);
      // now remove the product
      setProducts(products.filter((product) => product.id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src={
            imageUrl
              ? `http://localhost:8080${imageUrl}` // prepend backend URL
              : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          }
          alt={name}
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl">{name}</h2>
        <p>{description}</p>
        <p>${price}</p>
        <div className="card-actions justify-end">
          {/* ✅ Updated Edit button to include product id */}
          <Link to={`/editpage/${id}`} className="btn btn-primary">
            Edit
          </Link>
          <Link
            to={`/viewpage/${id}`}
            className="btn bg-green-800 text-white hover:bg-green-900"
          >
            View
          </Link>

          <button
            onClick={handleDelete}
            className="btn bg-red-800 text-white hover:bg-red-900"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
