import { query } from "../database/sqlite.js";

async function Listar(name, specialty) {
  let filtros = [];
  let sql = "select * from doctors where 1=1 "; // Evita problemas com WHERE dinâmico

  if (name) {
    sql += "and name like ? ";
    filtros.push(`%${name}%`);
  }

  if (specialty) {
    sql += "and specialty like ? ";
    filtros.push(`%${specialty}%`);
  }

  sql += "order by name";

  try {
    const doctors = await query(sql, filtros);
    return doctors;
  } catch (error) {
    console.error("Erro ao executar consulta SQL:", error.message);
    throw error;
  }
}

async function Inserir(name, specialty, icon) {
  const sqlInsert = `insert into doctors (name, specialty, icon) values (?, ?, ?)`;
  const sqlSelect = `select id_doctor, name, specialty, icon 
                     from doctors 
                     where id_doctor = last_insert_rowid()`;

  await query(sqlInsert, [name, specialty, icon]); // Insere o registro
  const doctor = await query(sqlSelect, []); // Recupera o registro inserido
  return doctor[0]; // Retorna o objeto
}

async function Editar(id_doctor, name, specialty, icon) {
  // Verifica se o médico existe
  const existingDoctor = await query(
    "select id_doctor from doctors where id_doctor = ?",
    [id_doctor]
  );
  if (existingDoctor.length === 0) {
    throw new Error("Doctor not found");
  }

  // Atualiza o registro
  const sqlUpdate = `update doctors set name = ?, specialty = ?, icon = ? 
                     where id_doctor = ?`;
  await query(sqlUpdate, [name, specialty, icon, id_doctor]);

  // Recupera o registro atualizado
  const sqlSelect = `select id_doctor, name, specialty, icon 
                     from doctors 
                     where id_doctor = ?`;
  const doctor = await query(sqlSelect, [id_doctor]);

  return doctor[0]; // Retorna o registro atualizado
}

async function Excluir(id_doctor) {
  // Consulta os dados do médico antes de excluí-lo
  const sqlSelect = `select id_doctor, name, specialty, icon 
                     from doctors 
                     where id_doctor = ?`;
  const doctor = await query(sqlSelect, [id_doctor]);

  // Verifica se o médico existe
  if (doctor.length === 0) {
    throw new Error("Doctor not found");
  }

  // Exclui o médico
  const sqlDelete = `delete from doctors where id_doctor = ?`;
  await query(sqlDelete, [id_doctor]);

  // Retorna os dados do médico excluído
  return doctor[0];
}

async function ListarServicos(id_doctor) {
  let sql = `SELECT 
    ds.id_service,           -- ID do serviço na tabela de associação (doctors_services)
    d.name AS doctor_name,   -- Nome do médico da tabela 'doctors', renomeado como 'doctor_name'
    s.description AS service_description, -- Descrição do serviço da tabela 'services', renomeado como 'service_description'
    ds.price                 -- Preço do serviço associado, da tabela 'doctors_services'
FROM 
    doctors_services ds      -- Tabela intermediária que relaciona médicos com serviços
JOIN 
    doctors d ON ds.id_doctor = d.id_doctor  -- Junta a tabela 'doctors_services' com 'doctors' com base no ID do médico
JOIN 
    services s ON ds.id_service = s.id_service`; // Junta a tabela 'doctors_services' com 'services'

  let filtros = [];

  // Se o ID do médico foi passado, adiciona condição de filtro
  if (id_doctor) {
    sql += ` WHERE ds.id_doctor = ?`; // Filtra apenas os serviços do médico específico
    filtros.push(id_doctor);
  }

  sql += ` ORDER BY doctor_name`; // Ordena pelo nome do médico

  const service = await query(sql, filtros);
  return service;
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };
