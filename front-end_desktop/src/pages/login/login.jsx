import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.style.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import olhoAberto from "../../assets/olhoAberto.png";
import olhoFechado from "../../assets/olhoFechado.png";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
            <input type="email" placeholder="E-mail" />
          </div>
          <div className="mt-3 ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
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
            <button className="btn btn-custom">Acessar</button>
          </div>
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
