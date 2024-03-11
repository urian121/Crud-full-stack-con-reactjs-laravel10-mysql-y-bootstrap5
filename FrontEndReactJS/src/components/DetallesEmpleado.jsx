import PropTypes from "prop-types";

const DetallesEmpleado = ({ dataInformacionEmpleado, avatarUrl }) => {
  // console.log("-detalles*---", dataInformacionEmpleado);

  if (!dataInformacionEmpleado) {
    return null;
  }

  return (
    <div className="card" style={{ width: "20rem" }}>
      <img
        src={`${avatarUrl}/${dataInformacionEmpleado.avatar}`}
        className="card-img-top"
        alt={dataInformacionEmpleado.avatar}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold">{dataInformacionEmpleado.nombre}</h5>
        <p className="card-text fw-bold">{dataInformacionEmpleado.cargo}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          Cedula: <strong>{dataInformacionEmpleado.cedula}</strong>
        </li>
        <li className="list-group-item" style={{ float: "left" }}>
          Edad: <strong>{dataInformacionEmpleado.edad}</strong>
        </li>
        <li className="list-group-item">
          Sexo: <strong>{dataInformacionEmpleado.sexo}</strong>
        </li>
        <li className="list-group-item">
          Teléfono: <strong>{dataInformacionEmpleado.telefono}</strong>
        </li>
      </ul>
    </div>
  );
};

DetallesEmpleado.propTypes = {
  dataInformacionEmpleado: PropTypes.object,
  avatarUrl: PropTypes.string,
};

export default DetallesEmpleado;
