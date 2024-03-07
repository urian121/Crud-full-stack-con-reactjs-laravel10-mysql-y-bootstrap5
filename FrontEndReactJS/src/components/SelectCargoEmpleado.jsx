import { useState } from "react";

const SelectCargo = () => {
  const [cargo, setCargo] = useState("");
  const cargos = [
    "Gerente",
    "Asistente",
    "Analista",
    "Contador",
    "Secretario",
    "Desarrollador Web",
    "Desarrollador FrontEnd",
    "Desarrollador BackEnd",
  ];

  const options = cargos.map((cargo, index) => (
    <option key={index} value={cargo}>
      {cargo}
    </option>
  ));

  console.log(`Cargo: ${cargo}`);
  return (
    <select
      name="cargo"
      className="form-select"
      required
      value={cargo}
      onChange={(e) => setCargo(e.target.value)}>
      <option value="">Seleccionar el Cargo</option>
      {options}
    </select>
  );
};

export default SelectCargo;
