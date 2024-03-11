import FormlarioEmpleado from "./FormlarioEmpleado";
import ListaEmpleados from "./ListaEmpleados";
import VariablesDeEstados from "./VariablesDeEstados";

import { ToastContainer } from "./toastConfig";

const URL_API = "http://127.0.0.1:8500/api/empleados";
const avatarUrl = "http://127.0.0.1:8500/avatars/";

const HomePage = () => {
  const {
    mostrarEmpleadoEditar,
    setMostarEmpleadoEditar,
    dataEditarEmpleado,
    setDataEditarEmpleado,
    empleados,
    setEmpleados,
  } = VariablesDeEstados();

  return (
    <>
      <ToastContainer />
      <div className="row justify-content-md-center">
        <div className="col-md-4 border_right">
          <FormlarioEmpleado
            URL_API={URL_API}
            setEmpleados={setEmpleados}
            mostrarEmpleadoEditar={mostrarEmpleadoEditar}
            setMostarEmpleadoEditar={setMostarEmpleadoEditar}
            dataEditarEmpleado={dataEditarEmpleado}
            avatarUrl={avatarUrl}
          />
        </div>

        <div className="col-md-8">
          <ListaEmpleados
            empleados={empleados}
            setEmpleados={setEmpleados}
            setMostarEmpleadoEditar={setMostarEmpleadoEditar}
            setDataEditarEmpleado={setDataEditarEmpleado}
            avatarUrl={avatarUrl}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
