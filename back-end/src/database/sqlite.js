import sqlite3 from "sqlite3";

const SQLite = sqlite3.verbose();

// Conexão com o banco de dados
const db = new SQLite.Database(
  "./src/database/banco.db",
  SQLite.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
      console.log("Conexão com o banco de dados estabelecida.");
    }
  }
);

// Função query para consultas ao banco
function query(command, params = [], method = "all") {
  return new Promise((resolve, reject) => {
    // Verifica se o banco está inicializado
    if (!db) {
      return reject(new Error("Banco de dados não está conectado."));
    }

    // Verifica se o método é válido
    if (!["run", "get", "all"].includes(method)) {
      return reject(
        new Error(`Método "${method}" inválido para o comando SQL.`)
      );
    }

    // Executa a consulta no banco de dados
    db[method](command, params, function (error, result) {
      if (error) {
        reject(error); // Retorna o erro na Promise
      } else {
        if (method === "run") {
          resolve(this); // Para `run`, retorna informações como `lastID` e `changes`
        } else {
          resolve(result); // Para `get` ou `all`, retorna o resultado da consulta
        }
      }
    });
  });
}

// Fechamento seguro do banco de dados
function closeDatabase() {
  db.close((err) => {
    if (err) {
      console.error("Erro ao fechar o banco de dados:", err.message);
    } else {
      console.log("Conexão com o banco de dados fechada.");
    }
  });
}

// Evento para fechar o banco ao encerrar a aplicação
process.on("SIGINT", () => {
  closeDatabase();
  process.exit(0);
});

export { db, query };
