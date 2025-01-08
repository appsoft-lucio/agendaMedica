import serviceAppointment from "../service/service.appointment.js";

async function ListarByUser(req, res) {
  const { id_user } = req; // Supondo que o id_user seja adicionado ao req pelo middleware de token

  try {
    // Verifica se o id_user está presente
    if (!id_user) {
      return res
        .status(400)
        .json({ error: "ID de usuário não fornecido ou inválido." });
    }

    // Chama o serviço para listar os agendamentos do usuário
    const appointments = await serviceAppointment.ListarByUser(
      id_user,
      "",
      "",
      ""
    );

    // Se não houver registros, retorna um erro 404
    if (appointments.length === 0) {
      return res
        .status(404)
        .json({ error: "Nenhum agendamento encontrado para este usuário." });
    }

    // Caso contrário, retorna os agendamentos encontrados
    return res.status(200).json(appointments);
  } catch (error) {
    // Em caso de erro inesperado, retorna um erro 500
    console.error("Erro ao listar agendamentos:", error);
    return res.status(500).json({
      error: "Erro ao listar agendamentos, por favor tente novamente.",
    });
  }
}
async function Listar(req, res) {
  // const id_user = req.query.id_user;
  const dt_start = req.query.dt_start;
  const dt_end = req.query.dt_end;
  const id_doctor = req.query.id_doctor;

  const appointments = await serviceAppointment.ListarByUser(
    // id_user,
    0,
    dt_start,
    dt_end,
    id_doctor
  );

  res.status(200).json(appointments);
}
async function ListarId(req, res) {
  const id_appointment = req.params.id_appointment;
  const appointments = await serviceAppointment.ListarId(id_appointment);

  res.status(200).json(appointments);
}

async function Inserir(req, res) {
  const id_user = req.id_user;
  const { id_doctor, id_service, booking_date, booking_hour } = req.body;
  try {
    const appointment = await serviceAppointment.Inserir(
      id_user,
      id_doctor,
      id_service,
      booking_date,
      booking_hour
    );
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir" });
  }
}

async function Excluir(req, res) {
  const id_user = req.id_user;
  const id_appointment = req.params.id_appointment;

  const appointment = await serviceAppointment.Excluir(id_user, id_appointment);

  return res.status(200).json(appointment);
}

export default { ListarByUser, Listar, Inserir, Excluir, ListarId };
