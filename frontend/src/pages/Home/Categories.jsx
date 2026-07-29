import "./Categories.css";

import womenImage from "../../assets/women.jpg";
import menImage from "../../assets/men.jpg";
import kidsImage from "../../assets/kids.jpg";

function Categories() {
  return (
    <section className="categories">

      <div className="section-title">
        <h2>Shop By Category</h2>
        <p>Explore our latest fashion collections</p>
      </div>

      <div className="category-container">

        <div className="category-card">
          <img src={womenImage} alt="Women" />
          <div className="overlay">
            <h3>Women</h3>
          </div>
        </div>

        <div className="category-card">
          <img src={menImage} alt="Men" />
          <div className="overlay">
            <h3>Men</h3>
          </div>
        </div>

        <div className="category-card">
          <img src={kidsImage} alt="Kids" />
          <div className="overlay">
            <h3>Kids</h3>
          </div>
        </div>

      </div>

    </section>
  );
}

export default Categories;