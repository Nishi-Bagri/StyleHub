import AnnouncementBar from "../../components/layout/AnnouncementBar";
import Navbar from "../../components/layout/Navbar";
import Hero from "./Hero";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import CollectionBanner from "./CollectionBanner";

function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <CollectionBanner />
    </>
  );
}

export default Home;