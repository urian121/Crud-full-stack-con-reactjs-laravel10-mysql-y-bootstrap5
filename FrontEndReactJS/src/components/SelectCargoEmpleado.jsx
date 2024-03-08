import PropTypes from "prop-types";
const SelectCargo = ({ cargo, setCargo }) => {
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
      <option value="">Seleccione el Cargo</option>
      {options}
    </select>
  );
};

SelectCargo.propTypes = {
  cargo: PropTypes.string.isRequired,
  setCargo: PropTypes.func.isRequired,
};

export default SelectCargo;
