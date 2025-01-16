import NavBar from "../../components/navBar/navBar.jsx";
import { useState } from "react";

export default function DoctorAdd() {
  // Simulando dados do banco de dados
  const specialties = [
    "Cardiologia",
    "Dermatologia",
    "Ginecologia",
    "Pediatria",
    "Ortopedia",
  ];
  const services = [
    { id: 1, name: "Consulta" },
    { id: 2, name: "Endoscopia" },
    { id: 3, name: "Mamografia" },
    { id: 4, name: "Receitas" },
  ];

  const [doctorName, setDoctorName] = useState("");
  const [gender, setGender] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicePrices, setServicePrices] = useState({});

  // Manipula a seleção de serviços
  const handleServiceChange = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.filter((service) => service !== id)
        : [...prev, id]
    );
  };

  // Atualiza o preço de um serviço
  const handlePriceChange = (id, price) => {
    setServicePrices((prev) => ({
      ...prev,
      [id]: price,
    }));
  };

  // Função para salvar o médico
  const saveDoctor = () => {
    const doctorData = {
      name: doctorName,
      gender,
      specialty,
      services: selectedServices.map((id) => ({
        id,
        price: servicePrices[id] || 0,
      })),
    };

    console.log("Dados do Médico a serem salvos:", doctorData);
    // Aqui, envie os dados para a API
  };

  return (
    <section>
      <NavBar />
      <section className="container-fluid mt-page">
        <section className="row col-lg-6 offset-lg-3">
          <h2 className="mt-3">Adicionar Novo Médico</h2>
          {/* Nome do Médico */}
          <section className="mb-3">
            <label htmlFor="name" className="form-label">
              Nome do Médico
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Digite o nome do médico"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
          </section>
          {/* Sexo */}
          <section className="mb-3">
            <label className="form-label">Sexo</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="M"
                  checked={gender === "M"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="male">
                  Masculino
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="F"
                  checked={gender === "F"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="female">
                  Feminino
                </label>
              </div>
            </div>
          </section>
          {/* Especialidade */}
          <section className="mb-3">
            <label htmlFor="specialty" className="form-label">
              Especialidade
            </label>
            <select
              id="specialty"
              className="form-select"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
            >
              <option value="">Selecione uma especialidade</option>
              {specialties.map((spec, index) => (
                <option key={index} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </section>
          {/* Serviços e Preços */}
          <section className="mb-3">
            <label className="form-label">Serviços e Preços</label>
            <div>
              {services.map((service) => (
                <div key={service.id} className="mb-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`service-${service.id}`}
                      value={service.id}
                      checked={selectedServices.includes(service.id)}
                      onChange={() => handleServiceChange(service.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`service-${service.id}`}
                    >
                      {service.name}
                    </label>
                  </div>
                  {selectedServices.includes(service.id) && (
                    <input
                      type="number"
                      className="form-control mt-2"
                      placeholder="Preço do serviço"
                      value={servicePrices[service.id] || ""}
                      onChange={(e) =>
                        handlePriceChange(
                          service.id,
                          parseFloat(e.target.value)
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
          {/* Botão de Salvar */}
          <section className="text-center">
            <button
              className="btn btn-custom"
              type="button"
              onClick={saveDoctor}
            >
              Salvar
            </button>
          </section>
        </section>
      </section>
    </section>
  );
}
