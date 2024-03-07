import { useState } from "react";
import PropTypes from "prop-types";
import SelectEdad from "./SelectEdad";
import SelectCargoEmpleado from "./SelectCargoEmpleado";
import SelectFile from "./SelectFile";

const FormlarioEmpleado = ({ manejarCambioInput }) => {
  const [sexo, setSexo] = useState("masculino");
  const [selectedFile, setSelectedFile] = useState(null);

  /**
   * La función handleFileChange captura el primer archivo seleccionado por el usuario desde un campo de entrada de archivos y lo establece como el archivo seleccionado en el estado del componente.
   */
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
    console.log(selectedFile);
  };

  const handleChangeSexo = (e) => {
    setSexo(e.target.value);
    console.log(sexo);
  };
  return (
    <>
      <form
        action="{{ route('myStore') }}"
        method="POST"
        encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
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
            required
            onChange={manejarCambioInput}
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Seleccione la edad</label>
            <SelectEdad />
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
                checked={sexo === "masculino"}
                onChange={handleChangeSexo}
                required
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
                checked={sexo === "femenino"}
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
          <SelectCargoEmpleado />
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
            Registrar Empleado
          </button>
        </div>
      </form>
    </>
  );
};

FormlarioEmpleado.propTypes = {
  manejarCambioInput: PropTypes.func.isRequired,
};

export default FormlarioEmpleado;
