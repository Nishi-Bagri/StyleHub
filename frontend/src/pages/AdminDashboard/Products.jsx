import "./Products.css";

import ProductForm from "../../components/Admin/ProductForm/ProductForm";

import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
  createProduct,
} from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
      alert("Failed to delete product.");
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleAddProduct = async (formData) => {
    try {
      await createProduct(formData);

      setShowModal(false);

      fetchProducts();

      setMessage("Product added successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error(error);

      setMessage("Failed to add product.");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  if (loading) {
    return <h2>Loading Products...</h2>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>

        <button className="add-product-btn" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>

      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </td>

              <td>{product.name}</td>

              <td>{product.category.name}</td>

              <td>₹{product.price}</td>

              <td>{product.stock}</td>

              <td>
                <span
                  className={
                    product.is_active ? "status-active" : "status-inactive"
                  }
                >
                  {product.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <ProductForm
          onClose={() => setShowModal(false)}
          onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Products;
