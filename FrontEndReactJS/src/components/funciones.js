import axios from "axios";
const URL_API = "http://127.0.0.1:8500/api/empleados";

const obtenerEmpleados = async () => {
  try {
    const response = await axios.get(URL_API);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los empleados:", error);
  }
};

export { obtenerEmpleados, URL_API };
