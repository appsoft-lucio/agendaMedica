import "./appointments.style.css";
import NavBar from "../../components/navBar/navBar";
import { Link, useNavigate } from "react-router-dom";
import Appointment from "../../components/appointments/appointments.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Importar css

export default function Appointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [IdDoctors, setIdDoctors] = useState("");
  const [dtStart, setDtStart] = useState("");
  const [dtEnd, setDtEnd] = useState("");

  function ClickEdit(id_appointment) {
    navigate("/appointments/edit/" + id_appointment);
  }

  function ClickDelete(id_appointment) {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="custom-alert">
          <h2>Excluir</h2>
          <p>Tem certeza que deseja excluir este agendamento?</p>
          <div>
            <button
              onClick={() => {
                ExcluirAppointment(id_appointment);
                onClose();
              }}
              className="btn btn-confirm"
            >
              Sim
            </button>
            <button onClick={onClose} className="btn btn-cancel">
              Não
            </button>
          </div>
        </div>
      ),
    });
  }

  async function ExcluirAppointment(id) {
    try {
      const response = await api.delete("/appointments/" + id);

      if (response.data) {
        LoadAppointments();
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return navigate("/");
        }

        alert(error.response?.data.error);
      } else {
        alert("Erro ao excluir.");
      }
    }
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

  async function LoadAppointments() {
    try {
      const response = await api.get("/admin/appointments", {
        params: {
          id_doctor: IdDoctors,
          dt_start: dtStart,
          dt_end: dtEnd,
        },
      });

      if (response.data) {
        setAppointments(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return navigate("/");
        }

        alert(error.response?.data.error);
      } else {
        alert("Erro ao carregar agendamentos. Tente novamente.");
      }
      console.log(error);
    }
  }

  function ChangeDoctor(e) {
    setIdDoctors(e.target.value);
  }

  useEffect(() => {
    LoadDoctors();
    LoadAppointments();
  }, []);

  return (
    <section className="container-fluid mt-page">
      <NavBar />
      <section className="d-flex justify-content-between align-items-center">
        <section>
          <h3 className="d-inline">Agendamentos</h3>
          <Link to="/appointments/add" className="btn ms-5 mb-2  btn-custom">
            Novo Agendamento
          </Link>
        </section>
        <section className="d-flex justify-content-end">
          <input
            id="starDate"
            className="form-control"
            type="date"
            onChange={(e) => {
              setDtStart(e.target.value);
            }}
          />
          <span className="m-2">Até</span>
          <input
            id="endDate"
            className="form-control"
            type="date"
            onChange={(e) => {
              setDtEnd(e.target.value);
            }}
          />
          <section className="form-control ms-2 me-2">
            <select
              id="doctor"
              name="doctor"
              value={IdDoctors}
              onChange={ChangeDoctor}
            >
              <option value="">Todos os médicos</option>

              {doctors.map((doc) => {
                return (
                  <option key={doc.id_doctor} value={doc.id_doctor}>
                    {doc.name}
                  </option>
                );
              })}
            </select>
          </section>

          <button
            onClick={LoadAppointments}
            className="btn btn-custom"
            type="button"
          >
            Filtar
          </button>
        </section>
      </section>

      <section>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Paciente</th>
              <th scope="col">Médico</th>
              <th scope="col">Serviço</th>
              <th scope="col">Data/Hora</th>
              <th scope="col" className="text-end">
                Valor
              </th>
              <th scope="col" className="col-buttons"></th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((ap) => {
              return (
                <Appointment
                  key={ap.id_appointment}
                  id_appointment={ap.id_appointment}
                  user={ap.user}
                  doctor={ap.doctor}
                  service={ap.service}
                  booking_date={ap.booking_date}
                  booking_hour={ap.booking_hour}
                  price={ap.price}
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
