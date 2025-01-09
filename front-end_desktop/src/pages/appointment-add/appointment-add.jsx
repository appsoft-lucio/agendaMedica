import { useState, useEffect } from "react";
import NavBar from "../../components/navBar/navBar.jsx";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../../constants/api.js";

export default function AppointmentAdd() {
  const navigate = useNavigate();
  const { id_appointment } = useParams();
  const [users, setUser] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);

  const [idUser, setIdUser] = useState("");
  const [idDoctor, setIdDoctor] = useState("");
  const [idService, setIdService] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingHour, setBookingHour] = useState("");

  async function LoadUsers() {
    try {
      const response = await api.get("/admin/users");
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return Navigate("/");
        }

        alert(error.response?.data.error);
      } else {
        alert("Erro ao carregar pacientes.");
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
        alert("Erro ao carregar agendamentos. Tente novamente.");
      }
    }
  }

  async function AgendarAppointment() {
    const json = {
      id_user: idUser,
      id_doctor: idDoctor,
      id_service: idService,
      booking_date: bookingDate,
      booking_hour: bookingHour,
    };
    try {
      const response = await api.post("/admin/appointments", json);

      if (response.data) {
        navigate("/appointments");
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return navigate("/");
        }

        alert(error.response?.data.error);
      } else {
        alert("Erro ao carregar salvar dados.");
      }
    }
  }

  async function LoadService(id) {
    if (!id) return;

    try {
      const response = await api.get("/doctors/" + id + "/services");

      if (response.data) {
        console.log(response.data);
        setServices(response.data);
      }
    } catch (error) {
      if (error.response?.data.error) {
        if (error.response.status === 401) {
          return navigate("/");
        }

        alert(error.response?.data.error);
      } else {
        alert("Erro ao listar serviços.");
      }
    }
  }

  useEffect(() => {
    LoadUsers();
    LoadDoctors();
  }, []);

  useEffect(() => {
    LoadService(idDoctor);
  }, [idDoctor]);

  return (
    <>
      <NavBar />
      <section className="container-fluid mt-page ">
        <section className="row col-lg-4 offset-lg-4">
          <section className="col-12 mt-2">
            <h2>
              {id_appointment > 0 ? "Editar agendamento" : "Novo Agendamento"}
            </h2>
          </section>
          <section className="col-12 mt-3" value={idUser}>
            <label htmlFor="User" className="form-label ">
              Paciente
            </label>
            <div className="form-control mb-2">
              <select
                name="User"
                id="doctor"
                onChange={(e) => setIdUser(e.target.value)}
              >
                <option value="0">Selecione um paciente</option>
                {users.map((u) => {
                  return (
                    <option key={u.id_user} value={u.id_user}>
                      {u.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
          <section className="col-12 mt-3" value={idDoctor}>
            <label htmlFor="doctor" className="form-label ">
              Médico
            </label>
            <div className="form-control mb-2">
              <select
                name="doctor"
                id="doctor"
                onChange={(e) => setIdDoctor(e.target.value)}
              >
                <option value="0">Selecione um médico</option>
                {doctors.map((d) => {
                  return (
                    <option key={d.id_doctor} value={d.id_doctor}>
                      {d.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
          <section className="col-12 mt-3">
            <label htmlFor="service" className="form-label">
              Serviço
            </label>
            <div className="form-control mb-2">
              <select
                name="service"
                id="service"
                value={idService}
                onChange={(e) => setIdService(e.target.value)}
              >
                <option value="0">Selecione um serviço</option>
                {services.map((s) => {
                  return (
                    <option key={s.id_service} value={s.id_service}>
                      {s.service_description}
                    </option>
                  );
                })}
              </select>
            </div>
          </section>
          <section className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Data
            </label>
            <input
              type="date"
              className="form-control"
              name="bookingDate"
              id="bookingDate"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
          </section>
          <section className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Horário
            </label>
            <div className="form-control mb-2">
              <select
                name="bookingHour"
                id="bookingHour"
                value={bookingHour}
                onChange={(e) => setBookingHour(e.target.value)}
              >
                <option value="0">Horário</option>
                <option value="09:00">09:00</option>
                <option value="09:30">09:30</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
              </select>
            </div>
          </section>
          <section className="col-12 mt-5">
            <div className="d-flex justify-content-end">
              <Link to="/appointments" className="btn btn-outline-danger me-4">
                Calcelar
              </Link>
              <button
                onClick={AgendarAppointment}
                className="btn btn-custom"
                type="button"
              >
                Agendar
              </button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
