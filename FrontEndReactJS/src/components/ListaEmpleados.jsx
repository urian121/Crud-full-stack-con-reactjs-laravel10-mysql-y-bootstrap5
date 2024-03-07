const ListaEmpleados = () => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Alumno</th>
            <th scope="col">Curso</th>
            <th scope="col">Email</th>
            <th scope="col">Sexo</th>
            <th scope="col">Idioma</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>
              <span className="flex_btns">
                <button
                  title=""
                  className="btn btn-danger"
                  style={{ marginRight: "5px" }}
                  type="button">
                  <i className="bi bi-trash3"></i>
                </button>

                <button
                  title=""
                  className="btn btn-success btn_add"
                  type="button">
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ListaEmpleados;
