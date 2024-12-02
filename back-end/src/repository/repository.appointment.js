import { application } from "express";
import { query } from "../database/sqlite.js";

async function ListarByUser(id_user) {
  const sql = `SELECT 
    a.id_appointment, 
    s.description AS service, 
    d.name AS doctor, 
    d.specialty, 
    a.booking_date, 
    a.booking_hour, 
    u.name AS user, 
    ds.price
FROM appointments a
JOIN services s ON s.id_service = a.id_service
JOIN doctors d ON d.id_doctor = a.id_doctor
JOIN users u ON u.id_user = a.id_user
LEFT JOIN doctors_services ds ON ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service
WHERE a.id_user = ?
ORDER BY a.booking_date, a.booking_hour`;

  try {
    // Executa a consulta
    const appointments = await query(sql, [id_user]);

    // Verifica se não há agendamentos
    if (!appointments || appointments.length === 0) {
      return { error: "Nenhum agendamento encontrado para este usuário." }; // Retorna erro claro
    }

    // Retorna os agendamentos encontrados

    return appointments;
  } catch (error) {
    // Log e retorno do erro

    return { error: "Erro ao listar agendamentos." }; // Retorna erro com uma mensagem genérica
  }
}

async function Inserir(
  id_user,
  id_doctor,
  id_service,
  booking_date,
  booking_hour
) {
  const sqlInsert = `
    INSERT INTO appointments (id_user, id_doctor, id_service, booking_date, booking_hour) 
    VALUES (?, ?, ?, ?, ?)
  `;

  const sqlSelect = `
    SELECT id_appointment, id_user, id_doctor, id_service, booking_date, booking_hour 
    FROM appointments 
    WHERE id_appointment = last_insert_rowid()
  `;

  try {
    await query(sqlInsert, [
      id_user,
      id_doctor,
      id_service,
      booking_date,
      booking_hour,
    ]);
    const appointment = await query(sqlSelect, []); // Recupera o registro inserido
    return appointment[0]; // Retorna o objeto
  } catch (error) {
    console.error("Erro ao inserir agendamento:", error.message);
    throw new Error("Erro ao inserir agendamento no banco de dados.");
  }
}

async function Excluir(id_user, id_appointment) {
  const sqlDelete = `DELETE from appointments 
    WHERE id_appointment = ? AND id_user = ?`;

  await query(sqlDelete, [id_appointment, id_user]);
  return { id_appointment };
}

export default { ListarByUser, Inserir, Excluir };
