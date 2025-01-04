import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.style.css";
import logo from "../../assets/logo.png";
import fundo from "../../assets/fundo.png";
import olhoAberto from "../../assets/olhoAberto.png";
import olhoFechado from "../../assets/olhoFechado.png";
import api from "../../constants/api";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setalert] = useState("");

  async function CriarConta(e) {
    e.preventDefault();
    setalert("");

    if (password.length < 5) {
      setalert("A senha deve ter no mínimo 5 caracteres.");
      return; // Interrompe a execução da função
    }

    if (password != confirmPassword) {
      setalert("As senhas não conferem. Digite novamente.");
      return;
    }

    try {
      const response = await api.post("/users/register", {
        name,
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("sessionToken", response.data.token);
        localStorage.setItem("sessionId", response.data.id_user);
        localStorage.setItem("sessionEmail", email);
        localStorage.setItem("sessionName", name);
        api.defaults.headers.common["Authorization"] =
          "Bearer" + response.data.token;
        navigate("/appointments");
        navigate("/appointments");
      } else {
        setalert("Erro ao criar conta. Tente novamente mais tarde");
      }
    } catch (error) {
      if (error.response?.data.error) {
        setalert(error.response?.data.error);
      } else {
        setalert("Erro ao criar conta. Tente novamente mais tarde");
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
          <h4 className="mt-5 mb-3">Crie sua conta agora mesmo.</h4>
          <h5 className="mb-2 text-secondary">Preencha os campos abaixo.</h5>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              type="email"
              placeholder="E-mail"
              autoComplete="username"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mt-3 ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              autoComplete="new-password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <img
              src={showPassword ? olhoAberto : olhoFechado}
              alt="Mostrar/ocultar senha"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="mt-3 ">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar senha"
              autoComplete="new-password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <img
              src={showPassword ? olhoAberto : olhoFechado}
              alt="Mostrar/ocultar senha"
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="mt-3 mb-3">
            <button
              onClick={CriarConta}
              className="btn btn-custom"
              type="button"
            >
              Criar minha conta.
            </button>
          </div>
          {alert.length > 0 ? (
            <div className="alert alert-danger" role="alert">
              {alert}
            </div>
          ) : null}
          <div className="mt-5 mb-3">
            <span>Já tenho conta. </span>
            <Link to="/">Acessar conta.</Link>
          </div>
        </form>
      </article>
      <section className="col-sm-7">
        <img src={fundo} alt="Imagem de fundo" className="background-login" />
      </section>
    </div>
  );
}
