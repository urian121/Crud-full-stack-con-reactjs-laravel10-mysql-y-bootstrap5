import FormlarioEmpleado from "./FormlarioEmpleado";
import ListaEmpleados from "./ListaEmpleados";
import VariablesDeEstados from "./VariablesDeEstados";

import { ToastContainer } from "./toastConfig";

const URL_API = "http://127.0.0.1:8500/api/empleados";

const HomePage = () => {
  const {
    mostrarEmpleadoEditar,
    setMostarEmpleadoEditar,
    dataEditarEmpleado,
    setDataEditarEmpleado,
  } = VariablesDeEstados();

  return (
    <>
      <ToastContainer />
      <div className="row justify-content-md-center">
        <div className="col-md-4 border_right">
          <FormlarioEmpleado
            URL_API={URL_API}
            mostrarEmpleadoEditar={mostrarEmpleadoEditar}
            dataEditarEmpleado={dataEditarEmpleado}
            setMostarEmpleadoEditar={setMostarEmpleadoEditar}
          />
        </div>

        <div className="col-md-8">
          <ListaEmpleados
            setMostarEmpleadoEditar={setMostarEmpleadoEditar}
            setDataEditarEmpleado={setDataEditarEmpleado}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
