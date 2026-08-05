import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import CollectionBanner from "./CollectionBanner";
import Newsletter from "./Newsletter";

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CollectionBanner />
      <Newsletter />
    </>
  );
}

export default Home;