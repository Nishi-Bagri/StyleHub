import AnnouncementBar from "../../components/layout/AnnouncementBar";
import Navbar from "../../components/layout/Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import CollectionBanner from "./CollectionBanner";
import Newsletter from "./Newsletter";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CollectionBanner />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;