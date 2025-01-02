import NavBar from "../../components/navBar/navBar.jsx";
import { doctors } from "../../constants/data.js";

export default function AppointmentAdd() {
  return (
    <>
      <NavBar />
      <section className="container-fluid mt-pg">
        <section className="row col-lg-4">
          <div className="col-12">
            <h2>Novo Agendamento</h2>
          </div>
          <div className="col-12">
            <label htmlFor="doctor" className="form-label">
              Médico
            </label>
            <div className="form-control mb-2">
              <select name="doctor" id="doctor">
                <option value="0">Selecione um médico</option>
                {doctors.map((d) => {
                  return;
                  <option key={d.id_doctor} value={d.id_doctor}>
                    {d.name}
                  </option>;
                })}
              </select>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
