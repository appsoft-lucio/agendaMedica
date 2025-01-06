import NavBar from "../../components/navBar/navBar.jsx";
import { doctors, doctors_services } from "../../constants/data.js";
import { Link, useParams } from "react-router-dom";

export default function AppointmentAdd() {
  const { id_appointment } = useParams();

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
          <section className="col-12 mt-3">
            <label htmlFor="doctor" className="form-label ">
              Médico
            </label>
            <div className="form-control mb-2">
              <select name="doctor" id="doctor">
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
            <label htmlFor="doctor" className="form-label">
              Serviço
            </label>
            <div className="form-control mb-2">
              <select name="service" id="service">
                <option value="0">Selecione um serviço</option>
                {doctors_services.map((d) => {
                  return (
                    <option key={d.id_service} value={d.id_service}>
                      {d.description}
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
            />
          </section>
          <section className="col-6 mt-3">
            <label htmlFor="bookingDate" className="form-label">
              Horário
            </label>
            <div className="form-control mb-2">
              <select name="bookingHour" id="bookingHour">
                <option value="0">Horário</option>
                <option value="09:00">09:00</option>
                <option value="09:00">09:30</option>
                <option value="09:00">10:00</option>
                <option value="09:00">10:30</option>
                <option value="09:00">11:00</option>
              </select>
            </div>
          </section>
          <section className="col-12 mt-5">
            <div className="d-flex justify-content-end">
              <Link to="/appointments" className="btn btn-outline-danger me-4">
                Calcelar
              </Link>
              <button className="btn btn-custom">Agendar</button>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
