import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";
import controllerAppointment from "./controllers/controller.appointment.js";
import jwt from "./token.js";

const router = Router();

//Doctors...
router.get("/doctors", jwt.ValidateToken, controllerDoctor.Listar);
router.post("/doctors", jwt.ValidateToken, controllerDoctor.Inserir);
router.put("/doctors/:id_doctor", jwt.ValidateToken, controllerDoctor.Editar);
router.delete(
  "/doctors/:id_doctor",
  jwt.ValidateToken,
  controllerDoctor.Excluir
);
// Rota para listar serviços de um médico ou todos os serviços
router.get(
  "/doctors/:id_doctor?/services",
  jwt.ValidateToken,
  controllerDoctor.ListarServicos
);

//Users...
router.post("/users/registrar", controllerUser.Inserir);
router.post("/users/login", controllerUser.Login);
router.get("/users/profile", jwt.ValidateToken, controllerUser.Profile);

// Reservas (Appointments)
router.get(
  "/appointments",
  jwt.ValidateToken,
  controllerAppointment.ListarByUser
);
router.post("/appointments", jwt.ValidateToken, controllerAppointment.Inserir);
router.delete(
  "/appointments/:id_appointment",
  jwt.ValidateToken,
  controllerAppointment.Excluir
);

export default router;
