
function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand-logo">
        <span className="brand-icon">🏏</span>
        <div className="brand-text">
          <span>IPL TICKET BOOKING</span>
          <small>2026 • BOOK YOUR MATCH</small>
        </div>
      </div>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#matches">Matches</a>
        <a href="#guidelines">Guidelines</a>
      </div>
    </nav>
  );
}

export default Navbar;
