import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.style.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import olhoAberto from "../../assets/olhoAberto.png";
import olhoFechado from "../../assets/olhoFechado.png";
import api from "../../constants/api.js";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setalert] = useState("");

  async function ExecuteLogin(e) {
    e.preventDefault();
    setalert("");
    try {
      const response = await api.post("/users/login", { email, password });

      if (response.data) {
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_user);
        localStorage.setItem("sessionEmail", response.data.email);
        localStorage.setItem("sessionName", response.data.name);
        api.defaults.headers.common["Authorization"] =
          "Bearer" + response.data.token;
        navigate("/appointments");
      } else {
        setalert("Erro ao efeutar login. Tente novamente");
        console.log("Erro ao efeutar login. Tente novamente");
      }
    } catch (error) {
      if (error.response?.data.error) {
        setalert(error.response?.data.error);
      } else {
        setalert("Erro ao efeutar login. Tente novamente");
      }
      console.log(error);
    }
    console.log(password, email);
  }
  return (
    <div className="row login-container">
      <article className="col-sm-5 d-flex justify-content-center align-items-center text-center">
        <form action="" className="form-signin">
          <img src={logo} alt="Logo AppSoft" className="logo mt-3 mb-5" />
          <h4 className="mt-5 mb-3">
            Gerencie seus agendamentos de forma simples.
          </h4>
          <h5 className="mb-2 text-secondary">Acesse sua conta.</h5>
          <div className="mt-4">
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="mt-3 ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <img
              src={showPassword ? olhoAberto : olhoFechado}
              alt="Mostrar/ocultar senha"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="mt-3">
            <button onClick={ExecuteLogin} className="btn btn-custom mb-3">
              Acessar
            </button>
          </div>
          {alert.length > 0 ? (
            <div className="alert alert-danger" role="alert">
              {alert}
            </div>
          ) : null}
          <div className="mt-5 mb-3">
            <span>Não tenho conta. </span>
            <Link to="/register">Criar conta.</Link>
          </div>
        </form>
      </article>
      <section className="col-sm-7">
        <img src={fundo} alt="Imagem de fundo" className="background-login" />
      </section>
    </div>
  );
}
