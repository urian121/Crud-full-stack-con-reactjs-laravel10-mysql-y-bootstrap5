import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "./toastConfig";
import VariablesDeEstados from "./VariablesDeEstados";
import "../styles/loading.css";

import SelectCargoEmpleado from "./SelectCargoEmpleado";
import Loading from "./Loading";

const FormlarioEmpleadoEdit = ({ dataEditarEmpleado, manejarCambioInput }) => {
  const {
    loading,
    //setLoading,
    edad,
    setEdad,
    sexo,
    setSexo,
    cargo,
    setCargo,
    selectedFile,
    setSelectedFile,
  } = VariablesDeEstados();
  console.log("Llego la data del empleado para editar", dataEditarEmpleado);

  const handleChangeSexo = (e) => {
    setSexo(e.target.value);
    console.log(sexo);
  };

  /**
   * La función handleFileChange captura el primer archivo seleccionado por el usuario desde un campo de entrada de archivos
   * y lo establece como el archivo seleccionado en el estado del componente.
   */
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };

  const volveDesdeEditar = () => {
    // setMostarEmpleadoEditar(false);
  };

  /**
   * Funcion que recibe los datos del formulario cuando se esta intentando actualizar los datos del empelado seleccionado
   */
  const handleSubmitUpdateForm = async (e) => {
    e.preventDefault();
    console.log("llegue a la funcion para actualizar");
  };

  return (
    <>
      <i
        className="bi bi-arrow-left-circle"
        onClick={volveDesdeEditar}
        style={{ cursor: "pointer", float: "left" }}></i>
      <h4>
        Editar datos <del></del> empleado <hr />
      </h4>
      <form
        className="px-5"
        onSubmit={handleSubmitUpdateForm}
        method="POST"
        encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            value={dataEditarEmpleado.nombre}
            required
            onChange={manejarCambioInput}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cédula (NIT)</label>
          <input
            type="text"
            name="cedula"
            className="form-control"
            value={dataEditarEmpleado.cedula}
            required
            onChange={manejarCambioInput}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Seleccione la edad</label>
            <SelectEdad edad={edad} setEdad={setEdad} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Sexo del alumno</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sexo_alumno"
                id="masculino"
                value="masculino"
                checked={dataEditarEmpleado.sexo === "masculino"}
                onChange={handleChangeSexo}
              />
              <label className="form-check-label" htmlFor="masculino">
                Masculino
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="sexo_alumno"
                id="femenino"
                value="femenino"
                checked={dataEditarEmpleado.sexo === "femenino"}
                onChange={handleChangeSexo} // Aquí debe ser handleChangeSexo
              />
              <label className="form-check-label" htmlFor="femenino">
                Femenino
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="number"
            name="telefono"
            className="form-control"
            required
            onChange={manejarCambioInput}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Seleccione el Cargo</label>
          <SelectCargoEmpleado cargo={cargo} setCargo={setCargo} />
        </div>

        <div className="mb-3 mt-4">
          <label className="form-label">Cambiar Foto del empleado</label>
          <SelectFile
            selectedFile={selectedFile}
            handleFileChange={handleFileChange}
          />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn_add">
            Actualizar Empleado
          </button>
        </div>
      </form>

      {loading && <Loading />}
    </>
  );
};

FormlarioEmpleadoEdit.propTypes = {
  // URL_API: PropTypes.string.isRequired,
  // dataEditarEmpleado: PropTypes.object,
  // manejarCambioInput: PropTypes.func.isRequired,
  datosInputs: PropTypes.object,
  setDatosInputs: PropTypes.func,
  //sexo: PropTypes.string,
  // setSexo: PropTypes.func,
  //handleChangeSexo: PropTypes.func,
};

export default FormlarioEmpleadoEdit;
