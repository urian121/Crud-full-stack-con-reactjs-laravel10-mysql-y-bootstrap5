import axios from "axios";
import { obtenerEmpleados, URL_API } from "./funciones";
import VariablesDeEstados from "./VariablesDeEstados";
import { useEffect } from "react";

// importando la funcion toast Librería nextjs-toast-notify para las alertas
import { toast } from "nextjs-toast-notify";

import DetallesEmpleado from "./DetallesEmpleado";
import TablaEmpleado from "./TablaEmpleado";

const ListaEmpleados = ({
  setMostarEmpleadoEditar,
  setDataEditarEmpleado,
  empleados,
  setEmpleados,
  avatarUrl,
}) => {
  // Importa las variables de estado desde el componente compartido
  const {
    dataInformacionEmpleado,
    setDataInformacionEmpleado,
    mostrarDetallesEmpleado,
    setMostarDetallesEmpleado,
  } = VariablesDeEstados();

  useEffect(() => {
    const fetchData = async () => {
      const empleadosData = await obtenerEmpleados();
      setEmpleados(empleadosData);
    };

    fetchData();
  }, [setEmpleados]); // Se ejecuta solo una vez al montar el componente

  /**
   * Función para eliminar un empleado
   */
  const eliminarEmpleado = async (idEmpleado) => {
    try {
      await axios.delete(`${URL_API}/${idEmpleado}`);
      const nuevaListaEmpleados = empleados.filter(
        (empleado) => empleado.id !== idEmpleado
      );
      toast.success("Empleado eliminado correctamente");
      setEmpleados(nuevaListaEmpleados);
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
    }
  };

  /**
   * Función para obtener los detalles de un empleado, de acuerdo a su id
   */
  const obtenerDetallesEmpleado = async (IdEmpleado) => {
    try {
      const response = await axios.get(`${URL_API}/${IdEmpleado}`);
      setMostarDetallesEmpleado(true);
      setDataInformacionEmpleado(response.data);
    } catch (error) {
      console.error("Error buscar detalles del empleado:", error);
    }
  };

  const obtenerEmpleadoParaEditar = async (IdEmpleado) => {
    try {
      const response = await axios.get(`${URL_API}/${IdEmpleado}`);
      setDataEditarEmpleado(response.data);
      setMostarEmpleadoEditar(true);
    } catch (error) {
      console.error("Error al obtener los datos del contacto:", error);
    }
  };

  const volverHome = () => {
    setMostarDetallesEmpleado(false);
  };

  return mostrarDetallesEmpleado ? (
    <>
      <h4>
        Detalles del empleados <hr />
      </h4>
      <i
        title="Volver a Home"
        className="bi bi-arrow-left-circle float-start"
        onClick={volverHome}
      ></i>
      <DetallesEmpleado
        dataInformacionEmpleado={dataInformacionEmpleado}
        avatarUrl={avatarUrl}
      />
    </>
  ) : (
    <>
      <h4>
        Lista de empleados <hr />
      </h4>
      <TablaEmpleado
        empleados={empleados}
        avatarUrl={avatarUrl}
        eliminarEmpleado={eliminarEmpleado}
        obtenerDetallesEmpleado={obtenerDetallesEmpleado}
        obtenerEmpleadoParaEditar={obtenerEmpleadoParaEditar}
      />
    </>
  );
};
export default ListaEmpleados;
