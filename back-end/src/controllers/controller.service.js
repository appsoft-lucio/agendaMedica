async function ListarService(req, res) {
  const appointments = await serviceAppointment.ListarId(id_appointment);

  res.status(200).json(appointments);
}
