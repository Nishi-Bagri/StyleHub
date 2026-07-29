import "./FeaturedProducts.css";

import product1 from "../../assets/products/product1.jpg";
import product2 from "../../assets/products/product2.jpg";
import product3 from "../../assets/products/product3.jpg";
import product4 from "../../assets/products/product4.jpg";

function FeaturedProducts() {
  const products = [
  {
    id: 1,
    image: product1,
    name: "Tailored Beige Blazer Set",
    price: "₹8,999",
    rating: "★★★★★",
  },
  {
    id: 2,
    image: product2,
    name: "Classic Linen Suit",
    price: "₹10,999",
    rating: "★★★★☆",
  },
  {
    id: 3,
    image: product3,
    name: "Monochrome Office Collection",
    price: "₹6,999",
    rating: "★★★★★",
  },
  {
    id: 4,
    image: product4,
    name: "Camel Wool Overcoat",
    price: "₹12,499",
    rating: "★★★★☆",
  },
];

  return (
    <section className="featured-products">

      <div className="section-title">
        <h2>Featured Products</h2>
        <p>Discover our latest premium fashion collection</p>
      </div>

      <div className="products-container">

        {products.map((product) => (
          <div className="product-card" key={product.id}>

            <img src={product.image} alt={product.name} />

            <div className="product-info">

              <h3>{product.name}</h3>

              <p className="rating">{product.rating}</p>

              <h4>{product.price}</h4>

              <button>Add to Cart</button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;