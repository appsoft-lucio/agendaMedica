import { Link } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { doctors, appointments } from "../../constants/data.js";
import Appointment from "../../components/appointments/appointments.jsx";

export default function Appointments() {
  function ClickEdit(id_appointment) {
    return console.log("Editar" + id_appointment);
  }
  function ClickDelete(id_appointment) {
    return console.log("Deletar" + id_appointment);
  }

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
          <input id="starDate" className="form-control" type="date" />
          <span className="m-2">Até</span>
          <input id="endDate" className="form-control" type="date" />
          <section className="form-control ms-2 me-2">
            <select id="doctor" name="doctor">
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
          <button className="btn btn-custom">Filtar</button>
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
