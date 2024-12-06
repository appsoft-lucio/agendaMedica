import jwt from "jsonwebtoken";

const secretToken = "agendaMobile";

function CreateToken(id_user) {
  const token = jwt.sign({ id_user }, secretToken, {
    expiresIn: 999999,
  });

  return token;
}

function ValidateToken(req, res, next) {
  const authToken = req.headers.authorization; // Captura o header de autorização

  if (!authToken) {
    return res.status(401).json({ error: "Token não informado" });
  }

  const [bearer, token] = authToken.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  jwt.verify(token, secretToken, (err, tokenDecoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    req.id_user = tokenDecoded.id_user; // Define o ID do usuário no request
    next();
  });
}

export default { CreateToken, ValidateToken };
