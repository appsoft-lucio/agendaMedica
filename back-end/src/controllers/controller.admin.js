import serviceAdmin from "../service/service.admin.js";

async function InserirAdmin(req, res) {
  const { name, email, password } = req.body;

  try {
    const admin = await serviceAdmin.InserirAdmin(name, email, password);
    return res.status(201).json(admin); // Sucesso
  } catch (error) {
    // Retorna erro específico para o cliente
    return res.status(400).json({ error: error.message });
  }
}
async function LoginAdmin(req, res) {
  const { email, password } = req.body;

  const admin = await serviceAdmin.LoginAdmin(email, password);
  if (admin.length == 0)
    return res.status(401).json({ error: "E-mail ou senha iválidos" });
  else res.status(200).json(admin);
}

async function ListarUsers(req, res) {
  try {
    const users = await serviceAdmin.ListarUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export default { InserirAdmin, LoginAdmin, ListarUsers };
