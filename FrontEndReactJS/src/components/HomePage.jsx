import FormlarioEmpleado from "./FormlarioEmpleado";
import ListaEmpleados from "./ListaEmpleados";
import VariablesDeEstados from "./VariablesDeEstados";

import { ToastContainer } from "./toastConfig";

const URL_API = "http://127.0.0.1:8500/api/empleados";

const HomePage = () => {
  const { mostrarDetallesEmpleado, setMostarDetallesEmpleado } =
    VariablesDeEstados();

  return (
    <>
      <ToastContainer />
      <div className="row justify-content-md-center">
        <div className="col-md-4 border_right">
          <h4>
            Registrar nuevo empleado <hr />
          </h4>
          <FormlarioEmpleado URL_API={URL_API} />
        </div>

        <div className="col-md-8">
          <h4>
            Lista de empleados <hr />
          </h4>
          <ListaEmpleados
            mostrarDetallesEmpleado={mostrarDetallesEmpleado}
            setMostarDetallesEmpleado={setMostarDetallesEmpleado}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
