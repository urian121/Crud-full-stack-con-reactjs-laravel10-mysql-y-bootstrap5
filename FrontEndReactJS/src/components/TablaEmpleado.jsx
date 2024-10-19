import DataTable from "react-data-table-component";
import { useState } from "react";

const TablaEmpleado = ({
  empleados,
  avatarUrl,
  eliminarEmpleado,
  obtenerDetallesEmpleado,
  obtenerEmpleadoParaEditar,
}) => {
  const columns = [
    {
      name: "Nombre",
      selector: (row) => row.nombre,
      sortable: true,
    },
    {
      name: "Sexo",
      selector: (row) => row.sexo,
      sortable: true,
    },
    {
      name: "Cargo",
      selector: (row) => row.cargo,
      sortable: true,
    },
    {
      name: "Avatar",
      cell: (row) => (
        <img
          src={`${avatarUrl}/${row.avatar}`}
          alt={row.avatar}
          width="50"
          height="50"
        />
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <ul className="flex_acciones">
          <li className="mx-2">
            <span
              title={`Detalles del empleado ${row.nombre}`}
              onClick={() => obtenerDetallesEmpleado(row.id)}
              className="btn btn-success"
            >
              <i className="bi bi-binoculars"></i>
            </span>
          </li>
          <li className="mx-2">
            <span
              title={`Editar datos del empleado ${row.nombre}`}
              className="btn btn-primary"
              onClick={() => obtenerEmpleadoParaEditar(row.id)}
            >
              <i className="bi bi-pencil-square"></i>
            </span>
          </li>
          <li>
            <button
              title={`Borrar empleado ${row.nombre}`}
              className="btn btn-danger"
              type="button"
              onClick={() => eliminarEmpleado(row.id)}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </li>
        </ul>
      ),
    },
  ];

  const [busqueda, setBusqueda] = useState("");
  const handleChangeBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  // Filtrar los datos según el término de búsqueda
  const empleadosFiltrados = empleados.filter((empleado) =>
    Object.values(empleado).some((value) =>
      value.toString().toLowerCase().includes(busqueda.toLowerCase())
    )
  );

  // Configuracion de la tabla paginacion a español
  const paginationOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

  return (
    <div className="table-responsive">
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar empleado..."
          value={busqueda}
          onChange={handleChangeBusqueda}
        />
      </div>
      <DataTable
        columns={columns}
        //data={empleados}
        data={empleadosFiltrados}
        highlightOnHover
        pagination
        paginationPerPage={8}
        paginationComponentOptions={paginationOptions}
      />
    </div>
  );
};

export default TablaEmpleado;
