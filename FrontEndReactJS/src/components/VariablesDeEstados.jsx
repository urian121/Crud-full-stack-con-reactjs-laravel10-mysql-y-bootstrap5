import { useState } from "react";
const VariablesDeEstados = () => {
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga cuando se enviar el formulario
  const [mostrarDetallesEmpleado, setMostarDetallesEmpleado] = useState(false); // Para manejar el estado del detalles del empleado
  const [dataInformacionEmpleado, setDataInformacionEmpleado] = useState({}); // Almacenar informacion del empleado cuando se observa detalles del mismo
  const [dataEditarEmpleado, setDataEditarEmpleado] = useState({}); // Almacenar informacion del empleado para editar
  // Variable de estado para manejar cuando se muestra la informacion del empleado que fue seleccionadopara ser editado y cuando no
  const [mostrarEmpleadoEditar, setMostarEmpleadoEditar] = useState(false);
  const [empleados, setEmpleados] = useState([]); // Para almacenar la lista de empleados

  return {
    loading,
    setLoading,
    empleados,
    setEmpleados,
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
