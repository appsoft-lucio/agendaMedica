import { query } from "../database/sqlite.js";

async function InserirAdmin(name, email, password) {
  const sqlInsert = `INSERT INTO admins (name, email, password) VALUES (?, ?, ?)`;
  await query(sqlInsert, [name, email, password]);

  const sqlSelect = `SELECT * FROM admins WHERE email = ?`;
  const admin = await query(sqlSelect, [email]);

  return admin[0];
}

async function ListarByEmailAdmin(email) {
  const sqlSelect = `SELECT * FROM admins WHERE email = ?`;
  const admin = await query(sqlSelect, [email]);

  return admin[0] || null; // Retorna o usuário ou null se não encontrado
}

export default { ListarByEmailAdmin, InserirAdmin };
