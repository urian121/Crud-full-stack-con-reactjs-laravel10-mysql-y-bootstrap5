<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


class EmpleadoController extends Controller
{

    /** Función para obtener todos los empleados */
    public function index()
    {
        try {
            $empleados = Empleado::all();
            return response()->json($empleados, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los empleados: ' . $e->getMessage()], 500);
        }
    }

    /** Función para crear un nuevo empleado */
    public function store(Request $request)
    {
        try {
            if ($request->hasFile('avatar')) {
                // Almacenar la imagen en la carpeta de almacenamiento público
                if ($request->hasFile('avatar')) {
                    $file = $request->file('avatar');
                    $nombrearchivo = Str::random(20) . '.' . $file->getClientOriginalExtension();
                    $file->move(public_path('avatars'), $nombrearchivo);
                }

                // Guardar el path de la imagen en la base de datos
                $empleado = new Empleado();
                $empleado->avatar = $nombrearchivo;
                // Asigna los demás campos
                $empleado->nombre = $request->nombre;
                $empleado->cedula = $request->cedula;
                $empleado->edad = $request->edad;
                $empleado->sexo = $request->sexo;
                $empleado->telefono = $request->telefono;
                $empleado->cargo = $request->cargo;
                $empleado->save();
            }
            return response()->json($empleado, 201);
        } catch (\Exception $e) {
            // En caso de que ocurra una excepción, manejarla adecuadamente
            return response()->json(['error' => 'Error al crear el empleado: ' . $e->getMessage()], 500);
        }
    }

    /** Función para obtener un solo empleado, de acuerdo a su id */
    public function show($IdEmpleado)
    {
        try {
            /**
             * findOrFail() es un método de Eloquent en Laravel que se utilizan para buscar registros en la base de datos.
             * Similar a find, pero en lugar de devolver null si no encuentra el registro, lanza una excepción ModelNotFoundException
             */
            $empleado = Empleado::findOrFail($IdEmpleado);
            return response()->json($empleado, 200);
        } catch (\Exception $e) {
            // Maneja cualquier excepción y devuelve un mensaje genérico
            return response()->json(['error' => 'Empleado no encontrado o error inesperado'], 404);
        }
    }

    /** Función para actualizar un empleado, de acuerdo a su id */
    public function update(Request $request, $IdEmpleado)
    {
        // Imprimir todos los datos recibidos en la solicitud
        //dd($request->all());
        try {
            // Buscar el empleado en la base de datos
            $datoEmpleado = Empleado::findOrFail($IdEmpleado);
            // Verificar si se adjuntó un nuevo archivo de imagen
            if ($request->hasFile('avatar')) {
                // Eliminar la imagen anterior del servidor si existe
                if ($datoEmpleado->avatar) {
                    // Eliminar la imagen anterior del servidor
                    if (file_exists(public_path('avatars/' . $datoEmpleado->avatar))) {
                        unlink(public_path('avatars/' . $datoEmpleado->avatar));
                    }
                }

                // Almacenar la nueva imagen en la carpeta de almacenamiento público
                $file = $request->file('avatar');
                $nombrearchivo = Str::random(20) . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('avatars'), $nombrearchivo);

                // Actualizar el nombre de la imagen en la base de datos
                $datoEmpleado->avatar = $nombrearchivo;
            }

            // Actualizar los demás campos del empleado
            $datoEmpleado->nombre = $request->nombre;
            $datoEmpleado->cedula = $request->cedula;
            $datoEmpleado->edad = $request->edad;
            $datoEmpleado->sexo = $request->sexo;
            $datoEmpleado->telefono = $request->telefono;
            $datoEmpleado->cargo = $request->cargo;
            $datoEmpleado->save();

            return response()->json($datoEmpleado, 200);
        } catch (\Exception $e) {
            // En caso de que ocurra una excepción, manejarla adecuadamente
            return response()->json(['error' => 'Error al actualizar el empleado: ' . $e->getMessage()], 500);
        }
    }

    /** Función para eliminar un empleado, de acuerdo a su id */
    public function destroy($IdEmpleado)
    {
        try {
            /**
             * Busca el empleado por su ID. Si no existe, devuelve una respuesta JSON
             * indicando que el empleado no fue encontrado.
             * find() es un método de Eloquent en Laravel que se utilizan para buscar registros en la base de datos.
             */
            $empleado = Empleado::find($IdEmpleado);

            if (!$empleado) {
                return response()->json(['message' => 'Empleado no encontrado'], 200);
            }

            // Elimina el registro del empleado de la base de datos.
            $empleado->delete();

            // Verifica si el empleado tiene una imagen de avatar y la elimina del sistema de archivos
            if ($empleado->avatar) {
                // Construye la ruta completa del archivo de la imagen en el servidor.
                $path = public_path('avatars/' . $empleado->avatar);
                // Verifica si el archivo existe antes de intentar eliminarlo.
                if (file_exists($path)) {
                    unlink($path); // Elimina el archivo de la imagen.
                }
            }

            // Devuelve una respuesta JSON indicando que el empleado fue eliminado correctamente.
            return response()->json(['message' => 'Empleado eliminado correctamente'], 200);
        } catch (\Exception $e) {
            // Captura cualquier excepción que ocurra y devuelve un mensaje de error.
            return response()->json(['error' => 'No se pudo eliminar el empleado: ' . $e->getMessage()], 500);
        }
    }
}