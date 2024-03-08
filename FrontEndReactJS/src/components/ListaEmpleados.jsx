import axios from "axios";

import { obtenerEmpleados, URL_API } from "./funciones";
import VariablesDeEstados from "./VariablesDeEstados";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ListaEmpleados = () => {
  // Importa las variables de estado desde el componente compartido
  const { empleados, setEmpleados } = VariablesDeEstados();
  console.log(empleados);

  useEffect(() => {
    const fetchData = async () => {
      const empleadosData = await obtenerEmpleados();
      setEmpleados(empleadosData);
    };

    fetchData();
  }, [setEmpleados]); // Se ejecuta solo una vez al montar el componente

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

  const avatarUrl = "http://127.0.0.1:8500/avatars/";
  return (
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
                      <a
                        title="Ver detalles del empleado"
                        href="{{ route('myShow', $empleado->id)}}"
                        className="btn btn-success">
                        <i className="bi bi-binoculars"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="{{ route('myEdit', $empleado->id) }}"
                        className="btn btn-primary">
                        <i className="bi bi-pencil-square"></i>
                      </a>
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

export default ListaEmpleados;
