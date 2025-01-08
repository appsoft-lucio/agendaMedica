import { application } from "express";
import { query } from "../database/sqlite.js";

async function ListarByUser(id_user, dt_start, dt_end, id_doctor) {
  const filtro = [];

  let sql = `SELECT
    a.id_appointment,
    s.description AS service,
    d.name AS doctor,
    d.specialty,
    a.booking_date,
    a.booking_hour,
    u.name AS user,
    ds.price,
    a.id_doctor,
    a.id_service
  FROM appointments a
  JOIN services s ON s.id_service = a.id_service
  JOIN doctors d ON d.id_doctor = a.id_doctor
  JOIN users u ON u.id_user = a.id_user
  LEFT JOIN doctors_services ds ON ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service
  WHERE a.id_appointment > 0 `;

  if (id_user) {
    sql += "AND a.id_user = ? ";
    filtro.push(id_user);
  }
  if (dt_start) {
    sql += "AND a.booking_date >= ? ";
    filtro.push(dt_start);
  }
  if (dt_end) {
    sql += "AND a.booking_date <= ? ";
    filtro.push(dt_end);
  }
  if (id_doctor) {
    sql += "AND a.id_doctor = ? ";
    filtro.push(id_doctor);
  }

  sql += "ORDER BY a.booking_date, a.booking_hour";

  const appointments = await query(sql, filtro);

  return appointments;
}

async function ListarId(id_appointment) {
  let sql = `SELECT
    a.id_appointment,
    a.id_user,
    u.name,
    s.description AS service,
    d.name AS doctor,
    d.specialty,
    a.booking_date,
    a.booking_hour,
    u.name AS user,
    ds.price,
    a.id_doctor,
    a.id_service    
  FROM appointments a
  JOIN services s ON s.id_service = a.id_service
  JOIN doctors d ON d.id_doctor = a.id_doctor
  JOIN users u ON u.id_user = a.id_user
  LEFT JOIN doctors_services ds ON ds.id_doctor = a.id_doctor AND ds.id_service = a.id_service
  WHERE a.id_appointment = ? `;

  const appointments = await query(sql, [id_appointment]);

  return appointments[0];
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
async function Editar(
  id_appointment,
  id_user,
  id_doctor,
  id_service,
  booking_date,
  booking_hour
) {
  const sqlUpdate = `
    UPDATE appointments set id_user=?, id_doctor=?, id_service=?, booking_date=?, booking_hour=? 
    WHERE id_appointment = ? `;

  await query(sqlUpdate, [
    id_user,
    id_doctor,
    id_service,
    booking_date,
    booking_hour,
    id_appointment,
  ]);

  const resAppointment = [id_appointment, id_user, id_service, id_doctor];

  return { resAppointment };
}

async function Excluir(id_user, id_appointment) {
  const sqlDelete = `DELETE from appointments 
    WHERE id_appointment = ? AND id_user = ?`;

  await query(sqlDelete, [id_appointment, id_user]);
  return { id_appointment };
}

export default { ListarByUser, Inserir, Excluir, ListarId, Editar };
