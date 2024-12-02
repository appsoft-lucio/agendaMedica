import serviceDoctor from "../service/service.doctor.js";

async function Listar(req, res) {
  const { name, specialty } = req.query;
  try {
    const doctors = await serviceDoctor.Listar(name, specialty);
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar médicos" });
  }
}

async function Inserir(req, res) {
  const { name, specialty, icon } = req.body;
  try {
    const doctors = await serviceDoctor.Inserir(name, specialty, icon);
    res.status(201).json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Erro ao inserir" });
  }
}

async function Editar(req, res) {
  const id_doctor = req.params.id_doctor;
  const { name, specialty, icon } = req.body;

  // Validação simples do corpo da requisição
  if (!name || !specialty || !icon) {
    return res.status(400).json({ error: "Dados inválidos ou incompletos" });
  }

  try {
    const doctor = await serviceDoctor.Editar(id_doctor, name, specialty, icon);

    if (!doctor) {
      // Registro não encontrado
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    // Atualização bem-sucedida
    res
      .status(200)
      .json({ message: "Registro atualizado com sucesso", doctor });
  } catch (error) {
    // Erro inesperado no servidor
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar o registro" });
  }
}

async function Excluir(req, res) {
  const id_doctor = req.params.id_doctor;

  try {
    // Chama o serviço para excluir o médico
    const doctor = await serviceDoctor.Excluir(id_doctor);

    // Valida se o médico foi encontrado
    if (!doctor) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }

    // Retorna os dados do médico excluído
    res.status(200).json({ message: "Registro excluído com sucesso", doctor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir o registro" });
  }
}

async function ListarServicos(req, res) {
  const { id_doctor } = req.params; // `id_doctor` será `undefined` se não for passado

  try {
    const services = await serviceDoctor.ListarServicos(id_doctor); // Lógica adaptada no serviço
    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar serviços" });
  }
}

export default { Listar, Inserir, Editar, Excluir, ListarServicos };
