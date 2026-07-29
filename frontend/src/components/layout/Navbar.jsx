import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">StyleHub</h2>

      <ul className="nav-links">
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
        <li>Brands</li>
        <li>Sale</li>
      </ul>
    </nav>
  );
}

export default Navbar;