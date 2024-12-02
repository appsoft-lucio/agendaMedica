import { query } from "../database/sqlite.js";

async function ListarByEmail(email) {
  const sqlSelect = `SELECT * FROM users WHERE email = ?`;
  const user = await query(sqlSelect, [email]);

  console.log("Usuário encontrado no banco:", user); // Log do usuário encontrado
  return user[0] || null; // Retorna o usuário ou null se não encontrado
}

async function Inserir(name, email, password) {
  const sqlInsert = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  await query(sqlInsert, [name, email, password]);

  const sqlSelect = `SELECT * FROM users WHERE email = ?`;
  const user = await query(sqlSelect, [email]);

  return user[0];
}

async function Profile(id_user) {
  const sqlSelect = `SELECT id_user, name, email FROM users WHERE id_user = ?`;
  const user = await query(sqlSelect, [id_user]);

  return user[0] || null;
}

export default { ListarByEmail, Inserir, Profile };
