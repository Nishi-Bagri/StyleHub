import "./CollectionBanner.css";
import banner from "../../assets/collection-banner.jpg";

function CollectionBanner() {
  return (
    <section className="collection-banner">

      <div className="banner-content">
        <span className="banner-tag">NEW ARRIVALS</span>

        <h2>
          Effortless
          <br />
          Elegance
        </h2>

        <p>
          Elevate your wardrobe with premium essentials crafted for modern
          elegance and everyday confidence.
        </p>

        <button>Shop Collection</button>
      </div>

      <div className="banner-image">
        <img src={banner} alt="Collection Banner" />
      </div>

    </section>
  );
}

export default CollectionBanner;