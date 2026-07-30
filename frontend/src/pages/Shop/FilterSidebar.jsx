import { useEffect, useState } from "react";
import "./FilterSidebar.css";
import { getCategories } from "../../services/categoryService";

const FilterSidebar = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  selectedBrand,
  setSelectedBrand,
  maxPrice,
  setMaxPrice,
  availability,
  setAvailability,
}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.results || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <aside className="filter-sidebar">
      <h2 className="filter-title">Filters</h2>

      {/* Search */}

      <div className="filter-section">
        <h3>Search</h3>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}

      <div className="filter-section">
        <h3>Categories</h3>

        {/* All Categories */}
        <label>
          <input
            type="radio"
            name="category"
            value=""
            checked={selectedCategory === ""}
            onChange={() => setSelectedCategory("")}
          />
          All
        </label>

        {/* Dynamic Categories */}
        {categories.map((category) => (
          <label key={category.id}>
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={selectedCategory == category.id}
              onChange={() => setSelectedCategory(category.id)}
            />

            {category.name}
          </label>
        ))}
      </div>

      {/* Brand */}

      <div className="filter-section">
        <h3>Brand</h3>

        <label>
          <input
            type="radio"
            name="brand"
            value=""
            checked={selectedBrand === ""}
            onChange={() => setSelectedBrand("")}
          />
          All
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Nike"
            checked={selectedBrand === "Nike"}
            onChange={() => setSelectedBrand("Nike")}
          />
          Nike
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Adidas"
            checked={selectedBrand === "Adidas"}
            onChange={() => setSelectedBrand("Adidas")}
          />
          Adidas
        </label>

        <label>
          <input
            type="radio"
            name="brand"
            value="Puma"
            checked={selectedBrand === "Puma"}
            onChange={() => setSelectedBrand("Puma")}
          />
          Puma
        </label>
      </div>

      {/* Price */}

      <div className="filter-section">
        <h3>Price Range</h3>

        <input
          type="range"
          min="0"
          max="50000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <p>₹0 - ₹{maxPrice}</p>
      </div>

      {/* Availability */}

      <div className="filter-section">
        <h3>Availability</h3>

        <label>
          <input
            type="radio"
            name="availability"
            value=""
            checked={availability === ""}
            onChange={() => setAvailability("")}
          />
          All
        </label>

        <label>
          <input
            type="radio"
            name="availability"
            value="in_stock"
            checked={availability === "in_stock"}
            onChange={() => setAvailability("in_stock")}
          />
          In Stock
        </label>

        <label>
          <input
            type="radio"
            name="availability"
            value="out_of_stock"
            checked={availability === "out_of_stock"}
            onChange={() => setAvailability("out_of_stock")}
          />
          Out of Stock
        </label>
      </div>

      <button
        className="clear-btn"
        onClick={() => {
          setSearch("");
          setSelectedCategory("");
          setSelectedBrand("");
          setMaxPrice(50000);
          setAvailability("");
        }}
      >
        Clear Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
