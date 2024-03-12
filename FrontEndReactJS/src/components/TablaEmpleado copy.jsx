import PropTypes from "prop-types";

const TablaEmpleado = ({
  empleados,
  avatarUrl,
  eliminarEmpleado,
  obtenerDetallesEmpleado,
  obtenerEmpleadoParaEditar,
}) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
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
                        className="btn btn-primary"
                        onClick={() => obtenerEmpleadoParaEditar(empleado.id)}>
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

TablaEmpleado.propTypes = {
  empleados: PropTypes.array.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  eliminarEmpleado: PropTypes.func.isRequired,
  obtenerDetallesEmpleado: PropTypes.func.isRequired,
  obtenerEmpleadoParaEditar: PropTypes.func.isRequired,
};

export default TablaEmpleado;
