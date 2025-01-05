import repoUser from "../repository/repository.user.js";
import bcrypt from "bcrypt";
import jwt from "../token.js";
import repositoryUser from "../repository/repository.user.js";

async function Inserir(name, email, password) {
  // Validações de entrada
  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  // Validação simples do formato do e-mail
  if (!email.includes("@") || !email.includes(".")) {
    throw new Error("Formato de e-mail inválido.");
  }

  // Verifica se o e-mail já está cadastrado
  const existingUser = await repoUser.ListarByEmail(email);
  if (existingUser) {
    throw new Error("E-mail já está cadastrado.");
  }

  // Criptografa a senha
  const hashPassword = await bcrypt.hash(password, 10);

  // Insere o usuário no repositório
  const user = await repoUser.Inserir(name, email, hashPassword);

  console.log("ID do usuário para criar token:", user.id_user);
  user.token = jwt.CreateToken(user.id_user);

  return user;
}

async function Login(email, password) {
  const user = await repoUser.ListarByEmail(email);
  if (!user) return [];

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.CreateToken(user.id_user);
    delete user.password;
    user.token = token;
    return user;
  } else {
    return [];
  }
}

async function Profile(id_user) {
  const user = await repositoryUser.Profile(id_user);

  return user;
}

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
  const existingAdmin = await repoUser.ListarByEmailAdmin(email);
  if (existingAdmin) {
    throw new Error("E-mail já está cadastrado.");
  }

  // Criptografa a senha
  const hashPassword = await bcrypt.hash(password, 10);

  // Insere o usuário no repositório
  const admin = await repoUser.InserirAdmin(name, email, hashPassword);

  console.log("ID do adminstrador para criar token:", admin.id_user);
  admin.token = jwt.CreateToken(admin.id_user);

  return admin;
}

async function LoginAdmin(email, password) {
  const user = await repoUser.ListarByEmailAdmin(email);
  if (!user) return [];

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.CreateToken(user.id_user);
    delete user.password;
    user.token = token;
    return user;
  } else {
    return [];
  }
}

export default { Inserir, Login, Profile, InserirAdmin, LoginAdmin };
