import PropTypes from "prop-types";
import { obtenerEmpleados } from "./funciones";
import axios from "axios";
import { useForm } from "react-hook-form";

import { toast } from "./toastConfig";
import VariablesDeEstados from "./VariablesDeEstados";
import "../styles/loading.css";

import SelectEdad from "./SelectEdad";
import SelectCargoEmpleado from "./SelectCargoEmpleado";
import Loading from "./Loading";

const FormlarioEmpleado = ({
  URL_API,
  setEmpleados,
  mostrarEmpleadoEditar,
  setMostarEmpleadoEditar,
  dataEditarEmpleado,
  avatarUrl,
}) => {
  const { loading, setLoading } = VariablesDeEstados();

  const {
    register,
    handleSubmit,
    setValue,
    /* formState: { errors }, */
  } = useForm();

  setValue("id", dataEditarEmpleado?.id || "");
  setValue("nombre", dataEditarEmpleado?.nombre || "");
  setValue("cedula", dataEditarEmpleado?.cedula || "");
  setValue("sexo", dataEditarEmpleado?.sexo || "masculino");
  setValue("telefono", dataEditarEmpleado?.telefono || "");
  setValue("cargo", dataEditarEmpleado?.cargo || "");
  setValue("edad", dataEditarEmpleado?.edad || "");
  setValue("avatar", dataEditarEmpleado?.avatar || "");

  const customHandleSubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("cedula", data.cedula);
    formData.append("sexo", data.sexo);
    formData.append("telefono", data.telefono);
    formData.append("edad", data.edad);
    formData.append("cargo", data.cargo);
    formData.append("avatar", data.avatar[0]);

    try {
      await axios.post(URL_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Simulamos un envío de formulario asíncrono
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      toast.success("Empleado agregado correctamente");
      // Consulto la API para obtener la lista de empleados actualizada y actualizo la lista de empleados
      const empleadosData = await obtenerEmpleados();
      setEmpleados(empleadosData);
    } catch (error) {
      console.error("Error al agregar empleado:", error);
    }
  };

  const volverAlHomeDesdeEditar = () => {
    setMostarEmpleadoEditar(false);
    console.log("volver al home");
    /**Reiniciando los valores */
    // setValue("nombre", "");
    setValue("nombre", (dataEditarEmpleado.nombre = ""));
    setValue("cedula", (dataEditarEmpleado.cedula = ""));
    setValue("sexo", dataEditarEmpleado?.sexo);
    setValue("telefono", (dataEditarEmpleado.telefono = ""));
    setValue("cargo", (dataEditarEmpleado.cargo = ""));
    setValue("edad", (dataEditarEmpleado.edad = ""));
    setValue("avatar", (dataEditarEmpleado.avatar = ""));
  };

  const handleSubmitUpdateForm = async (data) => {
    //setLoading(true);

    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("nombre", data.nombre);
    formData.append("cedula", data.cedula);
    formData.append("sexo", data.sexo);
    formData.append("telefono", data.telefono);
    formData.append("edad", data.edad);
    formData.append("cargo", data.cargo);
    formData.append("avatar", data.avatar[0]);

    // Verificar si se proporciona una nueva imagen
    //if (data.avatar[0]) {
    // Verifica si data.avatar[0] es igual a data.avatar

    /* if (data.avatar.length > 0 && data.avatar[0] === data.avatar) {
      console.log("data.avatar[0] es igual a data.avatar");
    } else {
      console.log("data.avatar[0] no es igual a data.avatar");
    }
    */

    // Verificar si se proporciona una nueva imagen
    console.log(data.avatar);
    if (data.avatar && data.avatar[0]) {
      console.log("c1");
      formData.append("avatar", data.avatar[0]);
    } else {
      console.log("c2");
      formData.delete("avatar");
    }
    // Elimina el campo "id" del FormData
    formData.delete("id");
    console.log(formData);

    /*
    try {
      //let url = `${URL_API}/${data.id}`;
      // Si hay una imagen adjunta, usar formData
      if (formData.avatar && formData.avatar[0]) {
        console.log("caso 2");
        await axios.put(`${URL_API}/${data.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        console.log("caso 1");
        // Si no hay una imagen adjunta, no necesitas enviar formData
        await axios.put(`${URL_API}/${data.id}`, formData);
      }
      // Simulamos un envío de formulario asíncrono
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      toast.success("Empleado actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el empleado:", error);
    }
    */
  };

  return (
    <>
      {mostrarEmpleadoEditar ? (
        <h4>
          <i
            title="Volver a Home"
            className="bi bi-arrow-left-circle float-start"
            onClick={volverAlHomeDesdeEditar}></i>
          Editar empleado <hr />
        </h4>
      ) : (
        <h4>
          Agregar nuevo empleado <hr />
        </h4>
      )}
      <form
        className="px-5"
        onSubmit={
          mostrarEmpleadoEditar
            ? handleSubmit(handleSubmitUpdateForm)
            : handleSubmit(customHandleSubmit)
        }
        method="POST"
        encType="multipart/form-data">
        {mostrarEmpleadoEditar && (
          <input
            type="text"
            {...register("id", { required: true })}
            className="form-control"
            hidden
            disabled
          />
        )}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            {...register("nombre", { required: true })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Cédula (NIT)</label>
          <input
            type="number"
            {...register("cedula", { required: true })}
            className="form-control"
            required
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Seleccione la edad</label>
            <SelectEdad register={register} />
          </div>
          <div className="col-md-6">
            <label className="form-label">Sexo del alumno</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                {...register("sexo", { required: true })}
                id="masculino"
                value="masculino"
                defaultChecked // Establecer este radio como seleccionado por defecto
              />
              <label className="form-check-label" htmlFor="masculino">
                Masculino
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                {...register("sexo")}
                id="femenino"
                value="femenino"
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
            {...register("telefono", { required: true })}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seleccione el Cargo</label>
          <SelectCargoEmpleado register={register} />
        </div>
        <div className="mb-3 mt-4">
          <label className="form-label">Cambiar Foto del empleado</label>
          {/*  la negación !mostrarEmpleadoEditar invertirá el valor de mostrarEmpleadoEditar. Por lo tanto, si mostrarEmpleadoEditar es true, !mostrarEmpleadoEditar será false, y si mostrarEmpleadoEditar es false, !mostrarEmpleadoEditar será true.
          Esto significa que el input será requerido cuando mostrarEmpleadoEditar sea false, y será opcional cuando mostrarEmpleadoEditar sea true.
           required={mostrarEmpleadoEditar ? true : false}
           */}
          <input
            className="form-control form-control-sm"
            type="file"
            name="avatar"
            {...register("avatar", { required: !mostrarEmpleadoEditar })}
            accept="image/png, image/jpeg"
          />
        </div>

        {mostrarEmpleadoEditar && (
          <div className="mb-3 mt-4">
            <label className="form-label">Foto actual del Empleado</label>
            <img
              src={`${avatarUrl}/${dataEditarEmpleado.avatar}`}
              className="card-img-top"
              alt={dataEditarEmpleado.avatar}
            />
          </div>
        )}

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn_add">
            {dataEditarEmpleado ? "Actualizar Empleado" : "Registrar Empleado"}
          </button>
        </div>
      </form>

      {loading && <Loading />}
    </>
  );
};

FormlarioEmpleado.propTypes = {
  URL_API: PropTypes.string.isRequired,
  setEmpleados: PropTypes.func,
  mostrarEmpleadoEditar: PropTypes.bool,
  setMostarEmpleadoEditar: PropTypes.func,
  dataEditarEmpleado: PropTypes.object,
  avatarUrl: PropTypes.string,
};

export default FormlarioEmpleado;
