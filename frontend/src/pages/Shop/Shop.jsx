import { useState } from "react";
import "./Shop.css";

import ShopBanner from "./ShopBanner";
import FilterSidebar from "./FilterSidebar";
import ProductGrid from "./ProductGrid";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [availability, setAvailability] = useState("");
  const [ordering, setOrdering] = useState("-created_at");

  console.log("Selected Category:", selectedCategory);

  return (
    <div className="shop-page">
      <ShopBanner />

      <div className="shop-container">
        {/* Sidebar */}
        <aside className="shop-sidebar">
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            availability={availability}
            setAvailability={setAvailability}
          />
        </aside>

        {/* Products */}
        <main className="shop-content">
          <ProductGrid
            search={search}
            selectedCategory={selectedCategory}
            selectedBrand={selectedBrand}
            maxPrice={maxPrice}
            availability={availability}
            ordering={ordering}
            setOrdering={setOrdering}
          />
        </main>
      </div>
    </div>
  );
};

export default Shop;
