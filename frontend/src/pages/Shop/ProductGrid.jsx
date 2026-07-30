import { useEffect, useState } from "react";
import "./ProductGrid.css";
import ProductCard from "./ProductCard";
import { getProducts } from "../../services/productService";

const ProductGrid = ({
  search,
  selectedCategory,
  selectedBrand,
  maxPrice,
  availability,
  ordering,
  setOrdering,
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [
    search,
    selectedCategory,
    selectedBrand,
    maxPrice,
    availability,
    ordering,
  ]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts(
    search,
    selectedCategory,
    selectedBrand,
    maxPrice,
    availability,
    ordering
);

      setProducts(data.results || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading Products...</h2>
      </div>
    );
  }

  return (
    <section className="product-grid">
      <div className="product-grid-header">
        <div className="product-count">
          <h2>{products.length} Products</h2>
          <p>Showing premium fashion collection</p>
        </div>

        <div className="sort-box">
          <select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
          >
            <option value="-created_at">Latest</option>

            <option value="price">Price: Low to High</option>

            <option value="-price">Price: High to Low</option>

            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      <div className="products-container">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <h3>No products found.</h3>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
