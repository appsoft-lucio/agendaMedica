import repoDoctor from "../repository/repository.doctor.js";

async function Listar(name, specialty) {
  const doctors = await repoDoctor.Listar(name, specialty);

  return doctors;
}

async function Inserir(name, specialty, icon) {
  const doctor = await repoDoctor.Inserir(name, specialty, icon);

  return doctor;
}

async function Editar(id_doctor, name, specialty, icon) {
  const doctor = await repoDoctor.Editar(id_doctor, name, specialty, icon);

  return doctor;
}

async function Excluir(id_doctor) {
  // Busca e exclui o médico no repositório
  const doctor = await repoDoctor.Excluir(id_doctor);

  // Valida se o médico foi encontrado
  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor; // Retorna os dados do médico excluído
}

async function ListarServicos(id_doctor) {
  const service = await repoDoctor.ListarServicos(id_doctor);

  return service;
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };
