import { useState } from "react";
const VariablesDeEstados = () => {
  const [datosInputs, setDatosInputs] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
  });
  const [empleados, setEmpleados] = useState([]);
  const [sexo, setSexo] = useState("masculino");
  const [cargo, setCargo] = useState("");
  const [edad, setEdad] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  return {
    datosInputs,
    setDatosInputs,
    empleados,
    setEmpleados,
    sexo,
    setSexo,
    cargo,
    setCargo,
    edad,
    setEdad,
    selectedFile,
    setSelectedFile,
  };
};

export default VariablesDeEstados;
