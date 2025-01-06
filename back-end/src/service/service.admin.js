import repositoryAdmin from "../repository/repository.admin.js";
import bcrypt from "bcrypt";
import jwt from "../token.js";

async function InserirAdmin(name, email, password) {
  // Validações de entrada
  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  // Validação simples do formato do e-mail
  if (!email.includes("@") || !email.includes(".")) {
    throw new Error("Formato de e-mail inválido.");
  }

  // Verifica se o e-mail já está cadastrado
  const existingAdmin = await repositoryAdmin.ListarByEmailAdmin(email);
  if (existingAdmin) {
    throw new Error("E-mail já está cadastrado.");
  }

  // Criptografa a senha
  const hashPassword = await bcrypt.hash(password, 10);

  // Insere o usuário no repositório
  const admin = await repositoryAdmin.InserirAdmin(name, email, hashPassword);

  console.log("ID do adminstrador para criar token:", admin.id_user);
  admin.token = jwt.CreateToken(admin.id_user);

  return admin;
}

async function LoginAdmin(email, password) {
  const admin = await repositoryAdmin.ListarByEmailAdmin(email);
  if (!admin) return [];

  if (await bcrypt.compare(password, admin.password)) {
    const token = jwt.CreateToken(admin.id_admin);
    delete admin.password;
    admin.token = token;
    return admin;
  } else {
    return [];
  }
}

export default { InserirAdmin, LoginAdmin };
