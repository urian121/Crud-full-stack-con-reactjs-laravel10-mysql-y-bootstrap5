import axios from "axios";
import PropTypes from "prop-types";
import { obtenerEmpleados, URL_API } from "./funciones";
import VariablesDeEstados from "./VariablesDeEstados";
import { useEffect } from "react";
import { toast } from "react-toastify";

import DetallesEmpleado from "./DetallesEmpleado";

const ListaEmpleados = ({
  mostrarDetallesEmpleado,
  setMostarDetallesEmpleado,
}) => {
  const avatarUrl = "http://127.0.0.1:8500/avatars/";

  // Importa las variables de estado desde el componente compartido
  const {
    empleados,
    setEmpleados,
    dataInformacionEmpleado,
    setDataInformacionEmpleado,
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
      console.log(nuevaListaEmpleados);
      toast.success("Empleado eliminado correctamente");
      setEmpleados(nuevaListaEmpleados);
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
    }
  };

  /**
   * Función para obtener los detalles de un empleado, de acuerdo a su id
   */
  const obtenerDetallesEmpleado = async (id) => {
    try {
      const response = await axios.get(`${URL_API}/${id}`);
      console.log("Datos del empleado:", response.data);
      setMostarDetallesEmpleado(true);
      setDataInformacionEmpleado(response.data);
    } catch (error) {
      console.error("Error buscar detalles del empleado:", error);
    }
  };

  const volverHome = () => {
    setMostarDetallesEmpleado(false);
  };

  return mostrarDetallesEmpleado ? (
    <>
      <i
        title="Volver a Home"
        className="bi bi-arrow-left-circle float-start"
        onClick={volverHome}></i>
      <DetallesEmpleado
        dataInformacionEmpleado={dataInformacionEmpleado}
        avatarUrl={avatarUrl}
      />
    </>
  ) : (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Cedula</th>
            <th scope="col">Sexo</th>
            <th scope="col">Cargo</th>
            <th scope="col">Avatar</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => {
            return (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.edad}</td>
                <td>{empleado.cedula}</td>
                <td>{empleado.sexo}</td>
                <td>{empleado.cargo}</td>
                <td>
                  <img
                    src={`${avatarUrl}/${empleado.avatar}`}
                    alt={empleado.avatar}
                    width="50"
                    height="50"
                  />
                </td>
                <td>
                  <ul className="flex_acciones">
                    <li>
                      <span
                        title={`Detalles del empleado ${empleado.nombre}`}
                        onClick={() => obtenerDetallesEmpleado(empleado.id)}
                        className="btn btn-success">
                        <i className="bi bi-binoculars"></i>
                      </span>
                    </li>
                    <li>
                      <span
                        title={`Editar datos del empleado ${empleado.nombre}`}
                        className="btn btn-primary">
                        <i className="bi bi-pencil-square"></i>
                      </span>
                    </li>
                    <li>
                      <button
                        title={`Borrar empleado ${empleado.nombre}`}
                        className="btn btn-danger"
                        type="button"
                        onClick={() => eliminarEmpleado(empleado.id)}>
                        <i className="bi bi-trash3"></i>
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ListaEmpleados.propTypes = {
  mostrarDetallesEmpleado: PropTypes.bool.isRequired,
  setMostarDetallesEmpleado: PropTypes.func,
};
export default ListaEmpleados;
