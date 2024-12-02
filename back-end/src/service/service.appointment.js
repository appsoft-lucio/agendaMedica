import repositoryAppointment from "../repository/repository.appointment.js";

async function ListarByUser(id_user) {
  try {
    // Verifica se o id_user é válido
    if (!id_user) {
      throw new Error("ID de usuário não fornecido.");
    }

    // Chama o repositório para buscar os agendamentos
    const appointments = await repositoryAppointment.ListarByUser(id_user);

    // Verifica se não há agendamentos
    if (appointments.length === 0) {
      return { error: "Nenhum agendamento encontrado para este usuário." };
    }

    // Retorna os agendamentos encontrados
    return appointments;
  } catch (error) {
    // Retorna erro genérico se algo falhar
    return { error: error.message || "Erro ao listar agendamentos." };
  }
}

async function Inserir(
  id_user,
  id_doctor,
  id_service,
  booking_date,
  booking_hour
) {
  const appointment = await repositoryAppointment.Inserir(
    id_user,
    id_doctor,
    id_service,
    booking_date,
    booking_hour
  );

  return appointment;
}

async function Excluir(id_user, id_appointment) {
  const appointment = await repositoryAppointment.Excluir(
    id_user,
    id_appointment
  );

  return appointment;
}

export default { ListarByUser, Inserir, Excluir };
