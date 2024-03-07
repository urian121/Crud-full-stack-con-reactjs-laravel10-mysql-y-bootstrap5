import { useState } from "react";

const SelectEdad = () => {
  const [edad, setEdad] = useState("");
  const options = [];
  console.log(`Edad: ${edad}`);

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
      onChange={(e) => setEdad(e.target.value)}>
      <option value="">Edad</option>
      {options}
    </select>
  );
};

export default SelectEdad;
