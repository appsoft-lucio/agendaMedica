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
async function ListarUsers(email) {
  const sqlSelect = `SELECT id_user, name, email  FROM users ORDER BY name`;
  const users = await query(sqlSelect, []);

  return users;
}

export default { ListarByEmailAdmin, InserirAdmin, ListarUsers };
