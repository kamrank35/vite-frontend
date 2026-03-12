import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">Navbar</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">  

            <li className="nav-item">
              <Link className="nav-link" to="/">Dashboard</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/add-item">Add Item</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/items">Item List</Link>
            </li>

          </ul>

          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search"/>
            <button className="btn btn-outline-success">Search</button>
          </form>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;