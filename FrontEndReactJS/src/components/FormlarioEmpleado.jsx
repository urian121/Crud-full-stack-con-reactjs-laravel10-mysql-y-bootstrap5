import axios from "axios";
import { toast } from "./toastConfig";
import VariablesDeEstados from "./VariablesDeEstados";

import PropTypes from "prop-types";
import SelectEdad from "./SelectEdad";
import SelectCargoEmpleado from "./SelectCargoEmpleado";
import SelectFile from "./SelectFile";

const FormlarioEmpleado = ({ URL_API }) => {
  const {
    sexo,
    setSexo,
    edad,
    setEdad,
    cargo,
    setCargo,
    selectedFile,
    setSelectedFile,
    datosInputs,
    setDatosInputs,
    empleados,
    setEmpleados,
  } = VariablesDeEstados();
  console.log(`edad: ${edad}`);

  const manejarCambioInput = (e) => {
    setDatosInputs({
      ...datosInputs,
      [e.target.name]: e.target.value,
    });
    //console.log(e.target.name, e.target.value);
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

  const handleChangeSexo = (e) => {
    setSexo(e.target.value);
    console.log(sexo);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // Crear una copia de los datos del formulario
    const datosConImagen = {
      ...datosInputs,
      sexo: sexo,
      cargo: cargo,
      edad: edad,
    };
    console.log("Datos del formulario:", datosConImagen);

    // Agregar la imagen al objeto datos si existe
    if (selectedFile) {
      datosConImagen.avatar = selectedFile;
    }
    if (selectedFile) {
      try {
        await axios.post(URL_API, datosConImagen, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Empleado agregado correctamente");
        // Reiniciando valores del formulario
        setSelectedFile(null);
        setDatosInputs({
          nombre: "",
          cedula: "",
          telefono: "",
        });
        console.log("**", datosConImagen);
        setEmpleados([...empleados, datosConImagen]);
      } catch (error) {
        console.error("Error al agregar empleado:", error);
      }
    } else {
      console.log("No se ha seleccionado ningún archivo.");
      toast.error("Debe seleccionar una imagen");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmitForm}
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
            Registrar Empleado
          </button>
        </div>
      </form>
    </>
  );
};

FormlarioEmpleado.propTypes = {
  URL_API: PropTypes.string.isRequired,
};

export default FormlarioEmpleado;
