import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar.jsx";
import Doctor from "../../components/doctors/doctors.jsx";
import api from "../../constants/api.js";
import { useState, useEffect } from "react";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  function ClickEdit(id_doctor) {
    alert("Olá, sou o ClickEdite" + " " + id_doctor);
  }

  function ClickDelete(id_doctor) {
    alert("Olá, sou o ClickDelete" + " " + id_doctor);
  }

  async function LoadDoctors() {
    try {
      const response = await api.get("/doctors");

      if (response.data) {
        setDoctors(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return navigate("/");
        }

        alert(error.response?.data.error);
      } else {
        alert("Erro ao listar médicos. Tente novamente.");
      }
    }
  }

  useEffect(() => {
    LoadDoctors();
  }, []);

  return (
    <section className="container-fluid mt-page">
      <NavBar />
      <section className="d-flex justify-content-around align-items-center mb-5">
        <section>
          <h3 className="d-inline">Médicos</h3>
        </section>
        <section className="d-flex ">
          <Link
            to="#"
            className="btn ms-5 mb-2  btn-custom text-nowrap novo-medico"
          >
            Novo Médico
          </Link>
        </section>
        <section className="form-control d-inline-block ms-2 me-2 w-auto">
          <select className="border-0 bg-transparent">
            <option value="">Todos os médicos</option>
          </select>
        </section>
        <section>
          <button className="btn btn-custom" type="button">
            Filtar
          </button>
        </section>
      </section>
      <section>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Médico</th>
              <th scope="col">Especialidade</th>
              <th scope="col" className="col-buttons"></th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => {
              return (
                <Doctor
                  key={doc.id_doctor}
                  id_doctor={doc.id_doctor}
                  icon={doc.icon}
                  name={doc.name}
                  specialty={doc.specialty}
                  clickEdit={ClickEdit}
                  clickDelete={ClickDelete}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    </section>
  );
}
