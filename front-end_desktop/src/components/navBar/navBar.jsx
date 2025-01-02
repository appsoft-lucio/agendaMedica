import "./navBar.style.css";
import { Link } from "react-router-dom";
import logoBranco from "../../assets/logoBranco.png";

export default function NavBar() {
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary navBarColor">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/appointments">
          <img className="logo-menu" src={logoBranco} alt="Logo AppSoft" />
        </Link>
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Lúcio Júnior
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Meu Perfil
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/">
                      Sair
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
