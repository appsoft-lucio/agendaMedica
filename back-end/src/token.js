import jwt from "jsonwebtoken";

const secretToken = "jornadaJS123";
// process.env.JWT_SECRET || "defaultSecret"; // Valor padrão em caso de ausência

function CreateToken(id_user) {
  const token = jwt.sign({ id_user }, secretToken, {
    expiresIn: 9999999, // ou "2h" para duas horas
  });

  return token;
}

function ValidateToken(req, res, next) {
  const authToken = req.headers.authorization; // Captura o header de autorização

  if (!authToken || typeof authToken !== "string") {
    return res.status(401).json({ error: "Token não informado ou inválido" });
  }

  const [bearer, token] = authToken.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ error: "Token mal formatado" });
  }

  jwt.verify(token, secretToken, (err, tokenDecoded) => {
    if (err) {
      return res.status(401).json({ error: "Token inválido" });
    }

    if (!tokenDecoded.id_user) {
      return res
        .status(401)
        .json({ error: "ID do usuário não fornecido ou inválido" });
    }

    req.id_user = tokenDecoded.id_user; // Define o ID do usuário no request
    next();
  });
}

// function ValidateToken(req, res, next) {
//   const authToken = req.headers.authorization;

//   if (!authToken || typeof authToken !== "string") {
//     return res.status(401).json({ error: "Token não informado ou inválido" });
//   }

//   const [bearer, token] = authToken.split(" ");
//   if (bearer !== "Bearer" || !token) {
//     return res.status(401).json({ error: "Token mal formatado" });
//   }

//   jwt.verify(
//     token,
//     process.env.JWT_SECRET || "defaultSecret",
//     (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ error: "Token inválido ou expirado" });
//       }

//       req.id_user = decoded.id_user; // ID do usuário
//       req.is_admin = decoded.is_admin; // Nível de permissão (admin ou não)
//       next();
//     }
//   );
// }

export default { CreateToken, ValidateToken };
