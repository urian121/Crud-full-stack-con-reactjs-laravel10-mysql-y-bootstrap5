import { useState } from "react";
const VariablesDeEstados = () => {
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga cuando se enviar el formulario
  const [mostrarDetallesEmpleado, setMostarDetallesEmpleado] = useState(false); // Para manejar el estado del detalles del empleado
  const [dataInformacionEmpleado, setDataInformacionEmpleado] = useState({}); // Almacenar informacion del empleado cuando se observa detalles del mismo
  const [dataEditarEmpleado, setDataEditarEmpleado] = useState({}); // Almacenar informacion del empleado para editar
  // Variable de estado para manejar cuando se muestra la informacion del empleado que fue seleccionadopara ser editado y cuando no
  const [mostrarEmpleadoEditar, setMostarEmpleadoEditar] = useState(false);
  const [datosInputs, setDatosInputs] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
  });
  const [empleados, setEmpleados] = useState([]); // Para almacenar la lista de empleados
  const [sexo, setSexo] = useState("masculino"); // Para manejar el estado del sexo
  const [cargo, setCargo] = useState(""); // Para manejar el estado del cargo
  const [edad, setEdad] = useState(""); // Para manejar el estado de la edad
  const [selectedFile, setSelectedFile] = useState(null); // Para manejar el estado del archivo y detectar los cambios

  return {
    loading,
    setLoading,
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
    mostrarDetallesEmpleado,
    setMostarDetallesEmpleado,
    dataInformacionEmpleado,
    setDataInformacionEmpleado,
    dataEditarEmpleado,
    setDataEditarEmpleado,
    mostrarEmpleadoEditar,
    setMostarEmpleadoEditar,
  };
};

export default VariablesDeEstados;
