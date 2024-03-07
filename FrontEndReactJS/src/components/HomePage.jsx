import { useState } from "react";

import FormlarioEmpleado from "./FormlarioEmpleado";
import ListaEmpleados from "./ListaEmpleados";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [datosInputs, setdatosInputs] = useState({
    nombre: "",
    cedula: "",
    telefono: "",
  });

  // Función para manejar cambios en el sexo del alumno

  const manejarCambioInput = (e) => {
    setdatosInputs({
      ...datosInputs,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.name, e.target.value);
    console.log(datosInputs);
    toast.success("Imagen subida correctamente");
  };

  return (
    <>
      <ToastContainer />
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <h4>
            Registrar nuevo empleado <hr />
          </h4>
          <FormlarioEmpleado manejarCambioInput={manejarCambioInput} />
        </div>

        <div className="col-md-8">
          <h4>
            Lista de empleados <hr />
          </h4>
          <ListaEmpleados />
        </div>
      </div>
    </>
  );
};

export default HomePage;
