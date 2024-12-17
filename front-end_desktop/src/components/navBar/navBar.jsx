import "./navBar.style.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function NavBar() {
  return (
    <nav class="navbar fixed-top navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/appointments">
          <img className="logo-menu" src={logo} alt="Logo AppSoft" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/appointments">
                Agendamentos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/doctos">
                Médicos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
