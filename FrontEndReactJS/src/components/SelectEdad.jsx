import PropTypes from "prop-types";
const SelectEdad = ({ edad, setEdad }) => {
  const handleChangeEdad = (e) => {
    setEdad(e.target.value);
    console.log(`Edad seleccionada: ${e.target.value}`);
  };

  const options = [];

  for (let i = 18; i <= 50; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  return (
    <select
      className="form-select"
      name="edad"
      required
      value={edad}
      onChange={(e) => handleChangeEdad(e)}>
      <option value="">Seleccione la Edad</option>
      {options}
    </select>
  );
};

SelectEdad.propTypes = {
  edad: PropTypes.string.isRequired,
  setEdad: PropTypes.func.isRequired,
};
export default SelectEdad;
