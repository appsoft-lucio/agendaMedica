import lixeira from "../../assets/lixeira.png";
import editar from "../../assets/editar.png";
import "./doctor.styles.css";
import male from "../../assets/male.png";
import female from "../../assets/female.png";

export default function Doctor(props) {
  const imageSrc =
    props.icon === "M" ? male : props.icon === "F" ? female : null;

  return (
    <tr>
      <td scope="col">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={props.icon === "M" ? "Ícone Masculino" : "Ícone Feminino"}
            className="icon-img"
          />
        ) : (
          "Sem ícone"
        )}
      </td>
      <td scope="col">{props.name}</td>
      <td scope="col">{props.specialty}</td>
      <td scope="col">
        <div className="edit-delete">
          <button
            onClick={() => props.clickEdit(props.id_doctor)}
            className="btn btn-sm "
          >
            <img src={editar} alt="" />
          </button>

          <button
            onClick={() => props.clickDelete(props.id_doctor)}
            className="btn btn-sm "
          >
            <img src={lixeira} alt="" />
          </button>
        </div>
      </td>
    </tr>
  );
}
