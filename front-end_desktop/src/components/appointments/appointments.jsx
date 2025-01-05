import lixeira from "../../assets/lixeira.png";
import editar from "../../assets/editar.png";
import "./appointments.css";

export default function Appointment(props) {
  const formattedDate = new Date(props.booking_date);

  const formattedBookingDate = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(formattedDate);

  return (
    <tr>
      <td scope="col">{props.user}</td>
      <td scope="col">{props.doctor}</td>
      <td scope="col">{props.service}</td>
      <td scope="col">
        {formattedBookingDate} {props.booking_hour}
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
            <img src={editar} alt="" />
          </button>

          <button
            onClick={() => props.clickDelete(props.id_appointment)}
            className="btn btn-sm "
          >
            <img src={lixeira} alt="" />
          </button>
        </div>
      </td>
    </tr>
  );
}
