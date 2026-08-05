import { Outlet } from "react-router-dom";

import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <AnnouncementBar />

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;