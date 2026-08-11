import "./FeaturedProducts.css";

import { useEffect, useState } from "react";

import { getProducts } from "../../services/productService";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      console.log(data);

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="featured-products">
      <h2>Featured Products</h2>

      <p>Discover our latest premium fashion collection</p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={products.length > 4}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1400: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="product-card">
              <img
                src={product.image}
                alt={product.name}
                onLoad={() => console.log("Loaded", product.image)}
                onError={(e) => {
                  console.log("Failed", product.image);
                  console.log(e.target.src);
                }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>

                <div className="rating">★★★★★</div>

                <h4>₹{Number(product.price).toLocaleString("en-IN")}</h4>

                <button>Add to Cart</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedProducts;
