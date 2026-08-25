import "./Hero.css";
import heroImage from "../../assets/hero.jpg";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">NEW COLLECTION 2026</p>

        <h1 className="hero-title">
          Elevate Your
          <br />
          Style
        </h1>

        <p className="hero-description">
          Discover premium fashion collections crafted for
          every occasion. Style that defines confidence and elegance.
        </p>
      </div>

      <div className="hero-image">
        <img src={heroImage} alt="Fashion Model" />
      </div>
    </section>
  );
}

export default Hero;