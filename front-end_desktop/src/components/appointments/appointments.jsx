import lixeira from "../../assets/lixeira.png";
import editar from "../../assets/editar.png";
import "./appointments.css";

export default function Appointment(props) {
  //2025-01-07 + "T"  + 08:30:00
  const dt = new Date(props.booking_date + "T" + props.booking_hour);

  return (
    <tr>
      <td scope="col">{props.user}</td>
      <td scope="col">{props.doctor}</td>
      <td scope="col">{props.service}</td>
      <td scope="col">
        {new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }).format(dt)} -{" "}
        {props.booking_hour}h
      </td>
      <td className="text-end">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(props.price)}{" "}
      </td>
      <td scope="col">
        <div className="edit-delete">
          <button
            onClick={() => props.clickEdit(props.id_appointment)}
            className="btn btn-sm "
          >
            <img src={editar} alt="Editar" />
          </button>

          <button
            onClick={() => props.clickDelete(props.id_appointment)}
            className="btn btn-sm "
          >
            <img src={lixeira} alt="Excluir" />
          </button>
        </div>
      </td>
    </tr>
  );
}
